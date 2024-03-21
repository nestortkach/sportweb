import { useEffect, useState } from "react";
import { Alarm } from "./Alarm";
import style from "./CustomInput.module.scss";
import { capitalize } from "../../utilities/helperFunctions";

export const CustomInput = ({
  handleInputs,
  name,
  input,
  errorFields,
  section = null,
  title,
}) => {
  const [error, setError] = useState({ state: false, message: "" });
  useEffect(() => {
    if (errorFields.emptyValues.indexOf(name) !== -1)
      setError({ state: true, message: "required" });
    else if (errorFields.invalidValues.indexOf(name) !== -1)
      setError({ state: true, message: "invalid data" });
    else setError({ ...error, state: false });
  }, [errorFields]);

  return (
    <div className={style.inputContainer}>
      <div className={style.inputContainer__title}>
        <div>{title}</div>
        <div>
          <Alarm error={error} />
        </div>
      </div>
      <input
        className={style.customInput}
        name={name}
        value={input.text}
        onChange={(e) => handleInputs(e, section)}
        type={input.type}
        placeholder={`${name === "confirmPassword" ? "" : "Enter"} ${title}`}
      />
    </div>
  );
};
