webpackJsonp([26],{EV1k:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"title"},[s("div",{staticClass:"goback",on:{click:t._goBack}}),t._v(" "),s("span"),t._v(" "),s("div",{staticClass:"register",on:{click:t._goRegister}},[t._v("\n      注册\n    ")])]),t._v(" "),s("div",{staticClass:"section"},[s("h1",[t._v("欢迎登录GT1养车")]),t._v(" "),s("div",{staticClass:"input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{type:"number",name:"",placeholder:"请输入您的手机号",pattern:"[0-9]*"},domProps:{value:t.tel},on:{input:[function(e){e.target.composing||(t.tel=e.target.value)},t._maxlength]}})]),t._v(" "),s("div",{staticClass:"btn",on:{click:t._getCode}},[t._v("\n      获取验证码\n    ")])])])},staticRenderFns:[]};var n=s("Z0/y")({name:"login",data:function(){return{tel:""}},methods:{_goBack:function(){this.$router.go(-1)},_goRegister:function(){this.$router.push("/register")},_getCode:function(){/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-1,3]|[6-8]))|(18[0-9]))\d{8}$/.test(this.tel)?this.$router.push("/setcode"):this.$Toast({position:"bottom",message:"手机号格式错误！"})},_maxlength:function(t){this.tel.length>11&&(this.tel=this.tel.slice(0,11))}}},i,!1,function(t){s("Ht9z")},"data-v-49118ddb",null);e.default=n.exports},Ht9z:function(t,e){}});
//# sourceMappingURL=26.51d87470cfd5aff96568.js.map