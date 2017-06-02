'use strict';

describe('Test consumer methods', function() {


	var should = require('should'),
		sinon = require('sinon'),
		consumer,
		assert = require('assert');
	var requireHelper = require('../require_helper');
	var authorize = require("../../authorize.js");
	var indexConsumer = requireHelper('indexConsumer');
	beforeEach(function(done) {
		delete require.cache[require.resolve('../../consumer')];



		done();
	});

	afterEach(function(done) {
		authorize.authorize.restore();

		done();
	});


	it('authorize method returns empty object', function(done) {


		consumer = require('../../consumer');
		var ID,
			name,
			message;

		var callback = sinon.stub();
		callback({
			"error": function(obj) {
				assert.deepEqual(obj,{},"Authorise API return empty object");
			   done();
			}
		});
		sinon.stub(authorize, 'authorize').callsFake(function(ID, name, next) {
			callback.yieldTo("error", {}); 
		});

		//authorize.authorize();
		consumer.consumeMessage.authorization(ID, name, message);

	});

	it('authorize method returns response', function(done) {


		consumer = require('../../consumer');
		var ID,
			name,
			message;

		var callback = sinon.stub();
		callback({
			"success": function(obj) {
				//assert.deepEqual(obj,{},"Authorise API return empty object");
			   done();
			}
		});
		sinon.stub(authorize, 'authorize').callsFake(function(ID, name, next) {
			callback.yieldTo("success", {
		 	message : [{Permission:2,TopicName:'mytesttopic'},{Permission:0,TopicName:'mytesttopic1'}]
		 }); 
		});

		//authorize.authorize();
		consumer.consumeMessage.authorization(ID, name, message);

	});

});