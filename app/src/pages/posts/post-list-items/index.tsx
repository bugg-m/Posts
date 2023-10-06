import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const PostListItems = ({ item }: any) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const resImage = cld.image(item.image.public_id);

  return (
    <div className="flex flex-col gap-5 p-5 h-[400px] w-full items-center bg-gray-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200">
      <div className="w-full flex justify-between">
        <div className="gap-2 flex justify-between">
          <div>Avatar</div>
          <div>Name</div>
        </div>
        <div>...</div>
      </div>
      <div className="flex justify-center items-center bg-white w-full rounded">
        <AdvancedImage
          className="object-fill w-full h-48 rounded border border-gray-300"
          cldImg={resImage}
          alt="Image"
        />
      </div>
      <div className="w-full flex justify-start">
        <div className="flex flex-col justify-between leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
            {item.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PostListItems;
