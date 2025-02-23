/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var path = require("path");
module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	var loader = this;
	var options = loaderUtils.getOptions(loader) || {};
	this.cacheable && this.cacheable();
	return "require(" + JSON.stringify("!!" + path.join(__dirname, "addScript.js")) + ")"+
			"(require(" +
			JSON.stringify("!!" + require.resolve("raw-loader") + "!" + remainingRequest) + ")" +
				(this.debug ?
					"+" +
						JSON.stringify(
							"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///" +
								encodeURI(remainingRequest.replace(/^!/, "")).replace(/%5C|%2F/g, "/").replace(/\?/, "%3F").replace(/^\//, "")
						) :
					"") +
			"," + options.stripUseStrict + ")";
};
