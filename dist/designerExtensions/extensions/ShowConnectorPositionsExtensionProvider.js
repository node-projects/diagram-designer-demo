import { ShowConnectorPositionsExtension } from "./ShowConnectorPositionsExtension.js";
import { css } from "@node-projects/base-custom-webcomponent";
export class ShowConnectorPositionsExtensionProvider {
    shouldExtend(extensionManager, designerView, designItem) {
        return true;
    }
    getExtension(extensionManager, designerView, designItem) {
        return new ShowConnectorPositionsExtension(extensionManager, designerView, designItem);
    }
    style = css `
    .svg-connector { stroke: #3899ec; fill: orange; pointer-events: all }
  `;
}
