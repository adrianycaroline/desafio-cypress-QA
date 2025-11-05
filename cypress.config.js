const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://lojaebac.ebaconline.art.br",
    chromeWebSecurity: false,
  },
});
