"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const nickname = "阿郭";
const _sfc_main = {
  __name: "personInformation",
  setup(__props) {
    const infoGroups = [
      {
        groupName: "基本信息",
        items: [
          { label: "用户名", value: "阿郭", to: "/pages/nickname/nickname" },
          { label: "真实姓名", value: "郭笑荣", to: "/pages/name/name" },
          { label: "性别", value: "男", to: "/pages/gender/gender" }
        ]
      },
      {
        groupName: "学校基本信息",
        items: [
          { label: "学校", value: "大连东软信息学院", to: "/pages/info/school" },
          { label: "学院", value: "计算机学院", to: "/pages/info/institute" },
          { label: "年级", value: "大三", to: "/pages/info/grade" },
          { label: "专业名称", value: "软件工程", to: "/pages/info/major" }
        ]
      }
    ];
    function handleEdit(item) {
      common_vendor.index.navigateTo({ url: item.to });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.t(nickname),
        c: common_vendor.f(infoGroups, (group, k0, i0) => {
          return {
            a: common_vendor.t(group.groupName),
            b: common_vendor.f(group.items, (item, k1, i1) => {
              return {
                a: common_vendor.t(item.label),
                b: common_vendor.t(item.value),
                c: item.label,
                d: common_vendor.o(($event) => handleEdit(item), item.label)
              };
            }),
            c: group.groupName
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-72c0b6fd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personInformation/personInformation.js.map
