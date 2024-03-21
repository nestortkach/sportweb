import style from "./SideBar.module.scss";
import { useEffect, useState } from "react";
import { SideBarDate } from "./SideBarDate";
import { SideBarService } from "./SideBarService";
import { SideBarConfirm } from "./SideBarConfirm";
import { LocationDropDown } from "../molecules/LocationDropDown";
import { ClickOutside } from "../molecules/ClickOutside";
import { emptyAppointment } from "../../utilities/validationData";
import { SideBarHeader } from "../molecules/SideBarHeader";
import { SideBarMenu } from "./SideBarMenu";
import { createClientPersonalData } from "../../utilities/helperFunctions";
import getUrl from "../../lib/baseUrl";

export const SideBar = ({ sidebar, preselectedName = null, setSidebar }) => {
  const [sectionIndex, setSectionIndex] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState(emptyAppointment);

  useEffect(() => {
    const getClient = async () => {
      try {
        const response = await fetch(
          `${getUrl(process.env.NEXT_PUBLIC_AUTHENTICATE)}`
        );
        const { client } = await response.json();
        console.log(client);
        if (!client) return;
        const clientsPersonalData = createClientPersonalData(client);
        setAppointmentInfo((appointmentInfo) => ({
          ...appointmentInfo,
          personalData: clientsPersonalData,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    getClient();
  }, []);
  return (
    <div
      className={`${style.container} ${
        style[`container--${sidebar ? "active" : "hide"}`]
      }`}
    >
      <ClickOutside
        setIsVisible={setSidebar}
        condition={sidebar}
        isScrolled={false}
      >
        <div
          className={`${style.sidebar} ${
            style[`sidebar--${sidebar ? "active" : "hide"}`]
          }`}
        >
          <SideBarHeader onClickHandler={() => setSidebar(false)} />
          <div className={style.bookingSection}>
            <SideBarMenu
              selectedServices={selectedServices}
              appointmentInfo={appointmentInfo}
              sectionIndex={sectionIndex}
              setSectionIndex={setSectionIndex}
              setAppointmentInfo={setAppointmentInfo}
            />
            <div>
              <div className={style.form}>
                <div
                  className={`${style.form__container} ${
                    style[`slide--${sectionIndex}`]
                  }`}
                >
                  <div className={style.service}>
                    <LocationDropDown
                      appointmentInfo={appointmentInfo}
                      setAppointmentInfo={setAppointmentInfo}
                    />
                    <SideBarService
                      sectionIndex={sectionIndex}
                      sidebar={sidebar}
                      preselectedName={preselectedName}
                      selectedServices={selectedServices}
                      setSelectedServices={setSelectedServices}
                      setSectionIndex={setSectionIndex}
                    />
                  </div>
                  <SideBarDate
                    selectedServices={selectedServices}
                    setSectionIndex={setSectionIndex}
                    appointmentInfo={appointmentInfo}
                    setAppointmentInfo={setAppointmentInfo}
                  />
                  <SideBarConfirm
                    setSidebar={setSidebar}
                    setSectionIndex={setSectionIndex}
                    sectionIndex={sectionIndex}
                    appointmentInfo={appointmentInfo}
                    setAppointmentInfo={setAppointmentInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClickOutside>
    </div>
  );
};
