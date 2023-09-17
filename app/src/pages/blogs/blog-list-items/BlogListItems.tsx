// import {} from "../../../../src/"

const BlogListItems = ({ item }: any) => {
  // console.log(item);

  return (
    <div className="flex gap-5 p-5 h-80 items-center bg-gray-50 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200">
      <div className="w-1/3 border border-gray-300 rounded">
        <img
          className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={`images/${item.image}`}
          alt=""
        />
      </div>
      <div className="flex flex-col w-full justify-between leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
          {item.title}{" "}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{item.description}</p>
      </div>
    </div>
  );
};

export default BlogListItems;
