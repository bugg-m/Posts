import { inputFileProps } from "../../types/types";

const InputFile = ({
  className,
  placeholder,
  type,
  name,
  value,
  required,
  handleEvent,
}: inputFileProps) => {
  return (
    <input
      className={`${className} bg-gray-100 border text-gray-700 border-gray-300 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      name={name}
      type={type}
      value={value.filename}
      placeholder={placeholder}
      onChange={handleEvent}
      required={required}
    />
  );
};

export default InputFile;