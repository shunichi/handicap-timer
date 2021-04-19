import React, { FunctionComponent, ChangeEvent } from 'react';
import { Alarm } from "../../State";
import { NumberInput } from "../input/NumberInput";
import "./AlarmForm.css";

type Props = {
  alarm: Alarm,
  label: string,
  onChange: (alarm: Alarm) => void,
}

export const AlarmForm: FunctionComponent<Props> = (props: Props) => {
  const { alarm } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let elapsed = 0;
    console.log("changed");
    if (event.currentTarget.value !== "") {
      const parsed = parseFloat(event.currentTarget.value);
      if (!isNaN(parsed)) {
        elapsed = parsed;
      }
    }
    props.onChange({ ...alarm, elapsedSeconds: elapsed, enabled: elapsed !== 0 });
  };

  return (
    <div className="my-4">
      <label className="text-base text-gray-600 wf-nikomoji">{props.label}</label>
      <NumberInput
        value={alarm.enabled ? alarm.elapsedSeconds : undefined}
        step="1"
        min="0.5"
        max="99"
        onChange={onChange}
      />
    </div>
  )
  // return (
  //   <input
  //     className="alarm-input"
  //     type="number"
  //     placeholder={`ハンデ秒数`}
  //     step="0.5"
  //     min="0.5"
  //     max="99"
  //     value={alarm.enabled ? alarm.elapsedSeconds : undefined}
  //     onChange={onChange}
  //   />
  // );
};
