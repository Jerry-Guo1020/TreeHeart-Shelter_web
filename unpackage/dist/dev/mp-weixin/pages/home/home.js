"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_config = require("../../api/config.js");
if (!Math) {
  BottomNavbar();
}
const BottomNavbar = () => "../../component/BottomNavbar/BottomNavbar2.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(api_config.base_url) + "/static/首页第一张.png",
        b: common_vendor.unref(api_config.base_url) + "/static/头像.png",
        c: common_assets._imports_0,
        d: common_vendor.unref(api_config.base_url) + "/static/头像.png",
        e: common_vendor.unref(api_config.base_url) + "/static/头像.png",
        f: common_vendor.p({
          current: 0
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
