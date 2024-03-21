import style from "./CustomButton.module.scss";
export const CustomButton = ({ children, onClickHandler }) => {
  return (
    <button
      className={`${style.bookingButton} button`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
