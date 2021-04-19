import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'danger'

type Props = {
  variant?: ButtonVariant,
  children?: ReactNode,
  onClick?: (event: MouseEvent) => void,
  className?: string,
}

const buttonColors: Record<ButtonVariant, string> =  {
  primary: "bg-blue-400 hover:bg-blue-600",
  danger: "bg-red-400 hover:bg-red-600",
};

export const Button: FunctionComponent<Props> = (props) => {
  const variant = props.variant == null ? 'primary' : props.variant;
  const color = buttonColors[variant];
  return (
    <button
      className={`${color} px-4 py-2 text-base font-semibold tracking-wider text-white rounded ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
};
