import { divProps } from "../../types/types";

const DivSpaceBetween = ({ className, children }: divProps) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {children}
    </div>
  );
};

export default DivSpaceBetween;
