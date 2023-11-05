import { useContext, useEffect, useState } from "react";
import WhiteBtn from "../../../../components/WhiteBtn/WhiteBtn";
import style from "./UserManaged.module.css";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import WorkTypeModal from "../components/WorkTypeModal/WorkTypeModal";
import OrganizationModal from "../components/OrganizationModal/OrganizationModal";
import PositionModal from "../components/PositionModal/PositionModal";
import { MenuContext } from "../../Office";
import { Link, Routes, Route } from "react-router-dom";

const UserManaged = () => {
  const { setSelectedMenu } = useContext(MenuContext);
  // 네비바가 user에 고정되도록 설정
  useEffect(() => {
    return () => setSelectedMenu("user");
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
    console.log(checkItems);
  };
  // 최 상위 체크박스를 클릭했을 때 모든 체크박스를 누르거나, 제거하는 기능
  const allCheckedHandler = (e) => {
    if (e.target.checked) {
      setCheckItems(checkList.map((item) => item.id));
    } else {
      setCheckItems([]);
    }
    console.log(`allcheck=`, e.target.checked);
  };
  // 체크박스 리스트
  const checkList = [
    {
      id: "체크1",
    },
    {
      id: "체크2",
    },
    {
      id: "체크3",
    },
    {
      id: "체크4",
    },
    {
      id: "체크5",
    },
    {
      id: "체크6",
    },
    {
      id: "체크7",
    },
    {
      id: "체크8",
    },
    {
      id: "체크9",
    },
    {
      id: "체크10",
    },
  ];

  const handlerItemClick = (e) => {
    console.log(e.target.id);
    checkItemHandler(e);
  };

  // 삭제 모달창 기능
  // 모달창 노출 여부
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const showDeleteModal = () => {
    console.log(numChecked);
    if (numChecked > 0) {
      setDeleteModalOpen(true);
    } else {
      setDeleteModalOpen(false);
    }
  };

  // 근로 형태 모달창 기능
  const [workTypeModalOpen, setWorkTypeModalOpen] = useState(false);
  const showWorkTypeModalOpen = () => {
    if (numChecked > 0) {
      setWorkTypeModalOpen(true);
    } else {
      setWorkTypeModalOpen(false);
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
        <div className="userInfo__count">11명</div>
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
          <DeleteModal setDeleteModalOpen={setDeleteModalOpen}></DeleteModal>
        )}
        <button onClick={showWorkTypeModalOpen}>근로형태 수정</button>
        {workTypeModalOpen && (
          <WorkTypeModal
            setWorkTypeModalOpen={setWorkTypeModalOpen}
          ></WorkTypeModal>
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
              checked={checkItems.length === checkList.length}
            />
          </div>
          <div className={style.name}>이름</div>
          <div className={style.userId}>사번</div>
          <div className={style.worktype}>근로 형태</div>
          <div className={style.organization}>소속 조직</div>
          <div className={style.position}>직위</div>
        </div>
        <div className="userTable__body">
          {checkList.map((item) => (
            <div
              className={style.body__userInfo}
              key={item.id}
              id={item.id}
              onClick={handlerItemClick}
            >
              <div className={style.selector}>
                <input
                  type="checkbox"
                  name=""
                  id={item.id}
                  onChange={checkItemHandler}
                  checked={checkItems.includes(item.id)}
                />
              </div>
              <div className={style.name} id={item.id}>
                이름
              </div>
              <div className={style.userId} id={item.id}>
                사번
              </div>
              <div className={style.worktype} id={item.id}>
                근로 형태
              </div>
              <div className={style.organization} id={item.id}>
                소속 조직
              </div>
              <div className={style.position} id={item.id}>
                직위
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManaged;
