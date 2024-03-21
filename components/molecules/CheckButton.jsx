import { useState } from "react";
import style from "./CheckButton.module.scss";
export const CheckButton = ({ onClickHandler, condition }) => {
  const [isChecked, setIsChecked] = useState(false);

  const buttonHander = () => {};

  return (
    <button
      onClick={onClickHandler}
      type="button"
      className={`button ${style.checkButton} ${
        condition ? style.checked : ""
      }`}
    >
      <div className={style.checkButton__innerCicrle}></div>
    </button>
  );
};
