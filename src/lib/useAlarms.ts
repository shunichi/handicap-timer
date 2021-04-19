import { useState, useEffect } from 'react';
import { getWebAudio } from "./sound";
import { Alarm } from "../State";

type Props = {
  startTime: number;
  alarms: Alarm[],
  onAlarmed: (id: number) => void,
}

type Gauge = {
  time: number,
  rate: number,
}

const calcGaugeValue = (alarms: Alarm[], elapsedSeconds: number): Gauge => {
  const alarmSeconds = alarms
    .filter((alarm) => alarm.enabled && alarm.elapsedSeconds > 0)
    .map((alarm) => alarm.elapsedSeconds)
  const uniqueAlarmSeconds = [...new Set(alarmSeconds)].sort();
  uniqueAlarmSeconds.unshift(0);
  const passed = uniqueAlarmSeconds.filter((value) => value < elapsedSeconds)
  if (passed.length > 0 && passed.length < uniqueAlarmSeconds.length) {
    const startTime = uniqueAlarmSeconds[passed.length];
    const duration = uniqueAlarmSeconds[passed.length - 1] - startTime;
    const restSeconds = elapsedSeconds - startTime;
    return { time: restSeconds - startTime, rate: restSeconds / duration };
  } else {
    return { time: 0, rate: 0 };
  }
}

export const useAlarms = (props: Props) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0.0);
  const [gauge, setGauge] = useState<Gauge>({ time: 0, rate: 0 });
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

      setGauge(calcGaugeValue(alarms, newElapsedSeconds));
      setElapsedSeconds(newElapsedSeconds);
    }, 1000/60);

    return () => {
      console.log(`clearInterval ${startTime}`);
      clearInterval(timer);
    };
  }, [startTime, alarms, onAlarmed]);

  return { elapsedSeconds, gauge };
}
