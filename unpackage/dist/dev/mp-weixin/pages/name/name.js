"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    goNext() {
      if (!this.name) {
        common_vendor.index.showToast({ title: "请输入姓名", icon: "none" });
        return;
      }
      common_vendor.index.showToast({ title: "欢迎，" + this.name, icon: "success" });
      common_vendor.index.navigateTo({
        url: "/pages/nickname/nickname"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: $data.name,
    c: common_vendor.o(($event) => $data.name = $event.detail.value),
    d: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1ca1e1b3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/name/name.js.map
