# React Hook for Google reCAPTCHA V3

https://www.google.com/recaptcha/intro/v3.html

## Install

```sh
npm install react-google-recaptcha-hook
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

## Example

```javascript
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";

const YourComponent = () => {
  const { executeGoogleReCaptcha } = useGoogleReCaptcha("ABCDEFG123456");

  const postComment = useCallback(async () => {
    const token = await executeRecaptcha("postComment");
    fetch("/api/echo", {
      method: "POST",
      body: JSON.stringify({
        comment: "hello",
        token,
      }),
    });
  }, []);

  return <button onClick={postComment}>POST</button>;
};
```
