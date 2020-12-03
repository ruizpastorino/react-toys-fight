import React, { useState } from "react";
import { useEffect } from "react";
import createPlayers from "./components/players-data";

const dataContext = React.createContext();

const { Provider } = dataContext;

const DataProvider = ({ children }) => {
  const [settings, setSettings] = useState(initSettings);
  const [playerOne, setPlayerOne] = useState(createPlayers()[0]);
  const [playerTwo, setPlayerTwo] = useState(createPlayers()[1]);
  useEffect(() => {
  }, []);

  const restoreSettings = () => setSettings(initSettings);

  return <Provider value={{ settings, playerOne, playerTwo,setPlayerOne,setPlayerTwo, setSettings, restoreSettings }}>{children}</Provider>;
};

const initSettings = {
  rounds: 3,
  time: 50,
  handicap: 3,
  recovery: 3,
  speed: 3,
  options: ["rounds", "time", "handicap", "recovery", "speed"],
  minValue: [1, 10, 1, 1, 1],
  maxValue: [7, 99, 10, 7, 5],
};

export const GetData = () => React.useContext(dataContext);

export default DataProvider;
