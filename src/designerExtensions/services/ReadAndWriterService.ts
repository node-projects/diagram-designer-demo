import { DesignItem, IDesignItem, IHtmlParserService, IHtmlWriterOptions, IHtmlWriterService, IRect, InstanceServiceContainer, ServiceContainer } from "@node-projects/web-component-designer";
import { ITextWriter } from "@node-projects/web-component-designer/dist/elements/helper/ITextWriter";
import { ISaveData, ISaveObject } from "../../interfaces/ISaveData";
import { IDiagramItem } from "../../interfaces/IDiagramItem";

export class ReadAndWriterService implements IHtmlParserService, IHtmlWriterService {

    async parse(html: string, serviceContainer: ServiceContainer, instanceServiceContainer: InstanceServiceContainer, parseSnippet: boolean): Promise<IDesignItem[]> {

        let designItems: IDesignItem[] = [];
        let data = JSON.parse(html) as ISaveData;

        for (let o of data.objects) {
            let el = document.createElement(o.name) as IDiagramItem;
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
            for (let c of data.connections) {
            }
        }

        return designItems;
    }

    write(textWriter: ITextWriter, designItems: IDesignItem[], rootContainerKeepInline: boolean, options: IHtmlWriterOptions, updatePositions?: boolean) {
        textWriter.writeLine('{');
        textWriter.writeLine('  "objects": [');
        for (let d of designItems) {
            let start = textWriter.position;
            //let position = d.instanceServiceContainer.designerCanvas.getNormalizedElementCoordinates(d.element);
            let rect: IRect = {
                x: parseFloat(d.getStyle('left')),
                y: parseFloat(d.getStyle('top')),
                width: parseFloat(d.getStyle('width')),
                height: parseFloat(d.getStyle('height'))
            }
            let cfg: ISaveObject = { name: d.name, id: d.id, rect: rect };
            let additionalConfig = (<IDiagramItem>d.element).exportConfig();
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