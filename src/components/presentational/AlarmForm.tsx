import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { Alarm } from "../../State";
import "./AlarmForm.css";

type Props = {
  alarm: Alarm,
  onChanged: (alarm: Alarm) => void,
}

export const AlarmForm: FunctionComponent<Props> = (props: Props) => {
  const { alarm } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let elapsed = 0;
    if (event.currentTarget.value) {
      try {
        elapsed = parseInt(event.currentTarget.value)
      } catch {
      }
    }
    props.onChanged({ ...alarm, elapsedSeconds: elapsed, enabled: elapsed !== 0 });
  };
  return (
    <input
      className="alarm-input"
      type="number"
      placeholder={`ハンデ秒数`}
      step="0.5"
      min="0.5"
      max="99"
      value={alarm.enabled ? alarm.elapsedSeconds : undefined}
      onChange={onChange}
    />
  );
};
