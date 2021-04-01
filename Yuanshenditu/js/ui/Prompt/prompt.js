// @ts-nocheck
import Template from "./template.js";

class Prompt extends Template {
  constructor(options) {
    super();
    this.title = options.title || "デフォルトタイトル";
    this.content = options.content || "null";
    this.automaticHidden = options.automaticHidden || false;
    this.background = options.background || "transparent";
    this.radius = options.radius || "20";
    this.version = options.version || "1.0.0";
    this.about = options.about || "中国の「空荧酒馆チーム」プロデュース";
    this.lastEditTime = options.lastEditTime || "";
    this.reader();
    this.bindEvent();
    this.show();
  }

  bindEvent() {
    this.myPromptIcon.addEventListener("click", this.hide.bind(this), false);
    this.myPrompt.addEventListener("click", this.show.bind(this), false);
    this.myInner.addEventListener("click", (e) => e.stopPropagation(), false);
    if (Object.prototype.toString.call(this.automaticHidden) === "[object Number]") {
      const timer = setTimeout(() => {
        this.hide();
      }, this.automaticHidden);
    }
  }
  
  reader() {
    document.body.appendChild(
      this.promptView({
        title: this.title,
        content: this.content,
        background: this.background,
        radius: this.radius,
        version: this.version,
        lastEditTime: this.lastEditTime,
        about: this.about,
      })
    );

    this.myPrompt = document.querySelector(".prompt");
    this.myPromptIcon = document.querySelector(".prompt-close-btn");
    this.myInner = this.myPrompt.querySelector(".prompt-inner");
  }

  static create(options = {}) {
    return new Prompt(options);
  }

  show() {
    this.myPrompt.className = "prompt prompt-show";
    this.myInner.style.transform = "none";
  }

  hide() {
    this.myPrompt.className = "prompt prompt-hide";
    this.myInner.style.transform = "rotate3d(1,1,0,90deg)";
  }
}

export default Prompt;
