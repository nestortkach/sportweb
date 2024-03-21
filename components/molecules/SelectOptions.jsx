import style from "./SelectOptions.module.scss";
import { sortByProperty } from "../../utilities/helperFunctions";

export const SelectOptions = ({
  filterResults,
  isVisible,
  handleSelection,
}) => {
  return (
    <div
      className={`${style.selectOptions} ${
        style[`selectOptions--${isVisible ? "" : "hidden"}`]
      } ${style.scrollbar}`}
    >
      {!filterResults.length ? (
        <button
          disabled={true}
          className={`${style.selectOptions__option} button`}
        >
          <div>No results</div>
        </button>
      ) : (
        <>
          {sortByProperty(filterResults, "Name")?.map((option) => (
            <div
              onClick={handleSelection}
              value={option.Name}
              key={option.Name}
              className={style.selectOptions__option}
            >
              {option.Name}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
