import style from "./RegisterSection.module.scss";
export const RegisterSection = ({ children, title }) => {
  return (
    <div className={style.registerSection}>
      <div className={style.registerSection__title}>{title}</div>
      {children}
    </div>
  );
};
