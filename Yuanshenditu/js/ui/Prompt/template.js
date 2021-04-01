// @ts-nocheck
class Template {
  promptView(options) {
    const { title, content, background, radius, version, lastEditTime, about } = options;
    const myPrompt = document.createElement("div");
    myPrompt.className = "prompt prompt-hide";
    myPrompt.innerHTML = `
						<div class="prompt-mask" style="background: ${background}"></div>
						<div class="prompt-inner" style="border-radius:${radius}px;transform: none;">
							<span class="prompt-close-btn" role="button" title="サイドバーを閉じます">
								<i class="prompt-close-icon" >
									
								</i>
							</span>
							<div class="prompt-title">
								<h2>${title}</h2>
							</div>
							<div class="prompt-content">
								<p class="prompt-content-version">${version}</p>
								<p class="prompt-content-about">
									${about}
								</p>
								<div class="prompt-content-main">
									<P class="prompt-content-main-lastedittime">
										最終更新時間: <time>${lastEditTime}</time>
									</p>
									${content}
								</div>
							</div>
						</div>
					`;
    return myPrompt;
  }
}

export default Template;
