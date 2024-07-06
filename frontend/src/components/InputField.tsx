import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  error?: string;
  options?: string[];
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
}) => {
  return (
    <div
      className={`theme rounded-md p-4 h-28 ${
        name === "productDescription" && "h-[14.5rem] row-span-2 p-4"
      }`}
    >
      <label className="block text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      {name === "productDescription" ? (
        <textarea
          value={value}
          name={name}
          className={`w-full py-2 px-4 border theme_text theme_search theme_border rounded-md focus:outline-none focus:ring-2 focus:ring-dynamic ${
            error ? "border-red-500" : ""
          }`}
          placeholder={label}
          onChange={onChange}
          style={{ minHeight: "150px", maxHeight: "400px", resize: "vertical" }} // Adjust height here
        />
      ) : name === "category" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full py-2 px-4 border theme_text theme_search theme_border rounded-md focus:outline-none focus:ring-2 focus:ring-dynamic ${
            error ? "border-red-500" : ""
          }`}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      ) : (
        <input
          value={value}
          type="text"
          name={name}
          className={`w-full py-2 px-4 border theme_text theme_search theme_border rounded-md focus:outline-none focus:ring-2 focus:ring-dynamic ${
            error ? "border-red-500" : ""
          }`}
          placeholder={label}
          onChange={onChange}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
