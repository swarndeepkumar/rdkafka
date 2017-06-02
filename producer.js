'use strict';
var config = require('config');
var kafka = require('node-rdkafka');
var authorize = require("./authorize.js");

var produceMessage = {
	sendMessage: function(ID, name, msg, servicename) {
		produceMessage.authorization(ID, name, msg, servicename);
	},
	authorization: function(ID, name, msg, servicename) {
		authorize.authorize(ID, name, servicename, function(response) {
			//console.log(response.message);
			var message = JSON.parse(msg);
			var topicName = [],
				permission;
			var producer = new kafka.Producer(config.producer.settings);
			//starting the producer

			if (response.message.length > 1) {
				for (var i = 0; i < response.message.length; i++) {
					// Publish - 0 (OR) Publish / Consume the message = 2
					if (response.message[i].Permission == 0 || response.message[i].Permission == 2) {
						topicName.push({
							topic: response.message[i].TopicName,
							messages: message.message
						});
					}
				}
			} else {
				// Publish - 0 (OR) Publish / Consume the message = 2
				if (response.message[0].Permission == 0 || response.message[0].Permission == 2) {
					topicName.push({
						topic: response.message[0].TopicName,
						messages: message.message
					});
				}
			}
			//logging debug messages, if debug is enabled
			producer.on('event.log', function(log) {
			  console.log(log);
			});
			
			//logging all errors
			producer.on('event.error', function(err) {
				console.error('Error from producer');
				console.error(err);
			});

			//counter to stop this sample after maxMessages are sent
			var counter = 0;
			

			producer.on('delivery-report', function(err, report) {
				console.log('delivery-report: ' + JSON.stringify(report));
				counter++;
			});

			//Wait for the ready event before producing
			producer.on('ready', function(arg) {
				console.log('producer ready.' + JSON.stringify(arg));

				//Create a Topic object with any options our Producer
				//should use when producing to that topic.


				for (var i = 0; i < topicName.length; i++) {
					var topic = producer.Topic(topicName[i].topic, {
						// Make the Kafka broker acknowledge our message (optional)
						'request.required.acks': 1
					});
					var value = new Buffer(topicName[i].messages);
					var key = "key-" + i;
					// if partition is set to -1, librdkafka will use the default partitioner
					var partition = -1;
					producer.produce(topic, partition, value, key);
				}

				//need to keep polling for a while to ensure the delivery reports are received
				var pollLoop = setInterval(function() {
					producer.poll();
					if (counter === topicName.length) {
						clearInterval(pollLoop);
						//producer.disconnect();
					}
				}, 1000);


			});

			producer.on('disconnected', function(arg) {
				console.log('producer disconnected. ' + JSON.stringify(arg));
			});

			//starting the producer
			producer.connect();



		});
	}
};

exports.produceMessage = produceMessage;