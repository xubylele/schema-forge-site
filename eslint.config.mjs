import nextConfig from "eslint-config-next/core-web-vitals";
import stylistic from "@stylistic/eslint-plugin";

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
  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    jsx: true,
    commaDangle: "always-multiline",
  }),
  {
    rules: {
      "@stylistic/max-len": [
        "warn",
        {
          code: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
    },
  },
];
