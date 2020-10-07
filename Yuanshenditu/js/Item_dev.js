map.on('popupopen', function (e) {
	var marker = e.popup._source;
	var className = marker.options.icon.options.className;
	var key = className.substring(5, className.length);
	var markedFlag = localStorage.getItem(key);
	var switchClass = (!markedFlag) ? "myPopSwitchTodo" : "myPopSwitchDone";
	var switchText = (!markedFlag) ? "未完成" : "已完成";
	popupHtml = `
			<div class="myPopContainer">
				<div class="myPopTitle">
					<div class="myPopName" >${marker.feature.properties.popTitle}${marker.feature.id}</div>
				</div>
				<div class="myPopLine"></div>
				<div class="myPopClose" onclick="closePop()"></div>
				<div class="myPopComment">${marker.feature.properties.popupContent}
					<img class="Select" src=imgs/con_img/Select.png>
				</div>
				<div class="myPopPicture">
					<img src=comment_png/${key}.jpg onerror="javascript:$(\'.myPopComment,.myPopPicture\').addClass(\'disable\');$(\'.myPopComment\').css({\'cursor\': \'default\'})">
				</div>
				<a href="javascript:;" class="marker-correct-btn" onclick="TGDialogS('modify_window'),show_modify_marker(${marker.feature.id})" lid="${marker.feature.id}">修改</a>
				<a href="javascript:;" class="marker-del-btn" onclick="delmarker_old(${marker.feature.id})">删除</a>
				<div class="${switchClass}" onclick="MarkPoint(this)" data-key="${key}">
					<p class="switchOff">未完成</p>
					<p class="switchOn">已完成</p>
					<div class="switchButton">
						<div class="switchButtonIcon">
							<p>${switchText}</p>
						</div>
					</div>
				</div>
				<div class="tipcard"></div>
			</div>`
	marker.bindPopup(popupHtml);
});