// ==UserScript==
// @name        trade
// @include     http://www.ereality.ru/map*n=useritems*
// @require     tools.js
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem', "options", function(value) {
	myoptions = mergeOptions(value, myoptions);

	if (!myoptions.unpaused) {
		return;
	}
//=====================================================================  

	//Механизм быстрого выставления однотипных лотов для биржи
	if (myoptions.stockmy) {

		var scr = document.createElement("script");
		scr.text = "(" +
			(function() {

			//Выставление лота на биржу	
			top.core.addlot = function(id, price, ltime) {
				$.post("http://www.ereality.ru/ajax/stock/", '<root type="5" uid="' + id + '" price="' + price + '" stype="0" stime="' + ltime + '" bprice="0" whole="0"></root>', stock_processXML);
			}


			top.core.addbuttons = function() {
				myprice = $("#myprice");
				mybuttons = $("input[id^=mbtn]");
				if (mybuttons.length == 0) {
					$.each($("div[id^=ibtn]"), function(index, elem) {
						key = elem.id.replace("ibtn", "");

						if ((myprice.length > 0) && (myprice.val() > 0)) {
							mystime = $("#mystime");
							elem.insertAdjacentHTML("afterEnd", '<input class="butt2" id="mbtn' + key + '" type="button" onclick="top.core.addlot(' + key + ',' + myprice.val() + ',' + mystime.val() + ')" value="Выставить по ' + myprice.val() + '">');
						}
					});
				} else {
					$.each(mybuttons, function(index, elem) {
						key = elem.id.replace("mbtn", "");

						if ((myprice.length > 0) && (myprice.val() > 0)) {
							mystime = $("#mystime");
							elem.attributes["onclick"].value = "top.core.addlot(" + key + "," + myprice.val() + "," + mystime.val() + ");";
							elem.value = "Выставить по " + myprice.val();
						}
					});

				}
				return;
			};


			var htmlelements = '<table class="textM" align="center">' +
				'<tbody>' +
				'<td>' +
				'<table class="textM" align="center">' +
				'<tbody>' +
				'<td align="left">Цена продажи : </td>' +
				'<td align="left">' +
				'<input id="myprice" class="field" type="text" value="" name="myprice"  maxlength="7" size="7">' +
				'</td>' +
				'<tr>' +
				'<td align="left">Продолжительность: </td>' +
				'<td align="left">' +
				'<select id="mystime" class="butt1" name="mystime">' +
				'<option value="0">1 час</option>' +
				'<option value="1"> 3 часа </option>' +
				'<option value="2"> 6 часов </option>' +
				'<option value="3"> 12 часов </option>' +
				'<option value="4"> 1 день </option>' +
				'<option value="5"> 2 дня </option>' +
				'<option selected="" value="6"> 3 дня </option>' +
				'</select>' +
				'</td>' +
				'</tr>' +
				'</tbody>' +
				'</table>' +
				'</td>' +
				'<td>' +
				'<a title="Добавить/обновить кнопки" class="refresh" href="javascript: top.core.addbuttons();"> </a>' +
				'</td>' +
				'</td>' +
				'</tbody>' +
				'</table>';


			$("#cat")[0].insertAdjacentHTML("afterEnd", htmlelements);



		}).toString() + ")();";
		document.body.appendChild(scr);
	}

//=========================end.
});