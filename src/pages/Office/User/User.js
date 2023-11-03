import style from "./User.module.css";

const User = () => {
  return (
    <div className="user-container">
      <div className="title">사용자 관리</div>
      <div className="userInfo">
        <div className="userInfo__tag">사용자</div>
        <div className="userInfo__count">11명</div>
        <div className="userInfo__plusBtn">
          <button>사용자 등록</button>
        </div>
      </div>
      <div className="userMenu">
        <span className="userMenu__select">0</span>
        <button>삭제</button>
        <button>근로형태 수정</button>
        <button>소속조직 수정</button>
        <button>직위 수정</button>
      </div>
      <div className="userTable">
        <div className="userTable__header">
          <div className="header__selector">
            <input type="checkbox" name="" id="" />
          </div>
          <div className="header__name">이름</div>
          <div className="header__id">사번</div>
          <div className="header__worktype">근로 형태</div>
          <div className="header__organization">소속 조직</div>
          <div className="header__position">직위</div>
        </div>
        <div className="userTable__body">
          <div className="body__userInfo">
            <div className="userInfo__selector">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="userInfo__name">이름</div>
            <div className="userInfo__id">사번</div>
            <div className="userInfo__worktype">근로 형태</div>
            <div className="userInfo__organization">소속 조직</div>
            <div className="userInfo__position">직위</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
