"use strict";

// @ts-nocheck
if (window.locale) {
  locale["default"] = {
    code: "en",
    link: "index_en.html"
  }, locale.support = [{
    type: "中文",
    code: ["zh-cn", "zh-tw", "zh-hk", "zh-sg"],
    link: "index.html",
    node: [{
      code: "zh-tw",
      link: "index_zh_tw.html"
    }]
  }, {
    type: "日语",
    code: ["ja", "ja-jp"],
    link: "index_jp.html"
  }, {
    type: "英语",
    code: ["en", "en-us", "en-au", "en-nz", "en-za", "en-tt", "en-gb", "en-ca", "en-ie", "en-jm", "en-bz"],
    link: "index_en.html"
  }];
}