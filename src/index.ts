import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    grecaptcha: ReCaptcha & {
      enterprise?: ReCaptcha;
    };
    ___grecaptcha_cfg: {
      fns: (() => void)[];
    };
  }
}

type ReCaptcha = {
  execute?(siteKey: string, options: { action: string }): PromiseLike<string>;
  ready(callback: () => void): void;
};

/**
 * @see https://developers.google.com/recaptcha/docs/loading#loading_recaptcha_asynchronously
 **/
export const initGrecaptcha = () => {
  if (typeof window.grecaptcha === "undefined") {
    window.___grecaptcha_cfg ??= {
      fns: [],
    };
    window.grecaptcha = {
      ready: (callback) => {
        window.___grecaptcha_cfg.fns.push(callback);
      },
    };
  }
};

export const getGrecaptcha = () =>
  new Promise<ReCaptcha>((resolve) => {
    initGrecaptcha();
    window.grecaptcha.ready(() =>
      resolve(window.grecaptcha.enterprise || window.grecaptcha)
    );
  });

export const generateGrecaptchaSrc = (
  siteKey: string,
  options?: {
    language?: string;
    enterprise?: boolean;
    recaptchaNet?: boolean;
  }
) => {
  const language = options?.language ? `&hl=${options.language}` : "";
  const script = options?.enterprise ? "enterprise.js" : "api.js";
  const host = options?.recaptchaNet ? "recaptcha.net" : "google.com";

  return `https://www.${host}/recaptcha/${script}?render=${siteKey}${language}`;
};

export const useGoogleReCaptcha = (
  siteKey: string,
  options?: {
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

  const executeGoogleReCaptcha = useCallback(async (action: string) => {
    const grecaptcha = await getGrecaptcha();
    return grecaptcha.execute?.(siteKey, { action });
  }, []);

  const oneTimeRef = useRef(false);
  useEffect(() => {
    if (oneTimeRef.current) return;
    oneTimeRef.current = true;

    load();
  }, [load]);

  return { executeGoogleReCaptcha, load };
};
