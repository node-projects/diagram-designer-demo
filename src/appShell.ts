import { JsonFileElementsService, TreeViewExtended, PropertyGrid, DocumentContainer, NodeHtmlParserService, ListPropertiesService, PaletteTreeView, CopyPasteAsJsonService, PointerToolButtonProvider, SelectorToolButtonProvider, SeperatorToolProvider, ZoomToolButtonProvider } from '@node-projects/web-component-designer';
import createDefaultServiceContainer from '@node-projects/web-component-designer/dist/elements/services/DefaultServiceBootstrap.js';

let serviceContainer = createDefaultServiceContainer();
serviceContainer.register("copyPasteService", new CopyPasteAsJsonService());
serviceContainer.designViewToolbarButtons.length = 0;
serviceContainer.designViewToolbarButtons.push(
  new PointerToolButtonProvider(),
  new SeperatorToolProvider(22),
  new SelectorToolButtonProvider(),
  new SeperatorToolProvider(22),
  new ZoomToolButtonProvider(),
  new SeperatorToolProvider(22),
  //new TransformToolButtonProvider()
);

//DockSpawn
import { DockSpawnTsWebcomponent } from 'dock-spawn-ts/lib/js/webcomponent/DockSpawnTsWebcomponent.js';
import { DockManager } from 'dock-spawn-ts/lib/js/DockManager.js';
DockSpawnTsWebcomponent.cssRootDirectory = "./node_modules/dock-spawn-ts/lib/css/";

//Demo project files
import { BaseCustomWebComponentConstructorAppend, css, html } from '@node-projects/base-custom-webcomponent';
import { CommandHandling } from './CommandHandling.js'
import './elements/DemoCondition.js'

export class AppShell extends BaseCustomWebComponentConstructorAppend {
  activeElement: HTMLElement;
  mainPage = 'designer';

  private _documentNumber: number = 0;
  private _dock: DockSpawnTsWebcomponent;
  private _dockManager: DockManager;
  _paletteTree: PaletteTreeView;
  _propertyGrid: PropertyGrid;
  _treeViewExtended: TreeViewExtended;

  static readonly style = css`
    :host {
      display: block;
      box-sizing: border-box;
      position: relative;

      /* Default colour scheme */
      --canvas-background: white;
      --almost-black: #141720;
      --dark-grey: #232733;
      --medium-grey: #2f3545;
      --light-grey: #383f52;
      --highlight-pink: #e91e63;
      --highlight-blue: #2196f3;
      --highlight-green: #99ff33;
      --input-border-color: #596c7a;
    }

    .app-header {
      background-color: var(--almost-black);
      color: white;
      height: 60px;
      width: 100%;
      position: fixed;
      z-index: 100;
      display: flex;
      font-size: var(--app-toolbar-font-size, 20px);
      align-items: center;
      font-weight: 900;
      letter-spacing: 2px;
      padding-left: 10px;
    }

    .app-body {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      height: 100%;
      overflow: hidden;
    }

    .heavy {
      font-weight: 900;
      letter-spacing: 2px;
    }
    .lite {
      font-weight: 100;
      opacity: 0.5;
      letter-spacing: normal;
    }

    dock-spawn-ts > div {
      height: 100%;
    }

    attribute-editor {
      height: 100%;
      width: 100%;
    }
    `;

  static readonly template = html`
      <div class="app-body">
        <dock-spawn-ts id="dock" style="width: 100%; height: 100%; position: relative;">
          <div id="treeUpper" title="Palette" dock-spawn-dock-type="left" dock-spawn-dock-ratio="0.2"
            style="overflow: hidden; width: 100%; height: 100%; display: flex; flex-direction: column;">
            <node-projects-palette-tree-view name="paletteTree" id="paletteTree" style="height: 100%;"></node-projects-palette-tree-view>
          </div>

          <div title="TreeExtended" dock-spawn-dock-type="down" dock-spawn-dock-to="treeUpper" dock-spawn-dock-ratio="0.8"
            style="overflow: hidden; width: 100%;">
            <node-projects-tree-view-extended name="tree" id="treeViewExtended"></node-projects-tree-view-extended>
          </div>
      
          <div id="attributeDock" title="Properties" dock-spawn-dock-type="right" dock-spawn-dock-ratio="0.2">
            <node-projects-property-grid-with-header id="propertyGrid"></node-projects-property-grid-with-header>
          </div>

        </dock-spawn-ts>
      </div>
    `;
  
