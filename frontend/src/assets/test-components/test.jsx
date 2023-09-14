import hill1 from "../assets/images/hill1.png";
import hill2 from "../assets/images/hill2.png";
import hill3 from "../assets/images/hill3.png";
import hill4 from "../assets/images/hill4.png";
import hill5 from "../assets/images/hill5.png";
import leaf from "../assets/images/leaf.png";
import plant from "../assets/images/plant.png";
import tree from "../assets/images/tree.png";

const text = document.getElementById("text");
const hillImg1 = document.getElementById("hillImg1");
const hill2Img = document.getElementById("hillImg2");
const hill3Img = document.getElementById("hillImg3");
const hill4Img = document.getElementById("hillImg4");
const hill5Img = document.getElementById("hillImg5");
const leafImg = document.getElementById("leafImg");
const plantImg = document.getElementById("plantImg");
const treeImg = document.getElementById("treeImg");
window.addEventListener("scroll", () => {
  const value = window.scrollY;
  text.style.marginTop = 2.5 * value + "px";
  leafImg.style.top = -1.5 * value + "px";
  leafImg.style.left = 1.5 * value + "px";
  hillImg1.style.left = -1.5 * value + "px";
  hill4Img.style.left = -1.5 * value + "px";
  hill5Img.style.top = 1 * value + "px";
});

export const ParallaxTest = () => {
  return (
    <>
      <div className="parallax flex justify-center items-center min-h-screen overflow-x-hidden">
        <h1
          id="text"
          className="text-[5rem] font-extrabold tracking-[20px] uppercase text-white z-10"
        >
          TickTick
        </h1>
        <img src={hill1} id="hillImg1" />
        <img src={hill2} id="hillImg2" />
        <img src={hill3} id="hillImg3" />
        <img src={hill4} id="hillImg4" />
        <img src={hill5} id="hillImg5" />
        <img src={leaf} id="leafImg" />
        <img src={plant} id="plantImg" />
        <img src={tree} id="treeImg" />
      </div>
      <div></div>
    </>
  );
};
