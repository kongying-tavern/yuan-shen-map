// @ts-nocheck
class Template {
  promptView(options) {
    const {
      title,
      FrostedGlass,
      content,
      maskBackground,
      radius,
      version,
      lastEditTime,
      about,
      textAlign,
      imgTitle,
    } = options;
    // if(title && imgTitle) throw new TypeError("Only one of title and imgTitle can be selected");
    const myPrompt = document.createElement("div");
    myPrompt.className = "prompt";
    myPrompt.style.display = "none";
    myPrompt.innerHTML = `
						<div class="prompt-mask" style="background: ${maskBackground};backdrop-filter: blur(${FrostedGlass || 0}px);"></div>
						<div class="prompt-inner" style="border-radius:${radius}px;text-align: ${textAlign}">
							<span class="prompt-close-btn" role="button" title="サイドバーを閉じます">
								<i class="prompt-close-icon" >
									
								</i>
							</span>
							<div class="prompt-title">
								<h2 class="prompt-title-img" style="display: ${imgTitle ? "black" : "none"}">
									<img src="${imgTitle.src}" title="${title}" alt="${imgTitle.alt}" style="width:${imgTitle.width}px;height:${
      imgTitle.height
    }px">
									</img>
								</h2>
								<h2 class="prompt-title-text" style="display: ${imgTitle ? "none" : "initial"}">
									${title}
								</h2>
							</div>
							<div class="prompt-content" id="prompt-content">
                <div class="prompt-content-info">
                  <p class="prompt-content-version">
                    ${version}
                  </p>
                  <p class="prompt-content-about">
                    ${about}
                  </p>
                </div>
                <div class="prompt-content-main">
                  <P class="prompt-content-main-lastedittime">
                    最終更新時間: <time>${lastEditTime}</time>
                  </p>
                  <div class="update-log">
                    ${this.logView(content)}
                  </div>
                </div>
							</div>
						</div>
					`;
    return myPrompt;
  }

  logView(arr) {
    let log = [];
    let result = "";
    if(typeof arr === "string") return arr;
    if (arr.length <= 0) throw new TypeError("Log mode requires at least one argument!");
    arr.forEach((val, index) => {
      let type =
        val.type === "优化" ? "optimize" : val.type === "增加" ? "add" : val.type === "改进" ? "improve" : "optimize";
      log.push({
        val: `
							<time class="update-date">${val.date}</time>
							<br>
							<span class="update-tag ${type}"></span>${val.text}${val.author?val.author:""}
							<br>
						`,
        date: val.date,
      });
    });
    log.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
    log.forEach((val) => (result += val.val));
    return result;
  }
}

export default Template;
