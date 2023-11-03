import style from "./Main.module.css";
import MainContents from "./MainContents/MainContents";
import MainNavi from "./MainNavi/MainNavi";
import Header from "../../components/Header/Header";

const Main = () => {
  return (
    <div className={`${style.container}`}>
      <Header title="오피스 홈"></Header>
      <MainNavi />
      <MainContents />
    </div>
  );
};

export default Main;
