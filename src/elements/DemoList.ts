import { css, customElement, html } from "@node-projects/base-custom-webcomponent";
import { IConnectorPosition } from "../interfaces/IConnectorPosition.js";
import { BaseDiagramItem } from "./BaseDiagramItem.js";

@customElement('demo-list')
export class DemoList extends BaseDiagramItem {

  static readonly style = css`
  div {
    box-sizing: border-box;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    background: white;
  }`

  static readonly template = html`
  <div>
  </div>`

  constructor() {
    super();
    this._restoreCachedInititalValues();
  }

  ready() {
    this._parseAttributesToProperties();
  }

  override readonly connectors: IConnectorPosition[] = [
    { anchorX: 'end', anchorY: 'middle', offsetY: -50 },
    { anchorX: 'end', anchorY: 'middle' },
    { anchorX: 'end', anchorY: 'middle', offsetY: 50 }
  ]
}