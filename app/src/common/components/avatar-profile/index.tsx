import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";

const AvatarProfile = () => {
  const [showName, setShowName] = useState(false);
  const user = useSelector((state: any) => state.user);
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const cld = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const resImage = cld.image(user?.avatar?.public_id);

  if (!isAuthenticated) {
    return (
      <div
        onMouseOver={() => setShowName(true)}
        onMouseOut={() => setShowName(false)}
        className="w-10 h-10 cursor-pointer relative flex justify-center items-center text-gray-700 rounded-full border border-gray-300 text-5xl"
      >
        {showName ? (
          <div className="absolute -bottom-7 p-1 bg-black/80 text-gray-50 rounded-md  text-xs">
            Profile
          </div>
        ) : null}
        <FaCircleUser />
      </div>
    );
  }
  return (
    <div
      onMouseOver={() => setShowName(true)}
      onMouseOut={() => setShowName(false)}
    >
      {showName ? (
        <div className="absolute min-w-[100px] right-3 flex justify-center items-center -bottom-3 p-1 bg-black/80 text-gray-50 rounded-md  text-xs">
          {user.name}
        </div>
      ) : null}
      <AdvancedImage
        className="object-fill w-10 h-10 cursor-pointer rounded-full border border-gray-300"
        cldImg={resImage}
        alt=""
      />
    </div>
  );
};

export default AvatarProfile;
