import style from "./MainNavi.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faClipboard, faCalendar, faAddressBook, faClock, faSitemap, faFileLines, faGear, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

const menu = ["메일", "게시판", "일정", "주소록", "예약", "인사", "전자결재", "오피스 관리", "회계지원"];
const menuIcon = [faEnvelope, faClipboard, faCalendar, faAddressBook, faClock, faSitemap, faFileLines, faGear, faHandHoldingDollar];

const MainNavi = () => {
    return (
        <div className={`${style.mainNavi}`}>
            <div className={`${style.mainNavi__naviItems}`}>
                { menu.map((e, i) => (
                    <div className={`${style.naviItems__naviItem}`} key={i}>
                        <div className={`${style.naviItem__itemCurcle}`}>
                            <FontAwesomeIcon icon={menuIcon[i]} className={`${style.itemCurcle__Icon}`} />
                        </div>
                        <div className={`${style.naviItem__title}`}>
                            {e}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainNavi;