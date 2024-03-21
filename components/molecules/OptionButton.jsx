import style from "./OptionButton.module.scss";
export const OptionButton = ({ children, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className={`button ${style.optionButton}`}>
      {children}
    </button>
  );
};
