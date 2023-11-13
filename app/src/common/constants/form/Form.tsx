import { formProps } from "../../types/types";

const Form = ({ encType, children, className, method }: formProps) => {
  return (
    <Form
      encType={encType}
      className={`${className} space-y-4 md:space-y-6`}
      method={method}
    >
      {children}
    </Form>
  );
};

export default Form;
