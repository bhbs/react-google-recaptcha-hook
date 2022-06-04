import React, { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "../src/index";

export type Props = {
  siteKey: string;
  hide: boolean;
  language: string;
  enterprise: boolean;
  recaptchaNet: boolean;
  action: string;
};

export const ReCaptcha = ({
  siteKey,
  hide,
  language,
  enterprise,
  recaptchaNet,
  action,
}: Props) => {
  const { executeGoogleReCaptcha, show } = useGoogleReCaptcha(siteKey, {
    hide,
    language,
    enterprise,
    recaptchaNet,
  });

  const [token, setToken] = useState("");

  const handleExecute = useCallback(async () => {
    setToken(await executeGoogleReCaptcha(action));
  }, []);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const handleShow = useCallback(() => {
    show();
  }, []);

  return (
    <div>
      <button onClick={handleExecute}>EXECUTE</button>
      <button onClick={handleReload}>RELOAD</button>
      {hide && <button onClick={handleShow}>SHOW</button>}
      <p>token: {token}</p>
      <p>{token && "Successfully loaded!"}</p>
    </div>
  );
};
