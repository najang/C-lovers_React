import style from "./GreenBtn.module.css";

const GreenBtn = ({ title, activation, onClick }) => {
  const activationColorStyle = {
    backgroundColor: activation ? "#75b47d" : "#BBBE8F",
  };
  // const disabledStyle = () => {
  //   if (activation) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  // const handlerDelete = () => {
  //   if (activation) {
  //     console.log("delete");
  //   }
  // };
  return (
    <button
      className={style.greenBtn}
      style={activationColorStyle}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default GreenBtn;
