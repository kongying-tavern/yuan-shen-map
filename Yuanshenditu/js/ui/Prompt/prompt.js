// @ts-nocheck
//
import Template from "./template.js";

const DEFAULT_OPTIONS = {
  title: "デフォルトタイトル",
  getContainer: document.body,
  imgTitle: false,
  content: "null",
  textAlign: "left",
  FrostedGlass: "0",
  duration: false,
  maskBackground: "rgba(0,0,0,.3)",
  radius: "20",
  version: "1.0.0",
  about: "中国の「空荧酒馆チーム」プロデュース",
  lastEditTime: new Date().getFullYear() + "." + new Date().getMonth() + "." + new Date().getDay(),
};

class Prompt extends Template {
  constructor(options) {
    super();
    const _options = Prompt.mergeOptions(options);
    this.title = _options.title; // 标题
    this.getContainer = _options.getContainer; // 配置渲染节点的输出位置
    this.imgTitle = _options.imgTitle;
    this.content = _options.content;
    this.textAlign = _options.textAlign;
    this.duration = _options.duration; // 自动关闭的延时，单位秒。设为 0 时不自动关闭
    this.maskBackground = _options.maskBackground;
    this.FrostedGlass = _options.FrostedGlass;
    this.radius = _options.radius;
    this.version = _options.version;
    this.about = _options.about;
    this.lastEditTime = _options.lastEditTime;
    this.oldScrollTop = 0;
    this.reader();
    this.bindEvent();
  }

  static mergeOptions(options) {
    this.defaultOptions = {
      title: DEFAULT_OPTIONS.title,
      getContainer: DEFAULT_OPTIONS.getContainer,
      duration: DEFAULT_OPTIONS.duration,
      FrostedGlass: DEFAULT_OPTIONS.FrostedGlass,
      textAlign: DEFAULT_OPTIONS.textAlign,
      content: DEFAULT_OPTIONS.content,
      maskBackground: DEFAULT_OPTIONS.maskBackground,
      radius: DEFAULT_OPTIONS.radius,
      version: DEFAULT_OPTIONS.version,
      lastEditTime: DEFAULT_OPTIONS.lastEditTime,
      about: DEFAULT_OPTIONS.about,
      imgTitle: DEFAULT_OPTIONS.imgTitle,
    };
    if (!options) {
      return this.defaultOptions;
    }
    return Object.assign(this.defaultOptions, options);
  }

  bindEvent() {
    this.myPromptCloseBtn.addEventListener("click", this.hide.bind(this), false);
    this.myPrompt.addEventListener("click", this.show.bind(this), false);
    this.myInner.addEventListener("click", (e) => e.stopPropagation(), false);
    this.myPromptCloseBtn.addEventListener(
      "mouseover",
      (e) => this.myInner.classList.add("prompt-close-btn-hover"),
      false
    );
    this.myPromptCloseBtn.addEventListener(
      "mouseout",
      (e) => this.myInner.classList.remove("prompt-close-btn-hover"),
      false
    );
    this.myMainContent.addEventListener("scroll", throttle(this.autoShowContent.bind(this), 100), false);
  }

  reader() {
    this.getContainer.appendChild(
      this.promptView({
        title: this.title,
        FrostedGlass: this.FrostedGlass,
        textAlign: this.textAlign,
        content: this.content,
        maskBackground: this.maskBackground,
        radius: this.radius,
        version: this.version,
        lastEditTime: this.lastEditTime,
        about: this.about,
        imgTitle: this.imgTitle,
      })
    );

    this.myPrompt = document.querySelector(".prompt");
    this.myPromptCloseBtn = document.querySelector(".prompt-close-btn");
    this.myInner = this.myPrompt.querySelector(".prompt-inner");
    this.myMask = document.querySelector(".prompt-mask");
    this.myMainContent = document.querySelector(".prompt-content-main");
    this.myPromptTitle = document.querySelector(".prompt-title");
    this.myPromptInfo = this.myPrompt.querySelector(".prompt-content-info");
    this.myPromptMask = document.querySelector(".prompt-mask");
  }

  static create(options = {}) {
    return new Prompt(options);
  }

  autoHide(callback, ...args) {
    if (this.duration) {
      const timer = setTimeout(() => {
        this.hide();
        if (callback) callback(...args);
      }, this.duration * 1000);
      return;
    }
  }

  show(content) {
    this.myPrompt.style.display = "block";
    this.myInner.classList.remove("prompt-hide");
    this.myInner.classList.add("prompt-show");
    this.myInner.style.transform = "";
    this.myPromptMask.style.opacity = "1";
  }

  hide(content) {
    this.myPromptMask.style.opacity = "0";
    this.myInner.classList.add("prompt-hide");
    this.myInner.classList.remove("prompt-show");
    this.myInner.style.transform = "rotate3d(1,1,0,90deg)";
    setTimeout(() => {
      this.myPrompt.style.display = "none";
    }, 256);
  }

  autoShowContent(e) {
    const upward = () => {
      this.myMainContent.style.marginTop = "-100px";
      this.myMainContent.style.height = "320px";
      this.myPromptInfo.style.opacity = 0;
      this.myPromptTitle.classList.add("expanded");
      this.myPromptInfo.classList.add("expanded");
    };
    const down = () => {
      this.myMainContent.style.marginTop = "0";
      this.myMainContent.style.height = "220px";
      this.myPromptInfo.style.opacity = 1;
      this.myPromptTitle.classList.remove("expanded");
      this.myPromptInfo.classList.remove("expanded");
    };
    const ele = e.target;
    if (ele.scrollTop + ele.clientHeight == ele.scrollHeight) return; // 阻止到最低下时鬼畜
    if (ele.scrollHeight <= 350) return; // 阻止低高度时鬼畜
    ele.scrollTop > this.oldScrollTop ? upward() : down();
    this.oldScrollTop = ele.scrollTop;
  }
}

function throttle(callback, wait) {
  let previous = 0,
    timer = null;
  return function (...params) {
    let now = +Date.now(),
      remaining = wait - (now - previous);
    if (remaining <= 0) {
      clearTimeout(timer);
      timer = null;
      previous = now;
      callback.call(this, ...params);
    } else if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        previous = +new Date();
        callback.call(this, ...params);
      }, remaining);
    }
  };
}

export default Prompt;
