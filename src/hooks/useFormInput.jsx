import { useState } from "react";

export function useFormInput(initialValue, validateFn, requiredMessage) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const val = e.target.value;
    setValue(val);

    if (validateFn && !validateFn(val)) {
      setError(requiredMessage);
    } else {
      setError("");
    }
  };

  const onBlur = (e) => {
    const val = e.target.value;
    setValue(val);

    if (validateFn && !validateFn(val)) {
      setError(requiredMessage);
    } else {
      setError("");
    }
  };

  return {
    value,
    error,
    onChange,
    onBlur,
    setValue,
    setError,
  };
}