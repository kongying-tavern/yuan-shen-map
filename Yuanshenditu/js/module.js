/*
 * @Author       : (*^_^*)
 * @LastEditTime : 2021-05-02 10:36 PM
 * @Description  : loading页的依赖模块封装
 */
import * as utils from './utils.js';

/**
 * @description: 资源预加载
 * @constructor
 * @param {string | URL} url
 * @param {HTMLElement} [container = document.head]
 */

class ResourceReloading {
  constructor(url, container) {
    this.url = url;
    this.container = container || document.head;
    this.succeed = [];
    this.unsuccessful = [];
  }
  /** @public */
  async init() {
    this.data = await this.getData(this.url);
    this.resourceLink = this.reader(this.data.data);
    this.bandEvent(this.container);
    return Promise.resolve(this.succeed);
  }

  /** @private */
  async getData(url) {
    // @ts-ignore
    return await utils.request(url).catch((error) => console.log(error));
  }

  /** @private */
  reader = (data) => data.map((val) => ResourceReloading.createLink(val.href, val.as, val?.type, this.container));

  /** @private */
  bandEvent(container) {
    container.addEventListener("load", this.resourceLinkLoad.bind(this), true);
    window.addEventListener("error", this.resourceLinkError.bind(this), true);
  }

  /** @private */
  resourceLinkError(e) {
    if (e.target.rel === "preload" && !(e instanceof ErrorEvent)) this.unsuccessful.push(e.target);
  }

  /** @private */
  resourceLinkLoad(e) {
    if (e.target.rel === "preload" && !(e instanceof ErrorEvent)) this.succeed.push(e.target);
  }

  /**
   * @return {Array<HTMLElement>}
   */
  get Succeed() {
    return this.succeed;
  }
  /**
   * @return {Array<HTMLElement>}
   */
  get Unsuccessful() {
    return this.unsuccessful;
  }
  /**
   * @return {Array<HTMLElement>}
   */
  get ResourceLink() {
    return this.resourceLink;
  }

  /** @private */
  static createLink(href, as, type, container) {
    const PRELOADLINK = document.createElement("link");
    const RE = new RegExp("^((https|http)?://)");
    PRELOADLINK.rel = "preload";
    PRELOADLINK.href = href;
    PRELOADLINK.as = as;
    if (type) PRELOADLINK.type = type;
    if (as === "font" || (RE.test(href) && !href.includes(document.domain)))
      PRELOADLINK.setAttribute("crossorigin", "anonymous");
    container.appendChild(PRELOADLINK);
    return PRELOADLINK;
  }
}
/**
 * @description: 默认Loading动画
 * @constructor
 * @param {HTMLElement} element
 * @param {number} [maxDelay=3000]
 */
class LoadingBar {
  constructor(element, maxDelay) {
    this.element = document.querySelectorAll(element)[0];
    this.maxDelay = maxDelay || 3000;
    this.parentNode = this.element.parentNode;
  }
  /** @public */
  start() {
    utils.setPseudoStyle(this.element.className,'after',{
        animation: `loading-bar ${this.maxDelay / 1000}s 1 forwards`,
    });
  }
  /** @public */
  finish() {
    utils.setPseudoStyle(this.element.className,'after',{
        animation: `none`,
    });
    setTimeout(e => (this.parentNode.style.opacity = 0), 300);
  }
}

/**
 * @description: 动态主题
 * @constructor
 * @param {Array} themeList
 * @param {string} [defaultTheme='light']
 */
class DynamicTheme {
  constructor(themeList, defaultTheme = "light") {
    this.themeList = new Set(themeList);
    this.defaultTheme = defaultTheme;
    this.container = document.body;
    this.Theme = new URLSearchParams(new URL(location.href).search).get("theme")
    if(new URLSearchParams(new URL(location.href).search).get("theme") === null) this.autoTheme();
    
  }
  /**
   * @public
   * @param {string} [name]
   */
  switchTheme(name) {
    if (this.themeList.size <= 1) return;
    if (!name) {
      let result = Array.from(this.themeList);
      while (result[0] === this.Theme) {
        result.sort((e) => 0.5 - Math.random());
      }
      return (this.Theme = result[0]);
    }
    if (this.themeList.has(name)) this.Theme = name;
  }
  /**
   * @param {string} value
   */
  set Theme(value) {
    this.container.setAttribute("data-theme", value);
  }

  /**
   * @return {string}
   */
  get Theme() {
    return this.container.getAttribute("data-theme");
  }
  /**
   * @return {Array<string>}
   */
  get ThemeList() {
    return Array.from(this.themeList);
  }
  /**
   * @public
   * @param {Date} [date=new Date()]
   */
  autoTheme(date = new Date()) {
    if (this.themeList.size < 2) return;
    const HOURS = new Date(date).getHours();
    let result;
    if (HOURS >= 7 && HOURS <= 18) {
      result = "light";
    } else {
      result = "dark";
    }
    return this.switchTheme(result);
  }
}

export {
  DynamicTheme,
  LoadingBar,
  ResourceReloading
}
