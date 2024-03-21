import { useState, useEffect } from "react";
import style from "./SingleService.module.scss";
import { OptionButton } from "./OptionButton";
export const SingleService = ({
  service,
  selectedServices,
  setSelectedServices,
}) => {
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  useEffect(() => {
    setIsAlreadyAdded(
      selectedServices.some(
        (reqService) => reqService.ServiceId === service.ServiceId
      )
    );
  }, [selectedServices]);

  const handleService = () => {
    setSelectedServices(
      isAlreadyAdded
        ? selectedServices.filter(
            (reqService) => reqService.ServiceId !== service.ServiceId
          )
        : [...selectedServices, service]
    );
  };
  return (
    <div className={style.service__item}>
      <div>{service.Name}</div>
      <div className={style.service__options}>
        <span className={style.options__price}>{service.SellInclusive}$</span>
        <OptionButton onClickHandler={handleService}>
          {isAlreadyAdded ? "x" : "+"}
        </OptionButton>
      </div>
    </div>
  );
};
