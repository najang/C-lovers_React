import MCStyle from "../MainContents.module.css"
import style from "./Mail.module.css"

const Mail = () => {
    return (
        <div className={`${style.mail}`}>
            <div className={`${MCStyle.mainContents__title}`}>메일함 바로가기</div>
            <div className={`${MCStyle.mainContents__contentBox}`}>
                <div className={`${style.contentBox__mailTitle}`}>받은 메일함</div>
                <div className={`${style.contentBox__mailTitle}`}>예약 메일함</div>
                <hr></hr>
                <div className={`${style.contentBox__mailTitle}`}>오늘 온 메일함</div>
                <div className={`${style.contentBox__mailTitle}`}>중요 메일함</div>
            </div>
        </div>
    );
}

export default Mail;