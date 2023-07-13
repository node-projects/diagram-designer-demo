export interface IConnectorPosition {
    anchorX: 'start' | 'middle' | 'end';
    offsetX?: number;

    anchorY: 'start' | 'middle' | 'end';
    offsetY?: number;

    direction: 'in' | 'out' | 'both';
}