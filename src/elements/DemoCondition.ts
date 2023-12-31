import { customElement, html } from "@node-projects/base-custom-webcomponent";
import { IConnectorPosition } from "../interfaces/IConnectorPosition.js";
import { BaseDiagramItem } from "./BaseDiagramItem.js";

@customElement('demo-condition')
export class DemoCondition extends BaseDiagramItem {

  static readonly template = html`
  <svg version="1.1" xmlns="http://www.w3.org/1999/xhtml" fill="#FFFFFF" stroke="#000000" viewBox="0 0 250 250" width="100%" height="100%" preserveAspectRatio="none" stroke-width="2">
      <path version="1.1" xmlns="http://www.w3.org/1999/xhtml" d="M 125 2 L 248 125 L 125 248 L 2 125 Z"></path>
  </svg>`

  constructor() {
    super();
    this._restoreCachedInititalValues();
  }

  ready() {
    this._parseAttributesToProperties();
  }

  override readonly connectors: IConnectorPosition[] = [
    { anchorX: 'middle', anchorY: 'start', direction: 'in' },
    { anchorX: 'middle', anchorY: 'end', direction: 'out' },
    { anchorX: 'start', anchorY: 'middle', direction: 'out' },
    { anchorX: 'end', anchorY: 'middle', direction: 'out' }
  ]
}