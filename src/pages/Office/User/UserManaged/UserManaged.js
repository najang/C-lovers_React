import { useContext, useEffect, useState } from "react";
import WhiteBtn from "../../../../components/WhiteBtn/WhiteBtn";
import style from "./UserManaged.module.css";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import DeptTaskModal from "../components/DeptTaskModal/DeptTaskModal";
import JobModal from "../components/JobModal/JobModal";
import SmallMenuModal from "../components/SmallMenuModal/SmallMenuModal";
import { MenuContext } from "../../Office";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import "../../../../components/Pagination/paginationi.css";

const UserManaged = () => {
  const { setSelectedMenu } = useContext(MenuContext);
  // 직원 총 인원수
  const [userCount, setUserCount] = useState(0);
  // 직원 리스트 불러오기
  const [userList, setUserList] = useState([{}]);

  useEffect(() => {
    // 네비바가 user에 고정되도록 설정
    setSelectedMenu("user");
    setCheckItems([]);
    // 직원 총 인원수 불러오기
    // 직원 리스트 불러오기
    axios.get("/office/userList").then((resp) => {
      setUserCount(resp.data.length);
      setUserList(resp.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 체크박스 연동 기능
  // 체크박스 상태 관리 state
  const [checkItems, setCheckItems] = useState([]);
  const numChecked = checkItems.length;
  // 체크박스 개수 변화에 따른 상태 변경
  const checkItemHandler = (e) => {
    const isChecked = checkItems.includes(e.target.id);
    if (isChecked) {
      setCheckItems((prev) => prev.filter((el) => el !== e.target.id));
    } else {
      setCheckItems((prev) => [...prev, e.target.id]);
    }
  };

  // 최 상위 체크박스를 클릭했을 때 모든 체크박스를 누르거나, 제거하는 기능
  const allCheckedHandler = (e) => {
    if (e.target.checked) {
      setCheckItems(currentUsers.map((item) => item.id));
    } else {
      setCheckItems([]);
    }
  };

  // 내용을 클릭해도 체크박스 확인
  const handlerItemClick = (e) => {
    if (e.target.id !== "" && e.target.type !== "checkbox") {
      checkItemHandler(e);
    }
  };

  // 삭제 모달창 기능
  // 모달창 노출 여부
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModify, setDeleteModify] = useState(false);
  const showDeleteModal = () => {
    if (numChecked > 0) {
      setDeleteModalOpen(true);
    } else {
      setDeleteModalOpen(false);
    }
  };

  // 소속조직 모달창 기능
  const [deptTaskModalOpen, setDeptTaskModalOpen] = useState(false);
  const [deptTaskModify, setDeptTaskModify] = useState(false);
  const showDeptTaskModalOpen = () => {
    if (numChecked > 0) {
      setDeptTaskModalOpen(true);
    } else {
      setDeptTaskModalOpen(false);
    }
  };

  // 직위 수정 모달창 기능
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [jobModify, setJobModify] = useState(false);
  const showJobModalOpen = () => {
    if (numChecked > 0) {
      setJobModalOpen(true);
    } else {
      setJobModalOpen(false);
    }
  };

  // 작은 메뉴 모달창 기능
  const [smallMenuModalOpen, setSmallMenuModalOpen] = useState(false);
  const showSmallMenuModalOpen = () => {
    if (numChecked > 0) {
      setSmallMenuModalOpen(!smallMenuModalOpen);
    } else {
      setSmallMenuModalOpen(false);
    }
  };

  // 삭제 후 리스트 다시 불러오기
  useEffect(() => {
    if (deleteModify || deptTaskModify || jobModify) {
      console.log("삭제되고 나옴");
      axios.get("/office/userList").then((resp) => {
        // 리스트 세팅
        setUserCount(resp.data.length);
        setUserList(resp.data);
        // 수정여부 초기화
        setDeleteModify(false);
        setDeptTaskModify(false);
        setJobModify(false);
        //체크박스 풀기
        setCheckItems([]);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [deleteModify, deptTaskModify, jobModify]);

  // 검색 박스 클릭 시 이벤트
  const [isSearchClick, setSearchClick] = useState(false);
  const borderStyle = {
    border: isSearchClick ? "1px solid #20412E" : "1px solid #7d7d7d40",
    borderRadius: "4px",
  };

  // 검색 시 결과 받아오기
  const searchHandler = (e) => {
    axios
      .get("/office/searchUser", { params: { keyword: e.target.value } })
      .then((resp) => {
        console.log(resp.data);
        setUserList(resp.data);
      });
  };

  // 페이지 네이션
  const [currentUsers, setCurrentUsers] = useState(userList);
  const [page, setPage] = useState(1);
  const userPerPage = 10; // 페이지 당 유저 출력 수
  const indexOfLastPage = page * userPerPage;
  const indexOfFirstPage = indexOfLastPage - userPerPage;

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setCurrentUsers(userList.slice(indexOfFirstPage, indexOfLastPage));
    setCheckItems([]);
    console.log("qusghk");
    console.log(userList.length);
  }, [userList, page]);

  return (
    <div className={style.user__container}>
      <div className={style.title}>사용자 관리</div>
      <div className={style.userInfo}>
        <div className="userInfo__tag">사용자</div>
        <div className="userInfo__count">{userCount}명</div>
        <div className="userInfo__plusBtn">
          <Link to="userRegistration">
            <WhiteBtn title="사용자 등록"></WhiteBtn>
          </Link>
        </div>
      </div>
      <div className={style.userManagedMenu}>
        <div className={style.userMenu}>
          <div className={style.userMenu__select}>{numChecked}</div>
          <button onClick={showDeleteModal} className={style.deleteBtn}>
            삭제
          </button>
          {deleteModalOpen && (
            <DeleteModal
              setDeleteModalOpen={setDeleteModalOpen}
              checkItems={checkItems}
              setDeleteModify={setDeleteModify}
              showSmallMenuModalOpen={showSmallMenuModalOpen}
            ></DeleteModal>
          )}
          <button onClick={showJobModalOpen} className={style.jobModifyBtn}>
            직위 수정
          </button>
          {jobModalOpen && (
            <JobModal
              setJobModalOpen={setJobModalOpen}
              checkItems={checkItems}
              setJobModify={setJobModify}
              showSmallMenuModalOpen={showSmallMenuModalOpen}
            ></JobModal>
          )}
          <button
            onClick={showDeptTaskModalOpen}
            className={style.deptTaskModifyBtn}
          >
            소속조직 수정
          </button>
          {deptTaskModalOpen && (
            <DeptTaskModal
              setDeptTaskModalOpen={setDeptTaskModalOpen}
              checkItems={checkItems}
              setDeptTaskModify={setDeptTaskModify}
              showSmallMenuModalOpen={showSmallMenuModalOpen}
            ></DeptTaskModal>
          )}
          <button
            className={style.userMenuSmallBtn}
            onClick={showSmallMenuModalOpen}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
          {smallMenuModalOpen && (
            <SmallMenuModal
              showDeleteModal={showDeleteModal}
              showJobModalOpen={showJobModalOpen}
              showDeptTaskModalOpen={showDeptTaskModalOpen}
              setSmallMenuModalOpen={setSmallMenuModalOpen}
            ></SmallMenuModal>
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

      <div className={style.userTable}>
        <div className={style.userTable__header}>
          <div className={style.selector}>
            <input
              type="checkbox"
              name=""
              id=""
              onChange={allCheckedHandler}
              checked={
                userList.length !== 0 &&
                checkItems.length === currentUsers.length
              }
            />
          </div>
          <div className={style.name}>이름</div>
          <div className={style.userId}>아이디</div>
          <div className={style.deptTask}>직위</div>
          <div className={style.job}>소속 조직</div>
        </div>

        {userList.length > 0 ? (
          <div className={style.userTable__body}>
            {currentUsers.map((item, index) => (
              <div
                className={style.body__userInfo}
                key={index}
                id={item.id}
                onClick={handlerItemClick}
              >
                <div className={style.selector} id={item.id}>
                  <input
                    type="checkbox"
                    name=""
                    id={item.id}
                    onChange={checkItemHandler}
                    checked={checkItems.includes(item.id)}
                  />
                </div>
                <div className={style.name} id={item.id}>
                  {item.name}
                </div>
                <div className={style.userId} id={item.id}>
                  {item.id}
                </div>

                <div className={style.deptTask} id={item.id}>
                  {item.job_name}
                </div>
                <div className={style.job} id={item.id}>
                  {item.task_name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={style.listZero}>등록된 사용자가 없습니다.</div>
        )}
      </div>
      <Pagination
        activePage={page}
        itemsCountPerPage={userPerPage}
        totalItemsCount={userList.length}
        pageRangeDisplayed={5}
        prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
        nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
        lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
        firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
        onChange={handlePageChange}
      ></Pagination>
    </div>
  );
};

export default UserManaged;
