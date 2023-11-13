export const Input = ({
  className,
  placeholder,
  type,
  name,
  value,
  onChange,
  ...props
}: React.ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      className={`${className} bg-gray-100 border text-gray-700 border-gray-300 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  );
};
export const CommenBox = ({
  className,
  placeholder,
  type,
  name,
  value,
  onChange,
  ...props
}: React.ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      className={`${className} bg-transparent h-5 w-full outline-none`}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  );
};

export const CheckBox = ({
  className,
  type = "checkbox",
  name,
}: React.ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      name={name}
      id="remember"
      aria-describedby="remember"
      type={type}
      className={`${className} w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800`}
    />
  );
};
export const TextArea = ({
  className,
  name,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) => {
  return (
    <textarea
      name={name}
      {...props}
      className={`${className}bg-gray-100 border border-gray-300 text-gray-700 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    />
  );
};
