import style from "./ProfileModal.module.css";
import profile from "../../../assets/ProfileImg/profile.png";
import GrayBtn from "../../GrayBtn/GrayBtn";
import axios from "axios";
import { useEffect, useState } from "react";

const ProfileModal = ({ userBasicInfo }) => {
  const [profileUrl, setProfileUrl] = useState("");
  const logoutHandler = () => {
    console.log("로그아웃");
    axios.get("/members/adminLogout").then(() => {
      window.location.href = "/";
    });
  };

  const moveSetting = () => {
    window.location.href = "/humanResources/mypage";
  };

  useEffect(() => {
    console.log(userBasicInfo.profile_img);
    if (
      userBasicInfo.profile_img !== "" &&
      userBasicInfo.profile_img !== undefined
    ) {
      console.log("이미지 있음");
      setProfileUrl("/uploads/" + userBasicInfo.profile_img);
    } else {
      console.log("이미지 없음");
      setProfileUrl("/assets/profile.png");
    }
  }, []);

  return (
    <div className={style.profileCard}>
      <div className={style.userInfo}>
        <div className={style.userInfo__profileImg}>
          <img src={profileUrl} alt="" />
        </div>
        <div className={style.userInfo__info}>
          <div className={style.userInfo__name}>{userBasicInfo.name}</div>
          <div className={style.userInfo__email}>
            {userBasicInfo.company_email}@clover.com
          </div>
        </div>
      </div>
      <div className={style.infoBtns}>
        <button className={style.settingBtn} onClick={moveSetting}>
          설정
        </button>
        <GrayBtn title={"로그아웃"} onClick={logoutHandler}></GrayBtn>
      </div>
    </div>
  );
};

export default ProfileModal;
