import MCStyle from "../MainContents.module.css"
import style from "./WorkCheck.module.css"

const WorkCheck = () => {
    return (
        <div className={`${style.workCheck}`}>
            <div className={`${MCStyle.mainContents__title}`}>근무체크</div>
            <div className={`${MCStyle.mainContents__contentBox}`}>
                <div className={`${style.contentBox__date}`}>10월 26일 (목)</div>
                <div className={`${style.contentBox__timeline}`}>
                    <div className={`${style.timeline__time}`}>15:03:48</div>
                    <div className={`${style.timeline__status}`}>출근전</div>
                </div>
                <div className={`${style.contentBox__commute}`}>
                    <div className={`${style.commute__work}`}>
                        <div className={`${style.work__text}`}>출근하기</div>
                        <div className={`${style.work__time}`}>00:00:00</div>
                    </div>
                    <div className={`${MCStyle.mainContents__line}`}></div>
                    <div className={`${style.commute__work}`}>
                        <div className={`${style.work__text}`}>퇴근하기</div>
                        <div className={`${style.work__time}`}>00:00:00</div>
                    </div>
                </div>
                <div className={`${MCStyle.contentBox__btns}`}>
                    <div className={`${MCStyle.btns__line}`}>
                        <button>업무</button>
                        <button>외출</button>
                    </div>
                    <div className={`${MCStyle.btns__line}`}>
                        <button>회의</button>
                        <button>외근</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkCheck;