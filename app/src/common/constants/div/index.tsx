import { divSwipeProps } from "../../types/types";
import { divProps } from "../../types/types";
import { divMOverOutProps } from "../../types/types";

export const Div = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div {...props} className={`${className} `}>
      {children}
    </div>
  );
};

export const DivFlex = ({
  className,
  children,
  justify,
  items,
  ...props
}: divProps) => {
  return (
    <div
      className={`flex justify-${justify} items-${
        items ? items : "center"
      }  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export const DivAbsolute = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={`${className}  absolute duration-300 min-h-screen w-full border-r-4 dark:bg-gray-900 p-4 pt-20`}
    >
      {children}
    </div>
  );
};
export const DivSwipe = ({
  className,
  children,
  handleEvent,
  ...props
}: divSwipeProps) => {
  return (
    <div
      {...props}
      onClick={handleEvent}
      className={`${className}  p-10 min-w-[500px] relative pt-36 min-h-screen bg-gray-300 border-r-4 border-gray-400`}
    >
      {children}
    </div>
  );
};

export const Ul = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) => {
  return (
    <ul
      {...props}
      className={`${className} font-medium w-full gap-10 p-4 mt-20 border border-gray-100 bg-gray-800 rounded-lg`}
    >
      {children}
    </ul>
  );
};

export const DivHoverText = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={`absolute min-w-[100px] flex justify-center items-center p-1 bg-black/80 text-gray-50 rounded-md  text-xs ${className}`}
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
  ...props
}: divMOverOutProps) => {
  return (
    <div
      {...props}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`${className} w-10 h-10 bg-white cursor-pointer relative flex justify-center items-center text-gray-700 rounded-full border border-green-700`}
    >
      {children}
    </div>
  );
};
