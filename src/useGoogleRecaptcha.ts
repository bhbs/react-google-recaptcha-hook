import { useCallback, useEffect, useRef } from "react";
import {
  generateGrecaptchaSrc,
  getGrecaptcha,
  hideGrecaptcha,
  showGrecaptcha,
} from "./functions";

declare global {
  interface Window {
    grecaptcha: ReCaptcha & {
      enterprise: ReCaptcha;
    };
    ___grecaptcha_cfg: {
      fns: (() => void)[];
    };
  }
}

export type ReCaptcha = {
  execute?(siteKey: string, options: { action: string }): PromiseLike<string>;
  ready(callback: () => void): void;
};

export const useGoogleReCaptcha = (
  siteKey: string,
  options?: {
    hide?: boolean;
    language?: string;
    enterprise?: boolean;
    recaptchaNet?: boolean;
  }
) => {
  const load = useCallback(() => {
    if (document.getElementById(siteKey)) return;

    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = generateGrecaptchaSrc(siteKey, options);
    script.id = siteKey;

    document.getElementsByTagName("head")[0].appendChild(script);
  }, [options, siteKey]);

  const hideGoogleReCaptcha = useCallback(hideGrecaptcha, []);
  const showGoogleReCaptcha = useCallback(showGrecaptcha, []);

  const executeGoogleReCaptcha = useCallback(
    async (action: string) => {
      const grecaptcha = await getGrecaptcha(options?.enterprise);
      return grecaptcha.execute?.(siteKey, { action });
    },
    [options?.enterprise, siteKey]
  );

  const oneTimeRef = useRef(false);
  useEffect(() => {
    if (oneTimeRef.current) return;
    oneTimeRef.current = true;

    options?.hide && hideGoogleReCaptcha();
    load();
  }, [load, hideGoogleReCaptcha, options]);

  return {
    executeGoogleReCaptcha,
    hideGoogleReCaptcha,
    showGoogleReCaptcha,
  };
};
