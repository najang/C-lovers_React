import { Routes, Route } from "react-router-dom";
import OfficeInfo from "./OfficeInfo/OfficeInfo";
import OfficeAdmin from "./OfficeAdmin/OfficeAdmin";
import "./OfficeHome.module.css";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../../App";

const OfficeHome = () => {
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    // 네비바가 user에 고정되도록 설정
    setSelectedMenu("office");
  }, []);
  return (
    <div>
      <OfficeAdmin></OfficeAdmin>
      <OfficeInfo></OfficeInfo>
    </div>
  );
};

export default OfficeHome;
