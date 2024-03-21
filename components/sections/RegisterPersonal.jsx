import { CustomInput } from "../molecules/CustomInput";
import style from "./RegisterPersonal.module.scss";
import { RegisterSection } from "./RegisterSection";

export const RegisterPersonal = ({
  personalData,
  handleInputs,
  errorFields,
}) => {
  return (
    <RegisterSection title={"Personal Data"}>
      <CustomInput
        input={personalData.firstName}
        handleInputs={handleInputs}
        name={"firstName"}
        title={"First Name"}
        errorFields={errorFields}
        section={"personalData"}
      />
      <CustomInput
        input={personalData.lastName}
        handleInputs={handleInputs}
        name={"lastName"}
        title={"Last Name"}
        errorFields={errorFields}
        section={"personalData"}
      />
      <CustomInput
        input={personalData.phone}
        handleInputs={handleInputs}
        name={"phone"}
        title={"Phone"}
        errorFields={errorFields}
        section={"personalData"}
      />
      <CustomInput
        input={personalData.email}
        handleInputs={handleInputs}
        name={"email"}
        title={"E-mail"}
        errorFields={errorFields}
        section={"personalData"}
      />
      <CustomInput
        input={personalData.password}
        handleInputs={handleInputs}
        name={"password"}
        title={"Password"}
        errorFields={errorFields}
        section={"personalData"}
      />
      <CustomInput
        input={personalData.confirmPassword}
        handleInputs={handleInputs}
        name={"confirmPassword"}
        title={"Confirm Password"}
        errorFields={errorFields}
        section={"personalData"}
      />
    </RegisterSection>
  );
};
