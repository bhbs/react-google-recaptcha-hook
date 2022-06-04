import { ReCaptcha } from "./useGoogleRecaptcha";

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
