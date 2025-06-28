"use strict";
const common_vendor = require("../../common/vendor.js");
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
        a: common_vendor.o(toPersonInformation),
        b: common_vendor.p({
          current: 3
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ae23533"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personal/personal.js.map
