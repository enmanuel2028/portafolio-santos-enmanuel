import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

/**
 * Flat config.
 *
 * eslint-config-next v16 exports flat-config arrays directly, so `FlatCompat`
 * is not used here — it fails against ESLint 10 when normalising the legacy
 * shareable configs.
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // React Three Fiber renders lowercase intrinsics whose props the React
      // plugin cannot resolve (e.g. `args`, `attach`, `intensity`).
      "react/no-unknown-property": "off",
    },
  },
];

export default eslintConfig;
