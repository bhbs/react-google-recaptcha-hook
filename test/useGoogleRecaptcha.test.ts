// @vitest-environment happy-dom

import { describe, test, expect, afterEach } from "vitest";
import { cleanup, renderHook } from "@testing-library/react";
import { useGoogleReCaptcha } from "../src/useGoogleRecaptcha";

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

describe("useGoogleReCaptcha", () => {
  afterEach(() => {
    cleanup();
  });
  afterEach(() => {
    window.grecaptcha = undefined;
    window.___grecaptcha_cfg = undefined;
    document.getElementsByTagName("head")[0].innerHTML = "";
  });

  test("successfully rendered", () => {
    const { result } = renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    expect(result.current).toMatchInlineSnapshot(`
      {
        "executeGoogleReCaptcha": [Function],
        "hideGoogleReCaptcha": [Function],
        "showGoogleReCaptcha": [Function],
      }
    `);
  });

  test("execute", () => {
    const { result } = renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    expect(result.current.executeGoogleReCaptcha).toMatchInlineSnapshot(
      "[Function]"
    );
  });

  test("execute", async () => {
    const { result } = renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    expect(
      result.current.executeGoogleReCaptcha("action")
    ).toMatchInlineSnapshot("Promise {}");
  });

  test("execute enterprise", async () => {
    const { result } = renderHook(() =>
      useGoogleReCaptcha("SITE_KEY", { enterprise: true })
    );
    expect(
      result.current.executeGoogleReCaptcha("action")
    ).toMatchInlineSnapshot("Promise {}");
  });

  test("load", () => {
    renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    expect(document.getElementById("SITE_KEY")).toMatchInlineSnapshot(`
      <script
        async=""
        id="SITE_KEY"
        src="https://www.google.com/recaptcha/api.js?render=SITE_KEY"
        type="text/javascript"
      />
    `);
  });

  test("load", () => {
    renderHook(() => useGoogleReCaptcha("SITE_KEY", { language: "en" }));
    expect(document.getElementById("SITE_KEY")).toMatchInlineSnapshot(`
      <script
        async=""
        id="SITE_KEY"
        src="https://www.google.com/recaptcha/api.js?render=SITE_KEY&hl=en"
        type="text/javascript"
      />
    `);
  });

  test("load once", () => {
    renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    renderHook(() => useGoogleReCaptcha("SITE_KEY"));
  });

  test("hide", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    renderHook(() => useGoogleReCaptcha("SITE_KEY", { hide: true }));
    await Promise.resolve();
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.style.visibility
    ).toMatchInlineSnapshot('"hidden"');
  });

  test("hide", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    const { result } = renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    await result.current.hideGoogleReCaptcha();
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.style.visibility
    ).toMatchInlineSnapshot('"hidden"');
  });

  test("show", () => {
    window.grecaptcha = { ...grecaptchaMock };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    renderHook(() => useGoogleReCaptcha("SITE_KEY", { hide: false }));
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.style.visibility
    ).toMatchInlineSnapshot('""');
  });

  test("show", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    const { result } = renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    await result.current.showGoogleReCaptcha();
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.style.visibility
    ).toMatchInlineSnapshot('"visible"');
  });

  test("show", async () => {
    window.grecaptcha = { ...grecaptchaMock };
    document.body.innerHTML = '<div class="grecaptcha-badge"></div>';
    const { result } = renderHook(() =>
      useGoogleReCaptcha("SITE_KEY", { enterprise: true })
    );
    await result.current.showGoogleReCaptcha();
    expect(
      document.querySelector<HTMLElement>(".grecaptcha-badge")?.style.visibility
    ).toMatchInlineSnapshot('"visible"');
  });
});
