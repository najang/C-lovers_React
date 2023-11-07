import style from "./UserRegistration.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import GrayBtn from "../../../../components/GrayBtn/GrayBtn";
import GreenBtn from "../../../../components/GreenBtn/GreenBtn";
import { MenuContext } from "../../Office";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegistration = () => {
  const { setSelectedMenu } = useContext(MenuContext);
  // 네비바가 user에 고정되도록 설정
  useEffect(() => {
    return () => setSelectedMenu("user");
  }, []);

  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: "",
    pw: "",
    birth: "",
    email: "",
    phone: "",
    hire_date: "",
    ent_date: "",
    inactivate: "",
    job_id: "",
    dept_task_id: "",
    emp_status_id: "",
    profile_img: "",
    daliy_work_rule_id: "",
  });

  // 이름, 입사일 입력 검사 및 이메일, 휴대전화 입력시 유효성 검사
  const [required, setRequired] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    console.log(userInfo.name);
    if (userInfo.name !== "" && userInfo.hire_date !== "") {
      setRequired(true);
    }
  });

  //select box 커스텀
  const [job, setJob] = useState([{}]);
  const [jobItem, setJobItem] = useState({});
  useEffect(() => {
    axios.get("/office/job").then((resp) => {
      setJob(resp.data);
      setJobItem(resp.data[0]);
      console.log(resp.data);
      setUserInfo((prev) => ({ ...prev, job_id: resp.data[0].id }));
    });
  }, []);

  const [showJob, setShowJob] = useState(false);

  const handlerSelectJob = (job) => {
    setJobItem(job);
    setShowJob(false);
    setUserInfo((prev) => ({ ...prev, job_id: job.id }));
  };

  //select box 커스텀

  const [department, setDepartment] = useState([{}]);
  const [departmentItem, setDepartmentItem] = useState({});
  useEffect(() => {
    axios.get("/office/detpTask").then((resp) => {
      setDepartment(resp.data);
      setDepartmentItem(resp.data[0]);
      setUserInfo((prev) => ({ ...prev, dept_task_id: resp.data[0].id }));
    });
  }, []);

  const [showDepartment, setShowDepartment] = useState(false);

  const handlerSelectDepartment = (department) => {
    setDepartmentItem(department);
    setShowDepartment(false);
    setUserInfo((prev) => ({ ...prev, dept_task_id: department.id }));
    console.log(userInfo);
  };

  // selectBox 외부 클릭시 창 닫기
  const backgroundRef = useRef(null);
  const handlerClickBackground = (e) => {
    if (
      !e.target.className.includes("UserRegistration_selectionValue") &&
      !e.target.className.includes("UserRegistration_option__item")
    ) {
      setShowJob(false);
      setShowDepartment(false);
    }
    console.log("test");
  };

  // 이메일 유효성 검사
  const [eamilFormat, setEmailFormat] = useState(true);
  let regexEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const isEmail = (email) => {
    const { name, value } = email.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setEmailFormat(regexEmail.test(value));
    if (value === "") {
      setEmailFormat(true);
    }
  };

  // 전화번호 유효성 검사
  const [phoneFormat, setPhoneFormat] = useState(true);
  let regexPhone = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  const isPhone = (phone) => {
    const { name, value } = phone.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setPhoneFormat(regexPhone.test(value));
    if (value === "") {
      setPhoneFormat(true);
    }
  };

  // 이메일, 전화번호 입력 시 유효성 검사 통과하면 저장 가능
  const [options, setOptions] = useState(true);
  useEffect(() => {
    if (!eamilFormat || !phoneFormat) {
      setOptions(false);
    } else {
      setOptions(true);
    }
  });

  // 사용자 정보 등록
  const navi = useNavigate();
  const handleAddUser = () => {
    console.log("저장 누름");
    console.log(userInfo);
    if (required) {
      axios
        .post("/office/userInsert", userInfo)
        .then((resp) => {
          navi("/office/user");
        })
        .catch((e) => {
          alert(
            "오류가 발생했습니다. 관리자에게 문의 하세요.\nemail : 0qwee0328@gmail.com"
          );
        });
    } else {
      alert("필수 정보를 입력해주세요");
    }
  };

  return (
    <div
      className={style.container}
      ref={backgroundRef}
      onClick={handlerClickBackground}
    >
      <div className={style.title}>사용자 개별 등록</div>
      <div className={style.userInfo}>
        <div className="info__name">
          <div className={style.info__title}>
            이름<span className={style.redDot}>*</span>
          </div>
          <div>
            <input type="text" name="name" onChange={handleChange} />
          </div>
        </div>
        <div className="info__hiredate">
          <div className={style.info__title}>
            입사일<span className={style.redDot}>*</span>
          </div>
          <div>
            <input type="date" name="hire_date" onChange={handleChange} />
          </div>
        </div>
        <div className="info__jobJob">
          <div className={style.info__title}>직위</div>
          <div
            className={style.selectionValue}
            onClick={() => {
              setShowJob(!showJob);
              setShowDepartment(false);
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
        </div>
        <div className="info__department">
          <div className={style.info__title}>부서</div>
          <div
            className={style.selectionValue}
            onClick={() => {
              setShowDepartment(!showDepartment);
              setShowJob(false);
            }}
          >
            <div>{departmentItem.task_name}</div>
            <div>
              {showDepartment ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
            </div>
          </div>
          {showDepartment && (
            <div
              className={style.select__option}
              ref={backgroundRef}
              onClick={handlerClickBackground}
            >
              {department.map((item, index) => (
                <div
                  className={`${style.option__item} ${
                    item === departmentItem ? "select" : ""
                  }`}
                  onClick={() => handlerSelectDepartment(item)}
                  key={index}
                >
                  {item.task_name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="info__email">
          <div className={style.info__title}>이메일</div>
          <div>
            <input
              type="text"
              placeholder="이메일 주소 입력"
              name="email"
              onChange={isEmail}
            />
          </div>
          {!eamilFormat && (
            <div className={style.isFormat}>
              이메일 형식이 올바르지 않습니다.
            </div>
          )}
        </div>
        <div className="info__phone">
          <div className={style.info__title}>휴대전화</div>
          <div>
            <input
              type="text"
              placeholder="000-0000-0000"
              name="phone"
              onChange={isPhone}
            />
          </div>
          {!phoneFormat && (
            <div className={style.isFormat}>
              전화번호 형식이 올바르지 않습니다.
            </div>
          )}
        </div>
        <div className="info__brith">
          <div className={style.info__title}>생년월일</div>
          <div>
            <input type="date" name="birth" onChange={handleChange} />
          </div>
        </div>

        <div className={style.insertBtns}>
          <Link to="/office/user">
            <GrayBtn title={"취소"}></GrayBtn>
          </Link>

          <GreenBtn
            title={"저장"}
            activation={required && options}
            onClick={handleAddUser}
          ></GreenBtn>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
