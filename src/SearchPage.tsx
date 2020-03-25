import React, { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import axios from "axios";
import { IDocumentManager } from "@jupyterlab/docmanager";
import { PathExt } from "@jupyterlab/coreutils";

interface SearchPageProps {
  docManager: IDocumentManager;
}

const SearchPage: React.SFC<SearchPageProps> = ({ docManager }) => {
  const [oldQuery, setOldQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTeam, setSearchTeam] = useState("/");
  const [searchOs, setSearchOs] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState({
    totalMachines: 0,
    machines: []
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
              `${searchResult.totalMachines} machines${
                searchResult.totalMachines > 1 ? "s" : ""
              }`}
            {searchResult.totalMachines === 0 && "No machines found"}
          </div>
        )}
      </div>
      <div className="jupyter-mandalab-searchresult-collection">
        {searchResult.machines.map(machine => (
          <SearchResult
            filename={machine.filename}
            results={machine.results}
            openFunc={openFunction(machine.filename)}
            query={oldQuery}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
