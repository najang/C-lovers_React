import style from "./DeptTaskModal.module.css";
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

const DeptTaskModal = ({
  setDeptTaskModalOpen,
  checkItems,
  setDeptTaskModify,
  showSmallMenuModalOpen,
}) => {
  // 모달창 닫기
  const closeModal = () => {
    showSmallMenuModalOpen(false);
    setDeptTaskModalOpen(false);
  };

  // 모달창 외부 클릭시 창 닫기
  const backgroundRef = useRef(null);
  const handlerClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      closeModal();
    }
  };

  // 수정할 유저 ID 등록
  const [modifyUserList, setModifyUserList] = useState([
    { id: "", dept_task_id: "" },
  ]);
  useEffect(() => {
    setModifyUserList([]);
    checkItems.map((item) => {
      setModifyUserList((prev) => [...prev, { id: item, dept_task_id: "" }]);
    });
    console.log(modifyUserList);
  }, []);

  //select box 커스텀
  const [deptTask, setDeptTask] = useState([[]]);
  const [deptTaskItem, setDeptTaskItem] = useState({});
  const [showDeptTask, setShowDeptTask] = useState(false);
  useEffect(() => {
    axios.get("/office/detpTask").then((resp) => {
      setDeptTask(resp.data);
      setDeptTaskItem(resp.data[0]);
      console.log(resp.data);
      //setUserInfo((prev) => ({ ...prev, job_id: resp.data[0].id }));
    });
  }, []);

  // 선택한 소속 조직 등록
  const handlerSelectDeptTask = (deptTask) => {
    setDeptTaskItem(deptTask);
    setShowDeptTask(false);
    console.log(modifyUserList);
    setModifyUserList(
      modifyUserList.map((item, index) => {
        return { ...item, dept_task_id: deptTask.id };
      })
    );
  };

  // 사용자 소속 조직 수정
  const handleModifyUser = () => {
    console.log("저장 누름");
    console.log(modifyUserList);
    axios
      .post("/office/updateUserDeptTask", modifyUserList)
      .then((resp) => {
        alert("직위 수정이 완료되었습니다.");
        closeModal();
        setDeptTaskModify(true);
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
          <div className="title__title">소속조직 수정</div>
          <div className={style.close} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={style.modal__body}>
          <div
            className={style.selectionValue}
            onClick={() => setShowDeptTask(!showDeptTask)}
          >
            <div>{deptTaskItem.task_name}</div>
            <div>
              {showDeptTask ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
            </div>
          </div>
          {showDeptTask && (
            <div
              className={style.select__option}
              ref={backgroundRef}
              onClick={handlerClickBackground}
            >
              {deptTask.map((item, index) => (
                <div
                  className={`${style.option__item} ${
                    item === deptTaskItem ? "select" : ""
                  }`}
                  onClick={() => handlerSelectDeptTask(item)}
                  key={index}
                >
                  {item.task_name}
                </div>
              ))}
            </div>
          )}
          <div className={style.deleteBtn}>
            <GrayBtn title={"취소"}></GrayBtn>
            <GreenBtn
              title={"수정"}
              activation={true}
              onClick={handleModifyUser}
            ></GreenBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptTaskModal;
