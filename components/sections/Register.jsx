import style from "./Registration.module.scss";
import { CustomButton } from "../molecules/CustomButton";
import { createPath, getKeys } from "../../utilities/helperFunctions";
import { createRegisterBody } from "../../utilities/createRequestbodies";
import getUrl from "../../lib/baseUrl";

export const Register = ({
  setIsLoading,
  validate,
  sectionIndex,
  inputs,
  selectors,
  setWarning,
}) => {
  const register = async (e) => {
    e.preventDefault();
    try {
      setWarning((warning) => ({ ...warning, state: false }));
      const validationSucceed = validate(getKeys(inputs)[sectionIndex]);
      if (!validationSucceed) return;
      setIsLoading({ state: true, type: "spinner" });
      const reqBody = await createRegisterBody(inputs, selectors);
      const path = {
        email: inputs.personalData.email.text,
      };
      const response = await fetch(
        `${getUrl(process.env.NEXT_PUBLIC_REGISTER)}${createPath(path)}`,
        {
          method: "POST",
          body: JSON.stringify(reqBody),
        }
      );
      const register = await response.json();
      if (register.error) {
        setIsLoading({ state: false, type: "spinner" });
        setWarning({
          state: true,
          message: register.error,
        });
      } else setIsLoading({ state: true, type: "message" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={`${style.registration} ${
          style[`${sectionIndex === 2 ? "active" : "hide"}`]
        }`}
      >
        {sectionIndex === 2 && (
          <CustomButton onClickHandler={register}>Register</CustomButton>
        )}
      </div>
    </>
  );
};
