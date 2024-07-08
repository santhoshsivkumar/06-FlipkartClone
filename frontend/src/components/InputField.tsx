import React from "react";

type InputFieldProps = {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  error?: string;
  options?: string[] | { value: string; label: string }[];
  disabled?: boolean;
  placeholder?: string;
  inputFor?: string;
  type?: string;
  isTextarea?: boolean;
  isSelect?: boolean;
  fixHeight?: boolean;
  fullSpan?: boolean;
  fixHeightForTextArea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  disabled = false,
  placeholder = label,
  fixHeight,
  isTextarea,
  isSelect,
  type,
  fullSpan,
  fixHeightForTextArea,
}) => {
  const isRadio = Array.isArray(options); // Determine if options is an array

  return (
    <div
      className={`theme rounded-md p-4 ${!fixHeight && "h-28"} ${
        isTextarea && "h-[14.5rem] row-span-2 p-4"
      } ${fullSpan && "col-span-full "} ${fixHeightForTextArea && " h-full"}`}
    >
      {label && (
        <label className="block text-sm font-bold mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      {isTextarea ? (
        <textarea
          value={value}
          name={name}
          className={`w-full py-2 px-4 border theme_text theme_search theme_border rounded-md focus:outline-none focus:ring-2 focus:ring-dynamic ${
            error ? "border-red-500" : ""
          }`}
          placeholder={label || placeholder}
          onChange={onChange}
          style={{ minHeight: "150px", maxHeight: "400px", resize: "vertical" }}
        />
      ) : isSelect ? (
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
            (options as { value: string; label: string }[]).map(
              (option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              )
            )}
        </select>
      ) : isRadio ? (
        <div className="flex gap-4 ">
          {(options as { value: string; label: string }[]).map(
            (option, index) => (
              <div key={index} className="flex items-center">
                <label
                  htmlFor={`${name}_${index}`}
                  className={`text-md items-center pt-2 flex ${
                    disabled ? "text-gray-500 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={`${name}_${index}`}
                    name={name}
                    value={option.value}
                    checked={option.value === value}
                    onChange={onChange}
                    className={`mr-2 size-4 ${
                      disabled ? "cursor-not-allowed" : ""
                    }`}
                    disabled={disabled}
                  />
                  {option.label}
                </label>
              </div>
            )
          )}
        </div>
      ) : (
        <input
          value={value}
          type={type}
          name={name}
          className={`w-full py-2 px-4 ${
            disabled ? "text-gray-500 cursor-not-allowed" : ""
          } border theme_text theme_search theme_border rounded-md focus:outline-none focus:ring-2 focus:ring-dynamic ${
            error ? "border-red-500" : ""
          }`}
          placeholder={label || placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
