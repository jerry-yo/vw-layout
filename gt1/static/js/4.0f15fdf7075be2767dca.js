webpackJsonp([4],{"3DVd":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("PhKd"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"upload-pic"},[s("div",{staticClass:"con"},[s("ul",[t._l(t.imgArr,function(t,e){return s("li",{key:e,staticClass:"imgs"})}),t._v(" "),8!==t.imgArr.length?s("li",{staticClass:"list-btn",on:{click:t.getPic}}):t._e(),t._v(" "),t._l(t.boxArr,function(t){return s("li",{key:t.id,staticClass:"box"})})],2)])])},staticRenderFns:[]};var a={name:"repair",data:function(){return{repairBScroll:null,clientHeight:null,wxInfo:null}},methods:{focusText:function(){var t=this;setTimeout(function(){var e=t.$refs.chatpannel;e.scrollIntoView(!0),e.scrollIntoViewIfNeeded(!0)},200)},goNext:function(){this.$router.push("/repair-pre-order")}},mounted:function(){this.$nextTick(function(){this.repairBScroll=new n.a(this.$refs.repair,{click:!0}),this.clientHeight=document.body.offsetHeight})},components:{uploadPic:s("Z0/y")({name:"uploadPic",data:function(){return{imgArr:[]}},computed:{boxArr:function(){if(this.imgArr.length>3){for(var t=[],e=0;e<8-this.imgArr.length-1;e++)t.push({value:"a_1",id:this.imgArr.length+e});return t}for(var s=[],n=0;n<4-this.imgArr.length-1;n++)s.push({value:"a_1",id:this.imgArr.length+n});return s}},methods:{getPic:function(){this.imgArr.push(1)}}},i,!1,function(t){s("4ATA")},"data-v-87535790",null).exports,seleDetectionMenu:s("l99u").a}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"repair",style:{height:t.clientHeight+"px"},attrs:{flexContainer:""}},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("div",{ref:"repair",staticClass:"container"},[s("div",{staticClass:"wrapper"},[s("div",{ref:"chatpannel",staticClass:"textarea",attrs:{flexContainer:""}},[s("textarea",{attrs:{name:"name",rows:"5",placeholder:"简单概述您的车辆故障，提供图片能帮助维修中心为您 提前进货哦"},on:{focus:t.focusText}})]),t._v(" "),s("uploadPic"),t._v(" "),t._m(2),t._v(" "),s("seleDetectionMenu",{attrs:{check:!0}})],1)]),t._v(" "),s("div",{staticClass:"go-next",on:{click:t.goNext}})])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"action-bar"},[e("div",{staticClass:"go-back"}),this._v(" "),e("div",{staticClass:"font"},[e("h2",[this._v("东风本田-思域")]),this._v(" "),e("p",[e("span",[this._v("苏DB5A68")]),e("span",[this._v("丨")]),e("span",[this._v("2300km")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"service-flow"},[s("span",{staticClass:"bg bg1"},[t._v("选择服务")]),t._v(" "),s("span",[t._v("-")]),t._v(" "),s("span",{staticClass:"bg bg2"},[t._v("选择门店")]),t._v(" "),s("span",[t._v("-")]),t._v(" "),s("span",{staticClass:"bg bg3"},[t._v("确认订单")]),t._v(" "),s("span",[t._v("-")]),t._v(" "),s("span",{staticClass:"bg bg4"},[t._v("到店服务")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"detection-record"},[e("span",[this._v("车辆检查故障")]),this._v(" "),e("div",{staticClass:"order"},[e("span",[this._v("查看检测单")])])])}]};var r=s("Z0/y")(a,c,!1,function(t){s("d+DZ")},"data-v-d8c7708e",null);e.default=r.exports},"4ATA":function(t,e){},W9q0:function(t,e){},"d+DZ":function(t,e){},l99u:function(t,e,s){"use strict";var n={name:"detectionMenu",props:{check:{type:Boolean}},data:function(){return{menus:[{check:!1,id:0,name:"景观灯",state:0,info:"别来烦我了真的很烦"},{check:!0,id:1,name:"发动机丢了",state:2,info:"别来烦我了真的很烦"},{check:!1,id:2,name:"方向盘松了",state:2,info:"别来烦我了真的很烦"},{check:!1,id:3,name:"车门剐蹭",state:1,info:"别来烦我了真的很烦"},{check:!0,id:4,name:"尾灯不亮了",state:2,info:"别来烦我了真的很烦"},{check:!1,id:5,name:"刹车片消失了",state:2,info:"别来烦我了真的很烦"},{check:!0,id:6,name:"要命了",state:1,info:"别来烦我了真的很烦"}]}},methods:{showState:function(t){return 0===t?"safe":1===t?"warn":"error"},checkMenu:function(t){this.menus[t].check=!this.menus[t].check}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detection-menu"},[s("ul",t._l(t.menus,function(e,n){return s("li",{key:n},[t.check?s("div",{staticClass:"select-btn"},[s("div",{staticClass:"sele-btn",class:e.check?"check":"nocheck",on:{click:function(e){t.checkMenu(n)}}})]):t._e(),t._v(" "),s("div",{staticClass:"select-info",class:t.showState(e.id)},[t._v("\n        "+t._s(e.name)+"\n      ")]),t._v(" "),s("div",{staticClass:"select-box"}),t._v(" "),s("div",{staticClass:"go-info"},[t._v("\n        "+t._s(e.info)+"\n      ")])])}))])},staticRenderFns:[]};var a=s("Z0/y")(n,i,!1,function(t){s("W9q0")},"data-v-6148e67e",null);e.a=a.exports}});
//# sourceMappingURL=4.0f15fdf7075be2767dca.js.map