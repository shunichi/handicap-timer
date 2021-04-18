import React, { FunctionComponent, useState } from 'react';
import { Alarm } from "../../State";
import { AlarmForm } from "./AlarmForm";

type Props = {
  alarms: Alarm[],
  onChanged: (alarm: Alarm) => void,
}

export const AlarmsForm: FunctionComponent<Props> = (props: Props) => {
  const { alarms, onChanged } = props;
  return (<div>
    {
      alarms.map((alarm) => <AlarmForm key={alarm.id} alarm={alarm} onChanged={onChanged} />)
    }
  </div>)
};
