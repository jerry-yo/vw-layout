webpackJsonp([8],{"5HD+":function(t,i){},"897Q":function(t,i){},EZuF:function(t,i){},LoCg:function(t,i,s){"use strict";var a=s("4YfN"),e=s.n(a),n=s("9rMa"),r={name:"seleArea",props:{areaindex:{type:Number}},data:function(){return{active:this.areaindex}},methods:{seleAreaBtn:function(t){this.active=t,this.goBack()},goBack:function(){this.$emit("goback",this.active)}},computed:e()({},Object(n.b)(["area"]))},o={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"sele-area",on:{click:function(t){t.preventDefault()}}},[s("div",{staticClass:"container"},t._l(t.area,function(i,a){return s("div",{key:a,staticClass:"area",class:{active:a===t.active},on:{click:function(i){t.seleAreaBtn(a)}}},[t._v("\n      "+t._s(i)+"\n    ")])}))])},staticRenderFns:[]};var c=s("Z0/y")(r,o,!1,function(t){s("897Q")},"data-v-46006780",null);i.a=c.exports},e5DI:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=s("4YfN"),e=s.n(a),n=s("LoCg"),r={name:"swiper",props:{duration:{default:500},slidetype:{default:"right"},recommends:{required:!0}},data:function(){return{touchInfo:{startX:0,startY:0,endX:0,endY:0,moveX:0,moveY:0,startTime:0,endTime:0},imgIndex:0,domLeft:0,bridge:0,translate3d:"",sliderDom:0,animateTime:0,sliderGroupDom:0,screenWidth:0}},computed:{imgs:function(){var t=this.recommends;return t}},methods:{touchS:function(t){var i=t.touches[0];this.touchInfo.startX=i.pageX,this.touchInfo.startY=i.pageY,this.touchInfo.startTime=parseInt(t.timeStamp)},touchE:function(t){var i=t.changedTouches[0];this.touchInfo.endX=i.pageX,this.touchInfo.endY=i.pageY,this.touchInfo.endTime=parseInt(t.timeStamp);var s=this.touchInfo.startX-this.touchInfo.endX,a=this.touchInfo.startY-this.touchInfo.endY,e=this.touchInfo.endTime-this.touchInfo.startTime;Math.abs(s)>Math.abs(a)&&(s>0?e>20&&e<300?(this.nextImg(),this.$emit("carid",this.imgIndex)):s>=this.sliderGroupDom/2?(this.nextImg(),this.$emit("carid",this.imgIndex)):this.goBackImg(parseInt(Math.abs(this.bridge)/this.sliderGroupDom*this.duration)):e>20&&e<300?(this.prevImg(),this.$emit("carid",this.imgIndex)):Math.abs(s)>=this.sliderGroupDom/2?(this.prevImg(),this.$emit("carid",this.imgIndex)):this.goBackImg(parseInt(Math.abs(this.bridge)/this.sliderGroupDom*this.duration)))},touchM:function(t){var i=t.touches[0];this.touchInfo.moveX=i.pageX,this.touchInfo.moveY=i.pageY,this.bridge=this.touchInfo.startX-this.touchInfo.moveX,this.touchInfo.startX,this.touchInfo.moveX,this.animateImg(!1,0)},tapDom:function(){this.$emit("tapcard",!0)},transitionEnd:function(){this.bridge=0,this.goBackImg(0)},nextImg:function(t){this.imgIndex!==this.imgs.length-1&&this.imgs.length&&(this.imgIndex+=1);var i=0;i="init"===t?this.duration:parseInt((this.sliderGroupDom-Math.abs(this.bridge))/this.sliderGroupDom*this.duration),this.animateImg(!0,i)},prevImg:function(t){0!==this.imgIndex&&(this.imgIndex-=1);var i=0;i="init"===t?this.duration:parseInt((this.sliderGroupDom-Math.abs(this.bridge))/this.sliderGroupDom*this.duration),this.animateImg(!0,i)},goBackImg:function(t){this.animateTime=t,0===this.imgIndex?this.domLeft=(this.screenWidth-this.sliderGroupDom)/2:this.domLeft=this.sliderDom-(this.imgIndex-1)*this.sliderGroupDom,this.translate3d="translate3d("+this.domLeft+"px, 0px, 0px)"},animateImg:function(t,i){t?this.goBackImg(Math.abs(i)):(this.animateTime=0,this.translate3d="translate3d("+(this.domLeft-this.bridge/this.screenWidth*this.sliderGroupDom)+"px, 0px, 0px)")},init:function(){this.screenWidth=this.$refs.slider.offsetWidth,this.sliderGroupDom=parseFloat((.768*this.screenWidth).toFixed(2)),this.sliderDom=-(this.sliderGroupDom-(this.screenWidth-this.sliderGroupDom)/2),this.goBackImg(0)}},mounted:function(){this.init()}},o={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"slider",staticClass:"slider",on:{touchmove:function(t){t.preventDefault()}}},[s("div",{ref:"sliderGroup",staticClass:"slider-group",style:{transform:t.translate3d,transitionDuration:t.animateTime+"ms"},on:{transitionend:t.transitionEnd,touchstart:t.touchS,touchend:t.touchE,touchmove:t.touchM}},[t._l(t.imgs,function(i,a){return s("div",{key:a,staticClass:"slider-dots"},[s("div",{staticClass:"dot-con"},[s("div",{staticClass:"left"},[s("img",{attrs:{src:t.carLogoUrl+i.imageSrc,alt:""}})]),t._v(" "),s("div",{staticClass:"right"},[s("h2",[t._v(t._s(i.series.sbName+" - "+i.series.vehicleSystem[1]))]),t._v(" "),s("p",[t._v(t._s(i.idCard)),s("span",[t._v("l")]),t._v(t._s(i.way)+"km")]),t._v(" "),s("div",{class:i.default?"default":"default-btn"},[t._v("\n            "+t._s(i.default?"已设为当前车辆":"设为当前车辆")+"\n          ")])])])])}),t._v(" "),t.imgs.length?t._e():s("div",{staticClass:"slider-dots",on:{click:t.tapDom}},[s("div",{staticClass:"dot-con",class:t.imgs.length?"":"nocar"})])],2)])},staticRenderFns:[]};var c=s("Z0/y")(r,o,!1,function(t){s("EZuF")},"data-v-09a41b8e",null).exports,d=s("9rMa"),h={name:"garage",data:function(){return{showAreaBtn:!1,areaIndex:3,carId:0}},methods:e()({goSeleArea:function(){this.showAreaBtn=!0},getBackInfo:function(t){this.areaIndex=t,this.showAreaBtn=!1},tapCard:function(t){this.myCar.length<1&&this.$router.push("/addcar-tabbar")},getCarId:function(t){this.carId=t},_goBack:function(){this.$router.push("/mind")},_goManagement:function(){this.$router.push("/vehicle-management")},_goCarOwner:function(){this.$router.push("/car-owner")},_goCarSharing:function(){this.$router.push("/car-sharing")},_goDetectionRecord:function(){this.$router.push("/detection-record")},getCarBrand:function(){var t=this;this.api_post("/api/carzone/getCarAllBrand",function(i){0===i.errorCode&&(t.logo=i.data.data.detail,t.setCarBrand(t.logo))})}},Object(d.c)({setCarBrand:"SET_CARBRAND"})),created:function(){this.getCarBrand()},computed:e()({},Object(d.b)(["myCar"])),components:{seleArea:n.a,Slider:c}},u={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"garage"},[t.showAreaBtn?s("seleArea",{attrs:{areaindex:t.areaIndex},on:{goback:t.getBackInfo}}):t._e(),t._v(" "),s("div",{staticClass:"action-bar"},[s("div",{staticClass:"go-back",on:{click:t._goBack}}),t._v(" "),s("div",{staticClass:"font"},[t._v("我的车库")]),t._v(" "),s("div",{staticClass:"vehicle-management",on:{click:t._goManagement}},[t._v("管理")])]),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"swiper"},[s("Slider",{attrs:{recommends:t.myCar},on:{tapcard:t.tapCard,carid:t.getCarId}})],1),t._v(" "),s("div",{staticClass:"car-menu"},[s("div",{staticClass:"car-con"},[s("div",{staticClass:"owner",on:{click:t._goCarOwner}},[s("h2",[t._v("车主认证")])]),t._v(" "),s("div",{staticClass:"record",on:{click:t._goDetectionRecord}},[s("h2",[t._v("检测记录")])])])]),t._v(" "),t.myCar.length>0?s("div",{staticClass:"car-idcard"},[s("span",[t._v("车牌号")]),t._v(" "),s("div",{staticClass:"area",on:{click:t.goSeleArea}},[t._v("\n        "+t._s(t.myCar[t.carId].idCard.slice(0,1))+"\n      ")]),t._v(" "),s("div",{staticClass:"number"},[s("input",{attrs:{type:"text",name:"",placeholder:t.myCar[t.carId].idCard.slice(1,7)}})])]):t._e(),t._v(" "),t.myCar.length>0?s("div",{staticClass:"car-info"},[s("div",{staticClass:"car-models"},[s("span",[t._v("具体车型")]),t._v(" "),s("span",[t._v(t._s(t.myCar[t.carId].salesVersion))])]),t._v(" "),s("div",{staticClass:"car-others"},[s("div",{staticClass:"car-displacement"},[s("span",[t._v("发动机排量")]),t._v(" "),s("span",[t._v(t._s(t.myCar[t.carId].exhaustVolume))])]),t._v(" "),s("div",{staticClass:"car-age"},[s("span",[t._v("生产年份")]),t._v(" "),s("span",[t._v(t._s(t.myCar[t.carId].year))])])]),t._v(" "),s("div",{staticClass:"car-far"},[s("span",[t._v("行驶里程")]),t._v(" "),s("div",{staticClass:"input"},[s("input",{attrs:{type:"number",name:"",placeholder:t.myCar[t.carId].way}})]),t._v(" "),s("span",[t._v("km")])]),t._v(" "),t._m(0)]):t._e()])],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"car-time"},[i("span",[this._v("注册时间")]),this._v(" "),i("span",[this._v("未添加信息")])])}]};var m=s("Z0/y")(h,u,!1,function(t){s("5HD+")},"data-v-64789e43",null);i.default=m.exports}});
//# sourceMappingURL=8.96a39fae01a29311daa2.js.map