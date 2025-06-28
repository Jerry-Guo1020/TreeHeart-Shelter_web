"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  BottomNavbar();
}
const BottomNavbar = () => "../../component/BottomNavbar/BottomNavbar2.js";
const _sfc_main = {
  __name: "community",
  setup(__props) {
    const tabs = [
      "学业压力",
      "情绪情感",
      "人际交往",
      "职业规划",
      "生活适应",
      "其他类型"
    ];
    const currentTab = common_vendor.ref(0);
    const posts = common_vendor.ref([
      {
        avatar: "/static/avatar.png",
        username: "星光不问少年",
        time: "1小时前",
        title: "铁饭碗3k，新公司4k，选择哪个好？",
        desc: "首先可以把3K和4K两家公司进行对比，工作时间、岗位内容、发展空间等都要考虑，不能只看工资。",
        like: "19.9万",
        comment: 101,
        collect: 1
      },
      {
        avatar: "/static/avatar.png",
        username: "南风知我意",
        time: "3小时前",
        title: "大家有没有情绪低落的时候？",
        desc: "最近压力好大，情绪一直上不来，有没有好的排解方式呀？",
        like: 8,
        comment: 12,
        collect: 0
      },
      {
        avatar: "/static/avatar.png",
        username: "小王同学",
        time: "昨天",
        title: "如何快速适应大学生活？",
        desc: "刚进大学觉得很迷茫，求学长学姐们支招！",
        like: 22,
        comment: 9,
        collect: 5
      }
    ]);
    function switchTab(idx) {
      currentTab.value = idx;
    }
    function onPublish() {
      common_vendor.index.showToast({
        title: "发帖功能开发中",
        icon: "none"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs, (tab, idx, i0) => {
          return {
            a: common_vendor.t(tab),
            b: idx,
            c: common_vendor.n(currentTab.value === idx ? "active" : ""),
            d: common_vendor.o(($event) => switchTab(idx), idx)
          };
        }),
        b: common_vendor.f(posts.value, (item, idx, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.username),
            c: common_vendor.t(item.time),
            d: common_vendor.t(item.title),
            e: common_vendor.t(item.desc),
            f: common_vendor.t(item.like),
            g: common_vendor.t(item.comment),
            h: common_vendor.t(item.collect),
            i: idx
          };
        }),
        c: common_vendor.o(onPublish),
        d: common_vendor.p({
          current: 0
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6ef5318"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community/community.js.map
