// @vitest-environment happy-dom

import { describe, test, expect, afterEach } from "vitest";
import {
  executeGrecaptcha,
  generateGrecaptchaSrc,
  getGrecaptcha,
  hideGrecaptcha,
  showGrecaptcha,
} from "../src/functions";

const grecaptchaMock = {
  execute: async (siteKey, options) =>
    `siteKey: ${siteKey}, options: ${options}`,
  ready: (callback) => callback(),
  enterprise: {
    execute: async (siteKey, options) =>
      `siteKey: ${siteKey}, options: ${options}`,
    ready: (callback) => callback(),
  },
};

describe("getGrecaptcha", () => {
  afterEach(() => {
    delete window.grecaptcha;
    delete window.___grecaptcha_cfg;
  });

  test("return grecaptcha", async () => {
    const grecaptcha = getGrecaptcha(false);
    window.grecaptcha = { ...grecaptchaMock };
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.___grecaptcha_cfg!.fns.forEach((fn) => fn());
    expect(await grecaptcha).toMatchInlineSnapshot(`
      {
        "enterprise": {
          "execute": [Function],
          "ready": [Function],
        },
        "execute": [Function],
        "ready": [Function],
      }
    `);
  });

  test("return grecaptcha", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    expect(await getGrecaptcha(false)).toMatchInlineSnapshot(`
      {
        "enterprise": {
          "execute": [Function],
          "ready": [Function],
        },
        "execute": [Function],
        "ready": [Function],
      }
    `);
  });

  test("return enterprise version", async () => {
    const grecaptcha = getGrecaptcha(true);
    window.grecaptcha = { ...grecaptchaMock };
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.___grecaptcha_cfg!.fns.forEach((fn) => fn());
    expect(await grecaptcha).toMatchInlineSnapshot(`
      {
        "execute": [Function],
        "ready": [Function],
      }
    `);
  });

  test("return enterprise version", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    expect(await getGrecaptcha(true)).toMatchInlineSnapshot(`
      {
        "execute": [Function],
        "ready": [Function],
      }
    `);
  });
});

describe("executeGrecaptcha", () => {
  afterEach(() => {
    delete window.grecaptcha;
    delete window.___grecaptcha_cfg;
  });

  test("exec", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    expect(
      await executeGrecaptcha(false, "SITE_KEY", "action"),
    ).toMatchInlineSnapshot('"siteKey: SITE_KEY, options: [object Object]"');
  });

  test("exec", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    expect(
      await executeGrecaptcha(false, "SITE_KEY", "action"),
    ).toMatchInlineSnapshot('"siteKey: SITE_KEY, options: [object Object]"');
  });
});

describe("hideGrecaptcha", () => {
  afterEach(() => {
    document.getElementsByTagName("head")[0].innerHTML = "";
  });

  test("exec", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    await hideGrecaptcha(false);
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.style
        .visibility,
    ).toMatchInlineSnapshot('"hidden"');
  });
});

describe("showGrecaptcha", () => {
  afterEach(() => {
    document.getElementsByTagName("head")[0].innerHTML = "";
  });

  test("exec", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    await showGrecaptcha(false);
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.style
        .visibility,
    ).toMatchInlineSnapshot('"visible"');
  });
});

describe("generateGrecaptchaSrc", () => {
  test("cerate src", () => {
    expect(generateGrecaptchaSrc("SITE_KEY")).toMatchInlineSnapshot(
      '"https://www.google.com/recaptcha/api.js?render=SITE_KEY"',
    );
    expect(
      generateGrecaptchaSrc("SITE_KEY", {
        language: "LANGUAGE",
        enterprise: true,
        recaptchaNet: true,
      }),
    ).toMatchInlineSnapshot(
      '"https://www.recaptcha.net/recaptcha/enterprise.js?render=SITE_KEY&hl=LANGUAGE"',
    );
  });
});
