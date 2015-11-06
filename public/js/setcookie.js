var uniqid = Cookies.get('uniqid');
if(typeof(uniqid) === 'undefined'){
	var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
	uniqid = randLetter + Date.now();
	Cookies.set('uniqid', uniqid, { expires: 1 });
	//$('p#userid').text('Welcome, '+uniqid);
}
$('input#userid').attr('value', uniqid);