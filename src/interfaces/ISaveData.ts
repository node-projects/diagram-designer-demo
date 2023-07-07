import { IRect } from "@node-projects/web-component-designer"

export interface ISaveObject {
    name: string,
    id: string,
    rect: IRect
    config?: any,
}

export interface ISaveConnection {
    sourceId: string,
    sourceConnector: string,
    destinationId: string,
    destinationConnector: string
}

export interface ISaveData {
    objects: ISaveObject[],
    connections: ISaveConnection[]
}