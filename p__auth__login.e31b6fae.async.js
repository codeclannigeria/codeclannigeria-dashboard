(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{JNCl:function(e,a,t){"use strict";t.r(a);t("sRBo");var r=t("kaz8"),n=t("WmNS"),c=t.n(n),s=t("k1fw"),l=(t("miYZ"),t("tsqr")),i=t("9og8"),o=t("tJVT"),m=t("mxmt"),u=t.n(m),_=t("CwrG"),p=t("LLt/"),d=t("0W83"),f=t("q1tI"),g=t.n(f),v=t("9kvl"),E=t("uYtH"),b=(t("y8nQ"),t("Vl3Y")),h=t("TSYQ"),w=t.n(h),N=t("gTBD"),x=t.n(N),O=(t("5NDa"),t("5rEg")),j=t("0Owb"),y=t("PpiC"),C=t("y0hu"),k=t("MGYb"),S={Email:{props:{size:"large",placeholder:"Enter your email",prefix:g.a.createElement(C["a"],{style:{color:"#1890ff"},className:x.a.prefixIcon})},rules:[{required:!0,message:"Email is required!"},{type:"email",message:"Invalid email!"}]},Password:{props:{size:"large",prefix:g.a.createElement(k["a"],{className:x.a.prefixIcon}),placeholder:"Enter your password",type:"password"},rules:[{required:!0,message:"Password is required!"}]}},I=b["a"].Item,P=function(e){var a=e.onChange,t=e.defaultValue,r=e.customProps,n=void 0===r?{}:r,c=e.rules,s={rules:c||n.rules};return a&&(s.onChange=a),t&&(s.initialValue=t),s},J=function(e){e.onChange;var a=e.customProps,t=(e.defaultValue,e.rules,e.name),r=Object(y["a"])(e,["onChange","customProps","defaultValue","rules","name"]);if(!t)return null;var n=P(e);return g.a.createElement(I,Object(j["a"])({name:t},n),g.a.createElement(O["a"],Object(j["a"])({},a,r)))},T={};Object.keys(S).forEach((function(e){var a=S[e];T[e]=function(e){return g.a.createElement(J,Object(j["a"])({customProps:a.props,rules:a.rules},e))}}));var q=T,Y=(t("+L6B"),t("2/Rp")),D=function(e){var a=e.className,t=Object(y["a"])(e,["className"]),r=w()(x.a.submit,a);return g.a.createElement(Y["a"],Object(j["a"])({size:"large",className:r,type:"primary",htmlType:"submit"},t))},L=D,V=function(e){var a=e.className,t=b["a"].useForm(),r=Object(o["a"])(t,1),n=r[0];return g.a.createElement("div",{className:w()(a,x.a.login)},g.a.createElement(b["a"],{form:e.form||n,onFinish:function(a){e.onSubmit&&e.onSubmit(a)}},e.children))};V.Email=q.Email,V.Password=q.Password,V.Submit=L;var B=V,H=t("ufJv"),W=t.n(H),z=B.Email,Q=B.Password,A=B.Submit,F=function(){setTimeout((function(){var e=v["c"].location.query,a=e,t=a.redirect;t?v["c"].replace(t):v["c"].replace("/")}),10)},R=function(){var e=Object(f["useState"])(!1),a=Object(o["a"])(e,2),t=a[0],n=a[1],m=Object(v["g"])("@@initialState"),b=m.initialState,h=m.setInitialState,w=Object(f["useState"])(!0),N=Object(o["a"])(w,2),x=N[0],O=N[1],j=function(){var e=Object(i["a"])(c.a.mark((function e(a){var t,r,i;return c.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n(!0),e.prev=1,e.next=4,p["a"].login(a);case 4:if(t=e.sent,r=t.accessToken,r){e.next=10;break}return l["b"].error("Invalid login attempt"),n(!1),e.abrupt("return");case 10:if(!b){e.next=19;break}return l["b"].success("Login successful!"),d["a"].saveAuthToken(r),e.next=15,null===b||void 0===b?void 0:b.fetchUserInfo();case 15:i=e.sent,h(Object(s["a"])(Object(s["a"])({},b),{},{currentUser:i})),n(!1),F();case 19:e.next=25;break;case 21:e.prev=21,e.t0=e["catch"](1),n(!1),l["b"].error("Login failed, please try again");case 25:case"end":return e.stop()}}),e,null,[[1,21]])})));return function(a){return e.apply(this,arguments)}}();return g.a.createElement("div",{className:W.a.container},g.a.createElement("div",{className:W.a.lang},g.a.createElement(v["a"],null)),g.a.createElement("div",{className:W.a.content},g.a.createElement("div",{className:W.a.top},g.a.createElement("div",{className:W.a.header},g.a.createElement(E["a"],{to:"/"},g.a.createElement("img",{alt:"logo",className:W.a.logo,src:u.a}),g.a.createElement("span",{className:W.a.title},"Code Clan"))),g.a.createElement("div",{className:W.a.desc},"Code Clan Nigeria")),g.a.createElement("div",{className:W.a.main},g.a.createElement(B,{onSubmit:j},g.a.createElement(z,{name:"email"}),g.a.createElement(Q,{name:"password"}),g.a.createElement("div",null,g.a.createElement(r["a"],{checked:x,onChange:function(e){return O(e.target.checked)}},"remember me"),g.a.createElement("a",{style:{float:"right"}},"forgot password")),g.a.createElement(A,{loading:t},"Log In")))),g.a.createElement(_["a"],null))};a["default"]=R},gTBD:function(e,a,t){e.exports={login:"login___v1f01",getCaptcha:"getCaptcha___1HO4Q",icon:"icon___TeYON",other:"other___2J-D3",register:"register___2vFWa",prefixIcon:"prefixIcon___39x_5",submit:"submit___13RWf"}},mxmt:function(e,a,t){e.exports=t.p+"static/logo.f0355d39.svg"},ufJv:function(e,a,t){e.exports={container:"container___1BWQv",lang:"lang___36wca",content:"content___2Cdl9",top:"top___xSiZi",header:"header___c-YJH",logo:"logo___2a7Eo",title:"title___18ACa",desc:"desc___DpHiy",main:"main___1AaH7",icon:"icon___DwJq_",other:"other___1rok4",register:"register___lEUtf"}}}]);