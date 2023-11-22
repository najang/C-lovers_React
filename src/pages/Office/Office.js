import Header from "../../components/Header/Header";
import NaviBar from "./components/NaviBar/NaviBar";
import style from "./Office.module.css";
import { Routes, Route } from "react-router-dom";
import User from "./User/User";
import Admin from "./Admin/Admin";
import OfficeHome from "./Home/OfficeHome";
import OrgManage from "./OrgManage/OrgManage";
import PositionDuty from "./PositionDuty/PositionDuty";
import { createContext, useState, useContext } from "react";
import { SubMenuContext } from "../../App";
// import { MenuContext } from "../Accounting/Accounting";
import { MenuContext } from "../../App";

const Page1 = () => {
  return <div>Page1</div>;
};

const Page2 = () => {
  return <div>Page2</div>;
};

//export const MenuContext = createContext();

const Office = () => {
  //const [selectedMenu, setSelectedMenu] = useState("office");
  const { selectedMenu, setSelectedMenu } = useContext(MenuContext);
  //setSelectedMenu = "office";
  const { handlerClickBackground } = useContext(SubMenuContext);
  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      <div className="container" onClick={handlerClickBackground}>
        <Header title="오피스 관리"></Header>
        <div className={style.container__body}>
          <NaviBar></NaviBar>
          <div className={style.body__main}>
            <Routes>
              <Route path="/" element={<OfficeHome />}></Route>
              <Route path="/administrator" element={<Admin />}></Route>
              <Route path="/organization" element={<OrgManage />}></Route>
              <Route path="/user/*" element={<User />}></Route>
              <Route path="/positionduty" element={<PositionDuty />}></Route>
              <Route path="/inactiveuser" element={<Page2 />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </MenuContext.Provider>
  );
};

export default Office;
