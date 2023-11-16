import { useContext } from "react"
import NaviBox from "../../../../components/NaviBox/NaviBox";
import { Link } from "react-router-dom";
import { MenuContext } from "../../Accounting";
import style from "./NaviBar.module.css";

const NaviBar = () => {

    const { selectedMenu, setSelectedMenu } = useContext(MenuContext);

    return (
        <div className={style.naviBar}>
            <Link to="/accounting">
                <NaviBox
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                    title="직원 계좌"
                    to="accounting"
                    setSelectedMenu={setSelectedMenu}
                    isSelected={selectedMenu == "accounting"}
                ></NaviBox>
            </Link>
            <Link to="corporation_card">
                <NaviBox
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"
                    title="직원 법인 카드"
                    to="corporation_card"
                    setSelectedMenu={setSelectedMenu}
                    isSelected={selectedMenu == "corporation_card"}
                ></NaviBox>
            </Link>
        </div>
    );
}

export default NaviBar;