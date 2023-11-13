import { Input } from "../../constants/input-bar/Input_Box_Type";

const InputBar = ({ value, setValue }: any) => {
  return (
    <Input
      className="bg-gray-50 border border-gray-300 h-10 text-gray-700 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      type="text"
      name="description"
      placeholder="Search"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      required
    />
  );
};

export default InputBar;
