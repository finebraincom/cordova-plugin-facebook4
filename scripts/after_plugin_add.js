var fs = require('fs');

var files = [
    "platforms/browser/www/plugins/cordova-plugin-facebook4/www/facebook-browser.js",
    "platforms/browser/platform_www/plugins/cordova-plugin-facebook4/www/facebook-browser.js",
    "platforms/browser/www/cordova.js",
    "platforms/browser/platform_www/cordova.js"
];

function getPreferenceValue(config, name) {
	'use strict';
    var value = config.match(new RegExp('name="' + name + '" value="(.*?)"', "i"));
    if(value && value[1]) {
        return value[1];
    } else {
        return null;
    }
}

module.exports = function(context){
	'use strict';
	if(context.opts.platforms.indexOf('browser') < 0){
        return;
    }

	var Q = context.requireCordovaModule('q');
    var dfd = new Q.defer();
	var config = fs.readFileSync("config.xml").toString();
	var appId = getPreferenceValue(config, "APP_ID");
	for(var i in files) {
	    try {
	    	var contents = fs.readFileSync(files[i]).toString();
		    fs.writeFileSync(files[i], contents.replace(/APP_ID/g, appId));
		} catch(err) {}
	}
	dfd.resolve();
	return dfd.promise;
};


// if(process.argv.join("|").indexOf("APP_ID=") > -1) {
// 	var APP_ID = process.argv.join("|").match(/APP_ID=(.*?)(\||$)/)[1]
// } else {
// 	var config = fs.readFileSync("config.xml").toString()
// 	var APP_ID = getPreferenceValue(config, "APP_ID")
// }
//
//
// for(var i in files) {
//     try {
//     	var contents = fs.readFileSync(files[i]).toString()
// 	    fs.writeFileSync(files[i], contents.replace(/APP_ID/g, APP_ID))
// 	} catch(err) {}
// }
