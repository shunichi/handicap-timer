import React, { FunctionComponent } from 'react';
import { TimerContainer } from "./TimerContainer";
import { TouchArea } from "../presentational/TouchArea";
import { TimeGauge } from "../presentational/TimeGauge";
import { useAlarms } from "../../lib/useAlarms";
import { AppState } from "../../State";

type MainAreaProps = {
  appState: AppState,
  started: boolean,
  setAppAlarmed: (id: number) => void,
  onResetButton: () => void,
  rate: number,
  timeGaugeEnabled: boolean,
}

export const MainArea: FunctionComponent<MainAreaProps> = (props: MainAreaProps) => {
  const { startTime, alarms } = props.appState;
  const { gauge } = useAlarms({ startTime, alarms, onAlarmed: props.setAppAlarmed });

  const rate = props.timeGaugeEnabled ? gauge.rate : props.rate;
  return (<>
    <TimeGauge rate={rate}>
      <TimerContainer
        value={gauge.time}
      />
    </TimeGauge>
    <TouchArea onClick={props.onResetButton} />
  </>);
}
