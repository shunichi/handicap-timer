import React, { FunctionComponent } from 'react';

type Props = {
};

export const TouchMe: FunctionComponent<Props> = (props: Props) => {
  return (<div className="text-lg text-gray-600 wf-nikomoji">
    タッチでリセット
  </div>);
};
