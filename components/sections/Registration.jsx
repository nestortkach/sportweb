import style from "./RegistrationSection.module.scss";
import { useState, useEffect } from "react";

import { RegisterPersonal } from "./RegisterPersonal";
import {
  emptyRegisterIputs,
  validateFields,
} from "../../utilities/validationData";

import { getKeys } from "../../utilities/helperFunctions";
import { RegisterDetails } from "./RegisterDetails";
import { RegisterAddress } from "./RegisterAddress";
import { Register } from "./Register";

export const Registration = ({ setIsLoading, setWarning, warning }) => {
  const [errorFields, setErrorFields] = useState({
    emptyValues: [],
    invalidValues: [],
  });
  const [inputs, setInputs] = useState(emptyRegisterIputs);
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    setWarning({ ...warning, state: false });
  }, []);

  const handleInputs = (e, section) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [section]: {
        ...inputs[section],
        [name]: { ...inputs[section][name], text: value },
      },
    });
  };

  const passwordsMatch = () => {
    if (
      inputs.personalData.password.text !==
      inputs.personalData.confirmPassword.text
    ) {
      setWarning({ state: true, message: "Passwords do not match" });
      return false;
    } else {
      setWarning({ ...warning, state: false });
      return true;
    }
  };

  const nextSection = () => {
    if (sectionIndex === 2) return;
    const validationSuccess = validate(getKeys(inputs)[sectionIndex]);
    const passwordsEqual = passwordsMatch();
    if (!passwordsEqual || !validationSuccess) return;
    setSectionIndex((sectionIndex) => sectionIndex + 1);
  };

  const prevSection = () => {
    if (sectionIndex === 0) return;
    setSectionIndex((sectionIndex) => sectionIndex - 1);
  };

  const validate = (section) => {
    const { validationSuccess, emptyValues, invalidValues } = validateFields({
      ...inputs[section],
    });
    if (!validationSuccess) {
      setErrorFields({ emptyValues, invalidValues });
    } else setErrorFields({ emptyValues: [], invalidValues: [] });

    return validationSuccess;
  };

  return (
    <div className={style.registerContainer}>
      <form className={`${style.register} ${style[`slide--${sectionIndex}`]}`}>
        <RegisterPersonal
          handleInputs={handleInputs}
          personalData={inputs.personalData}
          errorFields={errorFields}
        />
        <RegisterAddress
          handleInputs={handleInputs}
          address={inputs.address}
          errorFields={errorFields}
          setInputs={setInputs}
        />
        <RegisterDetails
          errorFields={errorFields}
          setInputs={setInputs}
          details={inputs.details}
        />
      </form>
      <Register
        setWarning={setWarning}
        setIsLoading={setIsLoading}
        inputs={inputs}
        sectionIndex={sectionIndex}
        validate={validate}
      />
      <div className={style.register__buttons}>
        <div>
          {sectionIndex !== 0 && (
            <button className={`button`} onClick={prevSection}>
              back
            </button>
          )}
        </div>
        <div>
          {sectionIndex !== 2 && (
            <button className={`button`} onClick={nextSection}>
              next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
