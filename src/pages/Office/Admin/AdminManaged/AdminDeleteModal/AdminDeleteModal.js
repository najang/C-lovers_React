import style from "./AdminDeleteModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GrayBtn from "../../../../../components/GrayBtn/GrayBtn";
import GreenBtn from "../../../../../components/GreenBtn/GreenBtn";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const AdminDeleteModal = ({
    setAdminDeleteModal,
    checkItems,
    setAdminDeleteModify,
    showSmallModalModule,
}) => {
    // 모달창 닫기
    const closeModal = () => {
        showSmallModalModule(false);
        setAdminDeleteModal(false);
    };

    // 모달창 외부 클릭시 창 닫기
    const backgroundRef = useRef(null);
    const handlerClickBackground = (e) => {
        if (e.target === backgroundRef.current) {
            closeModal();
        }
    };


    // 사용자 삭제 함수
    const adminDeleteHandler = () => {
        console.log("삭제");
        axios
            .delete("/adminmanage/deleteById", { data: checkItems })
            .then((resp) => {
                alert("사용자가 삭제되었습니다.");
                closeModal();
                setAdminDeleteModify(true);
            })
            .catch((e) => {
                console.log(e);
                alert("오류가 발생했습니다. 관리자에게 문의 하세요!\nemail : 0qwee0328@gmail.com");
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
                    <div className="title__title">사용자 삭제</div>
                    <div className={style.close} onClick={closeModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className={style.modal__body}>
                    <div className={style.adminDeleteInfo}>
                        정말 삭제하시겠습니까?
                    </div>
                    
                    <div className={style.adminDeleteBtn}>
                        <GrayBtn title={"취소"}></GrayBtn>
                        <GreenBtn
                            title={"삭제"}
                            onClick={adminDeleteHandler}
                        ></GreenBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDeleteModal;
