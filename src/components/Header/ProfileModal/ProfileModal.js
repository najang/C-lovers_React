import style from "./ProfileModal.module.css";
import profile from "../../../assets/ProfileImg/profile.png";
import GrayBtn from "../../GrayBtn/GrayBtn";
import axios from "axios";

const ProfileModal = ({ userBasicInfo }) => {
  const logoutHandler = () => {
    console.log("로그아웃");
    axios.get("/members/logout");
  };
  return (
    <div className={style.profileCard}>
      <div className={style.userInfo}>
        <div className={style.userInfo__profileImg}>
          <img src={profile} alt="" />
        </div>
        <div className={style.userInfo__info}>
          <div className={style.userInfo__name}>{userBasicInfo.name}</div>
          <div className={style.userInfo__email}>
            {userBasicInfo.company_email}@clover.com
          </div>
        </div>
      </div>
      <div className={style.infoBtns}>
        <button className={style.settingBtn}>설정</button>
        <GrayBtn title={"로그아웃"} onClick={logoutHandler}></GrayBtn>
      </div>
    </div>
  );
};

export default ProfileModal;
