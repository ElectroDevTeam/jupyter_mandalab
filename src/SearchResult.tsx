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
    <div className="deepsearch-searchresult noselect">
      <div
        style={{
          overflow: "hidden"
        }}
      >
        <div
          className="deepsearch-searchresult-filename deepsearch-highlight-hover"
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
        <div className="deepsearch-searchresult-description noselect">
          {results.map(res => (
            <div
              className="deepsearch-highlight-hover"
              onClick={() => {
                openFunc();
              }}
            >
              <pre style={{ display: "inline", margin: 0 }}>
                <span className="deepsearch-lineno">{res.linenumber}</span>
                <span>
                  <Hightlighter
                    highlightClassName="deepsearch-highlight"
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
