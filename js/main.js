$(document).ready(function(){
	var tweetsBase = [
		{
			date: '14 января 2019 года',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae eaque molestiae, minima tenetur veritatis',
		},
		{
			date: '14 января 2019 года',
			text: 'Текст твита',
		},
		{
			date: '14 января 2019 года',
			text: 'Ещё',
		}
	];



	var countTweets = function(){
		var tweetCounter = $('.tweet-card').length;
		$('#tweetscounter').text(tweetCounter)
	}

	var wrapURLs = function (text, new_window) {
 	var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
 	var target = (new_window === true || new_window == null) ? '_blank' : '';
  
  	return text.replace(url_pattern, function (url) {
    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
    var href = protocol_pattern.test(url) ? url : 'http://' + url;
    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
  });
};

	var getDate = function(){
		var date = new Date();
		day = date.getDate();
		month = date.getMonth();
		year = date.getFullYear();
		var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");
		var actualDate = day + ' ' + monthArray[month] + ' ' + year + ' года';
		return actualDate;
	}

	var createTweet = function(date, text){
		var $tweetBox = $('<div class="card tweet-card">');
		var $tweetDate = $('<div class="tweet-date">').text(date);
		var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>');
		// Проверка на длину текста
	var additionalClassName;
	if (text.length < 100){
		additionalClassName = 'font-size-large';
	} else if (text.length > 150) {
		additionalClassName = 'font-size-small';
	} else {
		additionalClassName = 'font-size-normal';
	}
	$tweetText.addClass(additionalClassName);
		// // проверка на длину текста

		$tweetBox.append($tweetDate).append($tweetText);
		$('#tweetsList').prepend($tweetBox);
		countTweets();
	}

	tweetsBase.forEach(function(tweet){
		createTweet(tweet.date, tweet.text);
	})
	// форма отправки формы
	$('#postNewTweet').on('submit', function(e){
		e.preventDefault();
		var tweetText = $('#tweetText').val();
		createTweet(getDate(), tweetText);
		$('#tweetText').val('');
	});
});