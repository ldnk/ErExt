﻿function MyExtension() {
	 var self = this;
	 kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
	 self._onCommand();
	 });
}

MyExtension.prototype = {

	 _onCommand: function() {
		 kango.ui.optionsPage.open();
	 }
};

var extension = new MyExtension();
 opt=kango.storage.getItem('options');
 if (opt.unpaused!=false) {opt.unpaused=true;} 
 if (opt.unpaused) {kango.ui.browserButton.setIcon('icons/button.png') }
 else {kango.ui.browserButton.setIcon('icons/buttong.png');}

  // Проверка наличия новой версии
   var details = {
                method: 'GET',
                url: 'http://news.ereality.ru/client/ver.txt',
                async: true,
                contentType: 'text'
        };
        kango.xhr.send(details, function(data) {
                if (data.status == 200 && data.response != null) {
                        var text = data.response;
                        if (+text>6)  {kango.ui.browserButton.setIcon('icons/grumpy.png'); }}  // типо проверки на новую версию
                else { // something went wrong
                        kango.console.log('something went wrong');
                }
        });

 