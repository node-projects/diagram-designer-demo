import { IConnectorPosition } from "./IConnectorPosition";

export interface IDiagramItem extends HTMLElement {
    readonly connectors: IConnectorPosition[];

    importConfig(config: any);
    exportConfig(): any;
}
