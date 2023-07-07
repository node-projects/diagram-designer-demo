import { css, customElement, html } from "@node-projects/base-custom-webcomponent";
import { BaseConnectionItem } from "./BaseConnectionItem.js";

@customElement('curved-connection')
export class CurvedConnection extends BaseConnectionItem {

  static readonly style = css`
  svg {
    stroke: black;
    stroke-width: 2;
    fill: transparent;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  
  #arrow {
    fill: black;
  }`

  static readonly template = html`
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0 C200 0, 100 300, 300 300"/>
    <path id="arrow" d="M10,50 L20,35 L10,40.655 L0,35 Z" stroke="#000000" />
  </svg>`

  constructor() {
    super();
    this._restoreCachedInititalValues();
  }

  ready() {
    this._parseAttributesToProperties();
  }
}
