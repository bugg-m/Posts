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
      className={`w-full ${
        showSignInPage || showCreateBlog ? "opacity-10" : ""
      } pt-20 min-h-screen bg-gray-50`}
    >
      <div className="flex p-5 justify-center items-center">
        <div className="grid w-4/5 grid-cols-2 gap-20 py-5">
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
