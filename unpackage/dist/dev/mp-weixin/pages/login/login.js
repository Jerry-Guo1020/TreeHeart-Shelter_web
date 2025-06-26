"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const features = [
      {
        title: "心情树洞",
        desc: "分享情绪点滴，找到倾诉的角落，书写内心故事",
        icon: "/static/image/mood.png",
        color: "#6CA8F1"
      },
      {
        title: "心理测评",
        desc: "涵盖多种心理测试，帮助你更了解自己",
        icon: "/static/image/test.png",
        color: "#A078F5"
      },
      {
        title: "情感互动",
        desc: "点赞评论他人树洞，共鸣共情，彼此温暖",
        icon: "/static/image/like-comment.png",
        color: "#FF6B6B"
      },
      {
        title: "活动空间",
        desc: "获取心理活动通知，参与互动收获成长",
        icon: "/static/image/activity.png",
        color: "#41D3A3"
      }
    ];
    const handleWeChatLogin = () => {
      common_vendor.index.showToast({
        title: "模拟微信登录成功",
        icon: "success"
      });
      common_vendor.index.navigateTo({ url: "/pages/info/info" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.f(features, (item, index, i0) => {
          return {
            a: item.icon,
            b: item.color,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.desc),
            e: index
          };
        }),
        c: common_assets._imports_1,
        d: common_vendor.o(handleWeChatLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
