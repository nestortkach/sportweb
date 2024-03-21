import { emptyAppointment } from "../../utilities/validationData";
import { SideBarMenuItem } from "../molecules/SideBarMenuItem";
import style from "./SideBarMenu.module.scss";

export const SideBarMenu = ({
  sectionIndex,
  setSectionIndex,
  selectedServices,
  appointmentInfo,
  setAppointmentInfo,
}) => {
  const menuItemHandler = (sectionInd) => {
    setSectionIndex(sectionInd);
    if (sectionInd === 3) return;
    setAppointmentInfo({
      ...emptyAppointment,
      personalData: appointmentInfo.personalData,
    });
  };

  return (
    <ul className={style.sidebarMenu}>
      <SideBarMenuItem
        sectionIndex={sectionIndex}
        index={1}
        onClickHandler={() => menuItemHandler(1)}
        active={true}
      >
        Service
      </SideBarMenuItem>
      <span>{">"}</span>
      <SideBarMenuItem
        sectionIndex={sectionIndex}
        index={2}
        onClickHandler={() => !!selectedServices.length && menuItemHandler(2)}
        active={!!selectedServices.length}
      >
        Day & Time
      </SideBarMenuItem>
      <span>{">"}</span>
      <SideBarMenuItem
        sectionIndex={sectionIndex}
        index={3}
        onClickHandler={() => appointmentInfo.filled && menuItemHandler(3)}
        active={appointmentInfo.filled}
      >
        Confirm
      </SideBarMenuItem>
    </ul>
  );
};
// https://formation-nextjs-f3e3bi9ic-formation1.vercel.app/api/handler
