(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{641:function(t,e,n){"use strict";n.r(e);n(111),n(112);var r=n(487),a=n.n(r),s={props:["category","show_tags"],name:"recentPosts",data:function(){return{pages:[]}},computed:{orderBydate:function(){return a.a.orderBy(this.pages,"frontmatter.date",["desc"])}},mounted:function(){var t=this;this.$site.pages.forEach((function(e){e.frontmatter.category===t.category&&t.pages.push(e)}))}},o=n(19),c=Object(o.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"posts"},[n("ul",t._l(t.orderBydate,(function(e,r){return n("li",{key:r,staticClass:"post-card",attrs:{to:e.path}},[n("h5",[n("router-link",{attrs:{to:e.path}},[t._v("\n          "+t._s(e.title)+"\n        ")])],1),t._v(" "),t.show_tags?t._e():n("h7",[n("b",[t._v("برچسب ها : ")]),t._v(" "),t._l(e.frontmatter.tag,(function(r,a){return n("span",{key:a},[t._v("\n          "+t._s(r)+"\n          "+t._s(a+1!==e.frontmatter.tag.length?"،":""))])})),t._v(" "),n("br"),t._v(" "),n("br")],2)],1)})),0)])}),[],!1,null,null,null);e.default=c.exports}}]);