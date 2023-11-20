import { Routes, Route } from "react-router-dom";
import OfficeInfo from "./OfficeInfo/OfficeInfo";
import OfficeAdmin from "./OfficeAdmin/OfficeAdmin";
import "./OfficeHome.module.css"

const OfficeHome = () => {

    return(
        <div>
            <OfficeAdmin></OfficeAdmin>
            <OfficeInfo></OfficeInfo>
        </div>
    );
};

export default OfficeHome;