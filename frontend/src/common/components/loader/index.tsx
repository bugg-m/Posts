const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full absolute z-50 ">
      <div className="animate-spin grid items-center justify-center">
        <div className="border-[5px] w-20 h-20  border-t-indigo-950 border-white rounded-[50%]"></div>
      </div>
    </div>
  );
};

export default Loader;
