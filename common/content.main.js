﻿// ==UserScript==
// @name        ErExt_main
// @include     http://www.ereality.ru/core*
// @include 	http://ratings.ereality.ru/clans*
// @include 	http://freedom.erclans.ru/analiz*
// @include 	http://www.ereality.ru/log*
// @include 	http://*.com/efimerka/
// @include 	http://yo-bod.com/faceshop/
// @include     http://www.news.ereality.ru/*sostav&id=*
// @include     http://cc.erclans.ru/*page_id=45*
// @include		http://www.ereality.ru/map.php*
// @include		http://www.ereality.ru/move*
// @include     http://sidzoku.ru/landlord/
// @include     http://www.ereality.ru/instance*
// @require     tools.js
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem',"options",function(value) {
if (value!=null) {
		for (nameprop in myoptions) {
	 	if (value[nameprop]!=false) {value[nameprop]=true;}	
		myoptions[nameprop]=value[nameprop];
    	}
}

//=====================================================================

Array.prototype.shuffle = function( b )
{
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }

 return this;
};



function userscount() {
	document.getElementById("chat_msg").value = "";
	var fraki = "Игнесс:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/2.gif"]').snapshotLength+
	" Раанор:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/3.gif"]').snapshotLength+
	" Тарбис:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/4.gif"]').snapshotLength+
	" Витарра:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/5.gif"]').snapshotLength+
	" Дримнир:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/6.gif"]').snapshotLength;
	document.getElementById("chat_msg").value = fraki;
}
function mymain() {
	if (document.getElementById("npcname").innerHTML=="Ворота Кладбища")	
		if (top.document.getElementById("chat_msg").value=="") {
				top.document.getElementById("dialog").firstChild.firstChild.nextElementSibling.nextElementSibling.click();
		}
}
function lotereya() {
	if (document.getElementById("ImgField15")!=null)	
	{
		for (var i=1; i<16; i++) {
			xpathres=xpath('//img[@src = "http://img.ereality.ru/loto/'+i+'_b.png"]');
			if (xpathres.snapshotLength>0) {xpathres.snapshotItem(0).click();}
		}
		var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		arr.shuffle();
		for (var i=0; i<5; i++) {xpath('//img[@src = "http://img.ereality.ru/loto/'+arr[i]+'_a.png"]').snapshotItem(0).click();}
	}
	else if (document.getElementById("ImgField14")!=null)
	{
		for (var i=1; i<15; i++) {
			xpathres=xpath('//img[@src = "http://img.ereality.ru/loto/'+i+'_b.png"]');
			if (xpathres.snapshotLength>0) {xpathres.snapshotItem(0).click();}
		}
		var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		arr.shuffle();
		for (var i=0; i<4; i++) {xpath('//img[@src = "http://img.ereality.ru/loto/'+arr[i]+'_a.png"]').snapshotItem(0).click();}
	}
}
function mynum(code) {
	if ((myoptions.numfight)&&(document.getElementById("div_battle").style.display!="none"))
		{
			switch (code) 
			{
				case  96: {document.getElementById("block_pl4").click();break;}
				case  97: {document.getElementById("hit_pl0").click();break;}
				case  98: {document.getElementById("hit_pl1").click();break;}
				case  99: {document.getElementById("hit_pl2").click();break;}
				case 100: {document.getElementById("hit_pl3").click();break;}
				case 101: {document.getElementById("hit_pl4").click();break;}
				case 102: {document.getElementById("block_pl0").click();break;}
				case 103: {document.getElementById("block_pl1").click();break;}
				case 104: {document.getElementById("block_pl2").click();break;}
				case 105: {document.getElementById("block_pl3").click();break;}
			}
		}
	if ((myoptions.numcapcha)&&(top.frames.main.document.getElementById("CaptchaButtons")!=null))
		{	
			switch (code) 
			{
				case  96: {top.frames.main.document.getElementById("cat_4").click();break;} //0
				case  97: {top.frames.main.document.getElementById("cat_0").click();break;} //1
				case  98: {top.frames.main.document.getElementById("cat_1").click();break;} //2
				case  99: {top.frames.main.document.getElementById("cat_2").click();break;} //3
				case 100: {top.frames.main.document.getElementById("cat_5").click();break;} //4
				case 101: {top.frames.main.document.getElementById("cat_8").click();break;} //5
				case 102: {top.frames.main.document.getElementById("cat_6").click();break;} //6
				case 103: {top.frames.main.document.getElementById("cat_9").click();break;} //7
				case 104: {top.frames.main.document.getElementById("cat_7").click();break;} //8
				case 105: {top.frames.main.document.getElementById("cat_3").click();break;} //9
			}
		}	
}
function instkbd(code) {
	if ((myoptions.kbdinst)&&(top.frames.main.document.getElementById("div_inst_top")!=null))
		{	
			switch (code) 
			{
				case  37: {top.frames.main.document.getElementById("inst-left").click();break;}
				case  38: {top.frames.main.document.getElementById("inst-forward").click();break;}
				case  39: {top.frames.main.document.getElementById("inst-right").click();break;}
				case  40: {top.frames.main.document.getElementById("inst-backward").click();break;}
				case  65: {top.frames.main.document.getElementById("inst-left").click();break;}   // a
				case  87: {top.frames.main.document.getElementById("inst-forward").click();break;} // w
				case  68: {top.frames.main.document.getElementById("inst-right").click();break;}  // d
				case  83: {top.frames.main.document.getElementById("inst-backward").click();break;} // s
				case  88: {top.frames.main.document.getElementById("inst-backward").click();break;} // x
				//case 13: {top.frames.main.document.getElementById("inst-center").click();break;}
				// case 13: {top.frames.main.document.getElementById("map_monsters").firstChild.firstChild.onclick();break;}
			}
		}
}
function undergroundkbd(code) {
	if (top.frames.main.document.getElementById("underground")!=null)
		{	
			switch (code) 
			{
				case  81: {top.frames.main.document.getElementById("s8").click();break;}   // q
				case  69: {top.frames.main.document.getElementById("s2").click();break;} // e
				case  90: {top.frames.main.document.getElementById("s6").click();break;}  // z
				case  67: {top.frames.main.document.getElementById("s4").click();break;} // c
			}
		}
}


