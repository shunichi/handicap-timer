import React, { FunctionComponent } from 'react';
import { Alarm } from "../../State";
import { AlarmForm } from "./AlarmForm";

type Props = {
  alarms: Alarm[],
  onChange: (alarm: Alarm) => void,
}

export const AlarmsForm: FunctionComponent<Props> = (props: Props) => {
  const { alarms, onChange } = props;
  return (<div className="px-4">
    <div className="text-4xl md:text-8xl mb-8 wf-nikomoji">ハンデタイマー</div>
    {
      alarms.map((alarm) => <AlarmForm key={alarm.id} label={`ハンデ (ビョウ)`} alarm={alarm} onChange={onChange} />)
    }
  </div>)
};
