// @vitest-environment happy-dom

import { describe, test, expect, afterEach, beforeEach } from "vitest";
import {
  generateGrecaptchaSrc,
  getGrecaptcha,
  hideGrecaptcha,
  initGrecaptcha,
  showGrecaptcha,
} from "../src/functions";

describe("initGrecaptcha", () => {
  test("create callback queue", () => {
    initGrecaptcha();
    expect(window.grecaptcha).toMatchInlineSnapshot(`
      {
        "enterprise": {
          "ready": [Function],
        },
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
  beforeEach(() => {});
  afterEach(() => {
    delete window.grecaptcha;
    delete window.___grecaptcha_cfg;
  });

  test("add callback to queue", () => {
    getGrecaptcha();
    expect(window.grecaptcha).toMatchInlineSnapshot(`
      {
        "enterprise": {
          "ready": [Function],
        },
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

  test("add callback to queue", () => {
    getGrecaptcha(true);
    expect(window.grecaptcha).toMatchInlineSnapshot(`
      {
        "enterprise": {
          "ready": [Function],
        },
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

  test("return grecaptcha", async () => {
    window.grecaptcha = {
      ready: (callback) => callback(),
      enterprise: {
        ready: (callback) => callback(),
      },
    };
    expect(await getGrecaptcha()).toMatchInlineSnapshot(`
      {
        "enterprise": {
          "ready": [Function],
        },
        "ready": [Function],
      }
    `);
  });

  test("return enterprise version", async () => {
    window.grecaptcha = {
      ready: (callback) => callback(),
      enterprise: {
        ready: (callback) => callback(),
      },
    };
    expect(await getGrecaptcha(true)).toMatchInlineSnapshot(`
      {
        "ready": [Function],
      }
    `);
  });
});

describe("hideGrecaptcha", () => {
  afterEach(() => {
    document.getElementsByTagName("head")[0].innerHTML = "";
  });

  test("exec", () => {
    window.grecaptcha = {
      ready: (callback) => callback(),
      enterprise: {
        ready: (callback) => callback(),
      },
    };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    hideGrecaptcha();
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")!.style.visibility
    ).toMatchInlineSnapshot('"hidden"');
  });
});

describe("showGrecaptcha", () => {
  afterEach(() => {
    document.getElementsByTagName("head")[0].innerHTML = "";
  });

  test("exec", () => {
    window.grecaptcha = {
      ready: (callback) => callback(),
      enterprise: {
        ready: (callback) => callback(),
      },
    };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    showGrecaptcha();
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")!.style.visibility
    ).toMatchInlineSnapshot('"visible"');
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
