const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@styles": path.resolve(__dirname, "src", "styles"),
      "@domains": path.resolve(__dirname, "src", "domains"),
      "@assets": path.resolve(__dirname, "src", "assets"),
      "@helpers": path.resolve(__dirname, "src", "helpers"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@config": path.resolve(__dirname, "src", "config"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@services": path.resolve(__dirname, "src", "services"),
      "@entidades": path.resolve(__dirname, "src", "entidades"),
      "@contexts": path.resolve(__dirname, "src", "contexts"),
      "@routes": path.resolve(__dirname, "src", "routes"),
      "@testHelpers": path.resolve(__dirname, "src", "testHelpers"),
      "@session": path.resolve(__dirname, "src", "session")
    },
  };
  return config;
};
