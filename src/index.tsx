import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from "@jupyterlab/application";

import { ICommandPalette, MainAreaWidget } from "@jupyterlab/apputils";

import { IDocumentManager } from "@jupyterlab/docmanager";

import { Widget } from "@lumino/widgets";
import React from "react";
import ReactDOM from "react-dom";

import SearchPage from "./SearchPage";

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    div: any;
  }
}

function initSearchWidget(content: Widget, docManager: IDocumentManager, app: JupyterFrontEnd) {
  let searchHeader = (
    <div
      style={{
        height: "100%"
      }}
    >
      <SearchPage docManager={docManager} app={app}/>
    </div>
  );
  ReactDOM.render(searchHeader, content.node);
}

/**
 * Initialization data for the jupyter_mandalab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "jupyter_mandalab",
  autoStart: true,
  requires: [ICommandPalette, IDocumentManager, ILabShell],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    docManager: IDocumentManager,
    labShell: ILabShell,
    
  ) => {
    console.log("JupyterLab extension jupyter_mandalab is activated!");
    // Create a blank content widget inside of MainAreaWidget
    const content = new Widget();
    const widget = new MainAreaWidget({ content });
    initSearchWidget(content, docManager, app);
    widget.id = "jupyter_mandalab";
    // widget.title.iconClass = "jp-SideBar-tabIcon jp-SearchIcon";
    widget.title.label = "Mandalab";

    // Add an application commend
    const command: string = "jupyter_mandalab:search";
    app.commands.addCommand(command, {
      label: "Search mandalab",
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, "left");
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });
    // Add the command to the palette.
    palette.addItem({ command, category: "Search" });
    labShell.add(widget, "left");
  }
};

export default extension;
