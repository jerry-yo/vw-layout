webpackJsonp([19],{"+A2m":function(r,e){},V2Rg:function(r,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=t("4YfN"),a=t.n(s),i=t("aEiX"),c=t("E/Gt"),o=t("qwAB"),n=t("9rMa"),d={computed:a()({subscribeOrder:function(){var r=[];return this.orderList.forEach(function(e,t){3===e.orderFormState&&r.push(e)}),r}},Object(n.b)(["orderList"])),methods:a()({goOrderInfo:function(r){this.setOrderInfo(r),this.$router.push("/orderinfo")},_goPay:function(r){r.serviceIsAlreadyFinish&&this.modifyOrderList({type:"pay",id:r.orderId})}},Object(n.c)({setOrderInfo:"SET_ORDER_INFO",modifyOrderList:"MODIFY_ORDER_LIST"})),components:{orderBy:i.a,Scroll:o.a,orderXc:c.a}},l={render:function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("Scroll",{staticClass:"wrapper"},[t("ul",{staticClass:"container"},r._l(r.subscribeOrder,function(e,s){return t("li",{key:s},[t("div",{staticClass:"order-title",on:{click:function(t){r.goOrderInfo(e)}}},[t("div",{staticClass:"img"},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.carImageSrc,expression:"item.carImageSrc"}],attrs:{alt:""}})]),r._v(" "),t("span",{staticClass:"car-id"},[r._v(r._s(e.idCard))]),r._v(" "),t("div",{staticClass:"order-states",class:{by:1===e.whichService,wx:2===e.whichService,xc:0===e.whichService}})]),r._v(" "),t("div",{staticClass:"order-content",on:{click:function(t){r.goOrderInfo(e)}}},[1===e.whichService||2===e.whichService?t("orderBy",{attrs:{data:e.userOrderFormRepairCarBean||e.userOrderFormKeepCarBean}}):r._e(),r._v(" "),0===e.whichService?t("orderXc",{attrs:{data:e.washType}}):r._e()],1),r._v(" "),t("div",{staticClass:"order-foot"},[t("div",{staticClass:"foot"},[e.serviceIsAlreadyFinish?r._e():t("span",{staticClass:"car-state"},[r._v("服务进行中")]),r._v(" "),t("div",{staticClass:"order-set"},[t("div",{class:e.serviceIsAlreadyFinish?"go-pay":"ungo-pay",on:{click:function(t){r._goPay(e)}}},[r._v("付款")])])])])])}))])},staticRenderFns:[]};var v=t("Z0/y")(d,l,!1,function(r){t("+A2m")},"data-v-caa5a66c",null);e.default=v.exports}});
//# sourceMappingURL=19.ee5f67dddb5c7ee0f269.js.map