import { CustomInput } from "../molecules/CustomInput";
import { CustomSelect } from "../molecules/CustomSelect";
import { RegisterSection } from "./RegisterSection";

export const RegisterAddress = ({
  address,
  handleInputs,
  errorFields,
  setInputs,
}) => {
  const countries = [{ Name: "United Arab Emirates" }, { Name: "USA" }];
  return (
    <RegisterSection title={"Address"}>
      <CustomInput
        title={"Street"}
        input={address.street}
        handleInputs={handleInputs}
        name={"street"}
        errorFields={errorFields}
        section={"address"}
      />
      <CustomInput
        title={"City"}
        input={address.city}
        handleInputs={handleInputs}
        name={"city"}
        errorFields={errorFields}
        section={"address"}
      />
      <CustomInput
        title={"State"}
        input={address.state}
        handleInputs={handleInputs}
        name={"state"}
        errorFields={errorFields}
        section={"address"}
      />
      <CustomSelect
        name={"country"}
        options={countries}
        errorFields={errorFields}
        title={"Gender"}
        setInputs={setInputs}
        section={address}
        sectionName={"address"}
      />
      <CustomInput
        title={"Code"}
        input={address.code}
        handleInputs={handleInputs}
        name={"code"}
        errorFields={errorFields}
        section={"address"}
      />
    </RegisterSection>
  );
};
