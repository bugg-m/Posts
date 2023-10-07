import { divAbsoluteProps, divBaseProps } from "../../types/types";
import { divProps } from "../../types/types";
import { divMOverOutProps } from "../../types/types";
import { divHoverProps } from "../../types/types";

export const Div = ({ className, children }: divBaseProps) => {
  return <div className={`${className} `}>{children}</div>;
};

export const DivFlex = ({ className, children, justify }: divProps) => {
  return (
    <div className={`flex justify-${justify} items-center  ${className}`}>
      {children}
    </div>
  );
};
export const DivAbsolute = ({ className, children }: divAbsoluteProps) => {
  return (
    <div
      className={`${className}  absolute duration-300 min-h-screen w-full border-r-4 dark:bg-gray-900 p-4 pt-20`}
    >
      {children}
    </div>
  );
};

export const DivHoverText = ({
  children,
  className,
  right,
  bottom,
}: divHoverProps) => {
  return (
    <div
      className={`absolute min-w-[100px] right-${right} flex justify-center items-center -bottom-${bottom} p-1 bg-black/80 text-gray-50 rounded-md  text-xs ${className}`}
    >
      {children}
    </div>
  );
};

export const DiveMouseEvent = ({
  children,
  className,
  onMouseOut,
  onMouseOver,
}: divMOverOutProps) => {
  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`${className} w-10 h-10 cursor-pointer relative flex justify-center items-center text-gray-700 rounded-full border border-gray-300`}
    >
      {children}
    </div>
  );
};

export const Ul = ({ children, className }: divBaseProps) => {
  return (
    <ul
      className={`${className} font-medium w-full h-80 gap-10 p-4 mt-20 border border-gray-100 bg-gray-800 rounded-lg`}
    >
      {children}
    </ul>
  );
};
