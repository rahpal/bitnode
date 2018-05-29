/**
 * Created by drapal on Jun 2017.
 */

var coinbase = require('coinbase');
var client   = new coinbase.Client({'apiKey': 'J9QEYRnl1J8Jm0rR', 'apiSecret': '21ew'});
var MongoClient = require('mongodb').MongoClient;
var dateFormat = require('dateformat');
const path = require('path');
var currFormat = require('currency-formatter');
import APIService from "./service";
let lodash = require("lodash");

var currency_code = process.env.CURR_CODE || 'USD';

var currpair = 'XLM-'+ currency_code;

const notifier = require('node-notifier');

/// Connect to the db
/*function ToStore(data: any){
	
	MongoClient.connect("mongodb://localhost:27017/BitcoinDB", function (err, db) {
    
	    db.collection('Bitcoin1', function (err: any, collection: any) {
	        var now = Date.now();
	        collection.insert({Amount: data, CreatedByDateTimeInMilli: now, 
	        					CurrCode: currency_code,
	        					CreatedDate: dateFormat(now, 'isoDate'),
	        					CreatedTime: dateFormat(now, 'isoTime')
	        					});

	        db.collection('Bitcoin1').count(function (err: any, count: any) {
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
	APIService.get(null, "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10", {}, null)
			.then((response: any)=>{
				response.forEach((item: any) => {
					let ada, xlm;
					if(item.symbol === 'ADA'){
						ada = item.price_inr;
						console.log(ada);
						return;
					}
					if(item.symbol === 'NANO'){
						xlm = item.price_inr;
						console.log(xlm);
						return;
					}
				});
			},()=>{

			});
	/*client.getBuyPrice({'currencyPair': currpair}, function(err:any, obj:any) {
		//ToStore(obj.data.amount);
		if(!obj) {
			console.log("Error:"+err);
			return;
		}
		var formattedCuur = currFormat.format(obj.data.amount, { code: currency_code });
		console.log(formattedCuur);
		/*if(obj.data.amount){
	 		notifier.notify({
			  title: "Price Changed.",
			  message: 'Current Price ('+currency_code+'): '+formattedCuur+'\n'
			  + 'Difference ('+currency_code+'): '+currFormat.format((obj.data.amount-previousPrice), { code: currency_code }),
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
	});*/
},5000);
