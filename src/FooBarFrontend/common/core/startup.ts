(function ensureLocalLinksStartsWithHash() {
	$('body').on('mouseover touchstart focus click', 'a[href^="/"]:not(a[href^="/#"]):not([data-ajax="true"]):not([download])', function () { //"click" event needed for touch screenreader mode
		var href = $(this).attr('href');
		href = href.replace('/', '/#'); //This works because js "string.replace" only replaces first instance
		$(this).attr('href', href);
	});
})();