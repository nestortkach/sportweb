import style from "./Login.module.scss";
import { useState, useEffect } from "react";
import { CustomInput } from "../molecules/CustomInput";
import { createPath } from "../../utilities/helperFunctions";
import {
  emptyLoginIputs,
  validateFields,
} from "../../utilities/validationData";
import getUrl from "../../lib/baseUrl";
import { CustomButton } from "../molecules/CustomButton";

export const Login = ({ setIsLoading, setWarning, setModalContent }) => {
  const [inputs, setInputs] = useState(emptyLoginIputs);
  const [errorFields, setErrorFields] = useState({
    emptyValues: [],
    invalidValues: [],
  });
  const validate = () => {
    const { validationSuccess, emptyValues, invalidValues } =
      validateFields(inputs);
    !validationSuccess
      ? setErrorFields({ emptyValues, invalidValues })
      : setErrorFields({ emptyValues: [], invalidValues: [] });
    return validationSuccess;
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: { ...inputs[name], text: value },
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      setWarning((warning) => ({ ...warning, state: false }));
      // field validation
      const isValidationSuccess = validate();
      if (!isValidationSuccess) return;

      setIsLoading({ state: true, type: "spinner" });
      const path = {
        username: inputs.email.text,
        password: inputs.password.text,
      };
      const response = await fetch(
        `${getUrl(process.env.NEXT_PUBLIC_LOGIN)}${createPath(path)}`
      );
      const logedIn = await response.json();
      if (logedIn.error) {
        setIsLoading({ state: false, type: "spinner" });
        setWarning({ state: true, message: logedIn.error });
      } else {
        setIsLoading({ state: true, type: "message" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={style.login} onSubmit={login}>
      <div className={style.login__inputs}>
        <CustomInput
          input={inputs.email}
          handleInputs={handleInputs}
          name={"email"}
          title={"E-mail"}
          errorFields={errorFields}
        />
        <CustomInput
          input={inputs.password}
          handleInputs={handleInputs}
          name={"password"}
          title={"Password"}
          errorFields={errorFields}
        />
      </div>
      <div className={style.login__loginButton}>
        <button type="submit" className={`button`}>
          Login
        </button>
      </div>
      {/* <div className={style.login__forgotPass}>
        <button
          type="button"
          onClick={() =>
            setModalContent({ login: false, register: false, forgotPass: true })
          }
        >
          Forgot Password?
        </button>
      </div> */}
      <div className={style.modal__registerButton}>
        <p>{"Don't have an account yet?"}</p>
        <div>
          <CustomButton
            onClickHandler={() =>
              setModalContent({
                login: false,
                register: true,
                forgotPass: false,
              })
            }
          >
            Register
          </CustomButton>
        </div>
      </div>
    </form>
  );
};
