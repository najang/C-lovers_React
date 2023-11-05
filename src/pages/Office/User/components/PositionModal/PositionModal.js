import style from "./PositionModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import GrayBtn from "../../../../../components/GrayBtn/GrayBtn";
import GreenBtn from "../../../../../components/GreenBtn/GreenBtn";

const PositionModal = ({ setPositionModalOpen }) => {
  // 모달창 닫기
  const closeModal = () => {
    setPositionModalOpen(false);
  };

  // 모달창 외부 클릭시 창 닫기
  const backgroundRef = useRef(null);
  const handlerClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      closeModal();
    }
    console.log("배경");
  };

  //select box 커스텀
  const [menu, setMenu] = useState([
    "선택안함",
    "대표이사",
    "사장",
    "상무",
    "이사",
    "부장",
    "차장",
    "과장",
    "대리",
    "주임",
    "사원",
    "계약직",
  ]);
  const [menuItem, setMenuItem] = useState("선택안함");
  const [showMenu, setShowMenu] = useState(false);

  const handlerSelect = (menu) => {
    setMenuItem(menu);
    setShowMenu(false);
  };

  return (
    <div
      className={style.container}
      ref={backgroundRef}
      onClick={handlerClickBackground}
    >
      <div className={style.modalBox}>
        <div className={style.modalBox__title}>
          <div className="title__title">직위 수정</div>
          <div className={style.close} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={style.modal__body}>
          <div
            className={style.selectionValue}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div>{menuItem}</div>
            <div>
              {showMenu ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
            </div>
          </div>
          {showMenu && (
            <div className={style.select__option}>
              {menu.map((item, index) => (
                <div
                  className={`${style.option__item} ${
                    item === menuItem ? "select" : ""
                  }`}
                  onClick={() => handlerSelect(item)}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          <div className={style.deleteBtn}>
            <GrayBtn title={"취소"}></GrayBtn>
            <GreenBtn title={"수정"} activation={true}></GreenBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionModal;
