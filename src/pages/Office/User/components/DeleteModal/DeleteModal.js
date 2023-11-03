import style from "./DeleteModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GrayBtn from "../../../../../components/GrayBtn/GrayBtn";
import GreenBtn from "../../../../../components/GreenBtn/GreenBtn";
import { useEffect, useState, useRef } from "react";

const DeleteModal = ({ setDeleteModalOpen }) => {
  // 모달창 닫기
  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  // 모달창 외부 클릭시 창 닫기
  const backgroundRef = useRef(null);
  const handlerClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      closeModal();
    }
    console.log("배경");
  };

  // 모달 창 체크박스 전부 체크되었는지 확인
  const [deleteCheckItems, setDeleteCheckItems] = useState([]);
  const checkItemHandler = (e) => {
    const isChecked = deleteCheckItems.includes(e.target.id);
    if (isChecked) {
      setDeleteCheckItems((prev) => prev.filter((el) => el !== e.target.id));
    } else {
      setDeleteCheckItems((prev) => [...prev, e.target.id]);
    }
  };

  // 모두 체크되면 삭제 버튼 활성화
  const [deleteOkay, setDeleteOkay] = useState(false);
  useEffect(() => {
    console.log("check");
    console.log(deleteCheckItems);
    if (deleteCheckItems.length == 4) {
      setDeleteOkay(true);
    } else {
      setDeleteOkay(false);
    }
  }, [deleteCheckItems]);

  return (
    <div
      className={style.container}
      ref={backgroundRef}
      onClick={handlerClickBackground}
    >
      <div className={style.modalBox}>
        <div className={style.modalBox__title}>
          <div className="title__title">사용자 삭제</div>
          <div className={style.close} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={style.modal__body}>
          <div className={style.deleteInfo}>
            강과장(사번)님을 삭제하시겠습니까?<br></br>
            삭제된 사용자는 더 이상 로그인 할 수 없으며, 다음 데이터가 즉시
            삭제됩니다.
          </div>
          <div className={style.deleteCheck}>
            <ul>
              <li className={style.deleteCheck__list}>
                <div className="list__checkbox">
                  <input
                    type="checkbox"
                    id="체크 1"
                    onChange={checkItemHandler}
                    checked={deleteCheckItems.includes("체크 1")}
                  />
                </div>
                <div className="list_content">
                  <p>서비스 이용 라이선스는 모두 회수됩니다.</p>
                  <p>
                    (각 서비스에 저장된 임시저장 문서는 삭제되며, 모든 설정이
                    초기화 됩니다.)
                  </p>
                </div>
              </li>
              <li className={style.deleteCheck__list}>
                <div className="list__checkbox">
                  <input
                    type="checkbox"
                    id="체크 2"
                    onChange={checkItemHandler}
                    checked={deleteCheckItems.includes("체크 2")}
                  />
                </div>
                <div className="list_content">
                  <p>소속 조직 정보가 삭제됩니다.</p>
                </div>
              </li>
              <li className={style.deleteCheck__list}>
                <div className="list__checkbox">
                  <input
                    type="checkbox"
                    id="체크 3"
                    onChange={checkItemHandler}
                    checked={deleteCheckItems.includes("체크 3")}
                  />
                </div>
                <div className="list_content">
                  <p>
                    인사 관리자, 전자결재 관리자 등 관리자 권한이 모두
                    회수됩니다.
                  </p>
                </div>
              </li>
              <li className={style.deleteCheck__list}>
                <div className="list__checkbox">
                  <input
                    type="checkbox"
                    id="체크 4"
                    onChange={checkItemHandler}
                    checked={deleteCheckItems.includes("체크 4")}
                  />
                </div>
                <div className="list_content">
                  <p>게시판, 그룹 등의 사용권한이 모두 회수됩니다.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className={style.deleteBtn}>
            <GrayBtn title={"취소"}></GrayBtn>
            <GreenBtn title={"삭제"} activation={deleteOkay}></GreenBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
