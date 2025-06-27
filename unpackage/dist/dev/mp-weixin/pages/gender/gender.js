"use strict";
const common_vendor = require("../../common/vendor.js");
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
        a: gender.value === "male" ? 1 : "",
        b: gender.value === "male" ? 1 : "",
        c: common_vendor.o(($event) => selectGender("male")),
        d: gender.value === "female" ? 1 : "",
        e: gender.value === "female" ? 1 : "",
        f: common_vendor.o(($event) => selectGender("female")),
        g: common_vendor.o(goNext)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ae3ed7b4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gender/gender.js.map
