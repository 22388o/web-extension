import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = {
  variant?: "primary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const { variant, className, ...rest } = props;
  return (
    <button
      className="rounded bg-btn-primary-bg text-btn-primary-text w-full px-4 py-2 uppercase font-bold"
      {...rest}
    ></button>
  );
}
