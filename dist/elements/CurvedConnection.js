var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, customElement, html } from "@node-projects/base-custom-webcomponent";
import { BaseConnectionItem } from "./BaseConnectionItem.js";
export let CurvedConnection = class CurvedConnection extends BaseConnectionItem {
    static style = css `
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
  }`;
    static template = html `
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0 C200 0, 100 300, 300 300"/>
    <path id="arrow" d="M10,50 L20,35 L10,40.655 L0,35 Z" stroke="#000000" />
  </svg>`;
    constructor() {
        super();
        this._restoreCachedInititalValues();
    }
    ready() {
        this._parseAttributesToProperties();
    }
};
CurvedConnection = __decorate([
    customElement('curved-connection')
], CurvedConnection);
