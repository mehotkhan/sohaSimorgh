<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <header
      class="page-poster"
      :style="{ backgroundImage: `url(${this.$page.frontmatter.poster})` }"
    >
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <h1 v-if="this.$page.frontmatter.home" id="main-title">
        فیلم تعاملی <b>مواجهه</b>
      </h1>
      <p
        v-if="
          this.$page.frontmatter.home && this.$page.frontmatter.tagline !== null
        "
        class="description"
      >
        {{
          this.$page.frontmatter.tagline ||
            $description ||
            "Welcome to your VuePress site"
        }}
      </p>
      <h1 v-else id="main-title">
        {{ this.$page.frontmatter.title || $title || "Hello" }}
      </h1>
    </header>
    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems" :class="{ 'player-page' : this.$page.frontmatter.player}">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
  </div>
</template>

<script>
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import { resolveSidebarItems } from "vuepress-theme-default-rtl/util";

export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
  },

  data() {
    return {
      isSidebarOpen: false,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },

  mounted() {
    console.log(this.$page.frontmatter);
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>
<style lang="stylus">
@font-face
    font-family Dubai
    src url('../fonts/Dubai-Regular.eot') format('eot'), url('../fonts/Dubai-Regular.woff') format('woff'), url('../fonts/Dubai-Regular.ttf') format('truetype')

.page-poster
    height: 400px;
    background-size: cover;
    background-position: bottom;
    h1
      padding-top: 3rem;
      padding-bottom: 3rem;
    h1,p
      text-align: center
      color: white
.player-page .theme-default-content.content__default
  max-width: 100%
</style>
