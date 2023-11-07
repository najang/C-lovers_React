import { useState } from "react";
import style from "./NaviBox.module.css";

function isCurrent(to) {
  return window.location.pathname.endsWith(to);
}

const NaviBox = ({
  xmlns,
  height,
  viewBox,
  d,
  title,
  to,
  setSelectedMenu,
  isSelected,
}) => {
  const [isHovering, setHovering] = useState(0);
  const handleClick = (e) => {
    setSelectedMenu(to);
  };
  const backgroundStlye = {
    backgroundColor: isSelected || isHovering == 1 ? "#dcedd4" : "#F3F7F1",
  };

  return (
    <div
      className={style.naviConp}
      onClick={handleClick}
      style={backgroundStlye}
      onMouseOver={() => setHovering(1)}
      onMouseOut={() => setHovering(0)}
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
export default NaviBox;
