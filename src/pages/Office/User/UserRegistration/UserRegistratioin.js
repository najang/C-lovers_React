import style from "./UserRegistration.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

import GrayBtn from "../../../../components/GrayBtn/GrayBtn";
import GreenBtn from "../../../../components/GreenBtn/GreenBtn";
import { MenuContext } from "../../Office";
import { Link } from "react-router-dom";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    console.log(userInfo);
  };

  //select box 커스텀
  const [position, setPosition] = useState([{}]);
  const [positionItem, setPositionItem] = useState({});
  useEffect(() => {
    axios.get("/office/position").then((resp) => {
      setPosition(resp.data);
      setPositionItem(resp.data[0]);
    });
  }, []);

  const [showPosition, setShowPosition] = useState(false);

  const handlerSelectPosition = (position) => {
    setPositionItem(position);
    setShowPosition(false);
    setUserInfo((prev) => ({ ...prev, job_id: position.id }));
  };

  //select box 커스텀

  const [department, setDepartment] = useState([{}]);
  const [departmentItem, setDepartmentItem] = useState({});
  useEffect(() => {
    axios.get("/office/detpTask").then((resp) => {
      setDepartment(resp.data);
      setDepartmentItem(resp.data[0]);
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
      setShowPosition(false);
      setShowDepartment(false);
    }
    console.log("test");
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
        <div className="info__jobPosition">
          <div className={style.info__title}>직위</div>
          <div
            className={style.selectionValue}
            onClick={() => {
              setShowPosition(!showPosition);
              setShowDepartment(false);
            }}
          >
            <div>{positionItem.job_name}</div>
            <div>
              {showPosition ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
            </div>
          </div>
          {showPosition && (
            <div
              className={style.select__option}
              ref={backgroundRef}
              onClick={handlerClickBackground}
            >
              {position.map((item, index) => (
                <div
                  className={`${style.option__item} ${
                    item === positionItem ? "select" : ""
                  }`}
                  onClick={() => handlerSelectPosition(item)}
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
              setShowPosition(false);
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
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="info__phone">
          <div className={style.info__title}>휴대전화</div>
          <div>
            <input
              type="text"
              placeholder="000-0000-0000"
              name="phone"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* <div className="info__officePhone">
          <div className={style.info__title}>사내 전화</div>
          <div>
            <input type="text" placeholder="000" />
          </div>
        </div> */}
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

          <GreenBtn title={"저장"} activation={true}></GreenBtn>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
