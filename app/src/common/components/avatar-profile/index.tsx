import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { DiveMouseEvent, DivHoverText } from "../../constants/div";

const AvatarProfile = () => {
  const [showName, setShowName] = useState(false);
  const user = useSelector((state: any) => state.user);
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const cld = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const resImage = cld.image(user?.avatar?.public_id);

  if (!isAuthenticated) {
    return (
      <DiveMouseEvent
        onMouseOver={() => setShowName(true)}
        onMouseOut={() => setShowName(false)}
        className="text-5xl"
      >
        {showName ? (
          <DivHoverText bottom={7} right={0} className="">
            Profile
          </DivHoverText>
        ) : null}
        <FaCircleUser />
      </DiveMouseEvent>
    );
  }
  return (
    <DiveMouseEvent
      className=""
      onMouseOver={() => setShowName(true)}
      onMouseOut={() => setShowName(false)}
    >
      {showName ? (
        <DivHoverText right={3} className="" bottom={3}>
          {user.name}
        </DivHoverText>
      ) : null}
      <AdvancedImage
        className="object-fill w-10 h-10 cursor-pointer rounded-full border border-gray-300"
        cldImg={resImage}
        alt=""
      />
    </DiveMouseEvent>
  );
};

export default AvatarProfile;
