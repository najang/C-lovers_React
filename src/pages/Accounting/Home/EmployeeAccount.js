import { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./EmployeeAccount.module.css";
import { MenuContext } from "../Accounting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, } from "@fortawesome/free-solid-svg-icons";
import AddModal from "./components/AddModal/AddModal";
import UpdateModal from "./components/UpdateModal/UpdateModal";

const EmployeeAccount = () => {

    const { setSelectedMenu } = useContext(MenuContext);

    // 직원 계좌 리스트
    const [accountList, setAccountList] = useState([{}]);

    // 계좌 추가 모달창 // 모달창 노출 여부
    const [addModalOpen, setAddModalOpen] = useState(false); //이거는 모달 열고닫고
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    // F5 안눌러도 새로고침 가능하게 
    const [addModify, setAddModify] = useState(false); // 추가
    const [delModify, setDelModify] = useState(false); // 삭제
    const [updateModify, setUpdateModify] = useState(false); // 수정

    useEffect(() => {
        setSelectedMenu("accounting");

        // 계좌 리스트 불러오기
        axios.get("/api/accounting").then((resp) => {
            setAccountList(resp.data);
        })
    }, [addModify,delModify,updateModify]);


    // 검색 시 결과 받아오기
    const searchHandler = (e) => {
        // axios.get("/office/searchUser", { params: { keyword: e.target.value } })
        //     .then((resp) => {
        //         console.log(resp.data);
        //         setUserList(resp.data);
        //     });
    };

    // 계좌추가 모달 띄우기
    const showAddModalOpen = () =>{
        setAddModalOpen(true);
    }

    // 계좌수정 id랑 같은 거 저장
    const [accountOneList, setAccountOneList] = useState({});
    // 계좌 수정 모달 띄우기
    const showUpdateModalOpen = (id) =>{
        setUpdateModalOpen(true);
        // 아이디랑 같은 배열 하나 부르기
        const result = accountList.filter((prev)=>prev.id==id)[0];
        console.log(result);
        setAccountOneList(result);
    }
    

    // 삭제버튼 누르면 
    const deleteHandler = (e) =>{
        const delResult = window.confirm("삭제하시겠습니까?");
        if(delResult){
            console.log("삭제 확인 누름");
            console.log(e.target.id);
            const id = e.target.id;

            axios.delete(`/api/accounting/${id}`).then((resp)=>{
                console.log(resp);
                setDelModify(true);
            })
        }
    }

    
    return (
        <div className={style.containerBox}>
            <div className={style.title}>
                직원 계좌
            </div>
            <div className={style.smTitle}>
                <div className={style.smTitle__inner}>
                    직원 계좌
                </div>
            </div>
            <div className={`${style.account_md} ${style.flex}`}>
                <div className={style.flex}>
                    
                    <button onClick={showAddModalOpen} className={style.accountAdd}>
                        + 계좌추가
                    </button>
                    {addModalOpen && (
                        <AddModal 
                            setAddModalOpen = {setAddModalOpen}
                            setAddModify = {setAddModify}
                        ></AddModal>
                    )}
                </div>

                <div className={`${style.searchIconBox} ${style.flex}`}>
                    <div className={style.search__prefix}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input
                        className={style.searchInput}
                        type="search"
                        placeholder="이름, ID 검색"
                        onChange={searchHandler}
                    />
                </div>
            </div>

            {/* 테이블 */}
            <div className={style.userTable}>
                <div className={style.userTable__header}>
                    {/* <div className={style.selector}>
                        <input 
                            type="checkbox"
                            onChange={allCheckedHandler}
                        />
                    </div> */}
                    <div className={style.name}>이름</div>
                    <div className={style.accountNum}>사번</div>
                    <div className={style.bankNmae}>은행명</div>
                    <div className={style.userId}>계좌 번호</div>
                    <div className={style.regDate}>등록일</div>
                    <div className={style.DelUp}></div>
                </div>

                {accountList.length > 0 ? (
                    <div className={style.userTable__body}>
                        {accountList.map((item, index) => (
                            <div 
                                className={`${style.flex} ${style.accountInfo}`}
                                key={index}
                                id={item.id}
                            >
                                <div className={style.name}>
                                    {item.name}
                                </div >
                                <div className={style.userId}>
                                    {item.emp_id}
                                </div>
                                <div className={style.bankNmae}>
                                    {item.bank}
                                </div>
                                <div className={style.accountNum}>
                                    {item.id}
                                </div>
                                <div className={style.regDate}>
                                    {item.formatRegDate}
                                </div>
                                <div className={style.DelUp}>
                                    <button className={style.UpdateBtn} onClick={()=>{showUpdateModalOpen(item.id)}}>수정</button>
                                    <button className={style.DelBtn} id={item.id} onClick={deleteHandler}>삭제</button>
                                </div>
                            </div>
                           
                        ))}
                    </div>
                     
                ) : (
                    <div className={style.listZero}>등록된 사용자가 없습니다.</div>
                )}
            </div>
            {updateModalOpen && (
                        <UpdateModal
                            setUpdateModalOpen={setUpdateModalOpen}
                            setUpdateModify={setUpdateModify}
                            accountOneList={accountOneList}
                            setAccountOneList={setAccountOneList}
                            accountList={accountList}
                        ></UpdateModal>
                    )}
        </div>
    );
}

export default EmployeeAccount;