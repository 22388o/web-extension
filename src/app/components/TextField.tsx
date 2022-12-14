import { InputHTMLAttributes, PropsWithChildren } from "react";

type TextFieldProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField(props: TextFieldProps) {
  const { label, style, ...rest } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="textfield-label text-white">
        {label || rest.placeholder}
      </div>
      <input
        className="textfield-input border rounded border-grey py-2 px-2"
        style={Object.assign({ outline: "none" }, style)}
        {...props}
      />
    </div>
  );
}
