webpackJsonp([30],{DDiL:function(t,e){},EV1k:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"login"},[i("div",{staticClass:"title"},[i("div",{staticClass:"goback",on:{click:t._goBack}}),t._v(" "),i("span"),t._v(" "),i("div",{staticClass:"register",on:{click:t._goRegister}},[t._v("\n      注册\n    ")])]),t._v(" "),i("div",{staticClass:"section"},[i("h1",[t._v("欢迎登录GT1养车")]),t._v(" "),i("div",{staticClass:"input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{type:"number",name:"",placeholder:"请输入您的手机号",pattern:"[0-9]*"},domProps:{value:t.tel},on:{input:[function(e){e.target.composing||(t.tel=e.target.value)},t._maxlength]}})]),t._v(" "),i("div",{staticClass:"btn",on:{click:t._getCode}},[t._v("\n      获取验证码\n    ")])])])},staticRenderFns:[]};var n=i("Z0/y")({name:"login",data:function(){return{tel:""}},methods:{_goBack:function(){this.$router.go(-1)},_goRegister:function(){this.$router.replace("/register")},_getCode:function(){/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-1,3]|[6-8]))|(18[0-9]))\d{8}$/.test(this.tel)?this.$router.push("/setcode?phone="+this.tel+"&type=1"):this.$Toast({position:"bottom",message:"手机号格式错误！"})},_maxlength:function(t){this.tel.length>11&&(this.tel=this.tel.slice(0,11))}}},s,!1,function(t){i("DDiL")},"data-v-5c96f6db",null);e.default=n.exports}});
//# sourceMappingURL=30.dd98d4b47a41ba6521e2.js.map