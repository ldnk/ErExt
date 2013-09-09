// ==UserScript==
// @name	ErExt_info
// @include	http://www.ereality.ru/~*
// @include	http://www.ereality.ru/info*
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==

var plugins = (function (){
	var plugins = [];

	function init () {
		plugins = {
			'info': { func: richInfo },
			'clan_info': { func: clanInfo },
			'zk': { func: heroStats },
			'naemniki': { func: stepsOfPlayer },
			'bodestate': { func: estateBod },
			'sidzoku': { func: estateSidzoku }
		};

		return this;
	}

	/**
	 * Отображает дополнительную информацию о персонаже.
	 * Вызывается нажатием на кнопку "info" в информации о персонаже.
	 * Использует сервис http://sp.erclans.ru/evgeska_prof.php?calc=heroesinfo
	 */
	function richInfo () {
		var infoButton = document.createElement("input");
		infoButton.type = "button";
		infoButton.value = "info";
		var xpathRes = tools.xpath("/html/body/div[3]/div[7]/div/div");
		xpathRes.snapshotItem(0).insertAdjacentHTML("beforeEnd", "<p></p>");
		xpathRes.snapshotItem(0).appendChild(infoButton);
		var name = tools.xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML;

		infoButton.addEventListener("click", function () {
			infoButton.remove();

			kango.xhr.send({
				method: 'post',
				url: 'http://sp.erclans.ru/evgeska_prof.php?calc=heroesinfo',
				async: true,
				params: {'prof': tools.cp1251urlencode(name), 'submit': 'просмотреть'},
				contentType: 'text',
				mimeType: "text/html;charset=windows-1251",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;"
				}
			}, function(data) {
				if (data.status == 200) {
					var response = data.response;
					var mystr = response.substring(
							response.indexOf('<table width="95%" border="1" bgcolor="D7D7D7">'),
							response.lastIndexOf('<br><br><div align="center">')
						),
						mestovstavki = tools.xpath('//*[@id="content"]'),
						oFont = document.createElement("font");
					oFont.size = "-3";
					mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
					oFont.insertAdjacentHTML(
						"afterBegin",
						mystr.replace(
							new RegExp("evgeska/images/",'g'),
							"http://sp.erclans.ru/evgeska/images/"
						)
					);
				}
			});
		}, false);
	}

	/**
	 * Добавляет к значкам клана в информации о персонаже
	 * дополнительную ссылку на страницу с информацией о клане.
	 */
	function clanInfo () {
		for(var i = 0; i < document.images.length; ++i) {
			if (document.images[i].src.indexOf('http://img.ereality.ru/clan/') == 0) {
				var id = document.images[i].src.replace("http://img.ereality.ru/clan/","").replace(".gif","");
				var clanlink = document.createElement('A');
				clanlink.href = 'http://www.news.ereality.ru/index.php?do=static&page=sostav&id='+id;
				clanlink.target = '_blank';
				clanlink.innerHTML = '<img src="http://img.ereality.ru/inf.gif"</img>';
				document.images[i].parentNode.insertBefore(clanlink,document.images[i]);
				i++;
			}
		}
	}

	/**
	 * Отображает динамику рейтинга персонажа.
	 * Использует сервис http://gosov.net/pers_info.html.
	 * Вызывается по нажатию на значок BoD в информации персонажа.
	 */
	function heroStats () {
		var name = tools.xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML;
		var gospic = document.createElement('img');
		gospic.src = 'http://img.ereality.ru/clan/191.gif';

		tools.xpath("/html/body/div[3]/div[7]/div/div").snapshotItem(0).appendChild(gospic);
		gospic.addEventListener("click", function() {
			gospic.remove();
			kango.xhr.send(
				{
					method: "POST",
					url: "http://gosov.net/ajax/pers_info.ajax.php",
					params: {'sort_item': '', 'sort_type': '', 'page': '', 'pers': tools.cp1251urlencode(name)}
				},
				function (data) {
					var response = data.response,
						mystr = response.substring(response.lastIndexOf('<table'),response.lastIndexOf('</span></td>')),
						mestovstavki = tools.xpath('//*[@id="content"]'),
						oFont = document.createElement("font");

					oFont.size = "-3";
					mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
					oFont.insertAdjacentHTML(
						"afterBegin",
						mystr.replace(
							new RegExp("/templates/GoldenClub/images",'g'),
							"http://gosov.net/templates/GoldenClub/images"
						)
					);
				}
			);
		}, false);
	}

	/**
	 * Отображает количество оставшихся действий до получения новых ступеней ангела дома, полемарха и т.п.
	 * Использует сервис http://naims.tk/services/?do=steps_of_player.
	 * Вызывается по клику на значок клана "Наемники" в информации персонажа.
	 */
	function stepsOfPlayer () {
		var naempic = document.createElement('img'),
			xpathRes = tools.xpath("/html/body/div[3]/div[7]/div/div");
		naempic.src = 'http://img.ereality.ru/clan/78.gif';
		xpathRes.snapshotItem(0).appendChild(naempic);
		naempic.addEventListener("click", function() {
			naempic.remove();

			kango.xhr.send(
				{
					method: "GET",
					url: 'http://naims.tk/services/?do=steps_of_player&p_name=' + tools.cp1251urlencode(name)
				},
				function (data) {
					var response = data.response,
						mystr = response.substring(
							response.indexOf('<div class="d_right">') + 21,
							response.indexOf('<div class="top_g_left">') - 6
						),
						mestovstavki = tools.xpath('//*[@id="content"]'),
						oFont = document.createElement("font");
					oFont.size = "-3";
					mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
					oFont.insertAdjacentHTML("afterBegin", mystr);
				}
			);
		}, false);
	}

	/**
	 *
	 */
	function estateBod () {
		var linkElement = document.createElement('a'),
			imageElement = document.createElement('img'),
			xpathRes = tools.xpath('//img[contains(@src,"http://img.ereality.ru//estates/info_icon")]'),
			name = tools.xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML;

		if (!xpathRes.snapshotLength || xpathRes.snapshotItem(0).parentNode.href.search("/estate_info.php") == -1) {
			return;
		}

		linkElement.href = 'http://yo-bod.com/library/modules/estate/?name=' + tools.cp1251urlencode(name);
		linkElement.target = '_blank';
		imageElement.src = 'http://yo-bod.com/library/modules/estate/search.png';
		linkElement.appendChild(imageElement);
		xpathRes.snapshotItem(0).parentNode.appendChild(linkElement);
	}

	/**
	 *
	 */
	function estateSidzoku () {
		var linkElement = document.createElement('a'),
			imageElement = document.createElement('img'),
			xpathRes = tools.xpath('//img[contains(@src,"http://img.ereality.ru//estates/info_icon")]'),
			name = tools.xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML;

		if (!xpathRes.snapshotLength || xpathRes.snapshotItem(0).parentNode.href.search("/estate_info.php") == -1) {
			return;
		}

		linkElement.href = 'http://sidzoku.ru/landlord/#' + name;
		linkElement.target = '_blank';
		imageElement.src = 'http://img.ereality.ru/clan/73.gif';
		linkElement.appendChild(imageElement);
		xpathRes.snapshotItem(0).parentNode.appendChild(linkElement);
	}

	function dragonTime () {

		document.getElementById("blood2").addEventListener("click", onClick, false);

		function onClick () {
			kango.xhr.send(
				{
					method: "GET",
					url: "http://api.ereality.ru/dragons_schedule.txt"
				},
				function (data) {
					var response = data.response,
						mystr = response.replace(
							new RegExp("time",'g'),
							"Врата на Остров Драконов на этой неделе открываются в "
						),
						mestovstavki = xpath('//*[@id="content"]'),
						oFont = document.createElement("font");

					oFont.size = "-3";
					mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
					oFont.insertAdjacentHTML("afterBegin", mystr);
					document.getElementById("blood2").removeEventListener("click", onClick, false);
				}
			);
		}
	}

	function load (pluginsList) {
		for (plugin in plugins) {
			if (plugins.hasOwnProperty(plugin)) {
				if (pluginsList[plugin]) {
					plugins[plugin].func();
				}
			}
		}
	}

	return {init: init, load: load};
})().init();

options.load(function(options){
	plugins.load(options);
});