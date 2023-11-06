import { useContext, useEffect, useState } from "react";
import WhiteBtn from "../../../../components/WhiteBtn/WhiteBtn";
import style from "./UserManaged.module.css";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import WorkTypeModal from "../components/WorkTypeModal/WorkTypeModal";
import OrganizationModal from "../components/OrganizationModal/OrganizationModal";
import PositionModal from "../components/PositionModal/PositionModal";
import { MenuContext } from "../../Office";
import { Link } from "react-router-dom";
import axios from "axios";

const UserManaged = () => {
  const { setSelectedMenu } = useContext(MenuContext);
  // 직원 총 인원수 불러오기
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
      setCheckItems(userList.map((item) => item.id));
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
  const showDeleteModal = () => {
    if (numChecked > 0) {
      setDeleteModalOpen(true);
    } else {
      setDeleteModalOpen(false);
    }
  };

  // 소속조직 모달창 기능
  const [organizationModalOpen, setOrganizationModalOpen] = useState(false);
  const showOrganizationModalOpen = () => {
    if (numChecked > 0) {
      setOrganizationModalOpen(true);
    } else {
      setOrganizationModalOpen(false);
    }
  };

  // 직위 수정 모달창 기능
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const showPositionModalOpen = () => {
    if (numChecked > 0) {
      setPositionModalOpen(true);
    } else {
      setPositionModalOpen(false);
    }
  };

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
      <div className={style.userMenu}>
        <div className={style.userMenu__select}>{numChecked}</div>
        <button onClick={showDeleteModal}>삭제</button>
        {deleteModalOpen && (
          <DeleteModal
            setDeleteModalOpen={setDeleteModalOpen}
            checkItems={checkItems}
          ></DeleteModal>
        )}
        <button onClick={showOrganizationModalOpen}>소속조직 수정</button>
        {organizationModalOpen && (
          <OrganizationModal
            setOrganizationModalOpen={setOrganizationModalOpen}
          ></OrganizationModal>
        )}
        <button onClick={showPositionModalOpen}>직위 수정</button>
        {positionModalOpen && (
          <PositionModal
            setPositionModalOpen={setPositionModalOpen}
          ></PositionModal>
        )}
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
                userList.length !== 0 && checkItems.length === userList.length
              }
            />
          </div>
          <div className={style.name}>이름</div>
          <div className={style.userId}>아이디</div>
          <div className={style.organization}>소속 조직</div>
          <div className={style.position}>직위</div>
        </div>

        {userList.length > 0 ? (
          <div className={style.userTable__body}>
            {userList.map((item, index) => (
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

                <div className={style.organization} id={item.id}>
                  {item.job_name}
                </div>
                <div className={style.position} id={item.id}>
                  {item.task_name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={style.listZero}>등록된 사용자가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default UserManaged;
