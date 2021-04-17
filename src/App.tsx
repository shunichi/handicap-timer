import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TimerContainer } from "./components/containers/TimerContainer";
import { AppState } from "./State";
import { getWebAudio } from "./lib/sound";

const initialAppState = (): AppState => {
  return {
    startTime: new Date().getTime(),
    alarms: [
      {
        id: 1,
        elapsedSeconds: 3.0,
        alarmed: false,
        enabled: true,
      },
      {
        id: 2,
        elapsedSeconds: 6.0,
        alarmed: false,
        enabled: false,
      },
    ]
  };
}

const resetAppState = (state: AppState): AppState => {
  // ユーザー操作のあったタイミングでAudioの初期化をしないと音が出せない
  getWebAudio();
  return {
    startTime: new Date().getTime(),
    alarms: state.alarms.map((alarm) => ({ ...alarm, alarmed: false })),
  };
};

const onAlarmed = (state: AppState, id: number): AppState => {
  return {
    ...state,
    alarms: state.alarms.map((alarm) => {
      if (alarm.id === id) {
        return {
          ...alarm,
          alarmed: true,
        };
      } else{
        return alarm;
      }
    }),
  }
}

function App() {
  const [started, setStarted] = useState(false);
  const [appState, setAppState] = useState<AppState>(initialAppState());

  const onResetButton = () => {
    setStarted(true);
    setAppState(resetAppState(appState));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          started &&
          <TimerContainer
            startTime={appState.startTime}
            alarms={appState.alarms}
            onAlarmed={(id: number) => setAppState(onAlarmed(appState, id))}
          />
        }
        <button className="reset-button" onClick={onResetButton}>{started ? "リセット" : "開始"}</button>
      </header>
    </div>
  );
}

export default App;
