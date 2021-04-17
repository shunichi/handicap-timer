import React, { FunctionComponent } from 'react';
import "./Timer.css";

type Props = {
  elapsedSeconds: number,
  alarmed: boolean,
};

const fomratSeconds = (seconds: number): string => {
  const frac = `00${Math.floor(seconds * 100).toString()}`.slice(-2);
  return `${Math.floor(seconds).toString()}.${frac}`;
}

export const Timer: FunctionComponent<Props> = (props: Props) => {
  return (<div className={`elapsed-time ${props.alarmed ? "alarmed" : ""}`}>
    {fomratSeconds(props.elapsedSeconds)}
  </div>);
};
