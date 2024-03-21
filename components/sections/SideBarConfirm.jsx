import style from "./SideBarConfirm.module.scss";

import { useState } from "react";
import { CheckButton } from "../molecules/CheckButton";
import { CustomInput } from "../molecules/CustomInput";
import { Spinner } from "../molecules/Spinner";
import { Warning } from "../molecules/Warning";

import { createNewAppointmentBody } from "../../utilities/createRequestbodies";
import { configureDate, convertTZ } from "../../utilities/helperFunctions";
import {
  validateTimes,
  sendPOSTRequest,
  createNewClient,
  checkClientAlreadyExist,
} from "../../utilities/requests";
import {
  emptyAppointment,
  validateFields,
} from "../../utilities/validationData";
import { Message } from "./Message";

export const SideBarConfirm = ({
  appointmentInfo,
  setAppointmentInfo,
  setSectionIndex,
  setSidebar,
}) => {
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState({ state: false, type: "spinner" });
  const [showServices, setShowServices] = useState(false);
  const [errorFields, setErrorFields] = useState({
    emptyValues: [],
    invalidValues: [],
  });

  const handleSucceedProcess = () => {
    setSectionIndex(1);
    setSidebar(false);
    setIsLoading({ ...isLoading, state: false });
    setAppointmentInfo(emptyAppointment);
  };

  const createNewAppointment = async (e) => {
    e.preventDefault();
    try {
      setWarning("");
      // fields validation
      const { validationSuccess, emptyValues, invalidValues } = validateFields(
        appointmentInfo.personalData
      );
      if (!validationSuccess) {
        setErrorFields({ emptyValues, invalidValues });
        return;
      }
      if (!policyAgreed) {
        setWarning("Please agree to the cancellation policy");
        return;
      }
      //

      setErrorFields({ emptyValues: [], invalidValues: [] });
      setIsLoading({ state: true, type: "spinner" });

      const clientExist = await checkClientAlreadyExist(
        appointmentInfo.personalData.email.text
      );
      let clientId;
      if (clientExist) {
        clientId = clientExist;
      }
      if (!clientExist) {
        const res = await createNewClient(appointmentInfo.personalData);
        clientId = res.Value;
      }
      const isDataBusy = await validateTimes(appointmentInfo);
      if (isDataBusy) {
        setIsLoading({ state: false, type: "spinner" });
        setWarning(isDataBusy);
        return;
      }
      const reqBody = createNewAppointmentBody(appointmentInfo, clientId);
      const path = {
        q: "appointments",
        SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
      };
      const response = await sendPOSTRequest(path, reqBody);
      if (!response.Value) {
        setIsLoading({ state: false, type: "spinner" });
        setWarning(response.Message);
        return;
      }
      setIsLoading({ state: true, type: "message" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setAppointmentInfo({
      ...appointmentInfo,
      personalData: {
        ...appointmentInfo.personalData,
        [name]: { ...appointmentInfo.personalData[name], text: value },
      },
    });
  };

  return (
    <div className={style.confirmSection}>
      {isLoading.state && (
        <div className={style.confirmSection__loader}>
          {isLoading.type === "spinner" ? (
            <Spinner />
          ) : isLoading.type === "message" ? (
            <Message onClickHandler={handleSucceedProcess}>
              Appointment created
            </Message>
          ) : (
            ""
          )}
        </div>
      )}
      <div className={style.genInfo}>
        <div className={style.genInfo__time}>
          <div>{configureDate(appointmentInfo.date?.Start)}</div>
          <div>
            at {convertTZ(appointmentInfo.date.Start, "Asia/Dubai", true).time}
          </div>
        </div>
        <div className={style.genInfo__services}>
          <button
            type="button"
            className={`button`}
            onClick={() => setShowServices(!showServices)}
          >
            Services
          </button>
          <div
            className={`${style.services__list} ${
              style[`services__list--${showServices ? "active" : "hidden"}`]
            }`}
          >
            {appointmentInfo.services?.map((service) => (
              <div key={service.ServiceId}>{service.Name}</div>
            ))}
          </div>
        </div>
      </div>
      {warning && <Warning>{warning}</Warning>}
      <div>
        <form className={style.confirmForm} onSubmit={createNewAppointment}>
          <div className={style.confirmForm__personalData}>
            <div className={style.personalData__nameContainer}>
              <CustomInput
                errorFields={errorFields}
                input={appointmentInfo.personalData.firstName}
                handleInputs={handleInputs}
                name={"firstName"}
                title={"First Name"}
              />
              <CustomInput
                errorFields={errorFields}
                input={appointmentInfo.personalData.lastName}
                handleInputs={handleInputs}
                name={"lastName"}
                title={"Last Name"}
              />
            </div>
            <CustomInput
              errorFields={errorFields}
              input={appointmentInfo.personalData.mobilePhone}
              handleInputs={handleInputs}
              name={"mobilePhone"}
              title={"Phone Number"}
            />
            <CustomInput
              errorFields={errorFields}
              input={appointmentInfo.personalData.email}
              handleInputs={handleInputs}
              name={"email"}
              title={"Email"}
            />
            <CustomInput
              errorFields={errorFields}
              input={appointmentInfo.personalData.country}
              handleInputs={handleInputs}
              name={"country"}
              title={"Country"}
            />
          </div>
          <div className={style.confirmForm__cancellation}>
            <div className={style.cancellation__title}>Cancellation policy</div>
            <div>
              For appointments canceled or resceduled within 24 hours we charge
              50% of the service total.
            </div>
            <div className={style.confirmForm__check}>
              <CheckButton
                onClickHandler={() => setPolicyAgreed(!policyAgreed)}
                condition={policyAgreed}
              />
              <div>I agree to the cancellation policy</div>
            </div>
          </div>
          <div className={style.confirmForm__comments}>
            <CustomInput
              errorFields={errorFields}
              title={"Comments"}
              input={appointmentInfo.personalData.comments}
              handleInputs={handleInputs}
              name={"comments"}
            />
          </div>
          <div className={style.confirmForm__button}>
            <button type="submit" className={`button`}>
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
