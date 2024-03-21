import style from "./SideBarDate.module.scss";

import { useEffect, useState } from "react";
import { DateSelection } from "../molecules/DateSelection";
import { Spinner } from "../molecules/Spinner";

import {
  getDayOfWeek,
  formatDate,
  createWeek,
  handleMonthSelection,
  createDatePeriods,
  createServicesIdsObj,
  fixUTC,
} from "../../utilities/helperFunctions";
import { months, daysWeek } from "../../utilities/dataTemplates";
import { sendGETRequest } from "../../utilities/requests";

export const SideBarDate = ({
  setSectionIndex,
  selectedServices,
  appointmentInfo,
  setAppointmentInfo,
}) => {
  const [counter, setCounter] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allAvailableHours, setAllAvailableHours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const goToConfirmPage = (time) => {
    setAppointmentInfo({
      ...appointmentInfo,
      services: selectedServices,
      date: time,
      filled: true,
    });
    setSectionIndex(3);
  };
  useEffect(() => {
    if (!selectedServices.length) return;
    const getAvailableHours = async () => {
      const path = {
        q: "Appointments/AvailableTimes",
        SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
        Day: formatDate(selectedDate),
        PackageId: "",
        ClientId: "",
        CartItems: "",
        ServiceSequence: 1,
        ...createServicesIdsObj(selectedServices),
      };
      try {
        setIsLoading(true);
        const availableHours = await sendGETRequest(path);
        fixUTC(availableHours);
        setAllAvailableHours(availableHours);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAvailableHours();
  }, [selectedServices, selectedDate]);

  const renderDay = (renderedDate, ind) => {
    const currentDayWeekShort = getDayOfWeek(ind).slice(0, 3);
    return (
      <div
        key={ind}
        onClick={() => setSelectedDate(renderedDate)}
        className={style.dateInfo}
      >
        <div className={style.dateInfo__dayofweek}>{currentDayWeekShort}</div>
        <div
          className={`${style.dateInfo__date} ${
            selectedDate.toDateString() === renderedDate.toDateString()
              ? style.selectedDate
              : ""
          }`}
        >
          {renderedDate?.getDate()}
        </div>
      </div>
    );
  };

  const handleCounter = (next) => {
    next
      ? setCounter((counter) => counter + 1)
      : !next && counter > 0
      ? setCounter((counter) => counter - 1)
      : "";
  };

  return (
    <div className={style.date}>
      <div className={style.calendar}>
        <div
          onClick={() => handleCounter(false)}
          className={style.calendar__arrow}
        >
          {"<"}
        </div>
        <div>
          <p className={style.calendar__header}>
            {handleMonthSelection(counter)} {selectedDate?.getFullYear()}
          </p>
        </div>
        <div
          onClick={() => handleCounter(true)}
          className={style.calendar__arrow}
        >
          {">"}
        </div>
      </div>
      <div className={style.calendar__currentWeek}>
        {createWeek(counter)?.map((date, ind) => renderDay(date, ind))}
      </div>
      <div className={style.calendar__selectedDateInfo}>
        Selected Date:{" "}
        <span>
          {daysWeek[selectedDate.getDay()]}, {months[selectedDate?.getMonth()]}{" "}
          {selectedDate?.getDate()}, {selectedDate?.getFullYear()}
        </span>
      </div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div>
          {!allAvailableHours.length ? (
            <div className={style.date__warning}>
              <p className={style.warning__title}>
                No available hours could be found...
              </p>
              <p>Try to choose another date or experince</p>
            </div>
          ) : (
            <>
              {createDatePeriods(allAvailableHours)?.map(
                (period) =>
                  !!period.hours.length && (
                    <DateSelection
                      key={period.name}
                      goToConfirmPage={goToConfirmPage}
                      period={period}
                    />
                  )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
