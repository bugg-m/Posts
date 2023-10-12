import React from "react";

const TextField = ({ className, children }: React.ComponentProps<"label">) => {
  return <span className={`${className} text-gray-200`}>{children}</span>;
};

export default TextField;
