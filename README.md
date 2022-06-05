# React Hook for Google reCAPTCHA V3

https://www.google.com/recaptcha/intro/v3.html

## Install

```sh
npm install react-google-recaptcha-hook
```

## Simplest Example

```javascript
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";

const Form = () => {
  const { executeGoogleReCaptcha } = useGoogleReCaptcha(SITE_KEY);

  const submit = useCallback(async () => {
    const token = await executeRecaptcha("submit");

    // Do whatever you want with the token
  }, []);

  return <button onClick={submit}>SUBMIT</button>;
};
```

## Usage

```javascript
const {
  // execute reCAPTCHA with action, return torken
  // async (action: string) => Promise<string>
  executeGoogleReCaptcha,
  // hide / show recaptcha-badge
  // async () => Promise<void>
  hideGoogleReCaptcha,
  showGoogleReCaptcha,
} = useGoogleReCaptcha(
  `${YOUR_SITE_KEY}`, // your site key
  {
    hide: `${BOOLEAN}`, // optional, true if you want to hide recaptcha-badge beforehand
    language: `${LANGUAGE_CODE}`, // optional, https://developers.google.com/recaptcha/docs/language
    enterprise: `${BOOLEAN}`, // optional, true if you want to use enterprise edition
    recaptchaNet: `${BOOLEAN}`, // optional, true if you want to use recaptcha.net instead of google.com
  }
);
```

## Note

> You are allowed to hide the badge as long as you include the reCAPTCHA branding visibly in the user flow.

See: https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
