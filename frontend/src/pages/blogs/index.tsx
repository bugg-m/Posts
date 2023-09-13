import { useEffect, useState } from "react";
import { getBlogs } from "../../common/apis/todoServices";
import BlogListItems from "./blog-list-items/BlogListItems";

const BlogMain = () => {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    try {
      getBlogs()
        .then((res: any) => {
          console.log(res);
          const { success, tasks } = res;
          if (success) {
            setBlogList(tasks);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-full pt-10 min-h-screen dark:bg-gray-900 gap-10">
      <div className="flex flex-col gap-10 items-center justify-center py-20">
        <div className="w-40 h-10 px-3 py-2.5 dark:bg-gray-800 rounded border border-gray-700 flex items-center justify-center cursor-pointer">
          <div className="text-white font-semibold">
            <span>BLOGS</span>
          </div>
        </div>
        <div className="px-10 w-2/3 flex flex-col gap-5">
          {blogList?.map((item, index) => {
            return (
              <div key={index}>
                <BlogListItems item={item} id={index + 1} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogMain;
