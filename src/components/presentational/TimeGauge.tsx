import React, { FunctionComponent } from 'react';

type Props = {
  rate: number,
}

export const TimeGauge: FunctionComponent<Props> = (props: Props) => {
  const radius = 45;
  const total = 45 * Math.PI * 2;
  const current = total * props.rate;
  const style = { width: "80vmin", height: "80min", transform: "rotate(270deg)" };
  return (
    <div style={style} className="absolute">
      {
        props.rate > 0 &&
        <svg id="meter" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle r={radius} cx="50%" cy="50%" stroke="#EF4444" strokeWidth="5" fill="none" strokeDasharray={`${current} ${total}`} strokeLinecap="round"></circle>
        </svg>
      }
    </div>
  )
};
