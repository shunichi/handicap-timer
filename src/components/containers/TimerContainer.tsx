import React, { FunctionComponent } from 'react';
import { Timer } from "../presentational/Timer";
import { TouchMe } from "../presentational/TouchMe";

type Props = {
  value: number,
};

export const TimerContainer: FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <Timer elapsedSeconds={props.value} alarmed={false} />
      <TouchMe />
    </div>
  );
}
