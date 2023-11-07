import MCStyle from "../MainContents.module.css"
import style from "./ApprovalBox.module.css"

const ApprovalBox = () => {
    return (
        <div className={`${style.approval}`}>
            <div className={`${MCStyle.mainContents__title}`}>전자결재</div>
            <div className={`${MCStyle.mainContents__contentBox}`}>
                <div className={`${MCStyle.contentBox__btns}`}>
                    <div className={`${MCStyle.btns__line}`}>
                        <button>대기</button>
                        <button>확인</button>
                    </div>
                    <div className={`${MCStyle.btns__line}`}>
                        <button>예정</button>
                        <button>진행</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApprovalBox;