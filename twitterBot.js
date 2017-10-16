/*
	Tatsuya Yokota
	11/20/2016
	
	Aim: Every 10 min, find 5 most recent tweets with the keyword サンマ and
		retweet it.
	
	1. Find 5 most recent tweets with keyword
	2. Retweet automatically
	3. Execute function every 10 min
	
*/

var Twit = require('twit');

var T = new Twit({
    consumer_key:         '' // Your Consumer Key
  , consumer_secret:      '' // Your Consumer Secret
  , access_token:         '' // Your Access Token
  , access_token_secret:  '' // Your Access Token Secret
});


findAndRetweetSanmaTweets = function() {
	T.get('search/tweets', { q: 'サンマ', result_type: 'recent', lang: 'ja', count: 5 }, function(err1, data1, response1) {
	  // data1 is an object with an array called statuses
	  // statuses has objects that have info of the tweet/account id/ etc as keys and values
	  for (var i = 0; i < data1.statuses.length; i++) {
		T.post('statuses/retweet/:id', { id: data1.statuses[i].id_str }, function (err, data, response) {
		});
	  }
	});
}

findAndLikeSanmaBotTweets = function() {
	T.get('search/tweets', {q: '@sanma_bot_yade', result_type: 'recent', lang: 'ja', count: 30}, function(err1, data1, response1) {
		for (var i = 0; i < data1.statuses.length; i++) {
			//console.log(data1.statuses);
			T.post('favorites/create', { id: data1.statuses[i].id_str }, function(err, data, response) {
				//console.log("liked!");
			});	
		}
	});
}

setInterval(function() {
  try {
    findAndRetweetSanmaTweets();
    findAndLikeSanmaBotTweets();
  }
  catch (e) {
    console.log(e);
  }
}, 60000 * 10); // 60000 millisecond = 1 minute
