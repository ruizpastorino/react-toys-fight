import React from "react";

const Option = (props) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-between align-items-center">
        <h2 className="settings-shadows text-uppercase">{props.option}</h2>
        <div className="d-flex flex-row align-items-center">
          <h2 className="text-warning settings-shadows">{props.value}</h2>
          <div className="ml-3">
            <button className="btn p-0 m-0 text-light d-block" onClick={() => props.setValue("up")}>
              <span className="settings-shadows">▲</span>
            </button>
            <button className="btn p-0 m-0 text-light d-block" onClick={() => props.setValue("down")}>
              <span className="settings-shadows">▼</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option;
