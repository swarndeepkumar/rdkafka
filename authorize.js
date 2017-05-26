'use strict';
var request = require('request');

var authorize = function(ID, name, callback)  {
	
	var jsonData = {
		"ID" : ID,
		"name" : name
	};

	var options = {
		url: 'http://localhost:8080/KafkaAdminAPI/authorize',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		json: jsonData
	};

	request(options, function(err, res, body) {
			// mocked code 
		var err = false;
		var res = {};
		    res.statusCode = 200;
		 var body = {
		 	message : [{Permission:2,TopicName:'mytesttopic'},{Permission:0,TopicName:'mytesttopic1'}]
		 };
		
		//
		if (err) {
			callback(null);
		}

		
		if (res && (res.statusCode === 200 || res.statusCode === 201)) {
			callback(body);
	 	}
	 	return;
	});
};

exports.authorize = authorize;