"use strict";
const common_vendor = require("../../common/vendor.js");
const api_config = require("../../api/config.js");
if (!Math) {
  BottomNavbar();
}
const BottomNavbar = () => "../../component/BottomNavbar/BottomNavbar2.js";
const _sfc_main = {
  __name: "personal",
  setup(__props) {
    const toPersonInformation = () => {
      common_vendor.index.navigateTo({ url: "/pages/personInformation/personInformation" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(api_config.base_url) + "/static/头像.png",
        b: common_vendor.unref(api_config.base_url) + "/static/fun_1.png",
        c: common_vendor.unref(api_config.base_url) + "/static/fun_1.png",
        d: common_vendor.o(toPersonInformation),
        e: common_vendor.p({
          current: 3
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ae23533"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personal/personal.js.map
