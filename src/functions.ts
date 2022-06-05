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
      enterprise: {
        ready: (callback) => {
          window.___grecaptcha_cfg.fns.push(callback);
        },
      },
    };
  }
};

export const getGrecaptcha = (enterprise: boolean) =>
  new Promise<ReCaptcha>((resolve) => {
    initGrecaptcha();
    if (enterprise) {
      window.grecaptcha.enterprise.ready(() =>
        resolve(window.grecaptcha.enterprise)
      );
    } else {
      window.grecaptcha.ready(() => resolve(window.grecaptcha));
    }
  });

export const hideGrecaptcha = async (enterprise: boolean) => {
  const grecaptcha = await getGrecaptcha(enterprise);
  grecaptcha.ready(() => {
    const badge = document.querySelector<HTMLElement>(".grecaptcha-badge");
    if (badge) badge.style.visibility = "hidden";
  });
};

export const showGrecaptcha = async (enterprise: boolean) => {
  const grecaptcha = await getGrecaptcha(enterprise);
  grecaptcha.ready(() => {
    const badge = document.querySelector<HTMLElement>(".grecaptcha-badge");
    if (badge) badge.style.visibility = "visible";
  });
};

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
