'use strict';
var consumer = require("./consumer.js");

var ID = "payment";
var name = "Payment Service";
var servicename = "oder-ser";
consumer.consumeMessage.getMessage(ID, name, servicename);