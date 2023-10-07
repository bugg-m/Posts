import { divBaseProps } from "../../types/types";

const TextField = ({ className, children }: divBaseProps) => {
  return <span className={`${className} text-gray-200`}>{children}</span>;
};

export default TextField;
