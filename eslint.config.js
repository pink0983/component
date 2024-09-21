// import globals from "globals";
// import tseslint, { config } from "typescript-eslint";
// import js from "@eslint/js"
// import vue/vue3Essential from ""

// export default [
//   js.configs.recommended
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   ...tseslint.configs.recommended,
// ];



import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
];


// import js from "@eslint/js";
// import customConfig from "./custom-config.js";
// import myConfig from "eslint-config-my-config";

// export default [
//     js.configs.recommended,
//     customConfig,
//     myConfig,
//     {
//         rules: {
//             semi: ["warn", "always"]
//         },
//         // ...other config
//     }
// ];