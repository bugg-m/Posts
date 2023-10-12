import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Div, DivFlex } from "../../../common/constants/div";
import TextField from "../../../common/constants/text-header";

const PostListItems = ({ item }: any) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const resImage = cld.image(item.image.public_id);

  return (
    <DivFlex
      justify="normal"
      className="flex-col gap-5 p-5 h-[400px] w-full bg-gray-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200"
    >
      <DivFlex justify="between" className="w-full">
        <DivFlex justify="between" className="gap-2">
          <Div>Avatar</Div>
          <Div>Name</Div>
        </DivFlex>
        <Div>...</Div>
      </DivFlex>
      <DivFlex justify="center" className="bg-white w-full rounded">
        <AdvancedImage
          className="object-fill w-full h-48 rounded border border-gray-300"
          cldImg={resImage}
          alt="Image"
        />
      </DivFlex>
      <DivFlex justify="start" className="w-full">
        <DivFlex justify="between" className="flex-col leading-normal">
          <TextField className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
            {item.title}
          </TextField>
          <TextField className="mb-3 font-normal text-gray-700">
            {item.description}
          </TextField>
        </DivFlex>
      </DivFlex>
    </DivFlex>
  );
};

export default PostListItems;
