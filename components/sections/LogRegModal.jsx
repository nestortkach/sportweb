import { useState, useEffect } from "react";
import style from "./LogRegModal.module.scss";
import { Login } from "./Login";
import { Spinner } from "../molecules/Spinner";
import { Registration } from "./Registration";
import { CustomButton } from "../molecules/CustomButton";
import { Message } from "./Message";
import { Warning } from "../molecules/Warning";
import { ClickOutside } from "../molecules/ClickOutside";
import { useRouter } from "next/router";
import { ForgotPassword } from "./ForgotPassword";

export const LogRegModal = ({ setLoginModal, loginModal }) => {
  const [isLoading, setIsLoading] = useState({ state: false, type: "spinner" });
  const [warning, setWarning] = useState({ state: false, message: "" });
  const [modalContent, setModalContent] = useState({
    login: true,
    register: false,
    // forgotPass: false,
  });
  useEffect(() => {
    document.body.style.overflow = loginModal ? "hidden" : "auto";
    document.body.style.paddingRight = loginModal ? "15px" : "0px";
  }, [loginModal]);

  const router = useRouter();

  const handleSucceedProcess = () => {
    setIsLoading({ ...isLoading, state: false });
    setLoginModal(false);
    router.reload();
  };

  return (
    <div
      className={`${style.modalContainer} ${
        loginModal ? style.modalContainer__active : style.modalContainer__hide
      }`}
    >
      <div>
        <ClickOutside
          setIsVisible={setLoginModal}
          isScrolled={false}
          condition={loginModal}
        >
          <div
            className={`${style.modalContainer__modal} ${
              loginModal ? style.modal__active : style.modal__hide
            }`}
          >
            {isLoading.state && (
              <div className={style.modal__loader}>
                {isLoading.type === "spinner" ? (
                  <Spinner />
                ) : (
                  <Message onClickHandler={handleSucceedProcess}>
                    Welcome
                  </Message>
                )}
              </div>
            )}
            <div className={style.modal__buttons}>
              <div>
                {!modalContent.login && (
                  <button
                    onClick={() =>
                      setModalContent({
                        login: true,
                        register: false,
                        // forgotPass: false,
                      })
                    }
                    className={`button ${style.buttons__backToLogin}`}
                  >
                    {"<< "} Back
                  </button>
                )}
              </div>
              <button
                className={style.buttons__close}
                type="button"
                onClick={() => setLoginModal(false)}
              >
                X
              </button>
            </div>
            {warning.state && <Warning>{warning.message}</Warning>}
            {modalContent.login && (
              <>
                <Login
                  setWarning={setWarning}
                  setIsLoading={setIsLoading}
                  setModalContent={setModalContent}
                />
              </>
            )}
            {modalContent.register && (
              <Registration
                setWarning={setWarning}
                setIsLoading={setIsLoading}
                warning={warning}
              />
            )}
            {/* {modalContent.forgotPass && <ForgotPassword />} */}
          </div>
        </ClickOutside>
      </div>
    </div>
  );
};
