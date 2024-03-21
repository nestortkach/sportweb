import style from "./SideBarService.module.scss";

import { useEffect, useState } from "react";
import { CustomButton } from "../molecules/CustomButton";
import { Warning } from "../molecules/Warning";
import { ServiceSection } from "../molecules/ServiceSection";
import { Spinner } from "../molecules/Spinner";
import { PreSelectedService } from "./PreSelectedService";

import { sendGETRequest } from "../../utilities/requests";
import { createServiceTypes } from "../../utilities/helperFunctions";
import { SelectedServices } from "../molecules/SelectedServices";

export const SideBarService = ({
  preselectedName,
  selectedServices,
  setSelectedServices,
  sidebar,
  setSectionIndex,
  sectionIndex,
}) => {
  const [preselectedService, setPreselectedService] = useState();
  const [allServices, setAllServices] = useState([]);
  const [warning, setWarning] = useState({ state: false, message: "" });
  const [serviceContent, setServiceContent] = useState(false);

  const getServices = async () => {
    try {
      const path = {
        q: "services",
        SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
      };
      const services = await sendGETRequest(path);
      setAllServices(services);
    } catch (err) {
      console.error(err);
    }
  };

  // Adding Services
  const addNewService = (service) => {
    const serviceExist = selectedServices.find(
      (reqService) => reqService.ServiceId === service.ServiceId
    );
    if (serviceExist) return;
    setSelectedServices([...selectedServices, service]);
  };

  const addAnotherService = () => {
    setServiceContent(true);
    if (!allServices.length) {
      getServices();
    }
    addNewService(preselectedService);
  };

  const goToDateSection = () => {
    setWarning({
      state: !selectedServices.length,
      message: "Select at least one service to proceed",
    });
    if (!selectedServices.length) {
      return;
    }
    setSectionIndex(2);
  };
  //
  const getPreselectedService = async (preselectedName) => {
    try {
      if (preselectedService) return;
      const path = {
        q: "services",
        SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
        Find: preselectedName,
      };
      const findedServices = await sendGETRequest(path);
      setPreselectedService(findedServices[0]);
      addNewService(findedServices[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (preselectedName && sidebar) {
      getPreselectedService(preselectedName);
    } else if (!preselectedName && sidebar) {
      setServiceContent(true);
      getServices();
    }
  }, [sidebar]);

  return (
    <>
      {!serviceContent && (
        <>
          {!preselectedService ? (
            <Spinner />
          ) : (
            <>
              <PreSelectedService preselectedService={preselectedService} />
              <div className={style.services__preSelButtons}>
                <CustomButton onClickHandler={addAnotherService}>
                  Add Service
                </CustomButton>
                <CustomButton onClickHandler={goToDateSection}>
                  Select Date
                </CustomButton>
              </div>
            </>
          )}
        </>
      )}
      {(!preselectedName || serviceContent) && (
        <>
          {!allServices.length ? (
            <Spinner />
          ) : (
            <div className={style.services}>
              {!!selectedServices.length && (
                <div className={style.services__selected}>
                  <p>Selected Services:</p>
                  <SelectedServices
                    selectedServices={selectedServices}
                    setSelectedServices={setSelectedServices}
                  />
                </div>
              )}
              <ul className={`${style.zeroUl} `}>
                {createServiceTypes(allServices, preselectedService)?.map(
                  (service, i) => (
                    <ServiceSection
                      sectionIndex={sectionIndex}
                      key={i}
                      service={service}
                      selectedServices={selectedServices}
                      setSelectedServices={setSelectedServices}
                    />
                  )
                )}
              </ul>
              {warning.state && <Warning>{warning.message}</Warning>}
            </div>
          )}
          {serviceContent && !!allServices.length && (
            <div className={style.services__button}>
              <CustomButton onClickHandler={goToDateSection}>
                Select Date
              </CustomButton>
            </div>
          )}
        </>
      )}
    </>
  );
};
