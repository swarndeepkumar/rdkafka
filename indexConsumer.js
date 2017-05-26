'use strict';
var consumer = require("./consumer.js");

var ID = "payment";
var name = "Payment Service";

consumer.consumeMessage.getMessage(ID, name);