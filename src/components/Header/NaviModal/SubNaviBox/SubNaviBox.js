import { useState } from "react";
import style from "./SubNaviBox.module.css";

const SubNaviBox = ({
  xmlns,
  height,
  viewBox,
  d,
  title,
  to,
  setSelectedMenu,
  isSelected,
}) => {
  const [isHovering, setHovering] = useState(false);
  const clickHandler = () => {
    setSelectedMenu(to);
  };
  const backgroundStlye = {
    backgroundColor: isSelected || isHovering ? "#dcedd4" : "#FFFFFF",
  };

  return (
    <div
      className={style.naviConp}
      onClick={clickHandler}
      style={backgroundStlye}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <div className={style.naviConp__icon}>
        <svg xmlns={xmlns} height={height} viewBox={viewBox}>
          <path d={d}></path>
        </svg>
      </div>
      <div className="naviConp__title">{title}</div>
    </div>
  );
};

export default SubNaviBox;
