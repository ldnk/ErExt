// ==UserScript==
// @name	ErExt_info
// @include	http://www.ereality.ru/~*
// @include	http://www.ereality.ru/info*
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==

var plugins = (function (){
	var plugins = {
			'info': { func: richInfo },
			'clan_info': { func: clanInfo },
			'zk': { func: heroStats },
			'naemniki': { func: stepsOfPlayer },
			'bodestate': { func: estateBod },
			'sidzoku': { func: estateSidzoku },
			'dragon_time': { func: dragonTime },
			'faceshop' : { func: faceshopBod },
			'efimerka' : { func: efimerkaOhe }
		};

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
	 * Отображение ссылки на анализатор поместья BoD
	 * Отображается левее значка поместья в информации персонажа.
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
	 * Отображение ссылки на анализатор поместья Sidzoku
	 * Отображается левее значка поместья в информации персонажа.
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

	/**
	 * Отображает время старта ОД.
	 * Использует API ГР (+100 к карме).
	 * Вызывается по клику на колбу с кровью в информации персонажа.
	 */
	function dragonTime () {
		var element = document.getElementById("blood2");
		element.addEventListener("click", onClick, false);

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
						mestovstavki = tools.xpath('//*[@id="content"]'),
						oFont = document.createElement("font");

					oFont.size = "-3";
					mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
					oFont.insertAdjacentHTML("afterBegin", mystr);
					element.removeEventListener("click", onClick, false);
				}
			);
		}
	}

	function faceshopBod () {
		var name = tools.xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML,
			element = tools.xpath("/html/body/div[3]/div[7]/div/div").snapshotItem(0),
			linkElement = document.createElement('a'),
			imageElement = document.createElement('img');

		linkElement.href = 'http://yo-bod.com/faceshop/';
		linkElement.target = '_blank';
		imageElement.src = 'data:image/gif;base64,R0lGODlhDwAMAOYAAAAAAP///40AAGwAAFcAAE0AAEUAAD8AAD0AACsAACQAACIAACAAABYAAA8AAAoAAAkAAAUAAAIAAKEBAV4EBJMHB9IMDGwGBk0GBrQSEmcNDeUeHscgIGEQEIwZGcEjI14REVURERgFBXsfH8c0NC4NDWIeHstDQzMREetPT4YuLudRUVMdHZk2No4yMmUkJKY9PdhRUU0dHYw2NqpCQr5LS1MhIZE7O5tAQO1nZ4A7O/d2dr5fXyYTE/d+fs9ra/6GhsxsbLZhYclsbNBxcfeIiOmDg7xqaoBISNZ6eveOjteCgueMjNuGhvOYmPadnYpbW/+rq/+vr76CgtSWlmNHR/u2tuuqqqt8fPm3t/i7u/3AwNCenv/ExPzDw//Ly/3Kyr2Xl/fJyf/R0dKurt26uuXCwv/b2//d3fvZ2d7AwPXZ2f/j4//l5f/n5/Pd3f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHAALAAAAAAPAAwAQAeLgHCCg3BZQGeEghsLDyRocF5BHTJJiWIWNFhGOSAAFyljiXBaGQwNCRAHMWyEVkgiCj0oM0dHXIlXFS4FGCMDJ2BCE2+iaVMCNWRLPl+JTDAaLC0hABQrbYlKRFBVJRImBGGETh4RL1RlZl1SUYlFNw4LOEM2CDoqBj+EWztwajwfmjxxA4fDGjiBAAA7';
		linkElement.appendChild(imageElement);
		element.insertAdjacentHTML("beforeEnd", "<p></p>");  //todo: решить вопрос с блоками, от которых зависит поведение нескольких фич
		element.appendChild(linkElement);
	}

	function efimerkaOhe () {
		var name = tools.xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML,
			element = tools.xpath("/html/body/div[3]/div[7]/div/div").snapshotItem(0),
			linkElement = document.createElement('a'),
			imageElement = document.createElement('img');

		linkElement.href = 'http://охэ.com/efimerka/';
		linkElement.target = '_blank';
		imageElement.src = 'data:image/gif;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAD///8AAP//AP8A/wAAAP8A//8AAAD/AAD/AAAAAAAAAINLBwCETAgApWQVAKJoIgCtcy0AtHkwALh+NgDQkEIA1JRGAMaRUADKlVMA0p1bAMWTVgDgqGUAwZNaAMycYQDQp3UA5MObAOTMrwDn2cgAik4AAH1GAAB1QQAAjlABAIZLAQCzZgIAo10CAIlPAwCSVAYAiVAIAKdjCwCZWgsAiVEKAI1UDACUWA0Aj1YPAJtfEwC5dBkAlFwUAJthFwDmkSUAomcdANCGJwCbZB8A6ZgwAK92LgDMjDoA1ZM+AKZyMQCpdTQAwog9ALuFPgC2gDwAuoVCAOmrWQC+ikkAs4VKANijXgC7jlIAwJdhAMSaZQC5lWgA4rmEANGtfgDZtYUA2reJAM+vhQDoxZYA48CTANK2kgDbv5sA1ryaAOfh2QDXqmwA1cWvAOnk2wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB1EMLCsxFgcHBwcHBwcHBw4gJSU5RUA6BwcHBwcHBw8gKSoXU09DNzQHBwcHBxktJSknTE0nJSohRgcHBwcSPyArIz07ICspCTYHBwcHOEsvHRxKTicdKCszBwcHBy5JUkITFRhRRAooMwcHBwcNLE5QQSQlOlMUHQ4HBwcHTyAkCyspKysbFB5IBwcHBwcRICUoKwg1GiI8BwcHBwcHBxEfKCgmPgw8BwcHBwcHBwcHTxAyMDZHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB///AAD//wAA+B8AAPAPAADgBwAAwAMAAMADAADAAwAAwAMAAMADAADAAwAA4AcAAPAPAAD4HwAA//8AAP//AAA=';
		linkElement.appendChild(imageElement);
		element.insertAdjacentHTML("beforeEnd", "<p></p>");
		element.appendChild(linkElement);
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

	return {load: load};
})();

options.load(function(options){
	plugins.load(options);
});