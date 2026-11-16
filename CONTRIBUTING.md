# Contribution Guide

Hi! I am really excited that you are interested in contributing.
All Issues and PRs are welcome! Thank you!

## 👨‍💻 Setup

To setup:

```sh
npm ci
```

Keep `vitest` and `@vitest/coverage-v8` aligned with the Vitest version bundled
with Vite+.
Vite+ stays on 0.2.x to match Storybook 10's optional peer dependency range
without a Storybook-specific override. Verify the Storybook build when upgrading.

## 🧪 Develop

To test:

```sh
npm test run
```

To format:

```sh
npm run lint
```

To fix:

```sh
npm run fix
```

## 🚀 Release (Admin)

```
npm version $SEMVER
```

```
git push origin $TAG
```
