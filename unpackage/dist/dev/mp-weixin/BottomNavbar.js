"use strict";
const common_vendor = require("./common/vendor.js");
const iconHome = "http://43.142.21.211:3000/static/home_1.png";
const iconOrder = "http://43.142.21.211:3000/static/home_2.png";
const iconTest = "http://43.142.21.211:3000/static/home_3.png";
const iconUser = "http://43.142.21.211:3000/static/home_4.png";
const _sfc_main = {
  __name: "BottomNavbar",
  setup(__props) {
    function switchTab(idx) {
      if (idx === 0) {
        common_vendor.index.reLaunch({ url: "/pages/home/home" });
      } else if (idx === 1) {
        common_vendor.index.navigateTo({ url: "/pages/community/community" });
      } else if (idx === 2) {
        common_vendor.index.navigateTo({ url: "/pages/test/test" });
      } else if (idx === 3) {
        common_vendor.index.navigateTo({ url: "/pages/personal/personal" });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: iconHome,
        b: common_vendor.o(($event) => switchTab(0)),
        c: iconOrder,
        d: common_vendor.o(($event) => switchTab(1)),
        e: iconTest,
        f: common_vendor.o(($event) => switchTab(2)),
        g: iconUser,
        h: common_vendor.o(($event) => switchTab(3))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d9abd7fd"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/BottomNavbar.js.map
