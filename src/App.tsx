import React, { FunctionComponent, useState } from 'react';
import './App.css';
import { TimerContainer } from "./components/containers/TimerContainer";
import { TouchArea } from "./components/presentational/TouchArea";
import { TimeGauge } from "./components/presentational/TimeGauge";
import { AlarmsForm } from "./components/presentational/AlarmsForm";
import { Button } from "./components/input/Button";
import { AppState, Alarm } from "./State";
import { getWebAudio } from "./lib/sound";
import { useAlarms } from "./lib/useAlarms";

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

type MainAreaProps = {
  appState: AppState,
  started: boolean,
  setAppAlarmed: (id: number) => void,
  onResetButton: () => void,
}

const MainArea: FunctionComponent<MainAreaProps> = (props: MainAreaProps) => {
  const { startTime, alarms } = props.appState;
  const { elapsedSeconds, gauge } = useAlarms({ startTime, alarms, onAlarmed: props.setAppAlarmed });

  return (<>
    <TimeGauge rate={gauge.rate} />
    <TimerContainer
      elapsedSeconds={elapsedSeconds}
    />
    <TouchArea onClick={props.onResetButton} />
  </>);
}

function App() {
  const [started, setStarted] = useState(false);
  const [appState, setAppState] = useState<AppState>(initialAppState());

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

  const buttonClassName = "block w-full";
  return (
    <div className="App">
      <div className="App-main bg-gray-100">
        {
          started ?
            <MainArea appState={appState} started={started} setAppAlarmed={setAppAlarmed} onResetButton={onResetButton} /> :
            <AlarmsForm alarms={appState.alarms} onChange={onAlarmChanged} />
        }
        <div className="fixed inset-y bottom-0 p-4 w-full">
          {
            started ?
              <Button variant="danger" className={buttonClassName} onClick={onStopButton}>停止</Button> :
              <Button variant="primary" className={buttonClassName} onClick={onResetButton}>開始</Button>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
