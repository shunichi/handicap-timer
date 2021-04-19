import React, { FunctionComponent } from 'react';

type Props = {
};

export const TouchMe: FunctionComponent<Props> = (props: Props) => {
  return (<div className="text-lg text-gray-600">
    タッチでリセット
  </div>);
};
