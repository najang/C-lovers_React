import Header from "../../components/Header/Header";
import NaviBar from "./components/NaviBar/NaviBar";
import style from "./Office.module.css";
import { Routes, Route } from "react-router-dom";
import User from "./User/User";

const Page0 = () => {
  return <div>Page0</div>;
};

const Page1 = () => {
  return <div>Page1</div>;
};

const Page2 = () => {
  return <div>Page2</div>;
};

const Office = () => {
  return (
    <div className="container">
      <Header title="오피스 관리"></Header>
      <div className={style.container__body}>
        <NaviBar></NaviBar>
        <div className={style.body__main}>
          <Routes>
            <Route path="/" element={<Page0 />}></Route>
            <Route path="/administrator" element={<Page1 />}></Route>
            <Route path="/organization" element={<Page2 />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/positionduty" element={<Page1 />}></Route>
            <Route path="/inactiveuser" element={<Page2 />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Office;
