import React from "react";
import Option from "../components/option";
import { withRouter } from "react-router-dom";
import { GetData } from "../data-context";

const Settings = (props) => {
  const { settings, setSettings, restoreSettings } = GetData();

  const { options, minValue, maxValue } = settings;

  const setValue = (option, flow, idx) => {
    let currentValue = settings[option];
    if (flow === "up") {
      if (currentValue < maxValue[idx]) currentValue++;
    } else {
      if (currentValue > minValue[idx]) currentValue--;
    }
    setSettings({ ...settings, [option]: currentValue });
  };

  const apply = () => {
    props.history.push("/players");
  };

  return (
    <div>
      <h1 className="mt-5 text-blink">FIGHT SETTINGS</h1>
      <div className="container rounded p-4 col-7 chart-bg">
        {options.map((option, idx) => {
          return (
            <Option
              key={idx}
              option={option}
              value={settings[option]}
              setValue={(flow) => setValue(option, flow, idx)}
            />
          );
        })}

        <div className="w-100 bg-dark text-center py-3 mt-2 mb-0">
          <button className="btn mx-5 p-0" onClick={apply}>
            <h3 className="settings-shadows">DONE!</h3>
          </button>
          <button className="btn mx-5 p-0" onClick={restoreSettings}>
            <h3 className="settings-shadows">RESTORE</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Settings);
