import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const BlogListItems = ({ image, title, description }: any) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const resImage = cld.image(image.public_id);

  return (
    <div className="flex gap-5 p-5 h-80 w-full items-center bg-gray-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200">
      <div className="flex justify-center items-center w-2/5 h-72">
        <AdvancedImage
          className="object-cover w-fit rounded border border-gray-300"
          cldImg={resImage}
          alt="Image"
        />
      </div>
      <div className="flex flex-col justify-between leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default BlogListItems;
