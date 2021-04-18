import React, { FunctionComponent } from 'react';
import "./TouchArea.css";

type Props = {
  onClick: () => void,
}

export const TouchArea: FunctionComponent<Props> = (props: Props) => {
  return <div className="touch-area" onClick={props.onClick} />;
};
