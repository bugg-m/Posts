import { useEffect, useState } from "react";
import { getAllBlogs } from "../../common/apis/blogServices";
import BlogListItems from "./blog-list-items/BlogListItems";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BlogMain = () => {
  const [blogList, setBlogList] = useState([{}]);

  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showCreateBlog = useSelector((state: any) => state.showCreateBlog);
  const refreshBlogList = useSelector((state: any) => state.refreshBlogList);

  useEffect(() => {
    getAllBlog();
  }, [refreshBlogList]);

  const getAllBlog = () => {
    try {
      getAllBlogs()
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
        showSignInPage || showCreateBlog || showSignUpPage ? "opacity-10" : ""
      } pt-20 min-h-screen bg-gray-50`}
    >
      <div className="flex p-5 justify-center items-center">
        <div className="grid w-4/5 grid-cols-2 gap-20 py-5">
          {blogList?.map((item, index) => {
            return (
              <div key={index}>
                <BlogListItems item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogMain;
