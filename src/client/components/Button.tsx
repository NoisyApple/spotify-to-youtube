import React, { FunctionComponent, MouseEvent } from "react";

interface Props {
  children: JSX.Element | string;
  color?: string;
  onClick(e: MouseEvent<HTMLElement>): void;
  disabled?: boolean;
}

const Button: FunctionComponent<Props> = ({
  children,
  color = "#AAA",
  onClick,
  disabled = false,
}: Props) => {
  return (
    <button
      className="button"
      style={{ backgroundColor: color }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
