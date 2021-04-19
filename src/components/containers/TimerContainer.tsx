import React, { FunctionComponent } from 'react';
import { Timer } from "../presentational/Timer";
import { TouchMe } from "../presentational/TouchMe";

type Props = {
  elapsedSeconds: number,
};

export const TimerContainer: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Timer elapsedSeconds={props.elapsedSeconds} alarmed={false} />
      <TouchMe />
    </>
  );
}
