var producer = require("./producer.js");

var ID = "payment";
var name = "Payment Service";
var msg = '{"message": "Hello World!"}';

producer.produceMessage.sendMessage(ID, name, msg);