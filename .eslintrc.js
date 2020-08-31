module.exports = {
  root: true,
  extends: "@lightbase/eslint-config-lightbase/rn",
  env: {
    jest: true,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["assets", "./template/src/assets"],
          ["components", "./template/src/components"],
          ["context", "./template/src/context"],
          ["hooks", "./template/src/hooks"],
          ["navigation", "./template/src/navigation"],
          ["screens", "./template/src/screens"],
          ["services", "./template/src/services"],
          ["utils", "./template/src/utils"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json", ".tsx", ".native.js"],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".native.js"],
      },
    },
  },
};
