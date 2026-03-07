import nextConfig from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier/flat";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "*.config.mjs",
      "*.config.ts",
      "next-env.d.ts",
    ],
  },
  ...nextConfig,
  prettierConfig,
];
