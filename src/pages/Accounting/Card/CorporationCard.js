import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faAngleLeft,
    faAnglesLeft,
    faAngleRight,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext, useState } from "react";
import axios from 'axios';
import style from './CorporationCard.module.css';
import { MenuContext } from "../Accounting";
import AddCardModal from "./AddModal/AddCardModal";
import UpdateCardModal from "./UpdateModal/UpdateCardModal";
import Pagination from "react-js-pagination";
import "../../../../src/components/Pagination/paginationi.css";


const CorporationCard = () => {

    const { setSelectedMenu } = useContext(MenuContext);

    // 카드 리스트 상태
    const [cardList, setCardList] = useState([{}]);
    
    // 카드추가, 수정상태
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    // F5 안눌러도 새로고침
    const [addModify, setAddModify] = useState(false);
    const [delModify, setDelModify] = useState(false);
    const [updateModify, setUpdateModify] = useState(false);
    const [searchModifu, setSearchModify] = useState(false);

    // 카드 리스트 부르기
    useEffect(() => {
        setSelectedMenu("corporation_card");

        axios.get("/api/accounting/cardAll").then((resp) => {
            setCardList(resp.data);
        })
        setAddModify(false);
        setDelModify(false);
        setUpdateModify(false);
    }, [addModify,delModify,updateModify]);

    // 법인카드추가 모달
    const showAddModalOpen = () => {
        setAddModalOpen(true);
    }

    const [cardOne, setCardOne] = useState({});
    // 수정모달
    const showUpdateModalOpen = (id) =>{
        setUpdateModalOpen(true);
        console.log("id "+id);
        // 아이디랑 같은 배열 하나
        const result = cardList.filter((prev)=>prev.id == id)[0];
        setCardOne(result);
    }

    // 삭제버튼
    const deleteHandler = (e) => {
        const delResult = window.confirm("삭제하시겠습니까?");
        if (delResult) {
            const id = e.target.id;
            axios.delete(`/api/accounting/deleteCard/${id}`).then((resp)=>{
                setDelModify(true);
            })
        }
    }
    // 검색
    const searchHandler = (e) =>{
        axios.get("/api/accounting/searchCard",{params:{keyword : e.target.value}}).then((resp)=>{
            setCardList(resp.data);
            setSearchModify(true);
        })
    }

    // 검색 박스 클릭 시 이벤트
    const [isSearchClick, setSearchClick] = useState(false);
    const borderStyle = {
        border: isSearchClick ? "1px solid #20412E" : "1px solid #7d7d7d40",
        borderRadius: "4px",
    };

    const [currentCardList, setCurrentCardList] = useState(cardList);
    const [page, setPage] = useState(1);
    const accountPerPage = 10;
    const indexOfLastPage = page * accountPerPage;
    const indexOfFirstPage = indexOfLastPage - accountPerPage;

    const handlePageChange = (page)=>{
        setPage(page);
    }

    useEffect(()=>{
        setCurrentCardList(cardList.slice(indexOfFirstPage,indexOfLastPage));
    },[cardList, page]);

    return (
        <div className={style.containerBox}>
            <div className={style.title}>
                직원 법인 카드
            </div>
            <div className={style.smTitle}>
                <div className={style.smTitle__inner}>
                    직원 법인 카드
                </div>
            </div>
            <div className={`${style.account_md} ${style.flex}`}>
                <div className={style.flex}>
                    <button className={style.accountAdd} onClick={showAddModalOpen}>
                        + 법인 카드 추가
                    </button>
                    {addModalOpen && (
                        <AddCardModal
                            setAddModalOpen={setAddModalOpen}
                            setAddModify={setAddModify}
                        >
                        </AddCardModal>
                    )}
                </div>
                <div
                    className={style.search}
                    style={borderStyle}
                    onFocus={() => setSearchClick(true)}
                    onBlur={() => setSearchClick(false)}
                >
                    <div className={style.search__prefix}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input
                        type="search"
                        placeholder="이름, ID 검색"
                        onChange={searchHandler}
                    />
                </div>
            </div>

            {/* 테이블 */}
            <div className={style.userTable}>
                <div className={style.userTable__header}>
                    <div className={style.name}>이름</div>
                    <div className={style.accountNum}>사번</div>
                    <div className={style.bankNmae}>카드회사</div>
                    <div className={style.userId}>카드 번호</div>
                    <div className={style.regDate}>등록일</div>
                    <div className={style.DelUp}></div>
                </div>

                {currentCardList.length > 0 ? (
                    <div className={style.userTable__body}>
                        {currentCardList.map((item, index) => (
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
                <UpdateCardModal
                    setUpdateModalOpen={setUpdateModalOpen}
                    cardOne={cardOne}
                    setCardOne={setCardOne}
                    setUpdateModify={setUpdateModify}
                ></UpdateCardModal>
            )}
            <Pagination
                activePage={page}
                itemsCountPerPage={accountPerPage}
                totalItemsCount={cardList.length}
                pageRangeDisplayed={5}
                prevPageText={<FontAwesomeIcon icon={faAngleLeft}/>}
                nextPageText={<FontAwesomeIcon icon={faAngleRight}/>}
                lastPageText={<FontAwesomeIcon icon={faAnglesRight}/>}
                firstPageText={<FontAwesomeIcon icon={faAnglesLeft}/>}
                onChange={handlePageChange} 
            ></Pagination>
        </div>
    );
}

export default CorporationCard;