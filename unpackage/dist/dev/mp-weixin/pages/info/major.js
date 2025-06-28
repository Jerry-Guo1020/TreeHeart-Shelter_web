"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      stage: "",
      school: "",
      college: "",
      major: ""
    };
  },
  methods: {
    goNext() {
      if (!this.stage || !this.school || !this.college || !this.major) {
        common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      common_vendor.index.navigateTo({ url: "/pages/name/name" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.major,
    b: common_vendor.o(($event) => $data.major = $event.detail.value),
    c: common_vendor.o((...args) => $options.goNext && $options.goNext(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e69130f1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/major.js.map
