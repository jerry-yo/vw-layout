webpackJsonp([13],{LoCg:function(a,t,e){"use strict";var s={name:"seleArea",props:{area:{type:Array},areaindex:{type:Number}},data:function(){return{active:this.areaindex}},methods:{seleAreaBtn:function(a){this.active=a,this.goBack()},goBack:function(){this.$emit("goback",this.active)}}},n={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"sele-area",on:{click:function(a){a.preventDefault()}}},[e("div",{staticClass:"container"},a._l(a.area,function(t,s){return e("div",{key:s,staticClass:"area",class:{active:s===a.active},on:{click:function(t){a.seleAreaBtn(s)}}},[a._v("\n      "+a._s(t)+"\n    ")])}))])},staticRenderFns:[]};var i=e("Z0/y")(s,n,!1,function(a){e("r9EX")},"data-v-a0c240c8",null);t.a=i.exports},r9EX:function(a,t){},t9rS:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"addcarIdcard",data:function(){return{showAreaBtn:!1,areaIndex:3,area:["京","沪","浙","苏","粤","鲁","晋","冀","渝","川","豫","辽","吉","黑","皖","鄂","湘","赣","闽","陕","甘","宁","蒙","津","桂","云","贵","琼","青","新","藏","港","澳"]}},methods:{goAge:function(){this.$router.push("/addcar-idcard")},goSeleArea:function(){this.showAreaBtn=!0},getBackInfo:function(a){this.areaIndex=a,this.showAreaBtn=!1},_goBack:function(){this.$router.go(-1)}},components:{seleArea:e("LoCg").a}},n={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"addcar-idcard",attrs:{flexContainer:""}},[e("div",{staticClass:"action-bar"},[e("div",{staticClass:"go-back",on:{click:a._goBack}}),a._v(" "),e("div",{staticClass:"tabbar"},[a._v("\n      添加车辆\n    ")])]),a._v(" "),e("div",{staticClass:"container"},[a.showAreaBtn?e("seleArea",{attrs:{areaindex:a.areaIndex,area:a.area},on:{goback:a.getBackInfo}}):a._e(),a._v(" "),a._m(0),a._v(" "),e("div",{staticClass:"idcard"},[e("span",[a._v("车牌号")]),a._v(" "),e("div",{staticClass:"idcard-area",on:{click:a.goSeleArea}},[a._v("\n        "+a._s(a.area[a.areaIndex])+"\n      ")]),a._v(" "),e("div",{staticClass:"idcard-num"},[a._v("\n        385185\n      ")])]),a._v(" "),e("p",[a._v("请输入真实车牌 以便后续服务")]),a._v(" "),e("h2",[a._v("其他信息（选填）")]),a._v(" "),a._m(1),a._v(" "),a._m(2)],1)])},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"car-name"},[t("img",{attrs:{src:"",alt:""}}),this._v(" "),t("h2",[t("span",[this._v("东风本田思域")]),t("span",[this._v("2.5L")]),t("span",[this._v("2016款")]),t("span",[this._v("无级变速自动尊耀版")])])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"car-way"},[t("span",[this._v("行驶里程")]),this._v(" "),t("div",{staticClass:"input"},[t("input",{attrs:{type:"text",name:"",value:""}})]),this._v(" "),t("span",[this._v("km")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"car-date"},[t("span",[this._v("注册日期")]),this._v(" "),t("div",{staticClass:"btn"},[this._v("\n        请填写行驶证上真实注册日期\n      ")])])}]};var i=e("Z0/y")(s,n,!1,function(a){e("xwxq")},"data-v-2d72fca1",null);t.default=i.exports},xwxq:function(a,t){}});
//# sourceMappingURL=13.3c9f73db5cd73366a985.js.map