import { useState, useEffect } from "react";
import style from "./CustomSelect.module.scss";
import { Alarm } from "./Alarm";
import { SelectOptions } from "./SelectOptions";
import { CustomSelectItem } from "./CustomSelectItem";
import { CustomSelectInput } from "./CustomSelectInput";
import { capitalize, filterOptions } from "../../utilities/helperFunctions";
import { ClickOutside } from "./ClickOutside";

export const CustomSelect = ({
  options,
  name,
  errorFields,
  multiple = false,
  setInputs,
  section,
  sectionName,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [allOptions, setAllOptions] = useState(options);
  const [filterResults, setFilterResults] = useState(options);
  const [error, setError] = useState({ state: false, message: "" });
  const [text, setText] = useState("");

  const onInputChange = (e) => {
    setText(e.target.value);
    optionsSearch(e);
  };

  useEffect(() => {
    if (errorFields.emptyValues.indexOf(name) !== -1)
      setError({ state: true, message: "required" });
    else if (errorFields.invalidValues.indexOf(name) !== -1)
      setError({ state: true, message: "invalid data" });
    else setError({ ...error, state: false });
  }, [errorFields]);

  const showOptions = (e) =>
    setIsVisible(e.target.localName === "input" ? true : !isVisible);

  const handleSelection = (e) => {
    const value = e.target.getAttribute("value");
    const reqOption = options.find((option) => option.Name === value);
    setInputs((inputs) => ({
      ...inputs,
      [sectionName]: {
        ...inputs[sectionName],
        [name]: {
          ...inputs[sectionName][name],
          text: multiple
            ? [...inputs[sectionName][name].text, reqOption]
            : reqOption,
        },
      },
    }));
    if (multiple) {
      setAllOptions(allOptions.filter((option) => option.Name !== value));
      setFilterResults(allOptions.filter((option) => option.Name !== value));
    } else {
      setIsVisible(false);
    }
    setText(multiple ? "" : value);
  };

  const optionsSearch = (e) => setFilterResults(filterOptions(e, allOptions));

  const deleteOption = (selectedOption) => {
    setInputs((inputs) => ({
      ...inputs,
      [sectionName]: {
        ...inputs[sectionName],
        [name]: {
          ...inputs[sectionName][name],
          text: inputs[sectionName][name].text.filter(
            (option) => option.Name !== selectedOption.Name
          ),
        },
      },
    }));
    setAllOptions([...allOptions, selectedOption]);
    setFilterResults([...filterResults, selectedOption]);
  };

  return (
    <div className={style.customSelect}>
      <div className={style.customSelect__title}>
        <div>{capitalize(name)}</div>
        <div>
          <Alarm error={error} />
        </div>
      </div>
      <ClickOutside setIsVisible={setIsVisible}>
        {multiple && !!section[name].text.length && (
          <div className={style.selector__selectedOptions}>
            {section[name].text.map((option) => (
              <CustomSelectItem
                deleteOption={deleteOption}
                key={option.Name}
                option={option}
              />
            ))}
          </div>
        )}
        <div
          className={`${style.customSelect__selector} ${
            style[`customSelect__selector--${isVisible ? "opened" : ""}`]
          }`}
        >
          <CustomSelectInput
            showOptions={showOptions}
            isVisible={isVisible}
            name={name}
            text={text}
            onInputChange={onInputChange}
          />
        </div>
        <div className={style.customSelect__relativeBlock}>
          <SelectOptions
            filterResults={filterResults}
            handleSelection={handleSelection}
            isVisible={isVisible}
          />
        </div>
      </ClickOutside>
    </div>
  );
};
