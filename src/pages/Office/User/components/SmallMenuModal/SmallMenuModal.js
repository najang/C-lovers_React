import style from "./SmallMenuModal.module.css";
import { useEffect, useState, useRef } from "react";

const SmallMenuModal = ({
  showDeleteModal,
  showJobModalOpen,
  showDeptTaskModalOpen,
  setSmallMenuModalOpen,
}) => {
  const closeModal = () => {
    setSmallMenuModalOpen(false);
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
          <button onClick={showDeleteModal} className={style.deleteBtn}>
            삭제
          </button>
        </div>
        <div>
          <button onClick={showJobModalOpen} className={style.jobModifyBtn}>
            직위 수정
          </button>
        </div>
        <div>
          <button
            onClick={showDeptTaskModalOpen}
            className={style.deptTaskModifyBtn}
          >
            소속조직 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallMenuModal;
