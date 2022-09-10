import React from "react";
import { Story, Meta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ReCaptcha } from "./ReCaptcha";

const SITE_TEST_KEY = "6Lf6QWsbAAAAAO6x_yOJaYBChDGuLyMD_qNxlQJe";
const SITE_TEST_KEY_ENTERPRISE = "6LeQ2EIgAAAAAJzkjkU459gy0Lxrw1M1qYL43s_I";

export default {
  title: "reCAPTCHA",
  component: ReCaptcha,
  decorators: [
    (Story) => {
      document.getElementById(SITE_TEST_KEY)?.remove();
      document.getElementById(SITE_TEST_KEY_ENTERPRISE)?.remove();
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.remove();
      delete window.grecaptcha;
      delete window.___grecaptcha_cfg;
      return <Story />;
    },
  ],
} as Meta<typeof ReCaptcha>;

const defaultArgs = {
  siteKey: SITE_TEST_KEY,
  hide: false,
  language: "en",
  enterprise: false,
  recaptchaNet: false,
  action: "submit_sample_A",
};

const executeGoogleReCaptcha = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByText("EXECUTE"));
  await canvas.findByText("Successfully loaded!", {}, { timeout: 10000 });
};

export const Default: Story<typeof ReCaptcha> = {
  args: {
    ...defaultArgs,
  },
  play: executeGoogleReCaptcha,
};

export const Hide: Story<typeof ReCaptcha> = {
  args: {
    ...defaultArgs,
    hide: true,
  },
  play: executeGoogleReCaptcha,
};

export const Language: Story<typeof ReCaptcha> = {
  args: {
    ...defaultArgs,
    language: "ja",
  },
  play: executeGoogleReCaptcha,
};

export const Enterprise: Story<typeof ReCaptcha> = {
  args: {
    ...defaultArgs,
    siteKey: SITE_TEST_KEY_ENTERPRISE,
    enterprise: true,
  },
  play: executeGoogleReCaptcha,
};

export const RecaptchaNet: Story<typeof ReCaptcha> = {
  args: {
    ...defaultArgs,
    recaptchaNet: true,
  },
  play: executeGoogleReCaptcha,
};

export const Action: Story<typeof ReCaptcha> = {
  args: {
    ...defaultArgs,
    action: "submit_sample_B",
  },
  play: executeGoogleReCaptcha,
};
