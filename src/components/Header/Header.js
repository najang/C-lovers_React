import style from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faComment, faBell } from "@fortawesome/free-regular-svg-icons";
import profile from "../../assets/ProfileImg/profile.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import NaviModal from "./NaviModal/NaviModal";
import ProfileModal from "./ProfileModal/ProfileModal";
import { SubMenuContext, ProfileCardContext } from "../../App";
import axios from "axios";

const Header = ({ title }) => {
  // 네비바 모달창 기능
  // const [naviModalOpen, setNaviModalOpen] = useState(false);
  const { naviModalOpen, setNaviModalOpen } = useContext(SubMenuContext);
  const { profileCardOpen, setProfileCardOpen } =
    useContext(ProfileCardContext);

  const showNaviModal = () => {
    setNaviModalOpen(!naviModalOpen);
  };

  const showProfileCardModal = () => {
    setProfileCardOpen(!profileCardOpen);
  };

  // 사용자 기본 정보
  const [userBasicInfo, setUserBasicInfo] = useState({});
  useEffect(() => {
    axios
      .get("/members/getUserInfo")
      .then((resp) => {
        console.log("컨트롤러 접근 성공");
        console.log(resp.data);
        setUserBasicInfo(resp.data);
        console.log(userBasicInfo);
      })
      .catch(() => {
        console.log("컨트롤러 접근 실패");
      });
  }, []);

  return (
    <div className={style.header}>
      <div className={style.headerLeft}>
        <Link to="/">
          <div className={style.headerLeft__logo}>C-lovers</div>
        </Link>

        {title !== "오피스 홈" ? (
          <div className={style.headerLeft__dropNav} onClick={showNaviModal}>
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
      {naviModalOpen && <NaviModal></NaviModal>}
      <div className={style.headerRight}>
        <div className={style.headerRight__box}>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className={style.headerRight__box}>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div
          className={`profile ${style.headerRight__box}`}
          onClick={showProfileCardModal}
        >
          <img src={profile} alt="" className={style.profileImg} />
        </div>
        {profileCardOpen && (
          <ProfileModal userBasicInfo={userBasicInfo}></ProfileModal>
        )}
      </div>
    </div>
  );
};

export default Header;
