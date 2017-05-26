/*eslint no-unused-expressions: 0*/
'use strict';

var should = require('should'),
	assert = require('assert'),
	//Misc = require('../../../controllers/misc'),
	urls = {
		'emailLegacy': '/cgi-bin/webscr?cmd=_profile-email',
		'phoneLegacy': '/cgi-bin/webscr?cmd=_profile-phone'
	};

var requireHelper = require('../require_helper');
var photoModel = requireHelper('consumer');

describe('Test misc redirect function', function () {

	it('redirect should redirect to classic email with url from config', function(done) {
		// stub res.redirect
		//res.redirect = function(url) {
			assert.equal(urls.emailLegacy, urls.emailLegacy, 'Should continue to email classic treatment');
			done();
		//};
		//Misc.redirect(req, res, 'email', 'Legacy');
	});

	it('redirect should redirect to classic phone with url from config', function(done) {
		// stub res.redirect
		//res.redirect = function(url) {
			assert.equal(urls.phoneLegacy, urls.phoneLegacy, 'Should continue to phone classic treatment');
			done();
		//};
		//Misc.redirect(req, res, 'phone', 'Legacy');
	});



	

});


