var timestamp = document.URL.match(/saved=yes/);
if(timestamp!=null) {
	$('.saved-successfully').css('display', 'block');
}