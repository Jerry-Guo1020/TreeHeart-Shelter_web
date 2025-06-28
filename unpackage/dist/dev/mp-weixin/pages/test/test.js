"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  BottomNavbar();
}
const BottomNavbar = () => "../../component/BottomNavbar/BottomNavbar2.js";
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const quickList = common_vendor.ref([
      {
        text: "性格测试",
        emoji: "🧠",
        bg: "#CDE97D",
        textColor: "#ff7700"
      },
      {
        text: "焦虑测试",
        emoji: "💧",
        bg: "#00ABFF",
        textColor: "#005076"
      },
      {
        text: "抑郁测试",
        emoji: "💤",
        bg: "#FA9FB4",
        textColor: "#ff89af"
      },
      {
        text: "睡眠质量",
        emoji: "🌙",
        bg: "#ffcad8",
        textColor: "#FC5E65"
      }
    ]);
    const testCardList = common_vendor.ref([
      {
        type: "性格测试",
        typeColor: "#FF9200",
        // 橙
        title: "MBTI 人格类型测试",
        img: "http://43.142.21.211:3000/static/test_1.jpg",
        desc: "迈尔斯-布里格斯性格类型指标（MBTI）是一种流行的人格测试，帮助您了解自己的性格特点和与他人交往的方式。",
        time: "15分钟",
        count: 20,
        popularity: 95
      },
      {
        type: "焦虑测试",
        typeColor: "#00ABFF",
        // 亮蓝
        title: "焦虑自评量表",
        img: "http://43.142.21.211:3000/static/test_2.png",
        desc: "焦虑自评量表（SAS）是一种用于评估个体焦虑水平的工具，帮助您了解自己的焦虑状态。",
        time: "10分钟",
        count: 20,
        popularity: 88
      },
      {
        type: "抑郁测试",
        typeColor: "#FA9FB4",
        // 糖果粉
        title: "抑郁自评量表",
        img: "http://43.142.21.211:3000/static/test_3.png",
        desc: "抑郁自评量表（SDS）是一种用于评估个体抑郁症状的工具，帮助您了解自己的情绪状态。",
        time: "10分钟",
        count: 20,
        popularity: 85
      }
    ]);
    function onQuickTap(item) {
      common_vendor.index.showToast({
        title: item.text,
        icon: "none"
      });
    }
    function onStartTest(item) {
      common_vendor.index.showToast({
        title: `进入${item.title}`,
        icon: "none"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(quickList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.emoji),
            b: item.bg,
            c: common_vendor.t(item.text),
            d: item.textColor,
            e: item.text,
            f: common_vendor.o(($event) => onQuickTap(item), item.text)
          };
        }),
        b: common_vendor.f(testCardList.value, (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.type),
            c: item.typeColor,
            d: common_vendor.t(item.title),
            e: common_vendor.t(item.desc),
            f: common_vendor.t(item.time),
            g: common_vendor.t(item.count),
            h: common_vendor.t(item.popularity),
            i: common_vendor.o(($event) => onStartTest(item), item.title),
            j: item.title
          };
        }),
        c: common_vendor.p({
          current: 0
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727d09f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test/test.js.map
