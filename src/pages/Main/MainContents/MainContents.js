import MCStyle from "./MainContents.module.css"
import ApprovalBox from "./ApprovalBox/ApprovalBox";
import WorkCheckBox from "./WorkCheckBox/WorkCheckBox";
import MailBox from "./MailBox/MailBox";
import ScheduleBox from "./ScheduleBox/SchduleBox";

const MainContents = () => {
    return (
        <div className={`${MCStyle.mainContents}`}>
            <div className={`${MCStyle.mainContents__left}`}>
                <WorkCheckBox/>
                <ApprovalBox />
                <MailBox />
            </div>
            <div className={`${MCStyle.mainContents__right}`}>
                <ScheduleBox />
            </div>
        </div>
    );
}

export default MainContents;