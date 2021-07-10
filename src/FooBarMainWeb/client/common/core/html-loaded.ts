export function htmlLoaded($element: JQuery, scrollToTop?: boolean/*, alert: Alert, redirectHash?: string*/): void {
	//if (!aurelia) {
	//	throw 'aurelia has to be set before calling htmlLoaded';
	//}

	if (scrollToTop /*|| (alert && alert.alertType == AlertType.MessageBox)*/) {
		$(window).scrollTop(0);
	}

	(function templatePolyfill(d) {
		//Credit: http://jsfiddle.net/brianblakely/h3EmY/
		if ('content' in d.createElement('template')) {
			return false;
		}

		var qPlates = d.getElementsByTagName('template'),
			plateLen = qPlates.length,
			elPlate,
			qContent,
			contentLen,
			docContent;

		for (var x = 0; x < plateLen; ++x) {
			elPlate = qPlates[x];

			if (elPlate) {
				qContent = elPlate.childNodes;
				contentLen = qContent.length;
				docContent = d.createDocumentFragment();

				while (qContent[0]) {
					docContent.appendChild(qContent[0]);
				}

				elPlate.content = docContent;
			}
		}
	})(document);

	// === Keep last! =====================================================================
	//(function showAlert(alert: Alert) {
	//	if (alert) {
	//		let alertsService: AlertsService = aurelia.container.get(AlertsService);
	//		alertsService.preventCloseOnNavigationComplete = redirectHash ? true : false;
	//		alertsService.alert(alert.message, alert.contextCssClass, alert.alertType, alert.validationErrors, true);
	//	}
	//})(alert);

	//if (redirectHash) {
	//	(function redirect(redirectHash) {
	//		if (!redirectHash.startsWith('/')) {
	//			redirectHash = '/' + redirectHash;
	//		}

	//		let router: Router = aurelia.container.get(Router);
	//		if (location.hash.indexOf(AppConstants.shortcutsBarTrackingQueryParamAndValue) > -1) {
	//			redirectHash += (redirectHash.indexOf('?') > -1 ? '&' : '?') + AppConstants.shortcutsBarTrackingQueryParamAndValue;
	//		}

	//		window['vk-keep-alert-message-box-once'] = true;
	//		if (redirectHash.toLowerCase() === location.hash.toLowerCase().replace('#', '')) {
	//			let navService: NavService = aurelia.container.get(NavService);
	//			navService.appendQueryString({ x: StringHelpers.randomString(8) });
	//			setTimeout(() => {
	//				router.navigate(redirectHash);
	//			}, 0);
	//		} else {
	//			router.navigate(redirectHash);
	//		}
	//	})(redirectHash);
	//} else {
		(function setVkReady() {
			$('html').addClass('vk-html-ready');
			$(document).trigger('vk-ready');
		})();
	//}
	// ====================================================================================
}