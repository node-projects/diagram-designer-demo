import { AbstractExtension, EventNames, IDesignItem, IDesignerCanvas, IExtensionManager, IRect } from "@node-projects/web-component-designer";
import { IConnectorPosition, IConnectorPositionElement } from "../IConnectorPosition.js";


export class ShowConnectorPositionsExtension extends AbstractExtension {

  private _circles: SVGCircleElement[] = [];

  constructor(extensionManager: IExtensionManager, designerCanvas: IDesignerCanvas, extendedItem: IDesignItem) {
    super(extensionManager, designerCanvas, extendedItem);
  }

  override extend() {
    this.refresh();
  }

  override refresh() {
    let rect = this.designerCanvas.getNormalizedElementCoordinates(this.extendedItem.element);
    let cpe = this.extendedItem.element as unknown as IConnectorPositionElement;
    if (cpe.connectors) {
      let i = 0;
      for (let cp of cpe.connectors) {
        let circle = this._drawConnectorOverlay(rect, cp, this._circles[i]);
        this._circles.push(circle);
        i++;
      }
    }
  }

  _drawConnectorOverlay(rect: IRect, cp: IConnectorPosition, oldCircle?: SVGCircleElement): SVGCircleElement {
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
      circle.addEventListener(EventNames.PointerDown, event => this._pointerAction(event));
      circle.addEventListener(EventNames.PointerMove, event => this._pointerAction(event));
      circle.addEventListener(EventNames.PointerUp, event => this._pointerAction(event));
    }
    circle.style.cursor = 'pointer';
    return circle;
  }

  _pointerAction(event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  override dispose() {
    this._removeAllOverlays();
  }
}