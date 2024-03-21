import { useEffect, useRef } from "react";
import style from "./ClickOutside.module.scss";
export const ClickOutside = ({
  children,
  setIsVisible,
  condition = null,
  isScrolled = true,
}) => {
  const container = useRef(null);
  useEffect(() => {
    const handleClickOutsideSidebar = (e) => {
      if (container?.current && !container?.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    if (!isScrolled) {
      document.body.style.overflow = condition ? "hidden" : "auto";
      document.body.style.paddingRight = condition ? "15px" : "0px";
    }
    document.addEventListener("mousedown", handleClickOutsideSidebar);
    return () => {
      if (!isScrolled) {
        document.body.style.overflow = "auto";
      }
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
    };
  }, [condition && condition]);
  return (
    <div className={style.container} ref={container}>
      {children}
    </div>
  );
};
