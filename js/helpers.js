
// ---------- Number ----------

function formatCurrency(montant, nbDecimal) {
	nbDecimal = (typeof nbDecimal != 'undefined'?nbDecimal:2);
	return montant.toLocaleString(locale, {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: nbDecimal,
		maximumFractionDigits: nbDecimal
	});
}
function formatPercent(valeur, minimumFractionDigits) {
	minimumFractionDigits = (typeof minimumFractionDigits != 'undefined'?minimumFractionDigits:2);
	return valeur.toLocaleString(locale, {style: 'percent', minimumFractionDigits:minimumFractionDigits});
}

// ---------- Date / Time ----------

function getMonthNameByMonth(month) {
	var d = new Date();
	d.setDate(1);
	d.setMonth(month-1);
	return d.toLocaleDateString(locale, {month: 'long'});
}

// ---------- Cookies ----------

function createCookie(name,value,days) {
	let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	let nameEQ = name + "=";
	let ca = document.cookie.split(';');
	for(let i=0;i < ca.length;i++) {
		let c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

// ---------- Bootstrap ----------

function initPopoverAndTooltip() {
	$('[data-toggle="popover"]').popover({
		html: true
	});
}
