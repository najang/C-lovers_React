import style from "./GrayBtn.module.css";

const GrayBtn = ({ title, onClick }) => {
  return (
    <button className={style.grayBtn} onClick={onClick}>
      {title}
    </button>
  );
};

export default GrayBtn;