  async ready() {
    this._dock = this._getDomElement('dock');
    this._paletteTree = this._getDomElement<PaletteTreeView>('paletteTree');
    //this._bindableObjectsBrowser = this._getDomElement<BindableObjectsBrowser>('bindableObjectsBrowser');
    this._treeViewExtended = this._getDomElement<TreeViewExtended>('treeViewExtended');
    this._propertyGrid = this._getDomElement<PropertyGrid>('propertyGrid');    
   
    let code = "";
    let s = window.location.search;
    if (s.startsWith('?'))
      s = s.substring(1);
    let parts = s.split('&');
    for (let p of parts) {
      if (p.startsWith('html='))
        code = decodeURI(p.substring(5));
    }

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "./assets/dockspawn.css";
    this._dock.shadowRoot.appendChild(linkElement);

    this._dockManager = this._dock.dockManager;
    new CommandHandling(this._dockManager, this, serviceContainer);

    this._dockManager.addLayoutListener({
      onActiveDocumentChange: (manager, panel) => {
        if (panel) {
          let element = this._dock.getElementInSlot((<HTMLSlotElement><any>panel.elementContent));
          if (element && element instanceof DocumentContainer) {
            let sampleDocument = element as DocumentContainer;
            this._propertyGrid.instanceServiceContainer = sampleDocument.instanceServiceContainer;
            this._treeViewExtended.instanceServiceContainer = sampleDocument.instanceServiceContainer;

          }
        }
      },
      onClosePanel: (manager, panel) => {
        if (panel) {
          let element = this._dock.getElementInSlot((<HTMLSlotElement><any>panel.elementContent));
          if (element && element instanceof DocumentContainer) {
            (<DocumentContainer>element).dispose();         
          }
        }
      }
    });

    await this._setupServiceContainer();

    this.newDocument(false, code);
  }

  private async _setupServiceContainer() {
    serviceContainer.register('elementsService', new JsonFileElementsService('demo', './dist/elements-demo.json'));

    serviceContainer.globalContext.onToolChanged.on((e) => {
      let name = [...serviceContainer.designerTools.entries()].filter(({ 1: v }) => v === e.newValue.tool).map(([k]) => k)[0];
      if (e.newValue == null)
        name = "Pointer"
      const buttons = Array.from<HTMLButtonElement>(document.getElementById('tools').querySelectorAll('[data-command]'));
      for (const b of buttons) {
        if (b.dataset.commandParameter == name)
          b.style.backgroundColor = "green"
        else
          b.style.backgroundColor = ""
      }
    });

    this._paletteTree.loadControls(serviceContainer, serviceContainer.elementsServices);
    this._propertyGrid.serviceContainer = serviceContainer;
  }

  public newDocument(fixedWidth: boolean, code?: string) {
    this._documentNumber++;
    let sampleDocument = new DocumentContainer(serviceContainer);
    sampleDocument.setAttribute('dock-spawn-panel-type', 'document');
    sampleDocument.title = "document-" + this._documentNumber;
    sampleDocument.tabIndex = 0;
    sampleDocument.addEventListener('keydown', (e) => {
      if (e.key == "Escape") {
        e.stopPropagation();
      }
    }, true);
    this._dock.appendChild(sampleDocument);
    
    if (code) {
      sampleDocument.content = code;
    }
  }
}

window.customElements.define('node-projects-app-shell', AppShell);