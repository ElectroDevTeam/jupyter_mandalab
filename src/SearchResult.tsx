import React, { useState } from "react";
import Hightlighter from "react-highlight-words";

interface SearchResultProps {
  filename: string;
  results: Array<any>;
  openFunc: Function;
  query: string;
}

const SearchResult: React.SFC<SearchResultProps> = ({
  filename,
  results,
  openFunc,
  query
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="jupyter-mandalab-searchresult noselect">
      <div
        style={{
          overflow: "hidden"
        }}
      >
        <div
          className="jupyter-mandalab-searchresult-filename jupyter-mandalab-highlight-hover"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          <span
            className={isCollapsed ? "chevron right" : "chevron bottom"}
            style={{
              margin: "0 0.5em 0 0",
              display: "inline-block",
              position: "relative",
              bottom: "-0.2em"
            }}
          ></span>
          {filename.replace(/^.*[\\\/]/, "")}
        </div>
      </div>
      {!isCollapsed && (
        <div className="jupyter-mandalab-searchresult-description noselect">
          {results.map(res => (
            <div
              className="jupyter-mandalab-highlight-hover"
              onClick={() => {
                openFunc();
              }}
            >
              <pre style={{ display: "inline", margin: 0 }}>
                <span className="jupyter-mandalab-lineno">{res.linenumber}</span>
                <span>
                  <Hightlighter
                    highlightClassName="jupyter-mandalab-highlight"
                    searchWords={[query]}
                    autoEscape={true}
                    textToHighlight={res.content}
                  />
                </span>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
