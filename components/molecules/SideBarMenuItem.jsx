import style from "./SideBarMenuItem.module.scss";
export const SideBarMenuItem = ({
  sectionIndex,
  index,
  onClickHandler,
  active,
  children,
}) => {
  return (
    <li>
      <button
        onClick={onClickHandler}
        className={`button ${active && style[`menuItem--active`]} ${
          style.menuItem
        } ${sectionIndex === index && style[`menuItem--selected`]}`}
      >
        {children}
      </button>
    </li>
  );
};
