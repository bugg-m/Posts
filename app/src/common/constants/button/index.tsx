const Button = ({
  className,
  disabled,
  type,
  children,
  onClick,
}: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${className} h-10 border border-gray-700 text-white bg-blue-700 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center `}
    >
      {children}
    </button>
  );
};
export const TextButton = ({
  className,
  disabled,
  type,
  children,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...props}
      className={`${className} font-medium text-primary-600 hover:underline dark:text-primary-500`}
    >
      {children}
    </button>
  );
};

export default Button;
