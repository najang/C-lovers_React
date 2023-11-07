import style from "./WhiteBtn.module.css";

const WhiteBtn = ({ title }) => {
  return <button className={style.whiteBtn}>{title}</button>;
};

export default WhiteBtn;
