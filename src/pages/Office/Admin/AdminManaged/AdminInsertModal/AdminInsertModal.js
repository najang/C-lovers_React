
import style from "./AdminInsertModal.module.css";
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

const AdminInsertModal = ({
    setAdminInsertModal,
    selected,
    setAdminList,
    setAdminInsertModify,
    showSmallModalModule,
}) => {


    console.log("ABC");

    // 모달창 닫기
    const closeModal = () => {
        showSmallModalModule(false);
        setAdminInsertModal(false);
    };

    // 모달창 외부 클릭시 창 닫기
    const backgroundRef = useRef(null);
    const handlerClickBackground = (e) => {
        if (e.target === backgroundRef.current) {
            closeModal();
        }
    };

    // 등록할 admin ID 등록
    const [addAdminList, setAddAdminList] = useState([
        { id: 0, emp_id: "", reg_date: "", authority_category_id: "" },
    ]);


    //select box 커스텀
    const [adminInsert, setAdminInsert] = useState(null);
    const [adminInsertItem, setAdminInsertItem] = useState({});
    const [showAdminInsert, setShowAdminInsert] = useState(false);
    // 사용자 정보 포맷팅 함수
    const formatUserOption = (user) => {
        return `${user.name} - ${user.task_name} (${user.job_name})`;
    };

    useEffect(() => {
        axios.get("/office/userList").then((resp) => {
            const userList = resp.data; // 가정된 형태의 데이터
            setAdminInsert(userList);
            setAdminInsertItem(userList[0].id); // 첫 번째 사용자의 ID로 초기화
        });
    }, []);

    // 관리자 정보등록
    const handlerSelectAdminInsert = (selectedEmp) => {
        setAdminInsertItem(selectedEmp);
        setShowAdminInsert(false);
        console.log({ selected });
        setAddAdminList(
            addAdminList.map((item) => {
                return { ...item, emp_id: selectedEmp.id };
            })
        );
    };

    // 관리자 권한 카테고리 수정
    const handleAddAdmin = () => {
        console.log(addAdminList);
        const adminData = addAdminList.map(item => ({
            ...item,
            authority_category_id: selected // 'selected'는 문자열 값입니다.
        }));
        console.log(adminData)
        axios.post("/adminmanage/insert", adminData[0])
            .then((resp) => {
                const data = resp.data;
                console.log(data);
                alert("관리자 등록이 완료되었습니다.");
                closeModal();
                setAdminInsertModify(true);
                setAdminList((prev)=>[
                    ...prev, resp.data
                ])
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
                    <div className="title__title">{`${selected} 관리자 추가`}</div>
                    <div className={style.close} onClick={closeModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className={style.modal__body}>
                    <div
                        className={style.selectionValue}
                        onClick={() => setShowAdminInsert(!showAdminInsert)}
                    >
                        <div>{adminInsertItem.name}</div>
                        <div>
                            {showAdminInsert ? (
                                <FontAwesomeIcon icon={faAngleDown} />
                            ) : (
                                <FontAwesomeIcon icon={faAngleUp} />
                            )}
                        </div>
                    </div>
                    {showAdminInsert && (
                        <div className={style.select__option} ref={backgroundRef} onClick={handlerClickBackground}>
                            {adminInsert.map((user, index) => (
                                <div
                                    className={`${style.option__item} ${user.id === adminInsertItem ? "select" : ""}`}
                                    onClick={() => handlerSelectAdminInsert(user)}
                                    key={index}
                                >
                                    {formatUserOption(user)}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={style.deleteBtn}>
                        <GrayBtn title={"취소"}></GrayBtn>
                        <GreenBtn
                            title={"등록"}
                            activation={true}
                            onClick={handleAddAdmin}
                        ></GreenBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminInsertModal;
