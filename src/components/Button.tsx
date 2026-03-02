// react
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  enabled?: boolean;
  onClick?: () => void;
};

export default function Button({ enabled, label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className={`h-11 w-full rounded-md text-[16px] text-white ${
        enabled ? "bg-[#2c4be2]" : "bg-[#808080]"
      } cursor-pointer disabled:cursor-not-allowed disabled:bg-[#808080]`}
    >
      {label}
    </button>
  );
}
