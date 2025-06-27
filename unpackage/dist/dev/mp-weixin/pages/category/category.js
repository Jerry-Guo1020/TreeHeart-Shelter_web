"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      posts: [1, 2],
      // 示例数据
      comments: [
        { avatar: "/static/avatar1.png", name: "陈树洞", content: "考完试就一定更美好啦！！！" },
        { avatar: "/static/avatar2.png", name: "树小洞2025", content: "未来要干嘛啊？好焦虑……" }
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$3,
    b: common_vendor.f($data.posts, (item, idx, i0) => {
      return {
        a: common_vendor.f($data.comments, (c, i, i1) => {
          return {
            a: c.avatar,
            b: common_vendor.t(c.name),
            c: common_vendor.t(c.content),
            d: i
          };
        }),
        b: idx
      };
    }),
    c: common_assets._imports_1$1,
    d: common_assets._imports_2$2,
    e: common_assets._imports_3$1,
    f: common_assets._imports_4,
    g: common_assets._imports_5,
    h: common_assets._imports_6,
    i: common_assets._imports_7,
    j: common_assets._imports_8,
    k: common_assets._imports_9,
    l: common_assets._imports_10
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8145b772"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/category.js.map
