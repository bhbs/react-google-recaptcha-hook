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
  }, []);

  const hide = useCallback(hideGrecaptcha, []);
  const show = useCallback(showGrecaptcha, []);

  const executeGoogleReCaptcha = useCallback(async (action: string) => {
    const grecaptcha = await getGrecaptcha(options?.enterprise);
    return grecaptcha.execute?.(siteKey, { action });
  }, []);

  const oneTimeRef = useRef(false);
  useEffect(() => {
    if (oneTimeRef.current) return;
    oneTimeRef.current = true;

    options?.hide && hide();
    load();
  }, [load, hide, options]);

  return { executeGoogleReCaptcha, load, hide, show };
};
