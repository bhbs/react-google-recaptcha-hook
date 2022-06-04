import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Props, ReCaptcha } from "./ReCaptcha";

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
} as ComponentMeta<typeof ReCaptcha>;

const Template: ComponentStory<typeof ReCaptcha> = ({
  siteKey,
  hide,
  language,
  enterprise,
  recaptchaNet,
  action,
}: Props) => (
  <ReCaptcha
    siteKey={siteKey}
    hide={hide}
    language={language}
    enterprise={enterprise}
    recaptchaNet={recaptchaNet}
    action={action}
  />
);

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

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.play = executeGoogleReCaptcha;

export const Hide = Template.bind({});
Hide.args = { ...defaultArgs, hide: true };
Hide.play = executeGoogleReCaptcha;

export const Language = Template.bind({});
Language.args = { ...defaultArgs, language: "ja" };
Language.play = executeGoogleReCaptcha;

export const Enterprise = Template.bind({});
Enterprise.args = {
  ...defaultArgs,
  siteKey: SITE_TEST_KEY_ENTERPRISE,
  enterprise: true,
};
Enterprise.play = executeGoogleReCaptcha;

export const RecaptchaNet = Template.bind({});
RecaptchaNet.args = { ...defaultArgs, recaptchaNet: true };
RecaptchaNet.play = executeGoogleReCaptcha;

export const Action = Template.bind({});
Action.args = { ...defaultArgs, action: "submit_sample_B" };
Action.play = executeGoogleReCaptcha;
