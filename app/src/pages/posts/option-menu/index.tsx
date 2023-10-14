import { useDispatch } from "react-redux";
import { Div, Ul } from "../../../common/constants/div";
import Li from "../../../common/constants/menu-li";
import { setShowOptionBar } from "../../../common/redux-utils/utils-slice/utilsSlice";

const OptionBar = (props: any) => {
  const dispatch = useDispatch();

  return (
    <Div id="grand" onClick={(e) => e.stopPropagation()}>
      <Ul className="w-52 text-sm">
        <Li name="Add to favourites" handleEvent={() => console.log("li1")} />
        <Li name="Go to post" handleEvent={() => console.log("li2")} />
        <Li name="Share to..." handleEvent={() => console.log("li3")} />
        <Li name="About this account" handleEvent={() => console.log("li4")} />
        <Li
          name="Cancel"
          handleEvent={() => {
            props.setPostId(null);
            dispatch(setShowOptionBar(false));
          }}
        />
      </Ul>
    </Div>
  );
};

export default OptionBar;