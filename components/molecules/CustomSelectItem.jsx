import style from "./CustomSelectItem.module.scss";

export const CustomSelectItem = ({ option, deleteOption }) => {
  return (
    <div className={style.selectItem}>
      <div>
        <button
          onClick={() => deleteOption(option)}
          type="button"
          className={`button`}
        >
          x
        </button>
      </div>
      {option?.Name}
    </div>
  );
};
