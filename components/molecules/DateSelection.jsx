import { useState } from "react";
import style from "./DateSelection.module.scss";
import { convertTZ } from "../../utilities/helperFunctions";
export const DateSelection = ({ period, goToConfirmPage }) => {
  const [isDropped, setIsDropped] = useState(false);

  const selectTime = (time) => {
    goToConfirmPage(time);
    setIsDropped(false);
  };
  const datePeriod = (hours) => {
    return `${convertTZ(hours[0].Start, "Asia/Dubai", true).time} - ${
      convertTZ(hours.at(-1).Start, "Asia/Dubai", true).time
    }`;
  };
  return (
    <div>
      <div onClick={() => setIsDropped(!isDropped)} className={style.dayPeriod}>
        <span>{period.name}:</span>
        {datePeriod(period?.hours)}
      </div>
      {isDropped && (
        <div className={style.dropDown}>
          {period?.hours?.map((hour) => (
            <div key={hour.Start} className={style.dropDown__item}>
              <button className="button" onClick={() => selectTime(hour)}>
                {convertTZ(hour.Start, "Asia/Dubai", true).time}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
