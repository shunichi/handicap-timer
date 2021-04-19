import React, { FunctionComponent, ChangeEvent, FormEvent, useRef } from 'react';
import { toNumberOrDefault, toNumberOrUndefined, clampValue } from '../../lib/number';
import './NumberInput.css'

type Props = {
  value?: number | string,
  min?: number | string,
  max?: number | string,
  step?: number | string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  onInput?: (event: FormEvent<HTMLInputElement>) => void,
}

export const NumberInput: FunctionComponent<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onButton = (addition: number) => {
    if (inputRef.current == null) return;

    const currentValue = parseFloat(inputRef.current.value)
    let newValue;
    if (isNaN(currentValue)) {
      newValue = '1';
    } else {
      const nextValue = currentValue + addition * (toNumberOrDefault(props.step, 1) || 1)
      newValue = clampValue(nextValue, toNumberOrUndefined(props.min), toNumberOrUndefined(props.max)).toString();
    }

    if (inputRef.current.value !== newValue) {
      inputRef.current.value = newValue;
      // hack https://github.com/facebook/react/issues/11488
      (inputRef.current as any)._valueTracker.setValue('');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  return (
    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
      <button
        className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        onClick={() => onButton(-1)}
      >
        <span className="m-auto text-2xl font-thin ">−</span>
      </button>
      <input
        type="number"
        ref={inputRef}
        className="hide-spin-button outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
        name="custom-input-number"
        value={props.value == null ? '' : props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange}
      />
      <button
        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        onClick={() => onButton(1)}
      >
        <span className="m-auto text-2xl font-thin select-none">+</span>
      </button>
  </div>
  )
}
