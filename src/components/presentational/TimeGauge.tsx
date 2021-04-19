import React, { FunctionComponent, ReactNode } from 'react';
import "./TimeGauge.css";

type Props = {
  rate: number,
  children?: ReactNode,
}

export const TimeGauge: FunctionComponent<Props> = (props: Props) => {
  const radius = 45;
  const total = 45 * Math.PI * 2;
  const current = total * props.rate;
  return (
    <div className="absolute time-gauge-container flex justify-center items-center">
      <div className="time-gauge-rotation absolute inset-0">
        {
          props.rate > 0 &&
          <svg id="meter" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle r={radius} cx="50%" cy="50%" stroke="#EF4444" strokeWidth="5" fill="none" strokeDasharray={`${current} ${total}`} strokeLinecap="round"></circle>
          </svg>
        }
      </div>
      <div className="time-gauge-inner flex justify-center items-center">
        {props.children}
      </div>
    </div>
  )
};
