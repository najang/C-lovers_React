import style from "./JobModal.module.css";
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

const JobModal = ({ setJobModalOpen, checkItems }) => {
  // 모달창 닫기
  const closeModal = () => {
    setJobModalOpen(false);
  };

  // 모달창 외부 클릭시 창 닫기
  const backgroundRef = useRef(null);
  const handlerClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      closeModal();
    }
    console.log("배경");
  };

  // 수정할 유저 ID 등록
  const [modifyUserList, setModifyUserList] = useState([
    { id: "", job_id: "" },
  ]);
  useEffect(() => {
    setModifyUserList([]);
    checkItems.map((item) => {
      setModifyUserList((prev) => [...prev, { id: item, job_id: "" }]);
    });
    console.log(modifyUserList);
  }, []);

  // //select box 커스텀

  const [job, setJob] = useState([{}]);
  const [jobItem, setJobItem] = useState({});
  const [showJob, setShowJob] = useState(false);
  useEffect(() => {
    axios.get("/office/job").then((resp) => {
      setJob(resp.data);
      setJobItem(resp.data[0]);
      console.log(resp.data);
      //setUserInfo((prev) => ({ ...prev, job_id: resp.data[0].id }));
    });
  }, []);

  // 선택한 직위 등록
  const handlerSelectJob = (job) => {
    setJobItem(job);
    setShowJob(false);
    console.log(modifyUserList);

    setModifyUserList(
      modifyUserList.map((item, index) => {
        return { ...item, job_id: job.id };
      })
    );

    console.log(modifyUserList);
    // setUserInfo((prev) => ({ ...prev, job_id: job.id }));
  };

  // 사용자 직위 수정
  const handleModifyUser = () => {
    console.log("저장 누름");
    console.log(modifyUserList);
    axios
      .post("/office/updateUserJob", modifyUserList)
      .then((resp) => {
        alert("직위 수정이 완료되었습니다.");
        closeModal();
        window.location.replace("/admin/office/user");
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
          <div className="title__title">직위 수정</div>
          <div className={style.close} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={style.modal__body}>
          <div
            className={style.selectionValue}
            onClick={() => {
              setShowJob(!showJob);
            }}
          >
            <div>{jobItem.job_name}</div>
            <div>
              {showJob ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
            </div>
          </div>
          {showJob && (
            <div
              className={style.select__option}
              ref={backgroundRef}
              onClick={handlerClickBackground}
            >
              {job.map((item, index) => (
                <div
                  className={`${style.option__item} ${
                    item === jobItem ? "select" : ""
                  }`}
                  onClick={() => handlerSelectJob(item)}
                  key={index}
                >
                  {item.job_name}
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

export default JobModal;
