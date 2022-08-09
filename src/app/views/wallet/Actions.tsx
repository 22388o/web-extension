import { PropsWithChildren } from "react";
import { FaArrowDown, FaArrowUp, FaQrcode } from "react-icons/fa";

import IconButton from "../../components/IconButton";

type ActionButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function ActionButton(props: PropsWithChildren<ActionButtonProps>) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <IconButton>{props.children}</IconButton>
      <div className="icon-button-label text-white font-medium">
        {props.label}
      </div>
    </div>
  );
}

export default function Actions() {
  return (
    <div className="flex justify-center gap-8">
      <ActionButton label="Send" onClick={() => console.log("send")}>
        <FaArrowUp color="rgba(35,37,38,1)" size="1.25rem" />
      </ActionButton>
      <ActionButton label="Scan" onClick={() => console.log("")}>
        <FaQrcode color="rgba(35,37,38,1)" size="1.25rem" />
      </ActionButton>
      <ActionButton label="Receive" onClick={() => console.log("send")}>
        <FaArrowDown color="rgba(35,37,38,1)" size="1.25rem" />
      </ActionButton>
    </div>
  );
}
