webpackJsonp([18],{"84fn":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"login",mixins:[s("F4+m").d],data:function(){return{tel:""}},methods:{_goBack:function(){this.$router.go(-1)},_goRegister:function(){this.$router.replace("/register")},_getCode:function(){var t=this;/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-1,3]|[6-8]))|(18[0-9]))\d{8}$/.test(this.tel)?(this.$post(this.gt1Url+"/api/f6-app/getMobileMsg",this.headers_1,function(e){0===e.errorCode?t.$router.push("/setcode?phone="+t.tel+"&type=3"):e.errorCode?t.$Toast({message:e.errorMsg,position:"bottom"}):t.$Toast({message:"验证码获取失败",position:"bottom"})},{phone:this.tel,type:2}),this.$router.push("/setcode?phone="+this.tel+"&type=1")):this.$Toast({position:"bottom",message:"手机号格式错误！"})},_maxlength:function(t){this.tel.length>11&&(this.tel=this.tel.slice(0,11))}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"title"},[s("div",{staticClass:"goback",on:{click:t._goBack}}),t._v(" "),s("span"),t._v(" "),s("div",{staticClass:"register",on:{click:t._goRegister}},[t._v("\n      注册\n    ")])]),t._v(" "),s("div",{staticClass:"section"},[s("h1",[t._v("请输入手机号进行微信绑定")]),t._v(" "),s("div",{staticClass:"input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{type:"number",name:"",placeholder:"请输入您的手机号",pattern:"[0-9]*"},domProps:{value:t.tel},on:{input:[function(e){e.target.composing||(t.tel=e.target.value)},t._maxlength]}})]),t._v(" "),s("div",{staticClass:"btn",on:{click:t._getCode}},[t._v("\n      获取验证码\n    ")])])])},staticRenderFns:[]};var n=s("VU/8")(i,o,!1,function(t){s("XTTA")},"data-v-f70cffd2",null);e.default=n.exports},XTTA:function(t,e){}});