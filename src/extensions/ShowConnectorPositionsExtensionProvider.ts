import { IDesignItem, IDesignerCanvas, IDesignerExtension, IDesignerExtensionProvider, IExtensionManager } from "@node-projects/web-component-designer";
import { ShowConnectorPositionsExtension } from "./ShowConnectorPositionsExtension.js";
import { css } from "@node-projects/base-custom-webcomponent";

export class ShowConnectorPositionsExtensionProvider implements IDesignerExtensionProvider {
  shouldExtend(extensionManager: IExtensionManager, designerView: IDesignerCanvas, designItem: IDesignItem): boolean {
    return true;
  }

  getExtension(extensionManager: IExtensionManager, designerView: IDesignerCanvas, designItem: IDesignItem): IDesignerExtension {
    return new ShowConnectorPositionsExtension(extensionManager, designerView, designItem);
  }

  readonly style = css`
    .svg-connector { stroke: #3899ec; fill: orange; pointer-events: all }
  `;
}