import { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./EmployeeAccount.module.css";
// import { MenuContext } from "../Accounting";
import { MenuContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import AddModal from "./components/AddModal/AddModal";
import UpdateModal from "./components/UpdateModal/UpdateModal";
import Pagination from "react-js-pagination";
import "../../../../src/components/Pagination/paginationi.css";

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
  const [searchModify, setSearchModify] = useState(false);

  useEffect(() => {
    setSelectedMenu("accounting");

    // 계좌 리스트 불러오기
    axios.get("/api/accounting/accountAll").then((resp) => {
      setAccountList(resp.data);
    });
    setAddModify(false);
    setDelModify(false);
    setUpdateModify(false);
  }, [addModify, delModify, updateModify]);

  // 검색 시 결과 받아오기
  const searchHandler = (e) => {
    axios
      .get("/api/accounting/search", { params: { keyword: e.target.value } })
      .then((resp) => {
        console.log(resp.data);
        setAccountList(resp.data);
        setSearchModify(true);
      });
  };

  // 계좌추가 모달 띄우기
  const showAddModalOpen = () => {
    setAddModalOpen(true);
  };

  // 계좌수정 id랑 같은 거 저장
  const [accountOneList, setAccountOneList] = useState({});
  // 계좌 수정 모달 띄우기
  const showUpdateModalOpen = (id) => {
    setUpdateModalOpen(true);
    // 아이디랑 같은 배열 하나 부르기
    const result = accountList.filter((prev) => prev.id == id)[0];
    console.log(result);
    setAccountOneList(result);
  };

  // 삭제버튼 누르면
  const deleteHandler = (e) => {
    const delResult = window.confirm("삭제하시겠습니까?");
    if (delResult) {
      console.log("삭제 확인 누름");
      console.log(e.target.id);
      const id = e.target.id;

      axios.delete(`/api/accounting/${id}`).then((resp) => {
        console.log(resp);
        setDelModify(true);
      });
    }
  };

  // 검색 박스 클릭 시 이벤트
  const [isSearchClick, setSearchClick] = useState(false);
  const borderStyle = {
    border: isSearchClick ? "1px solid #20412E" : "1px solid #7d7d7d40",
    borderRadius: "4px",
  };

  // 페이지네이션
  const [currentAccountList, setCurrentAccountList] = useState(accountList);
  const [page, setPage] = useState(1);
  const accountPerPage = 10; // 페이지당 출력 계좌 수
  const indexOfLastPage = page * accountPerPage;
  const indexOfFirstPage = indexOfLastPage - accountPerPage;

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setCurrentAccountList(accountList.slice(indexOfFirstPage, indexOfLastPage));
    console.log(accountList.length);
  }, [accountList, page]);

  return (
    <div className={style.containerBox}>
      <div className={style.title}>직원 계좌</div>
      <div className={style.smTitle}>
        <div className={style.smTitle__inner}>직원 계좌</div>
      </div>
      <div className={`${style.account_md} ${style.flex}`}>
        <div className={style.flex}>
          <button onClick={showAddModalOpen} className={style.accountAdd}>
            + 계좌추가
          </button>
          {addModalOpen && (
            <AddModal
              setAddModalOpen={setAddModalOpen}
              setAddModify={setAddModify}
            ></AddModal>
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
          <div className={style.bankNmae}>은행명</div>
          <div className={style.userId}>계좌 번호</div>
          <div className={style.regDate}>등록일</div>
          <div className={style.DelUp}></div>
        </div>

        {currentAccountList.length > 0 ? (
          <div className={style.userTable__body}>
            {currentAccountList.map((item, index) => (
              <div
                className={`${style.flex} ${style.accountInfo}`}
                key={index}
                id={item.id}
              >
                <div className={style.name}>{item.name}</div>
                <div className={style.userId}>{item.emp_id}</div>
                <div className={style.bankNmae}>{item.bank}</div>
                <div className={style.accountNum}>{item.id}</div>
                <div className={style.regDate}>{item.formatRegDate}</div>
                <div className={style.DelUp}>
                  <button
                    className={style.UpdateBtn}
                    onClick={() => {
                      showUpdateModalOpen(item.id);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className={style.DelBtn}
                    id={item.id}
                    onClick={deleteHandler}
                  >
                    삭제
                  </button>
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
        ></UpdateModal>
      )}
      <Pagination
        activePage={page} // 현재페이지
        itemsCountPerPage={accountPerPage} // 한페이지당 보여줄 리스트 아이템 개수
        totalItemsCount={accountList.length} // 총 아이템의 개수
        pageRangeDisplayed={5} // Paginator 내에서 보여줄 페이지의 범위
        prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
        nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
        lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
        firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
        onChange={handlePageChange} // 페이지가 바뀔 때 핸들링 해 줄 함수
      ></Pagination>
    </div>
  );
};

export default EmployeeAccount;
