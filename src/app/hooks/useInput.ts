import { useState, ChangeEvent, ChangeEventHandler, useCallback } from "react";

export default function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const clear = useCallback(() => setValue(""), []);

  return { value, onChange, clear };
}
