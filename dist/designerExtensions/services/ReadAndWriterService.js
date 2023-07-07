import { DesignItem } from "@node-projects/web-component-designer";
export class ReadAndWriterService {
    async parse(html, serviceContainer, instanceServiceContainer, parseSnippet) {
        let designItems = [];
        let data = JSON.parse(html);
        for (let o of data.objects) {
            let el = document.createElement(o.name);
            if (o.config)
                el.importConfig(o);
            el.style.width = o.rect.width + 'px';
            el.style.height = o.rect.height + 'px';
            el.style.left = o.rect.x + 'px';
            el.style.top = o.rect.y + 'px';
            el.style.position = "absolute";
            designItems.push(DesignItem.createDesignItemFromInstance(el, serviceContainer, instanceServiceContainer));
        }
        if (data.connections) {
            //@ts-ignore
            for (let c of data.connections) {
            }
        }
        return designItems;
    }
    write(textWriter, designItems, rootContainerKeepInline, options, updatePositions) {
        textWriter.writeLine('{');
        textWriter.writeLine('  "objects": [');
        for (let d of designItems) {
            let start = textWriter.position;
            //let position = d.instanceServiceContainer.designerCanvas.getNormalizedElementCoordinates(d.element);
            let rect = {
                x: parseFloat(d.getStyle('left')),
                y: parseFloat(d.getStyle('top')),
                width: parseFloat(d.getStyle('width')),
                height: parseFloat(d.getStyle('height'))
            };
            let cfg = { name: d.name, id: d.id, rect: rect };
            let additionalConfig = d.element.exportConfig();
            if (additionalConfig) {
                cfg.config = additionalConfig;
            }
            textWriter.writeLine(JSON.stringify(cfg, null, '    ') + (designItems[designItems.length - 1] == d ? '' : ','));
            let end = textWriter.position;
            if (updatePositions && d.instanceServiceContainer.designItemDocumentPositionService) {
                d.instanceServiceContainer.designItemDocumentPositionService.setPosition(d, { start: start, length: end - start });
            }
        }
        textWriter.writeLine('  ]');
        textWriter.writeLine('}');
    }
}
