import React, { FunctionComponent, useState, useEffect } from 'react';
import { Timer } from "../presentational/Timer";
import { TouchMe } from "../presentational/TouchMe";
import { getWebAudio } from "../../lib/sound";
import { Alarm } from "./../../State";

type Props = {
  startTime: number,
  alarms: Alarm[],
  onAlarmed: (id: number) => void,
};

export const TimerContainer: FunctionComponent<Props> = (props: Props) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0.0);
  const { startTime, alarms, onAlarmed } = props;

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const newElapsedSeconds = (currentTime - startTime) / 1000.0;
      let alarmed = false;
      alarms.forEach((alarm) => {
        if (alarm.enabled && !alarm.alarmed && alarm.elapsedSeconds <= newElapsedSeconds) {
          onAlarmed(alarm.id);
          alarmed = true;
        }
      })
      if (alarmed) {
        getWebAudio().play("beep");
      }

      setElapsedSeconds(newElapsedSeconds);
    }, 1000/60);

    return () => {
      console.log(`clearInterval ${startTime}`);
      clearInterval(timer);
    };
  }, [startTime, alarms, onAlarmed]);

  return (
    <>
      <Timer elapsedSeconds={elapsedSeconds} alarmed={false} />
      <TouchMe />
    </>
  );
}
