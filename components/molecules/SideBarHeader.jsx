import style from "./SideBarHeader.module.scss";

export const SideBarHeader = ({ onClickHandler }) => {
  return (
    <div className={style.sidebarHeader}>
      <p className={style.sidebarHeader__text}>Book an Appointment</p>
      <div className={style.sidebarHeader__buttonContainer}>
        <button
          className={`button ${style.sidebarHeader__buttonClose}`}
          onClick={onClickHandler}
        >
          x
        </button>
      </div>
    </div>
  );
};
