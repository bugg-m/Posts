import { divProps } from "../../types/types";

const DivFlex = ({ className, children }: divProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      {children}
    </div>
  );
};

export default DivFlex;
