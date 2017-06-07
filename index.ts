var coinbase = require('coinbase');
var client   = new coinbase.Client({'apiKey': 'J9QEYRnl1J8Jm0rR', 'apiSecret': '21ew'});
var MongoClient = require('mongodb').MongoClient;
var dateFormat = require('dateformat');
const path = require('path');

var currency_code = process.env.CURR_CODE || 'INR';

var currpair = 'BTC-'+ currency_code;

const notifier = require('node-notifier');

/// Connect to the db
/*function ToStore(data){
	
	MongoClient.connect("mongodb://localhost:27017/BitcoinDB", function (err, db) {
    
	    db.collection('Bitcoin1', function (err, collection) {
	        var now = Date.now();
	        collection.insert({Amount: data, CreatedByDateTimeInMilli: now, 
	        					CurrCode: currency_code,
	        					CreatedDate: dateFormat(now, 'isoDate'),
	        					CreatedTime: dateFormat(now, 'isoTime')
	        					});

	        db.collection('Bitcoin1').count(function (err, count) {
	            if (err) {
	            	db.close();
	            	throw err;
	            }

	        });
	    });
	});
}*/
let previousPrice:number = 0;
setInterval(function(){
	client.getBuyPrice({'currencyPair': currpair}, function(err:any, obj:any) {
		//ToStore(+ obj.data.amount);
		if(!obj) {
			console.log("Error:"+err);
			return;
		}
		console.log(obj.data.amount);
		if(obj.data.amount){
	 		notifier.notify({
			  title: "Price Changed.",
			  message: 'Current Price ('+currency_code+'): '+obj.data.amount+'\n'
			  + 'Difference ('+currency_code+'): '+(obj.data.amount-previousPrice),
			  icon: path.join(__dirname, 'images/bit300.png'), // Absolute path (doesn't work on balloons),
			  sound: true, // Only Notification Center or Windows Toasters
			  wait: true, // Wait with callback, until user action is taken against notification
			  timeout: 10, // Takes precedence over wait if both are defined. 
		 	  closeLabel: "CLOSE", // String. Label for cancel button 
			}, function (err:any, response:any) {
			  // Response is response from notification
			});

			notifier.on('click', function (notifierObject:any, options:any) {
			  // Triggers if `wait: true` and user clicks notification
			  previousPrice = obj.data.amount;
			});
			 
			notifier.on('timeout', function (notifierObject:any, options:any) {
			  // Triggers if `wait: true` and notification closes
			  previousPrice = obj.data.amount; 
			});
		}
	});
},(2*60*1000));

