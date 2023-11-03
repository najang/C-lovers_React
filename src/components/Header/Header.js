import style from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faComment, faBell } from "@fortawesome/free-regular-svg-icons";
import profile from "../../assets/ProfileImg/profile.png";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <div className={style.header}>
      <div className={style.headerLeft}>
        <Link to="/">
          <div className={style.headerLeft__logo}>C-lovers</div>
        </Link>

        {title !== "오피스 홈" ? (
          <div className={style.headerLeft__dropNav}>
            {title}
            <FontAwesomeIcon
              icon={faCaretDown}
              className={style.dropNav__icon}
            />
          </div>
        ) : (
          <div className={style.headerLeft__Nav}>{title}</div>
        )}
      </div>
      <div className={style.headerRight}>
        <div>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div>
          <img src={profile} alt="" className={style.profileImg} />
        </div>
      </div>
    </div>
  );
};

export default Header;
