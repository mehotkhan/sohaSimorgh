module.exports = {
  base: "/sohaSimurgh/",

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "سهاسیمرغ",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "Online Web Player for soha simorgh interactive movie poject",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: 'antdocs',
  themeConfig: {
    repo: "https://github.com/mehotkhan/sohaSimurgh",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: true,
    nav: [
      {
        text: "درباره اینجا",
        link: "/about/",
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
