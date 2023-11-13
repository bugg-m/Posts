import { labelProps } from "../../types/types";

const Label = ({ title, className }: labelProps) => {
  return (
    <label
      className={` ${className} block mb-2 text-sm font-medium text-gray-700`}
    >
      {title}
    </label>
  );
};
export const Logo = ({ title, className }: labelProps) => {
  return (
    <label
      className={` ${className} self-center text-3xl font-bold whitespace-nowrap dark:text-gray-300 cursor-pointer`}
    >
      {title}
    </label>
  );
};

export default Label;
