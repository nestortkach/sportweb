import { validateFields } from "../../utilities/validationData";
import { CustomButton } from "../molecules/CustomButton";
import { CustomInput } from "../molecules/CustomInput";
import { useState } from "react";
import style from "./ChangePassword.module.scss";
import getUrl from "../../lib/baseUrl";

export const ChangePassword = () => {
  const [errorFields, setErrorFields] = useState({
    emptyValues: [],
    invalidValues: [],
  });
  const [passwordData, setPasswordData] = useState({
    password: {
      text: "",
      type: "text",
    },
    confirmPassword: {
      text: "",
      type: "text",
    },
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: { ...passwordData[name], text: value },
    });
  };
  const validate = () => {
    const { validationSuccess, emptyValues, invalidValues } =
      validateFields(passwordData);
    !validationSuccess
      ? setErrorFields({ emptyValues, invalidValues })
      : setErrorFields({ emptyValues: [], invalidValues: [] });
    return validationSuccess;
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const isValidationSuccess = validate();
    if (!isValidationSuccess) return;
    const body = {
      password: passwordData.password.text,
    };
    console.log("asdasd");
    const response = await fetch(
      `${getUrl(process.env.NEXT_PUBLIC_CHANGEPASSWORD)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const value = await response.json();
    console.log(value);
  };
  return (
    <div className={style.changePassContainer}>
      <form className={style.changePassword} onSubmit={changePassword}>
        <div className={style.changePassword__title}>
          <p>Please enter your new password</p>
        </div>
        <CustomInput
          input={passwordData.password}
          handleInputs={handleInputs}
          name={"password"}
          title={"Password"}
          errorFields={errorFields}
        />
        <CustomInput
          input={passwordData.confirmPassword}
          handleInputs={handleInputs}
          name={"confirmPassword"}
          title={"Confirm password"}
          errorFields={errorFields}
        />
        <CustomButton type="submit">Change Password</CustomButton>
      </form>
    </div>
  );
};
