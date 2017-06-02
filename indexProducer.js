'use strict';
var producer = require("./producer.js");

var ID = "payment";
var name = "Payment Service";
var msg = '{"message": "Hello World!"}';
var servicename = 'order-service';
producer.produceMessage.sendMessage(ID, name, msg, servicename);