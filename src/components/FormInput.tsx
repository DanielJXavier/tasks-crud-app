import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";

import classNames from "classnames";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: boolean;
}

export const FormInput: FC<FormInputProps> = ({
  id,
  label,
  value,
  setValue,
  error = false,
  ...inputProps
}) => (
  <fieldset className="grid">
    <label
      className={classNames("text-[#7b7c7b]", {
        "text-red-400": error,
      })}
      htmlFor={id}
    >
      {label}
    </label>

    <input
      className={classNames(
        "px-2 py-1 text-[#7b7c7b] border border-[#e8e9e9] outline-none rounded-lg shadow-md",
        {
          "border-red-400": error,
          "hover:border-[#b1b2b2] focus:border-[#b1b2b2]": !error,
        }
      )}
      id={id}
      name={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...inputProps}
    />
  </fieldset>
);
