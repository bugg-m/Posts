import { borderProps } from "../../types/types";

export const CustomBorder = ({
  className,
  width,
  color,
  intensity,
  side,
}: borderProps) => {
  return (
    <div
      className={`border-${side}-${width} border-${color}-${intensity}  ${className}`}
    ></div>
  );
};
