import React, { FunctionComponent, useState } from 'react';
import './App.css';
import { MainArea } from "./components/containers/MainArea";
import { AlarmsForm } from "./components/presentational/AlarmsForm";
import { Button } from "./components/input/Button";
import { AppState, Alarm } from "./State";
import { getWebAudio } from "./lib/sound";
import { isDebugMode } from "./lib/debugMode";

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

type DebugProps = {
  rate: number,
  timeGaugeEnabled: boolean,
  onRateChanged: (rate: number) => void,
  onCheckboxChanged: (value: boolean) => void,
}

const Debug: FunctionComponent<DebugProps> = (props: DebugProps) => {
  return (
    <>
      <div>{props.rate}</div>
      <div className="mb-3">
        <input
          type="range"
          min="0"
          max="1.0"
          step="0.05"
          value={props.rate}
          onChange={(e) => props.onRateChanged(parseFloat(e.currentTarget.value))}
        />
      </div>
      <label className="mb-4 block text-base">
        <input
          type="checkbox"
          checked={props.timeGaugeEnabled}
          onChange={(e) => props.onCheckboxChanged(e.currentTarget.checked)}
        />
        <span className="ml-2">時間ゲージ</span>
      </label>
    </>
  );
};

function App() {
  const [started, setStarted] = useState(false);
  const [appState, setAppState] = useState<AppState>(initialAppState());
  const [rate, setRate] = useState(0.5);
  const [timeGaugeEnabled, setTimeGaugeEnabled] = useState(true);

  const onResetButton = () => {
    setStarted(true);
    setAppState(resetAppState(appState));
  };

  const onStopButton = () => {
    setStarted(false);
  }

  const setAppAlarmed = (id: number): void => setAppState(onAlarmed(appState, id));
  const onAlarmChanged = (newAlarm: Alarm): void => {
    const { elapsedSeconds, enabled } = newAlarm;
    const alarms = appState.alarms.map((alarm) => {
      if (newAlarm.id === alarm.id) {
        return { ...alarm, elapsedSeconds, enabled };
      } else {
        return alarm;
      }
    });
    setAppState({ ...appState, alarms });
  };

  const buttonClassName = "block w-full wf-nikomoji text-xl";
  return (
    <div className="App">
      <div className="App-main bg-gray-100">
        {
          started ?
            <MainArea
              appState={appState}
              started={started}
              setAppAlarmed={setAppAlarmed}
              onResetButton={onResetButton}
              rate={rate}
              timeGaugeEnabled={timeGaugeEnabled}
            />
            :
            <AlarmsForm alarms={appState.alarms} onChange={onAlarmChanged} />
        }
        <div className="fixed inset-y bottom-0 p-4 App-bottom">
          {
            isDebugMode() &&
            <Debug
              rate={rate}
              timeGaugeEnabled={timeGaugeEnabled}
              onRateChanged={(value) => setRate(value)}
              onCheckboxChanged={(value) => setTimeGaugeEnabled(value)}
            />
          }
          {
            started ?
              <Button variant="danger" className={buttonClassName} onClick={onStopButton}>トメル</Button> :
              <Button variant="primary" className={buttonClassName} onClick={onResetButton}>ハジメル</Button>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