if (myoptions.unpaused) {
if (location.href.search("page=sostav") != -1 )
{
var xpathRes = xpath("/html/body/table/tbody/tr[2]/td/table/tbody/tr");
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
var xpathRes = xpath("/html/body/table/tbody");
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
}
else if (location.href.search("http://www.ereality.ru/core") != -1 )
{

	if (myoptions.fastex) {
 		var exitlink = document.createElement('A');
		exitlink.href = 'http://www.ereality.ru/exit.php';
		exitlink.innerHTML ="[X]";
		exitlink.addEventListener("focus", function(){this.blur();}, false);
		if (document.getElementById("td_nick2")!=null ) {
	document.getElementById("td_nick2").insertBefore(exitlink, document.getElementById("td_nick2").firstChild);
	}

	
	}
	if (myoptions.location_info) {
	document.getElementById("span_location").onclick= function(){
		document.getElementById('chat_msg').value=document.getElementById('span_location').innerHTML+' Людей: '+document.getElementById('span_location_count').innerHTML;
	};	
	}
 
 if (kango.browser.getName()!="firefox") 
 {
	document.getElementById("span_sort").previousElementSibling.href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
	document.getElementById("a_users_loc").href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
	document.getElementById("span_mode5").firstChild.href='javascript: fdemands.load(5); document.getElementById("span_mode5").firstChild.focus();';
 }

 if (myoptions.okcount) {
 	var loc_user = document.getElementById("div_users");
 	var calcpic = document.createElement('img');	
 	calcpic.src = 'data:image/gif;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIxAAAgICAQQCAwAAAAAAAAAAAQMCBAURABITIUEUURUiMf/EABQBAQAAAAAAAAAAAAAAAAAAAAT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIhMf/aAAwDAQACEQMRAD8A1uYbaxWOoW6uOxjaRQo2Jzp9xiyYjcj+w6hxEwyWMlcEcXNRbVlWs0a/akNvgJb8n0deD975PzKvyteiid59dCFLDKrMXZPVOMQCJERGxsfziPkNNSdaVgvE21gpKca9MV9LoSkdyj9D2fXjjqedCytP/9k=';
 	loc_user.insertBefore(calcpic, loc_user.firstChild);
 	loc_user.firstChild.addEventListener("click", userscount, false);
 };

 document.onkeyup = function (e) {
	        e = e || window.event;
			//alert(e.keyCode);
	        if (e.keyCode === 13) {
	            mymain();
	        }
	        if ((e.keyCode === 27)&&(myoptions.esc_move)) {
	            top.frames.main.document.getElementById("mapCancelMoving").click();
	        }
			if ((((e.keyCode > 36) && (e.keyCode < 41))||(e.keyCode === 13)||(e.keyCode === 65)||(e.keyCode === 68)||(e.keyCode === 83)||(e.keyCode === 87)||(e.keyCode === 88))&&(top.document.getElementById("chat_msg").value=="")) {
	            instkbd(e.keyCode);
	        }
			 if ((e.keyCode > 95) && (e.keyCode < 106)) {
	            mynum(e.keyCode);
	        }
	        if (((e.keyCode === 81) || (e.keyCode === 69) || (e.keyCode === 90) || (e.keyCode === 67))&&(myoptions.kbdunderground)&&(top.document.getElementById("chat_msg").value=="")) {
	            undergroundkbd(e.keyCode);
	        }
	        // Отменяем действие браузера
	        return false;
	    }
 
}

else if (location.href.search("http://ratings.ereality.ru/clans") != -1) 
{
if (myoptions.clan_info) {
for(i=0; i<document.images.length; ++i) 
{if (document.images[i].src.indexOf('http://img.ereality.ru/clan/') == 0) 
	{    var id = document.images[i].src.replace("http://img.ereality.ru/clan/","").replace(".gif","");
	var clanlink = document.createElement('A');
	clanlink.href = 'http://www.news.ereality.ru/index.php?do=static&page=sostav&id='+id;
	clanlink.target = '_blank'
	clanlink.innerHTML = '<img src="http://img.ereality.ru/inf.gif"</img>';
	document.images[i].parentNode.insertBefore(clanlink,document.images[i]);
	i++;
	}
}
}
}
else if (location.href.search("http://yo-bod.com/faceshop/") != -1) 
{
if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
{document.getElementById("one_getsetid").setAttribute('value',document.referrer.replace("http://www.ereality.ru/~","").replace("http://www.ereality.ru/",""));
var xpathRes = xpath("/html/body/div[7]/div[22]/table/tbody/tr[3]/td/input[2]");
xpathRes.snapshotItem(0).click();
}
}
else if (location.href.search("http://sidzoku.ru/landlord/") != -1) 
{
if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
{
	document.getElementById("heroName").setAttribute('value',location.href.replace("http://sidzoku.ru/landlord/#",""));
	var xpathRes = xpath("/html/body/div[5]/div[5]/div/div[3]/div/img[2]");
	xpathRes.snapshotItem(0).click();
}
}
else if (location.href.search(".com/efimerka/") != -1) 
{
if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
{
 var xpathRes = xpath('//*[@id="sdiv_img8"]');
 xpathRes.snapshotItem(0).click();
 window.onload = setTimeout( efim , 5000);
}
}
else if ((location.href.search("http://www.ereality.ru/log") != -1)&&(location.href.search("http://www.ereality.ru/login") == -1))
{
var link = document.createElement('A');
	link.href = 'http://freedom.erclans.ru/analiz/'+location.href.replace("http://www.ereality.ru/log/","");
	link.target = '_blank'
	link.innerHTML = '<img src="data:image/gif;base64,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"</img>';
document.body.insertBefore(link, document.body.firstChild);
}
else if (location.href.search("http://freedom.erclans.ru/analiz/") != -1) 
{
if (document.referrer.search("http://www.ereality.ru/log") != -1) 

{
document.getElementsByName("num_log")[0].setAttribute('value',location.href.replace("http://freedom.erclans.ru/analiz/",""));
var xpathRes = xpath("/html/body/center/form/table/tbody/tr[4]/td/input");
xpathRes.snapshotItem(0).click();
}
}
else if (location.href.search("http://cc.erclans.ru/viewpage.php") != -1) 
{
if (document.referrer.search("http://www.ereality.ru/core/") != -1) 
{
document.getElementById("0012e4f").setAttribute('value',decodeURI(location.href).replace("http://cc.erclans.ru/viewpage.php?page_id=45#","").replace(/\] \[/g,",").replace("]","").replace("[",""));
var xpathRes = xpath("/html/body/table/tbody/tr/td/table[3]/tbody/tr/td[2]/table/tbody/tr[2]/td/center/form/input[2]");
xpathRes.snapshotItem(0).click();
}
}
 else if ((location.href.search("http://www.ereality.ru/map.php") != -1) && (location.href.search("action=fill") != -1)) 
 {
 if (myoptions.lotereya) {
 var lotButton = document.createElement('img');	
	 lotButton.src = 'data:image/gif;base64,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';
	xpath("/html/body/div/div[4]/div/div/table/tbody/tr/td/table").snapshotItem(0).appendChild(lotButton);
	lotButton.addEventListener("click", lotereya, false); 
    }
 }
  else if ((location.href.search("http://www.ereality.ru/move") != -1)&&(myoptions.chatsectors)) 
 { 
 	 document.onkeyup = function (e) {
	        e = e || window.event;
			if ((e.keyCode === 27)&&(myoptions.esc_move)) {
	            top.frames.main.document.getElementById("mapCancelMoving").click();
	        }
	        return false;
	 }
    window.setTimeout( function(){
     var clearlink = document.createElement('A');
	clearlink.href = 'javascript:window.parent.chat.myshowSec("","")';
	clearlink.innerHTML ="[X]";
	if ((document.getElementById("searchY")!=null)&&(document.getElementById("searchY").value!=""))
	{document.getElementById("searchY").parentNode.appendChild(clearlink);}
	else if ((document.getElementById("sy2")!=null)&&(document.getElementById("sy2").value!=""))
	{document.getElementById("sy2").parentNode.appendChild(clearlink);}
 } , 0);
 }
else if (location.href.search("http://www.ereality.ru/instance") != -1) 
  {
  document.onkeyup = function (e) {
	        e = e || window.event;
			if ((((e.keyCode > 36) && (e.keyCode < 41))||(e.keyCode === 13)||(e.keyCode === 65)||(e.keyCode === 68)||(e.keyCode === 83)||(e.keyCode === 87)||(e.keyCode === 88))&&(top.document.getElementById("chat_msg").value=="")) {
	            instkbd(e.keyCode);
	        }
	        return false;
	    }
  }
 else if ((location.href.search("http://www.ereality.ru/map.php") != -1) && (location.href.search("mode=altar") != -1))
  {
	xpathRes = xpath('//a[contains(@href,"/map.php?mode=altar")]');
	if (xpathRes.snapshotLength>0) {xpathRes.snapshotItem(0).focus();} 
  }
      else if (location.href.search("http://www.ereality.ru/map.php") != -1) 
  {
	 document.onkeyup = function (e) {
	        e = e || window.event;
			 if (((e.keyCode === 81) || (e.keyCode === 69) || (e.keyCode === 90) || (e.keyCode === 67))&&(top.document.getElementById("chat_msg").value=="")) {undergroundkbd(e.keyCode); }
	        // Отменяем действие браузера
	        return false;
	    }
  } 
//=========================end.
}
 });