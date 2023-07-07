import { BaseCustomWebComponentConstructorAppend } from "@node-projects/base-custom-webcomponent";
import { IConnectorPosition } from "../interfaces/IConnectorPosition.js";
import { IDiagramItem } from "../interfaces/IDiagramItem.js";

export abstract class BaseDiagramItem extends BaseCustomWebComponentConstructorAppend implements IDiagramItem {
    abstract connectors: IConnectorPosition[];

    importConfig(config: any) {
    }

    exportConfig() {
        return null;
    }
}