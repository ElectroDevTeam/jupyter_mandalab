import React, { useState } from "react";
import {
  FaWindows,
  FaLinux,
  FaRegQuestionCircle,
  FaLock,
  FaLockOpen,
  FaCircle,
  FaRegCircle
} from "react-icons/fa";

interface SearchResultProps {
  name: string;
  owner: string;
  os: string;
  isLocked: boolean;
  isPoweredOn: boolean;
  addMachineFunction: Function;
}

const SearchResult: React.SFC<SearchResultProps> = ({
  name,
  owner,
  os,
  isLocked,
  isPoweredOn,
  addMachineFunction
}) => {
  const getOsLogoComponent = () => {
    // TODO: Change to switch case
    if (os.toLowerCase() === "windows") {
      return <FaWindows />;
    } else if (os.toLowerCase() === "linux") {
      return <FaLinux />;
    } else {
      return <FaRegQuestionCircle />;
    }
  };

  const getLockLogoComponent = () => {
    if (isLocked) {
      return <FaLock />;
    } else {
      return <FaLockOpen />;
    }
  };

  const getPowerLogoComponent = () => {
    if (isPoweredOn) {
      return <FaCircle style={{ color: "green" }} />;
    } else {
      return <FaRegCircle  style={{ color: "grey" }}/>;
    }
  };

  return (
    <div 
      className="jupyter-mandalab-searchresult noselect"
      onDoubleClick={(e) => {addMachineFunction();}}
    >
      <div
        style={{
          overflow: "hidden"
        }}
      >
        <div
          className="jupyter-mandalab-searchresult-details jupyter-mandalab-highlight-hover"
        >
          <span
            style={{
              flexBasis: '5%',
              marginTop: '0.35em',
            }}
          >{getOsLogoComponent()}</span>
          <span
            style={{
              flexBasis: '60%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >{name}</span>
          <span
            style={{
              flexBasis: '20%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              backgroundColor: '#333333',
              padding: '0.1em 0.3em',
              borderRadius: '1em',
              textAlign: 'center',
              color: '#c3c3c3'
            }}
          >
            {owner}
          </span>
          <span
            style={{
              flexBasis: '5%'
            }}
          >{getLockLogoComponent()}</span>
          <span
            style={{
              flexBasis: '5%'
            }}
          >{getPowerLogoComponent()}</span>
        </div>
      </div>
    </div>
  );
};


export default SearchResult;
