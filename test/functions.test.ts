// @vitest-environment happy-dom

import { afterEach, describe, expect, test } from "vitest";
import {
	executeGrecaptcha,
	generateGrecaptchaSrc,
	getGrecaptcha,
	hideGrecaptcha,
	showGrecaptcha,
} from "../src/functions";
import type { ReCaptcha } from "../src/useGoogleRecaptcha";

const _grecaptchaMock: ReCaptcha = {
	execute: (siteKey, options) => {
		return Promise.resolve(
			`siteKey: ${siteKey}, options: ${JSON.stringify(options)}`,
		);
	},
	ready: (callback) => {
		callback();
	},
};

const grecaptchaMock = {
	..._grecaptchaMock,
	enterprise: {
		..._grecaptchaMock,
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
		// biome-ignore lint/style/noNonNullAssertion: __grecaptcha_cfg is set in the test
		for (const fn of window.___grecaptcha_cfg!.fns) {
			fn();
		}
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
		// biome-ignore lint/style/noNonNullAssertion: ___grecaptcha_cfg is set in the test
		for (const fn of window.___grecaptcha_cfg!.fns) {
			fn();
		}
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
		).toMatchInlineSnapshot(
			`"siteKey: SITE_KEY, options: {"action":"action"}"`,
		);
	});

	test("exec", async () => {
		window.grecaptcha = { ...grecaptchaMock };
		expect(
			await executeGrecaptcha(false, "SITE_KEY", "action"),
		).toMatchInlineSnapshot(
			`"siteKey: SITE_KEY, options: {"action":"action"}"`,
		);
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
