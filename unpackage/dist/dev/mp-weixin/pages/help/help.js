"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activities: [
        {
          title: "阳光“心”旅——户外心理探索活动",
          img: "/static/activity1.jpg",
          // 占位图片
          time: "2025年05月20日 09:51"
        },
        {
          title: "阳光“心”旅——户外心理探索活动",
          img: "/static/activity1.jpg",
          time: "2025年05月20日 09:51"
        },
        {
          title: "阳光“心”旅——户外心理探索活动",
          img: "/static/activity1.jpg",
          time: "2025年05月20日 09:51"
        }
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_vendor.f($data.activities, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: item.img,
        c: item.title,
        d: common_vendor.t(item.time),
        e: idx
      };
    }),
    e: common_assets._imports_6,
    f: common_assets._imports_7,
    g: common_assets._imports_8,
    h: common_assets._imports_9,
    i: common_assets._imports_10
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5194e907"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/help/help.js.map
