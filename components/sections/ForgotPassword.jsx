import { useState } from "react";
import { CustomInput } from "../molecules/CustomInput";
import { CustomButton } from "../molecules/CustomButton";
import style from "./ForgotPassword.module.scss";

export const ForgotPassword = () => {
  const [email, setEmail] = useState({ text: "", type: "email" });
  const [errorFields, setErrorFields] = useState({
    emptyValues: [],
    invalidValues: [],
  });
  const handleInputs = (e) => {
    setEmail({ ...email, text: e.target.value });
  };
  const validate = () => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emptyValues = [];
    const invalidValues = [];
    !email.text && emptyValues.push("email");
    !reg.test(email.text) && invalidValues.push("email");
    setErrorFields({ emptyValues, invalidValues });
    return !emptyValues.length && !invalidValues.length ? true : false;
  };
  const sendEmail = (e) => {
    e.preventDefault();
    const validationSuccess = validate();
    if (!validationSuccess) return;
    console.log(email.text);
  };
  return (
    <div>
      <CustomInput
        input={email}
        handleInputs={handleInputs}
        name={"email"}
        title={"E-mail"}
        errorFields={errorFields}
      />
      <div className={style.message}>
        We are going to send you an email with the reset password link
      </div>
      <CustomButton onClickHandler={sendEmail}>Send an email</CustomButton>
    </div>
  );
};
