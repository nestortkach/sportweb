import { CustomSelect } from "../molecules/CustomSelect";
import { RegisterSection } from "./RegisterSection";
import style from "./RegisterDetails.module.scss";
import { alerts, gender, sources } from "../../utilities/dataTemplates";

export const RegisterDetails = ({ errorFields, details, setInputs }) => {
  const getOptions = (category) =>
    alerts.filter((alert) => alert.Category === category);

  return (
    <RegisterSection title={"Details"}>
      <div className={style.registerDetails}>
        <div>
          <CustomSelect
            name={"gender"}
            options={gender}
            errorFields={errorFields}
            setInputs={setInputs}
            section={details}
            sectionName={"details"}
          />
          <CustomSelect
            name={"source"}
            options={sources}
            errorFields={errorFields}
            setInputs={setInputs}
            section={details}
            sectionName={"details"}
          />
          <CustomSelect
            name={"allergies"}
            options={getOptions("Allergies")}
            errorFields={errorFields}
            setInputs={setInputs}
            section={details}
            sectionName={"details"}
            multiple={true}
          />
          <CustomSelect
            name={"medical"}
            options={getOptions("Medical")}
            errorFields={errorFields}
            multiple={true}
            setInputs={setInputs}
            section={details}
            sectionName={"details"}
          />
        </div>
      </div>
    </RegisterSection>
  );
};
