import axios from "axios";
import adminManaged from "./AdminManaged.module.css";
import { useEffect, useState } from "react";
import AdminDeleteModal from "./AdminDeleteModal/AdminDeleteModal";
import AuthorityCategoryModal from "./AuthorityCategoryModal/AuthorityCategoryModal";
import AdminInsertModal from "./AdminInsertModal/AdminInsertModal";
import SmallModalModule from "./SmallModalModule/SmallModalModule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";

const AdminManaged = () => {


    // 기본으로 가리키는 요소
    const [selected, setSelected] = useState("총괄");

    // 관리자 리스트 상태
    const [adminList, setAdminList] = useState([]);

    // 역할별 관리자 수 상태
    const [adminCounts, setAdminCounts] = useState({});

    const handleSelect = (category) => {
        setSelected(category);
    };

    useEffect(() => {
        axios.get("/adminmanage/selectAdmin").then((resp) => {
            setAdminList(resp.data);
        })
        axios.get("/adminmanage/selectAdminCount").then((resp) => {
            const countMap = {};
            resp.data.forEach(item => {
                countMap[item.authority_category_id] = item.manager_count;
            });
            setAdminCounts(countMap);
        });
        setCheckItems([]);
    }, [selected]);

    // 체크박스 연동 기능
    // 체크박스 상태 관리 state
    const [checkItems, setCheckItems] = useState([]);
    const numChecked = checkItems.length;
    // 체크박스 개수 변화에 따른 상태 변경
    const checkItemHandler = (e) => {

        console.log("Checkbox clicked:", e.target.id);
        const isChecked = checkItems.includes(e.target.id);
        if (isChecked) {
            setCheckItems((prev) => prev.filter((el) => el !== e.target.id));
        } else {
            setCheckItems((prev) => [...prev, e.target.id]);
        }
        console.log("Current checkItems:", checkItems);
    };



    // 삭제 모달창 기능
    // 모달창 노출 여부
    const [adminDeleteModal, setAdminDeleteModal] = useState(false);
    const [adminDeleteModify, setAdminDeleteModify] = useState(false);
    const showAdminDeleteModal = () => {
        if (numChecked > 0) {
            setAdminDeleteModal(true);
        } else {
            setAdminDeleteModal(false);
        }
    };

    // 권한 카테고리 수정 모달창 기능
    const [authorityCategoryModal, setAuthorityCategoryModal] = useState(false);
    const [authorityCategoryModify, setAuthorityCategoryModify] = useState(false);
    const showAuthorityCategoryModal = () => {
        if (numChecked > 0) {
            setAuthorityCategoryModal(true);
        } else {
            setAuthorityCategoryModal(false);
        }
    };

    // 관리자 등록 모달창 기능
    const [adminInsertModal, setAdminInsertModal] = useState(false);
    const [adminInsertModify, setAdminInsertModify] = useState(false);
    const showAdminInsertModal = () => {
        if (numChecked > 0) {
            setAdminInsertModal(true);
        } else {
            setAdminInsertModal(false);
        }
    };


    // 작은 메뉴 모달창 기능
    const [smallModalModule, setSmallModalModule] = useState(false);
    const showSmallModalModule = () => {
        if (numChecked > 0) {
            setSmallModalModule(!smallModalModule);
        } else {
            setSmallModalModule(false);
        }
    };

    // 삭제 후 리스트 다시 불러오기
    useEffect(() => {
        if (adminDeleteModify || authorityCategoryModify || adminInsertModify) {
            axios.get("/adminmanage/selectAdmin").then((resp) => {
                setAdminList(resp.data);
            })
            axios.get("/adminmanage/selectAdminCount").then((resp) => {
                const countMap = {};
                resp.data.forEach(item => {
                    countMap[item.authority_category_id] = item.manager_count;
                });
                setAdminCounts(countMap);
                setAdminDeleteModify(false);
                setAuthorityCategoryModify(false);
                setAdminInsertModify(false);
                setCheckItems([]);
            });

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [adminDeleteModify, authorityCategoryModify, checkItems]);



    const filteredAdmins = adminList.filter(admin => admin.authority_category_id === selected);

    const handleAdminInsertClick = () => {
        setAdminInsertModal(true);  // 관리자 추가 모달을 활성화
    };

    return (
        <div>
            <div className={adminManaged.office__admin__div}>
                <div className={adminManaged.office__admin__updiv}>
                    <table>
                        <tbody>
                            <tr>
                                <td><p className={adminManaged.office__admin__title}>관리자</p></td>
                                <td>
                                    <button
                                        className={adminManaged.office__adminmanage__button}
                                        onClick={handleAdminInsertClick}
                                    >
                                        {`${selected} 관리자 추가`}
                                    </button>
                                    {adminInsertModal && (
                                        <AdminInsertModal
                                            setAdminInsertModal={setAdminInsertModal}
                                            selected={selected}
                                            setAdminList={setAdminList}
                                            setAdminInsertModify={setAdminInsertModify}
                                            showSmallModalModule={showSmallModalModule}
                                        ></AdminInsertModal>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={adminManaged.office__admin__downdiv}>
                    <div className={adminManaged.office__admin__nav}>
                        <ul>
                            {['총괄', '인사', '전자결재', '회계'].map(category => (
                                <li
                                    key={category}
                                    onClick={() => handleSelect(category)}
                                    className={selected === category ? adminManaged.office__admin__nav__div__selected : adminManaged.office__admin__nav__div}
                                >
                                    {`${category} 관리자 (${adminCounts[category] || 0})`}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={adminManaged.office__admin__maindiv}>
                        {filteredAdmins.length > 0 ? (
                            <table className={adminManaged.office__admin__table}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>이름</th>
                                        <th>부서</th>
                                        <th>직무</th>
                                        <th>직책</th>
                                        <th>권한 카테고리</th>
                                        <th>등록 날짜</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAdmins.map(admin => (
                                        <tr key={admin.id}>
                                            <td>
                                                <input type="checkbox"
                                                    name=""
                                                    id={admin.id}
                                                    onChange={checkItemHandler}
                                                    defaultChecked={checkItems.includes(admin.id)} />
                                            </td>
                                            <td>{admin.emp_name}</td>
                                            <td>{admin.dept_name}</td>
                                            <td>{admin.task_name}</td>
                                            <td>{admin.job_name}</td>
                                            <td>{admin.authority_category_id}</td>
                                            <td>{admin.reg_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>현재 {selected} 관리자는 등록되지 않았습니다.</p>
                        )}
                    </div>

                </div>
            </div>


            <div className={adminManaged.userManagedMenu}>
                <div className={adminManaged.userMenu}>
                    <div className={adminManaged.userMenu__select}>{numChecked}</div>
                    <button onClick={showAdminDeleteModal} className={adminManaged.adminDeleteBtn}>
                        삭제
                    </button>
                    {adminDeleteModal && (
                        <AdminDeleteModal
                            setAdminDeleteModal={setAdminDeleteModal}
                            checkItems={checkItems}
                            setAdminDeleteModify={setAdminDeleteModify}
                            showSmallModalModule={showSmallModalModule}
                        ></AdminDeleteModal>
                    )}
                    <button onClick={showAuthorityCategoryModal} className={adminManaged.authorityCategoryModifyBtn}>
                        권한 카테고리 수정
                    </button>
                    {authorityCategoryModal && (
                        <AuthorityCategoryModal
                            setAuthorityCategoryModal={setAuthorityCategoryModal}
                            checkItems={checkItems}
                            setAuthorityCategoryModify={setAuthorityCategoryModify}
                            showSmallModalModule={showSmallModalModule}
                        ></AuthorityCategoryModal>
                    )}

                    <button
                        className={adminManaged.userMenuSmallBtn}
                        onClick={showSmallModalModule}
                    >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    {smallModalModule && (
                        <SmallModalModule
                            showAdminInsertModal={showAdminInsertModal}
                            showAdminDeleteModal={showAdminDeleteModal}
                            showAuthorityCategoryModal={showAuthorityCategoryModal}
                            setSmallModalModule={setSmallModalModule}
                        ></SmallModalModule>
                    )}
                </div>
            </div>
        </div>

    );
};

export default AdminManaged;
