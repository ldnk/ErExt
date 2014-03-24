// ==UserScript==
// @name     ErExt_Common
// @include http://www.ereality.ru/core/*
// @require tools/jquery.js
// @require css/popup-css.js
// @require tools/popup.js
// @require tools/messaging-enum.js
//
// @require css/faction-counter-css.js
// @require css/faction-count-builder-css.js
// @require common/faction-counter/faction-counter.js
// @require common/faction-counter/faction-count-builder.js
//
// @require css/items-builder-css.js
// @require user/items-builder.js
// @require user/user-list-active-items.js
//
// @require css/context-blocker-css.js
// @require common/context-blocker/context-blocker.js
// ==/UserScript==



kango.invokeAsync('kango.storage.getItem', "options", function(options) {
	var mergedOptions = mergeOptions(options, myoptions);

	// check if plug-in on pause
	if (!mergedOptions.unpaused) {
		return;
	}
	
	// init faction count
	if (mergedOptions.okcount) {
		var factionContBuilder = new factionContBuilderClass(factionContBuilderCss, factionCounterCss);
		factionContBuilder.init();
	}	
	
	// init user list active items
	if (mergedOptions.userlistactiveitems) {
		var usersListActiveItems = new usersListActiveItemsClass("#div_users", "a[class=b]", messagingEnum, popup);
		usersListActiveItems.init();
	}	
	
	// init block context menu
	if (myoptions.block_cmenu) {
		var contextBlocker = new contextBlockerClass(contextBlockerCss);
		contextBlocker.init();
	}
});



