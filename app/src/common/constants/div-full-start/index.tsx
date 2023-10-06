import { divProps } from "../../types/types";

const DivFullStart = ({ className, children }: divProps) => {
  return (
    <div className={`w-full flex justify-start items-center ${className}`}>
      {children}
    </div>
  );
};
export const DivCustomStart = ({ className, children }: divProps) => {
  return (
    <div className={`flex justify-start items-center ${className}`}>
      {children}
    </div>
  );
};

export default DivFullStart;
