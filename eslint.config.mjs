import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["src/providers/theme.tsx", "src/app/sidebar.tsx"],
    rules: {
      // Legitimate: hydrate theme from localStorage; close drawer on route change.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
