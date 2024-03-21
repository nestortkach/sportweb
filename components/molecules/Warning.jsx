import style from "./Warning.module.scss";

export const Warning = ({ children }) => {
  return <div className={style.warning}>{children}</div>;
};
