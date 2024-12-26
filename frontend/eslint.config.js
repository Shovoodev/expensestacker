import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {
    "plugins": [
        "react"
     ],
     "rules": {
      // "react/prop-types": 0
     }
   },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
