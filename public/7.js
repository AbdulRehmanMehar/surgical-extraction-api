(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{115:function(a,t,r){"use strict";r.r(t);var n={props:["categories"],data:function(){return{navburger:!1}},computed:{parentCategories:function(){if(this.categories&&this.categories.length)return this.categories.filter(function(a){return!a.parent&&!a.subcategories.length})},parentCategoriesWithSubCategories:function(){if(this.categories&&this.categories.length)return this.categories.filter(function(a){return!a.parent&&a.subcategories.length})}}},s=(r(43),r(0)),e=Object(s.a)(n,function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("nav",{staticClass:"navbar is-fixed-top"},[r("div",{staticClass:"container is-fluid"},[r("div",{staticClass:"navbar-brand"},[r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"home"}}},[a._v("\n                "+a._s(a.$root.name)+"\n            ")]),a._v(" "),r("div",{staticClass:"navbar-burger burger has-text-light",attrs:{"data-target":"navbarExampleTransparentExample"},on:{click:function(t){t.preventDefault(),a.navburger=!a.navburger}}},[r("span"),a._v(" "),r("span"),a._v(" "),r("span")])],1),a._v(" "),r("div",{staticClass:"navbar-menu",class:{"is-active":a.navburger},attrs:{id:"navbarExampleTransparentExample"}},[r("div",{staticClass:"navbar-start"},[a._l(a.parentCategories,function(t){return r("router-link",{key:t.id,staticClass:"navbar-item",attrs:{to:{name:"category",params:{id:t.id}}}},[a._v(a._s(t.name))])}),a._v(" "),a._l(a.parentCategoriesWithSubCategories,function(t){return r("div",{key:t.id,staticClass:"navbar-item has-dropdown is-hoverable"},[r("a",{staticClass:"navbar-link",on:{click:function(a){a.preventDefault()}}},[a._v(a._s(t.name))]),a._v(" "),r("div",{staticClass:"navbar-dropdown"},[a._l(t.subcategories,function(t){return r("router-link",{key:t.id,staticClass:"navbar-item",attrs:{to:{name:"category",params:{id:t.id}}}},[a._v(a._s(t.name))])}),a._v(" "),r("hr",{staticClass:"navbar-divider"}),a._v(" "),r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"category",params:{id:t.id}}}},[a._v(a._s(t.name))])],2)])})],2),a._v(" "),a.$root.isLoggedIn?r("div",{staticClass:"navbar-end"},[r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"cart"}}},[r("i",{staticClass:"fas fa-shopping-basket"}),a._v(" Cart "),r("span",{staticClass:"tag"},[a._v(a._s(a.$root.cart.length))])]),a._v(" "),r("div",{staticClass:"navbar-item has-dropdown is-hoverable"},[r("a",{staticClass:"navbar-link",on:{click:function(a){a.preventDefault()}}},[a._v(a._s(a.$root.currentUser.name))]),a._v(" "),r("div",{staticClass:"navbar-dropdown"},[r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"dashboard"}}},[a._v("Dashboard")]),a._v(" "),r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"logout"}}},[a._v("Logout")])],1)])],1):r("div",{staticClass:"navbar-end"},[r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"cart"}}},[r("i",{staticClass:"fas fa-shopping-basket"}),a._v(" Cart "),r("span",{staticClass:"tag"},[a._v(a._s(a.$root.cart.length))])]),a._v(" "),r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"login"}}},[a._v("Login")]),a._v(" "),r("router-link",{staticClass:"navbar-item",attrs:{to:{name:"register"}}},[a._v("Register")])],1)])])])},[],!1,null,"266a163a",null);t.default=e.exports},12:function(a,t,r){var n=r(44);"string"==typeof n&&(n=[[a.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r(3)(n,s);n.locals&&(a.exports=n.locals)},43:function(a,t,r){"use strict";var n=r(12);r.n(n).a},44:function(a,t,r){(a.exports=r(2)(!1)).push([a.i,"\n.navbar[data-v-266a163a] {\n    background-color: var(--app-color);\n}\n.navbar-item[data-v-266a163a], .navbar-link[data-v-266a163a] {\n    transition: all 320ms;\n    color: var(--app-text-color);\n}\n.navbar-item[data-v-266a163a]:hover, .navbar-link[data-v-266a163a]:hover, .navbar-item[data-v-266a163a]:focus, .navbar-link[data-v-266a163a]:focus, .router-link-exact-active[data-v-266a163a], .navbar-item.has-dropdown[data-v-266a163a]:hover, .navbar-item.has-dropdown[data-v-266a163a]:focus  {\n    transition: all 320ms;\n    color: var(--app-text-accent-color);\n    background-color: var(--app-accent-color);\n}\n\n\n",""])}}]);