import { AbstractExtension, EventNames } from "@node-projects/web-component-designer";
export class ShowConnectorPositionsExtension extends AbstractExtension {
    _circles = [];
    constructor(extensionManager, designerCanvas, extendedItem) {
        super(extensionManager, designerCanvas, extendedItem);
    }
    extend() {
        this.refresh();
    }
    refresh() {
        let rect = this.designerCanvas.getNormalizedElementCoordinates(this.extendedItem.element);
        let cpe = this.extendedItem.element;
        if (cpe.connectors) {
            let i = 0;
            for (let cp of cpe.connectors) {
                let circle = this._drawConnectorOverlay(rect, cp, this._circles[i]);
                this._circles.push(circle);
                i++;
            }
        }
    }
    _drawConnectorOverlay(rect, cp, oldCircle) {
        let xPos = (cp.offsetX ?? 0) + rect.x;
        let yPos = (cp.offsetY ?? 0) + rect.y;
        if (cp.anchorX == 'middle')
            xPos += rect.width / 2;
        if (cp.anchorX == 'end')
            xPos += rect.width;
        if (cp.anchorY == 'middle')
            yPos += rect.height / 2;
        if (cp.anchorY == 'end')
            yPos += rect.height;
        let circle = this._drawCircle(xPos, yPos, 7 / this.designerCanvas.zoomFactor, 'svg-connector', oldCircle);
        circle.style.strokeWidth = (1 / this.designerCanvas.zoomFactor).toString();
        if (!oldCircle) {
            circle.addEventListener(EventNames.PointerDown, event => this._pointerAction(event, circle));
            circle.addEventListener(EventNames.PointerMove, event => this._pointerAction(event, circle));
            circle.addEventListener(EventNames.PointerUp, event => this._pointerAction(event, circle));
        }
        circle.style.cursor = 'pointer';
        return circle;
    }
    _pointerAction(event, circle) {
        event.preventDefault();
        event.stopPropagation();
        switch (event.type) {
            case EventNames.PointerDown:
                circle.setPointerCapture(event.pointerId);
                break;
            case EventNames.PointerMove:
                break;
            case EventNames.PointerUp:
                circle.releasePointerCapture(event.pointerId);
                break;
        }
    }
    dispose() {
        this._removeAllOverlays();
    }
}
