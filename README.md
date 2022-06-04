# React Hook for Google reCAPTCHA V3

https://www.google.com/recaptcha/intro/v3.html

## Install

```sh
npm install react-google-recaptcha-hook
```

## Simeplest Example

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
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";

const YourComponent = () => {
  const { executeGoogleReCaptcha } = useGoogleReCaptcha(`${YOUR_SITE_KEY}`, {
    language: `${LANGUAGE_CODE}`, // optional, https://developers.google.com/recaptcha/docs/language
    enterprise: `${BOOLEAN}`, // optional, true if you want use enterprise edition
    recaptchaNet: `${BOOLEAN}`, // optional, true if you want use recaptcha.net instead of google.com
  });

  const handleReCaptchaVerify = useCallback(async () => {
    const token = await executeRecaptcha(`${YOUR_ACTION}`);

    // Do whatever you want with the token
  }, []);

  return <button onClick={handleReCaptchaVerify}>Submit</button>;
};
```
