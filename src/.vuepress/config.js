module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "مواجهه | سیمای هنر و اندیشه",
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
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    // ["link", { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" }],
    // [
    //   "link",
    //   {
    //     rel: "icon",
    //     type: "image/png",
    //     sizes: "32x32",
    //     href: "/icons/favicon-32x32.png",
    //   },
    // ],
    // [
    //   "link",
    //   {
    //     rel: "icon",
    //     type: "image/png",
    //     sizes: "16x16",
    //     href: "/icons/favicon-16x16.png",
    //   },
    // ],
    // [
    //   "meta",
    //   { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    // ],
    // ["link", { rel: "manifest", href: "/manifest.json" }],
    // [
    //   "link",
    //   {
    //     rel: "mask-icon",
    //     href: "/icons/safari-pinned-tab.svg",
    //     color: "#5bbad5",
    //   },
    // ],
    // [
    //   "meta",
    //   {
    //     name: "msapplication-TileImage",
    //     content: "/icons/msapplication-icon-144x144.png",
    //   },
    // ],
    // ["meta", { name: "msapplication-TileColor", content: "#ffc40d" }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: "default-rtl",
  themeConfig: {
    // repo: "https://github.com/mehotkhan/sohaSimurgh",
    editLinks: false,
    docsDir: "src",
    persianDate: true,
    lastUpdated: "آخرین ویرایش",
    displayAllHeaders: false, // Default: false
    nav: [
      {
        text: "سامانه پخش تعاملی سیمرغ",
        link: "/soha-simurgh/",
      },
      {
        text: "درباره اینجا",
        items: [
          {
            text: "پرسش های متداول",
            link: "/faq/",
          },
          { text: "تیم سازنده", link: "/meet-team/" },
          {
            text: "مسیر راه",
            link: "/roadmap/",
          },
          {
            text: "اطلاعات فنی",
            link: "/technical-details/",
          },
          {
            text: "اطلاعات تماس",
            link: "/contact-info/",
          },
        ],
      },
    ],
    sidebar: [],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "reading-progress",
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    // "@mr-hope/sitemap",
    // {
    //   urls: ["notes", "projects", "books"],
    // },
    // [
    //   "@vuepress/pwa",
    //   {
    //     serviceWorker: true,
    //     updatePopup: {
    //       message: "محتوای جدید افزوده شده است .",
    //       buttonText: "به روز رسانی",
    //     },
    //     generateSWConfig: {
    //       importWorkboxFrom: "local",
    //     },
    //   },
    // ],
    // // [
    //   "seo",
    //   {
    //     siteTitle: (_, $site) => $site.title,
    //     title: ($page) => $page.title,
    //     description: ($page) => $page.frontmatter.description,
    //     author: (_, $site) => $site.themeConfig.author,
    //     tags: ($page) => $page.frontmatter.tags,
    //     twitterCard: (_) => "summary_large_image",
    //     type: ($page) =>
    //       ["books", "projects", "notes"].some((folder) =>
    //         $page.regularPath.startsWith("/" + folder)
    //       )
    //         ? "article"
    //         : "page",
    //     url: (_, $site, path) => ($site.themeConfig.domain || "") + path,
    //     image: ($page, $site) =>
    //       $page.frontmatter.image &&
    //       (($site.themeConfig.domain &&
    //         !$page.frontmatter.image.startsWith("http")) ||
    //         "") + $page.frontmatter.image,
    //     publishedAt: ($page) =>
    //       $page.frontmatter.date && new Date($page.frontmatter.date),
    //     modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
    //   },
    // ],
    // ["@vuepress/plugin-google-analytics", { ga: "UA-149591828-1" }],
  ],
};
