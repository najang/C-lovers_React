import { Routes, Route } from "react-router-dom";
import OfficeInfo from "./OfficeInfo/OfficeInfo";
import OfficeAdmin from "./OfficeAdmin/OfficeAdmin";
import "./OfficeHome.module.css";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../../App";

const OfficeHome = () => {

    return(
        <div>
            <OfficeInfo></OfficeInfo>
            <OfficeAdmin></OfficeAdmin>
        </div>
    );
};

export default OfficeHome;
