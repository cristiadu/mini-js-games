import js from "@eslint/js"
import importPlugin from "eslint-plugin-import-x"

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    ignores: ["**/assets/**", "**/node_modules/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        requestAnimationFrame: "readonly",
        performance: "readonly"
      }
    },
    plugins: {
      "import-x": importPlugin
    },
    rules: {
      "import-x/extensions": [
        "error",
        "never",
        {
          "js": "always",
          "css": "always",
          "svg": "always",
        }
      ],
      "no-console": "off",
      "max-len": [
        "error",
        {
          "code": 140,
          "tabWidth": 2
        }
      ],
      "semi": [
        "error",
        "never"
      ],
    }
  },
  {
    // Root-level files (the Express server and this config) run in Node
    files: ["*.js"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly"
      }
    }
  }
]
