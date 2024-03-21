import { capitalize } from "../../utilities/helperFunctions";
import style from "./CustomSelectInput.module.scss";

export const CustomSelectInput = ({
  showOptions,
  isVisible,
  name,
  text,
  onInputChange,
}) => {
  return (
    <div onClick={showOptions} className={style.selectInput}>
      <input
        autoComplete={"off"}
        type="text"
        className={style.selectInput__input}
        name={name}
        value={text}
        onChange={onInputChange}
        placeholder={`Select ${capitalize(name)}`}
      />
      <div className={style.selectInput__buttonContainer}>
        <button
          type="button"
          className={`button ${style.selectInput__button} ${
            style[`selectInput__button--${isVisible ? "opened" : ""}`]
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
