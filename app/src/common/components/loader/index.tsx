const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full absolute z-50 ">
      <div className="animate-spin grid items-center justify-center">
        <div className="border-[5px] w-10 h-10  border-t-white border-white rounded-[50%]"></div>
      </div>
    </div>
  );
};

export default Loader;
