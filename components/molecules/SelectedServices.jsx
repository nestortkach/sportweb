import { OptionButton } from "./OptionButton";
import style from "./SelectedServices.module.scss";
export const SelectedServices = ({ selectedServices, setSelectedServices }) => {
  const deleteService = (serviceId) => {
    setSelectedServices((selectedServices) =>
      selectedServices.filter((service) => service.ServiceId !== serviceId)
    );
  };
  return (
    <ul className={style.selectedContainer}>
      {selectedServices.map((service) => (
        <div className={style.selectedServices} key={service.ServiceId}>
          <li>{service.Name}</li>
          <OptionButton onClickHandler={() => deleteService(service.ServiceId)}>
            x
          </OptionButton>
        </div>
      ))}
    </ul>
  );
};
