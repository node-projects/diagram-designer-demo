var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html } from "@node-projects/base-custom-webcomponent";
import { BaseDiagramItem } from "./BaseDiagramItem.js";
export let DemoCondition = class DemoCondition extends BaseDiagramItem {
    static template = html `
  <svg version="1.1" xmlns="http://www.w3.org/1999/xhtml" fill="#FFFFFF" stroke="#000000" viewBox="0 0 250 250" width="100%" height="100%" preserveAspectRatio="none" stroke-width="2">
      <path version="1.1" xmlns="http://www.w3.org/1999/xhtml" d="M 125 2 L 248 125 L 125 248 L 2 125 Z"></path>
  </svg>`;
    constructor() {
        super();
        this._restoreCachedInititalValues();
    }
    ready() {
        this._parseAttributesToProperties();
    }
    connectors = [
        { anchorX: 'middle', anchorY: 'start' },
        { anchorX: 'middle', anchorY: 'end' },
        { anchorX: 'start', anchorY: 'middle' },
        { anchorX: 'end', anchorY: 'middle' }
    ];
};
DemoCondition = __decorate([
    customElement('demo-condition')
], DemoCondition);
