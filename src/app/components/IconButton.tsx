import { PropsWithChildren, ButtonHTMLAttributes } from "react";

export default function IconButton(
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
) {
  return (
    <button
      className="rounded-full bg-white flex items-center justify-center"
      style={{ height: 42, width: 42 }}
    >
      {props.children}
    </button>
  );
}
