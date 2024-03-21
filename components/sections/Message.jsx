import { CustomButton } from "../molecules/CustomButton";
import style from "./Message.module.scss";
export const Message = ({ onClickHandler, children }) => {
  return (
    <div className={style.message}>
      <div>{children}</div>
      <CustomButton onClickHandler={onClickHandler}>OK</CustomButton>
    </div>
  );
};
