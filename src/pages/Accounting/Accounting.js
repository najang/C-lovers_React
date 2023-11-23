import { createContext, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SubMenuContext } from "../../App";
import style from "./Accounting.module.css";
import Header from "../../components/Header/Header";
import NaviBar from "./components/NaviBar/NaviBar";
import EmployeeAccount from "./Home/EmployeeAccount";
import CorporationCard from "./Card/CorporationCard";
import { MenuContext } from "../../App";

//export const MenuContext = createContext();

function Accounting() {
  //const [selectedMenu, setSelectedMenu] = useState("accounting");
  const { selectedMenu, setSelectedMenu } = useContext(MenuContext);
  const { handlerClickBackground } = useContext(SubMenuContext);
  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      <div className="container" onClick={handlerClickBackground}>
        <Header title="회계지원"></Header>
        <div className={style.container__body}>
          <NaviBar></NaviBar>
          <div className={style.body__main}>
            <Routes>
              <Route path="/" element={<EmployeeAccount />}></Route>
              <Route
                path="/corporation_card"
                element={<CorporationCard />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </MenuContext.Provider>
  );
}

export default Accounting;
