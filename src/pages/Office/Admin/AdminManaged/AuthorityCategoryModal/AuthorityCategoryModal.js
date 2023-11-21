
import style from "./AuthorityCategoryModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import GrayBtn from "../../../../../components/GrayBtn/GrayBtn";
import GreenBtn from "../../../../../components/GreenBtn/GreenBtn";
import axios from "axios";

const AuthorityCategoryModal = ({
  setAuthorityCategoryModal,
  checkItems,
  setAuthorityCategoryModify,
  showSmallModalModule,
}) => {
  // 모달창 닫기
  const closeModal = () => {
    showSmallModalModule(false);
    setAuthorityCategoryModal(false);
  };

  // 모달창 외부 클릭시 창 닫기
  const backgroundRef = useRef(null);
  const handlerClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      closeModal();
    }
  };

  // 수정할 admin ID 등록
  const [modifyAdminList, setModifyAdminList] = useState([
    { id: "", authority_category_id: "" },
  ]);
  useEffect(() => {
    setModifyAdminList([]);
    checkItems.map((item) => {
      setModifyAdminList((prev) => [...prev, { id: item, authority_category_id: "" }]);
    });
    console.log(modifyAdminList);
  }, []);

  //select box 커스텀
  const [authorityCategory, setAuthorityCategory] = useState([]);
  const [authorityCategoryItem, setAuthorityCategoryItem] = useState("");
  const [showAuthorityCategory, setShowAuthorityCategory] = useState(false);
  useEffect(() => {
    axios.get("/adminmanage/selectAuthorityCategories").then((resp) => {
      const categories = resp.data; // 가정된 형태의 데이터
      setAuthorityCategory(categories);
      setAuthorityCategoryItem(categories[0]); // 첫 번째 항목으로 초기화
      //setAdminInfo((prev) => ({ ...prev, job_id: resp.data[0].id }));
    });
  }, []);

  // 선택한 권한 카테고리 등록
  const handlerSelectAuthorityCategory = (selectedCategory) => {
    setAuthorityCategoryItem(selectedCategory);
    setShowAuthorityCategory(false);
    setModifyAdminList(
      modifyAdminList.map((item) => {
        return { ...item, authority_category_id: selectedCategory };
      })
    );
  };

  // 관리자 권한 카테고리 수정
  const handleModifyAdmin = () => {
    console.log("저장 누름");
    console.log(modifyAdminList);
    axios
      .put("/adminmanage/updateAdminInfo", modifyAdminList)
      .then((resp) => {
        alert("권한 카테고리 수정이 완료되었습니다.");
        closeModal();
        setAuthorityCategoryModify(true);
      })
      .catch((e) => {
        alert(
          "오류가 발생했습니다. 관리자에게 문의 하세요.\nemail : 0qwee0328@gmail.com"
        );
      });
  };
  return (
    <div
      className={style.container}
      ref={backgroundRef}
      onClick={handlerClickBackground}
    >
      <div className={style.modalBox}>
        <div className={style.modalBox__title}>
          <div className="title__title">권한 카테고리 변경</div>
          <div className={style.close} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={style.modal__body}>
          <div
            className={style.selectionValue}
            onClick={() => setShowAuthorityCategory(!showAuthorityCategory)}
          >
            <div>{authorityCategoryItem}</div>
            <div>
              {showAuthorityCategory ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
            </div>
          </div>
          {showAuthorityCategory && (
          <div className={style.select__option} ref={backgroundRef} onClick={handlerClickBackground}>
            {authorityCategory.map((item, index) => (
              <div
                className={`${style.option__item} ${item === authorityCategoryItem ? "select" : ""}`}
                onClick={() => handlerSelectAuthorityCategory(item)}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        )}
          <div className={style.deleteBtn}>
            <GrayBtn title={"취소"}></GrayBtn>
            <GreenBtn
              title={"수정"}
              activation={true}
              onClick={handleModifyAdmin}
            ></GreenBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityCategoryModal;
