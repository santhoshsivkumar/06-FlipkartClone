import React from "react";

type InputFieldProps = {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const StyledInputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full ">
      {" "}
      <input
        value={value}
        type={type}
        name={name}
        className={`w-full py-2 px-4 theme_text outline-none border-b-[1px] theme_border ${
          error ? "border-red-500" : "border-gray-500"
        }`}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default StyledInputField;
