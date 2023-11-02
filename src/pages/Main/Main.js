import style from "./Main.module.css"
import MainContents from "./MainContents/MainContents";
import MainNavi from "./MainNavi/MainNavi";

const Main = () => {
    return (
        <div className={`${style.container}`}>
            <MainNavi />
            <MainContents />
        </div>
    );
}

export default Main;