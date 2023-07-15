import React, { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "../src/index";

interface Props {
  siteKey: string;
  hide: boolean;
  language: string;
  enterprise: boolean;
  recaptchaNet: boolean;
  action: string;
}

export const ReCaptcha = ({
  siteKey,
  hide,
  language,
  enterprise,
  recaptchaNet,
  action,
}: Props) => {
  const { executeGoogleReCaptcha, showGoogleReCaptcha, hideGoogleReCaptcha } =
    useGoogleReCaptcha(siteKey, {
      hide,
      language,
      enterprise,
      recaptchaNet,
    });

  const [token, setToken] = useState("");

  const handleExecute = useCallback(() => {
    void (async () => {
      setToken(await executeGoogleReCaptcha(action));
    })();
  }, [action, executeGoogleReCaptcha]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const handleShow = useCallback(() => {
    void showGoogleReCaptcha();
  }, [showGoogleReCaptcha]);

  const handleHide = useCallback(() => {
    void hideGoogleReCaptcha();
  }, [hideGoogleReCaptcha]);

  return (
    <div>
      <button onClick={handleExecute}>EXECUTE</button>
      <button onClick={handleReload}>RELOAD</button>
      <button onClick={handleShow}>SHOW</button>
      <button onClick={handleHide}>HIDE</button>
      <p>token: {token}</p>
      <p>{token && "Successfully loaded!"}</p>
    </div>
  );
};
