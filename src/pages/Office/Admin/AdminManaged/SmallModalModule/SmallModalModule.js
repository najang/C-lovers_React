import style from "./SmallModalModule.module.css"
import { useEffect, useState, useRef } from "react";

const SmallModalModule = ({
  showAdminInsertModal,
  showAuthorityCategoryModal,
  showAdminDeleteModal,
  setSmallModalModule,
}) => {
  const closeModal = () => {
    setSmallModalModule(false);
  };
  // 모달창 외부 클릭시 창 닫기
  const backgroundRef = useRef(null);
  const handlerClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      closeModal();
    }
  };
  return (
    <div
      className={style.modalBackground}
      ref={backgroundRef}
      onClick={handlerClickBackground}
    >
      <div className={style.smallMenu}>
        <div>
          <button onClick={showAuthorityCategoryModal} className={style.adminModifyBtn}>
            권한카테고리 수정
          </button>
        </div>
        <div>
          <button onClick={showAdminDeleteModal} className={style.adminDeleteBtn}>
            관리자 삭제
          </button>
        </div>
        <div>
          <button onClick={showAdminInsertModal} className={style.adminInsertBtn}>
            관리자 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallModalModule;
