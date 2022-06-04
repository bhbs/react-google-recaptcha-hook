// @vitest-environment happy-dom

import { describe, test, expect, afterEach } from "vitest";
import { cleanup, renderHook } from "@testing-library/react";
import { useGoogleReCaptcha } from "../src/useGoogleRecaptcha";

describe("useGoogleReCaptcha", () => {
  afterEach(cleanup);
  afterEach(() => {
    document.getElementsByTagName("head")[0].innerHTML = "";
  });

  test("successfully rendered", () => {
    const { result } = renderHook(() => useGoogleReCaptcha("SITE_KEY"));
    expect(result.current).toMatchInlineSnapshot(`
      {
        "executeGoogleReCaptcha": [Function],
        "load": [Function],
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
});
