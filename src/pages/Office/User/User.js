import { useState } from "react";
import WhiteBtn from "../../../components/WhiteBtn/WhiteBtn";
import style from "./User.module.css";

const User = () => {
  // const [isAllChecked, setAllChecked] = useState(false);
  // const [checkedState, setCheckedState] = useState(new Array(5).fill(false));
  // const handleAllCheck = () => {
  //   setAllChecked((prev) => !prev);
  //   let array = new Array(5).fill(!isAllChecked);
  //   setCheckedState(array);
  // };
  // const handleMonoCheck = (position) => {
  //   const updatedCheckedState = checkedState.map((item, index) => {
  //     //index === position ? !item : item;
  //   });
  //   setCheckedState(updatedCheckedState);
  //   const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
  //     if (currentState === true) {
  //       return sum + 1;
  //     }
  //     return sum;
  //   }, 0);
  //   setAllChecked(checkedLength === updatedCheckedState.length);
  // };
  // const checkList = [
  //   ...Array(5)
  //     .fill("체크")
  //     .map((v, i) => v + i),
  // ];
  const [checkItems, setCheckItems] = useState([]);
  const numChecked = checkItems.length;
  const checkItemHandler = (e) => {
    const isChecked = checkItems.includes(e.target.id);
    if (isChecked) {
      console.log("체크 풀ㄹ러줘");
      setCheckItems((prev) => prev.filter((el) => el !== e.target.id));
    } else {
      setCheckItems((prev) => [...prev, e.target.id]);
    }
    console.log(checkItems);
  };
  const allCheckedHandler = (e) => {
    if (e.target.checked) {
      setCheckItems(checkList.map((item) => item.id));
    } else {
      setCheckItems([]);
    }
    console.log(`allcheck=`, e.target.checked);
  };
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
  // const [checkedListById, setCheckedListById] = useState([]);
  // const numChecked = checkedListById.length;

  // const handleOnChage = (id) => {
  //   const isChecked = checkedListById.includes(id);
  //   if (isChecked) {
  //     setCheckedListById((prev) => prev.filter((el) => el !== id));
  //   } else {
  //     setCheckedListById((prev) => [...prev, id]);
  //   }
  // };
  // const toggleAllCheckedById = ({ target: { checked } }) => {
  //   if (checked) {
  //     setCheckedListById(rows.map((row) => row.id));
  //   } else {
  //     setCheckedListById([]);
  //   }
  // };
  return (
    <div className={style.user__container}>
      <div className={style.title}>사용자 관리</div>
      <div className={style.userInfo}>
        <div className="userInfo__tag">사용자</div>
        <div className="userInfo__count">11명</div>
        <div className="userInfo__plusBtn">
          <WhiteBtn title="사용자 등록"></WhiteBtn>
        </div>
      </div>
      <div className={style.userMenu}>
        <span className="userMenu__select">{numChecked}</span>
        <button>삭제</button>
        <button>근로형태 수정</button>
        <button>소속조직 수정</button>
        <button>직위 수정</button>
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
            <div className={style.body__userInfo} key={item.id}>
              <div className={style.selector}>
                <input
                  type="checkbox"
                  name=""
                  id={item.id}
                  onChange={checkItemHandler}
                  checked={checkItems.includes(item.id)}
                />
              </div>
              <div className={style.name}>이름</div>
              <div className={style.userId}>사번</div>
              <div className={style.worktype}>근로 형태</div>
              <div className={style.organization}>소속 조직</div>
              <div className={style.position}>직위</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
