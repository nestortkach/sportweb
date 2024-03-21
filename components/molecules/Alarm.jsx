import style from "./Alarm.module.scss";
export const Alarm = ({ error }) => {
  return (
    <div
      className={`${style.alarm} ${
        error.state ? style.alarm__active : style.alarm__hide
      }`}
    >
      <div className={style.alarm__sign}>!</div>
      <div className={style.alarm__text}>{error.message}</div>
    </div>
  );
};
