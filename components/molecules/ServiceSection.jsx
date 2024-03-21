import { useEffect, useState } from "react";
import style from "./ServiceSection.module.scss";
import { SingleService } from "./SingleService";
export const ServiceSection = ({
  service,
  setSelectedServices,
  selectedServices,
  sectionIndex,
}) => {
  const [isDropedDown, setIsDropedDown] = useState(false);
  useEffect(() => {
    sectionIndex !== 1 && setIsDropedDown(false);
  }, [sectionIndex]);
  return (
    <li className={style.section}>
      <div
        onClick={() => setIsDropedDown(!isDropedDown)}
        className={style.section__item}
      >
        <div>{service.name}</div>
        <span
          className={`${style.section__arrow} ${
            isDropedDown ? style["arrow--active"] : style["arrow--default"]
          }`}
        >
          {">"}
        </span>
      </div>
      <div className={!isDropedDown ? style.dropedDown : ""}>
        {service.data.map((singleService, i) => (
          <SingleService
            key={i}
            service={singleService}
            setSelectedServices={setSelectedServices}
            selectedServices={selectedServices}
          />
        ))}
      </div>
    </li>
  );
};
