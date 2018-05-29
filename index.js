"use strict";
/**
 * Created by drapal on Jun 2017.
 */
exports.__esModule = true;
var MongoClient = require('mongodb').MongoClient;
var dateFormat = require('dateformat');
var path = require('path');
var currFormat = require('currency-formatter');
var service_1 = require("./service");
var lodash = require("lodash");
var currency_code = process.env.CURR_CODE || 'USD';
var currpair = 'XLM-' + currency_code;
var notifier = require('node-notifier');
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
var previousPrice = 0;
setInterval(function () {
    service_1["default"].get(null, "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100", {}, null)
        .then(function (response) {
        response.find(function (item) {
            var ada, xlm;
            /*if(item.symbol === 'ADA'){
                ada = item.price_usd;
                console.log("ADA : "+ada);
                return;
            }*/
            if (item.symbol === 'NANO') {
                xlm = item.price_usd;
                console.log("NANO : " + xlm);
                if (xlm > 3.7) {
                    notifier.notify({
                        title: "Price Changed.",
                        message: 'Current Price : ' + xlm,
                        //icon: path.join(__dirname, 'images/bit300.png'), // Absolute path (doesn't work on balloons),
                        sound: false,
                        wait: false,
                        timeout: 100,
                        closeLabel: "CLOSE"
                    }, function (err, response) {
                        // Response is response from notification
                    });
                }
                return;
            }
        });
    }, function () {
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
}, 1000 * 60);
