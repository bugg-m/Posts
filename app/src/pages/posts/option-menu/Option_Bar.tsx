import { Div, Ul } from "../../../common/constants/div/Div";
import Li from "../../../common/constants/menu-li/Menu_Li";

const OptionBar = (props: any) => {
  return (
    <Div id="grand" onClick={(e) => e.stopPropagation()}>
      <Ul className="w-52 text-sm">
        <Li name="Add to favourites" handleEvent={() => console.log("li1")} />
        <Li name="Go to post" handleEvent={() => console.log("li2")} />
        <Li name="Share to..." handleEvent={() => console.log("li3")} />
        <Li name="About this account" handleEvent={() => console.log("li4")} />
        <Li name="Cancel" handleEvent={() => props.setShowOptionBar(false)} />
      </Ul>
    </Div>
  );
};

export default OptionBar;
