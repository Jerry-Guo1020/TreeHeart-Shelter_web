"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/welcome/welcome.js";
  "./pages/login/login.js";
  "./pages/gender/gender.js";
  "./pages/info/school.js";
  "./pages/info/grade.js";
  "./pages/info/institute.js";
  "./pages/info/major.js";
  "./pages/name/name.js";
  "./pages/home/home.js";
  "./pages/loading/loading.js";
  "./pages/nickname/nickname.js";
  "./component/BottomNavbar/BottomNavbar.js";
  "./pages/personal/personal.js";
  "./pages/personInformation/personInformation.js";
  "./pages/community/community.js";
  "./pages/test/test.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
