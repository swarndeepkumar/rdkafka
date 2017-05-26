'use strict';
var config = require('config');
var kafka = require('node-rdkafka');
var authorize = require("./authorize.js");

var consumeMessage = {
	getMessage: function(ID, name) {
		consumeMessage.authorization(ID, name);
	},

	authorization: function(ID, name) {
		authorize.authorize(ID, name, function(response) {
			var consumer = new kafka.KafkaConsumer(config.consumer.settings);
			var topicName = [];
			if (response.message.length > 1) {
				for (var i = 0; i < response.message.length; i++) {
					// Consume - 1 (OR) Publish / Consume the message = 2
					if (response.message[i].Permission == 1 || response.message[i].Permission == 2) {
						topicName.push(response.message[i].TopicName);
					}
				}
			} else {
				// Consume - 1 (OR) Publish / Consume the message = 2
				if (response.message[0].Permission == 1 || response.message[0].Permission == 2) {
					topicName.push(response.message[0].TopicName);
				}
			}
			//logging debug messages, if debug is enabled
			consumer.on('event.log', function(log) {
				console.log(log);
			});

			//logging all errors
			consumer.on('event.error', function(err) {
				console.error('Error from consumer');
				console.error(err);
			});

			console.log('topics', topicName);
			consumer.on('ready', function(arg) {
				console.log('consumer ready.' + JSON.stringify(arg));

				consumer.subscribe(topicName);
				//start consuming messages
				consumer.consume();
			});


			consumer.on('data', function(message) {
				
				console.log("--Consumer--");
				console.log("Topic Name: " + message.topic.toString());
			    console.log("Message: " + message.value.toString());
			   // return message;
			});

			consumer.on('disconnected', function(arg) {
				console.log('consumer disconnected. ' + JSON.stringify(arg));
			});

			//starting the consumer
			consumer.connect();



		});
	}
};

exports.consumeMessage = consumeMessage;