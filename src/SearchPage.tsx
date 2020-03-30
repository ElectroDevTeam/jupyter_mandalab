import React, { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import axios from "axios";
import { PathExt } from "@jupyterlab/coreutils";

interface SearchPageProps {
  docManager: any;
  app: any;
}

const SearchPage: React.SFC<SearchPageProps> = ({ docManager, app }) => {
  const [oldQuery, setOldQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTeam, setSearchTeam] = useState("/");
  const [searchOs, setSearchOs] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState({
    totalMachines: 5,
    machines: [
      {
        name: "My Windows Machine",
        owner: "stopel1",
        os: "Windows",
        isLocked: false,
        isPoweredOn: true
      },
      {
        name: "My Linux Machine",
        owner: "stopel2",
        os: "Linux",
        isLocked: false,
        isPoweredOn: false
      },
      {
        name: "My Windows Machine2",
        owner: "stopel3",
        os: "Windows",
        isLocked: true,
        isPoweredOn: true
      },
      {
        name: "My Other Machine",
        owner: "stopel4",
        os: "Other",
        isLocked: true,
        isPoweredOn: false
      },
      {
        name:
          "Machine with a really looooooooooooooooooooooooooooooooooong name",
        owner: "Bnael",
        os: "Linux",
        isLocked: true,
        isPoweredOn: false
      }
    ]
  });

  const openFunction = (filePath: string) => () => {
    docManager.openOrReveal(
      PathExt.normalize(
        filePath
          .replace("\\/", "\\")
          .replace("\\\\", "\\")
          .replace("\\", "/")
      )
    );
  };

  const getCurrentNotebook = () => {
    const current = app.shell.currentWidget.context;
    if (current.factoryName == "notebook") {
      return current.path;
    }
    return null;
  };

  const addDataToCurrentCell = (data: string) => {
    const currentNotebook = getCurrentNotebook();
    if (currentNotebook) {
      const cell = docManager.openOrReveal(currentNotebook).content.activeCell;
      if (cell) {
        const editor = cell.editor._editor;
        let oldValue = editor.getValue();
        let newValue = "";
        if (oldValue) {
          newValue = oldValue + "\n";
        }
        newValue += data;
        editor.setValue(newValue);
      }
    }
  };

  const addGetMachineToCurrentCell = (machineName: string) => {
        addDataToCurrentCell(`import mint\nmachine = mint.get_mandalab_machine("${machineName}")`);
  };

  const addDisplayNetworkToCurrentCell = (machineName: string) => {
        addGetMachineToCurrentCell(machineName);
        addDataToCurrentCell("from mandalab_visual.mandalab_visual import generate_graph\ngenerate_graph(machine)");
  };

  const search = () => {
    //   Do search stuff
    setOldQuery(searchQuery);
    setHasSearched(true);
  };

  return (
    <div className="jupyter-mandalab-widget">
      <div className="jupyter-mandalab-inner-content noselect">
        <input
          className="jupyter-mandalab-search-input"
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Mandalab machine name"
          onKeyDown={e => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />
        <div className="jupyter-mandalab-label">Owner</div>
        <input
          className="jupyter-mandalab-search-input"
          onChange={e => {
            setSearchTeam(e.target.value);
          }}
          placeholder="Team or owner name"
          onKeyDown={e => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />
        <div className="jupyter-mandalab-label">Operating System</div>
        <select
          id="jupyter-mandalab-machine-selection"
          className="jupyter-mandalab-search-input"
          onChange={e => {
            setSearchOs(e.target.selectedOptions[0].value);
            search();
          }}
        >
          <option value="All">All</option>
          <option value="Windows">Windows</option>
          <option value="Linux">Linux</option>
        </select>
        {hasSearched && (
          <div className="jupyter-mandalab-results-label">
            {searchResult.totalMachines !== 0 &&
              `${searchResult.totalMachines} machine${
                searchResult.totalMachines > 1 ? "s" : ""
              } found`}
            {searchResult.totalMachines === 0 && "No machines found"}
          </div>
        )}
      </div>
      <div>
        {hasSearched && searchResult.machines && (
          <div className="jupyter-mandalab-results-label">
            Double click on a machine to add it to an opened notebook. Click on the cloud icon to display the mandalab network.
          </div>
        )}
      </div>
      <div className="jupyter-mandalab-searchresult-collection">
        {hasSearched &&
          searchResult.machines.map(machine => (
            <SearchResult
              key={`${machine.owner}-${machine.name}-${machine.os}`}
              name={machine.name}
              owner={machine.owner}
              isLocked={machine.isLocked}
              os={machine.os}
              isPoweredOn={machine.isPoweredOn}
              addMachineFunction={() => {
                addGetMachineToCurrentCell(machine.name);
              }}
              addNetworkFunction={() => {
                addDisplayNetworkToCurrentCell(machine.name);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
