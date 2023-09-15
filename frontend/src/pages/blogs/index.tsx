import { useEffect, useState } from "react";
import { getBlogs } from "../../common/apis/todoServices";
import BlogListItems from "./blog-list-items/BlogListItems";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BlogMain = () => {
  const [blogList, setBlogList] = useState([]);

  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showCreateBlog = useSelector((state: any) => state.showCreateBlog);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    try {
      getBlogs()
        .then((res: any) => {
          console.log(res);
          const { success, blogData } = res;
          if (success) {
            setBlogList(blogData);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`min-w-full ${
        showSignInPage || showCreateBlog ? "opacity-60 bg-gray-300" : ""
      } pt-10 min-h-screen bg-gray-50 gap-10`}
    >
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 gap-20 items-center justify-center py-20">
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
