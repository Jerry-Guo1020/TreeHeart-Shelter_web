"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const features = [
      {
        title: "心情树洞",
        desc: "分享情绪点滴，找到倾诉的角落，书写内心故事",
        icon: "http://43.142.21.211:3000/static/fun_1.png",
        color: "#6CA8F1"
      },
      {
        title: "心理测评",
        desc: "涵盖多种心理测试，帮助你更了解自己",
        icon: "http://43.142.21.211:3000/static/fun_2.png",
        color: "#A078F5"
      },
      {
        title: "情感互动",
        desc: "点赞评论他人树洞，共鸣共情，彼此温暖",
        icon: "http://43.142.21.211:3000/static/fun_3.png",
        color: "#FF6B6B"
      },
      {
        title: "活动空间",
        desc: "获取心理活动通知，参与互动收获成长",
        icon: "http://43.142.21.211:3000/static/fun_4.png",
        color: "#41D3A3"
      }
    ];
    const handleWeChatLogin = () => {
      common_vendor.index.showToast({
        title: "模拟微信登录成功",
        icon: "success"
      });
      common_vendor.index.navigateTo({ url: "/pages/home/home" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(features, (item, index, i0) => {
          return {
            a: item.icon,
            b: item.color,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.desc),
            e: index
          };
        }),
        b: common_vendor.o(handleWeChatLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
