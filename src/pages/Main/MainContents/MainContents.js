import MCStyle from "./MainContents.module.css"
import Approval from "./Approval/Approval";
import WorkCheck from "./WorkCheck/WorkCheck";
import Mail from "./Mail/Mail";
import Schedule from "./Schedule/Schdule";

const MainContents = () => {
    return (
        <div className={`${MCStyle.mainContents}`}>
            <div className={`${MCStyle.mainContents__left}`}>
                <WorkCheck/>
                <Approval />
                <Mail />
            </div>
            <div className={`${MCStyle.mainContents__right}`}>
                <Schedule />
            </div>
        </div>
    );
}

export default MainContents;