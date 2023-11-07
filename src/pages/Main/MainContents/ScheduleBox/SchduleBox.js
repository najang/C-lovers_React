import MCStyle from "../MainContents.module.css"
import style from "./ScheduleBox.module.css"

const planDateNum = ["26", "27", "28"];
const planDateText = ["목요일", "금요일", "토요일"];
const planTitle = ["팀장 회의", "이슈 공유 회의", "등록된 일정이 없습니다."];
const planTime = ["09:00 ~ 11:00", "16:30 ~ 17:30", ""];

const ScheduleBox = () => {
    return (
        <div className={`${style.schedule}`}>
            <div className={`${MCStyle.mainContents__title}`}>일정</div>
            <div className={`${MCStyle.mainContents__contentBox}`}>
                <div className={`${style.contentBox__calendar}`}></div>
                <hr></hr>
                <div className={`${style.contentBox__scheduleList}`}>
                    {planDateNum.map((e, i) => (
                        <div key={i} className={`${style.scheduleList__scheduleItem}`}>
                            <div className={`${style.scheduleItem__date}`}>
                                <div className={`${style.date__dayNum}`}>{e}</div>
                                <div className={`${style.date__dayText}`}>{planDateText[i]}</div>
                            </div>
                            <div className={`${MCStyle.mainContents__line}`}></div>
                            <div className={`${style.scheduleItem__plan}`}>
                                <div className={`${style.plan__title}`}>{planTitle[i]}</div>
                                <div className={`${style.plan__time}`}>{planTime[i]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ScheduleBox;