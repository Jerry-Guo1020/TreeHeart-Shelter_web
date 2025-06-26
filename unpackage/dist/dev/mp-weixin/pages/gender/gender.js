"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "gender",
  setup(__props) {
    const gender = common_vendor.ref("");
    const selectGender = (value) => {
      gender.value = value;
    };
    const goNext = () => {
      if (!gender.value) {
        common_vendor.index.showToast({
          title: "请选择性别",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/info/info?gender=${gender.value}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1$1,
        c: gender.value === "male" ? 1 : "",
        d: gender.value === "male" ? 1 : "",
        e: common_vendor.o(($event) => selectGender("male")),
        f: common_assets._imports_2,
        g: gender.value === "female" ? 1 : "",
        h: gender.value === "female" ? 1 : "",
        i: common_vendor.o(($event) => selectGender("female")),
        j: common_vendor.o(goNext)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ae3ed7b4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gender/gender.js.map
