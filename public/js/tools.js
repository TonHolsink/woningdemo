var TOOLS = TOOLS ? TOOLS : function() {

	// Parse URL Queries
	/**
	 * Parse URL Queries
	 * @param {string} query the request param
	 * @memberOf anonymous
	 */
	var url_query = function( query ) {
		query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var expr = "[\\?&]"+query+"=([^&#]*)";
		var regex = new RegExp( expr );
		var results = regex.exec( window.location.href );
		if ( results !== null ) {
			return results[1];
		} else {
			return false;
		}
	};

	var oPublic =
	{
		url_query: url_query
	};

	return oPublic;
}();