export interface IConnectorPosition {
    anchorX: 'start' | 'middle' | 'end';
    offsetX?: number;

    anchorY: 'start' | 'middle' | 'end';
    offsetY?: number;
}

export interface IConnectorPositionElement extends HTMLElement {
    readonly connectors: IConnectorPosition[];
}
