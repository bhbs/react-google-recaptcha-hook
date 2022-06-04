// @vitest-environment happy-dom

import { describe, test, expect } from "vitest";
import {
  generateGrecaptchaSrc,
  getGrecaptcha,
  initGrecaptcha,
} from "../src/functions";

describe("initGrecaptcha", () => {
  test("create callback queue", () => {
    initGrecaptcha();
    expect(window.grecaptcha).toMatchInlineSnapshot(`
      {
        "ready": [Function],
      }
    `);
    expect(window.___grecaptcha_cfg).toMatchInlineSnapshot(`
      {
        "fns": [],
      }
    `);
  });
});

describe("getGrecaptcha", () => {
  test("add callback to queue", () => {
    getGrecaptcha();
    expect(window.grecaptcha).toMatchInlineSnapshot(`
      {
        "ready": [Function],
      }
    `);
    expect(window.___grecaptcha_cfg).toMatchInlineSnapshot(`
      {
        "fns": [
          [Function],
        ],
      }
    `);
  });

  test("return enterprise version", async () => {
    window.grecaptcha = {
      ready: (callback) => callback(),
      enterprise: {
        ready: (callback) => callback(),
        execute: () => undefined,
      },
    };
    expect(await getGrecaptcha()).toMatchInlineSnapshot(`
      {
        "execute": [Function],
        "ready": [Function],
      }
    `);
  });
});

describe("generateGrecaptchaSrc", () => {
  test("cerate src", () => {
    expect(generateGrecaptchaSrc("SITE_KEY")).toMatchInlineSnapshot(
      '"https://www.google.com/recaptcha/api.js?render=SITE_KEY"'
    );
    expect(
      generateGrecaptchaSrc("SITE_KEY", {
        language: "LANGUAGE",
        enterprise: true,
        recaptchaNet: true,
      })
    ).toMatchInlineSnapshot(
      '"https://www.recaptcha.net/recaptcha/enterprise.js?render=SITE_KEY&hl=LANGUAGE"'
    );
  });
});
