(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{16:function(t,a,e){var s=e(52);"string"==typeof s&&(s=[[t.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e(3)(s,i);s.locals&&(t.exports=s.locals)},51:function(t,a,e){"use strict";var s=e(16);e.n(s).a},52:function(t,a,e){(t.exports=e(2)(!1)).push([t.i,"\n.VueCarousel[data-v-3a055a8c] {\n    width: 100%;\n    height: 40vh;\n}\n",""])},7:function(t,a){t.exports="/images/dummy.jpg?b5db5347182e0b87b75920c0f66c36b0"},96:function(t,a,e){"use strict";e.r(a);var s=e(7),i=e.n(s),r={components:{Product:function(){return e.e(8).then(e.bind(null,94))}},data:function(){return{id:null,name:null,images:null,products:null,subcategories:null,paginator:null,dummyImage:i.a,product_info:null}},created:function(){this.loadData(),this.$route.query.search?this.product_info=decodeURI(this.$route.query.search):this.product_info=null},beforeRouteUpdate:function(t,a,e){t.query.search?this.product_info=decodeURI(t.query.search):this.product_info=null,this.loadData(t.params.id,t.query.page,t.query.search),e()},methods:{loadData:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.$store.dispatch("get_category_data",a||this.$route.params.id).then(function(i){t.id=i.data.data.id,t.name=i.data.data.name,t.images=i.data.data.images,t.subcategories=i.data.data.subcategories,t.$root.setTitle("@"+t.name);var r={page:e||t.$route.query.page||1,category:a||t.id,search_query:s||t.$route.query.search};t.$store.dispatch("get_products",r).then(function(a){t.products=a.data.data,t.paginator=a.data.meta}).catch(function(t){return console.log(t)})}).catch(function(t){return console.log(t)})},deleteCategory:function(){var t=this;this.$root.isLoggedIn&&"admin"==this.$root.currentUser.role&&(0==this.products.length&&0==this.subcategories.length?this.$store.dispatch("delete_category",this.id).then(function(a){t.$toastr("info","Success! Category was deleted.","Information"),t.$router.push({name:"home"})}).catch(function(a){return t.$toastr("error","Aah! Category wasn't deleted.","Error")}):this.$toastr("info","Category contains subcategories or products and cannot be deleted.","Information"))}}},o=(e(51),e(0)),n=Object(o.a)(r,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container",staticStyle:{margin:"100px auto"}},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column is-12"},[t.images&&t.images.length?e("carousel",{attrs:{perPage:1,autoplay:!0,loop:!0,paginationEnabled:!1}},t._l(t.images,function(a){return e("slide",{key:a.id,staticClass:"image is-3by1",style:{"background-image":"url(data:image/png;base64,"+a.data+")"}},[t.$root.isLoggedIn&&"admin"==t.$root.currentUser.role?e("a",{staticStyle:{float:"right","background-color":"var(--app-text-hover-color)",color:"var(--app-text-accent-color)",margin:"10px","z-index":"99"},on:{click:function(e){return e.preventDefault(),t.$root.deleteImage(e,a.id)}}},[t._v("Remove this Image")]):t._e()])}),1):e("div",[e("div",{staticClass:"image is-3by1",style:{"background-image":"url("+t.dummyImage+")"}})]),t._v(" "),e("br"),e("br"),t._v(" "),e("div",{staticClass:"has-text-centered"},[e("h1",{staticClass:"title is-3"},[t._v("@"+t._s(t.name)+"\n                    "),t.$root.isLoggedIn&&"admin"==t.$root.currentUser.role?e("small",{staticClass:"subtitle is-6"},[e("router-link",{attrs:{to:{name:"manage-categories",query:{id:t.id}}}},[t._v("Edit")]),t._v("  \n                        "),e("a",{on:{click:function(a){return a.preventDefault(),t.deleteCategory(a)}}},[t._v("Delete")])],1):t._e()]),t._v(" "),e("h3",{staticClass:"subtitle"},[t._v("\n                    Products: "),e("span",{staticClass:"tag"},[t._v(t._s(t.products&&t.products.length||0))]),t._v("\n                    Subcategories "),e("span",{staticClass:"tag"},[t._v(t._s(t.subcategories&&t.subcategories.length||0))])])]),t._v(" "),e("br"),e("br"),t._v(" "),e("div",{staticClass:"tile is-ancestor",staticStyle:{width:"calc(100% - 20px)",margin:"0 auto"}},[e("div",{staticClass:"tile is-veritcal is-3"},[e("div",{staticClass:"content"},[e("h4",{staticClass:"subtitle is-5"},[t._v("Filter Products")]),t._v(" "),e("div",{staticClass:"field has-addons"},[e("div",{staticClass:"control"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.product_info,expression:"product_info"}],staticClass:"input",attrs:{type:"text",placeholder:"Find a Product"},domProps:{value:t.product_info},on:{input:function(a){a.target.composing||(t.product_info=a.target.value)}}})]),t._v(" "),e("div",{staticClass:"control"},[e("router-link",{staticClass:"button is-light",class:{disabled:!t.product_info},attrs:{to:{name:"category",params:{id:t.id},query:{search:encodeURI(t.product_info)}}}},[t._v("Search")])],1)]),t._v(" "),e("hr"),t._v(" "),t.subcategories&&t.subcategories.length?e("div",[e("h4",{staticClass:"subtitle is-5"},[t._v("Categories in "+t._s(t.name))]),t._v(" "),e("div",{staticClass:"tags"},t._l(t.subcategories,function(a){return e("span",{key:a.id,staticClass:"tag"},[t._v("\n                                    @"),e("router-link",{attrs:{to:{name:"category",params:{id:a.id}}}},[t._v(t._s(a.name))])],1)}),0)]):t._e()])]),t._v(" "),e("div",{staticClass:"tile is-9"},[e("div",{staticClass:"container"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column is-12"},[e("div",{staticClass:"container"},[t.$route.query.search?e("h4",{staticClass:"subtitle is-4"},[t._v("Showing results for: "+t._s(decodeURI(t.$route.query.search))+"\n                                        "),e("small",{staticClass:"subtitle is-6"},[e("router-link",{attrs:{to:{name:"category",params:{id:t.id}}}},[t._v("Clear")])],1)]):t._e(),t._v(" "),t.products&&t.products.length?e("div",{staticClass:"columns is-multiline"},t._l(t.products,function(t){return e("div",{key:t.id,staticClass:"column is-4"},[e("Product",{attrs:{product:t}})],1)}),0):e("div",{staticClass:"has-text-centered"},[e("h5",{staticClass:"title is-4"},[t._v("Sorry No Products were found!")]),t._v(" "),e("p",{staticClass:"subtitle is-5"},[t._v("Try Navigating to other resources")])])]),t._v(" "),t.products&&t.products.length?e("div",[t.products&&t.paginator?e("nav",{staticClass:"pagination is-rounded",staticStyle:{"margin-top":"100px"},attrs:{role:"navigation"}},[e("router-link",{staticClass:"pagination-previous",class:{disabled:t.paginator.current_page<=1},attrs:{to:{name:"category",params:{id:t.id},query:{page:t.paginator.current_page-1}}}},[t._v("Previous")]),t._v(" "),e("router-link",{staticClass:"pagination-next",class:{disabled:t.paginator.current_page>=t.paginator.last_page},attrs:{to:{name:"category",params:{id:t.id},query:{page:t.paginator.current_page+1}}}},[t._v("Next page")]),t._v(" "),e("ul",{staticClass:"pagination-list"},t._l(t.paginator.last_page,function(a){return e("li",{key:a},[e("router-link",{staticClass:"pagination-link",class:{disabled:a==t.paginator.current_page},attrs:{to:{name:"category",params:{id:t.id},query:{page:a}}}},[t._v("\n                                                    "+t._s(a)+"\n                                                ")])],1)}),0)],1):t._e()]):t._e()])])])])])],1)])])},[],!1,null,"3a055a8c",null);a.default=n.exports}}]);