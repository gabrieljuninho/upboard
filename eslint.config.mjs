import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "prettier"],
    ignorePatterns: ["node_modules/", ".next/", "public/", "generated/"],
    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  }),

  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
];

export default eslintConfig;
