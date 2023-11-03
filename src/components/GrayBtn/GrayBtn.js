import style from "./GrayBtn.module.css";

const GrayBtn = ({ title }) => {
  return <button className={style.grayBtn}>{title}</button>;
};

export default GrayBtn;
