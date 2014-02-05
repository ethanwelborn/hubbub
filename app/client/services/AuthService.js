'use strict';

angular.module('hubbubApp')
  .factory('AuthService',  function () {
    var currentUser = {
    	_id: '52f1bcb023f1ba8b392f6c44',
		username: 'testclient'
    };

	  	return {
		    login: function() {
		    	currentUser = {
		    		_id: '52f1bcb023f1ba8b392f6c44',
		    		username: 'testclient'
		    	};
		    },
		    logout: function() {},
		    isLoggedIn: function() {},
		    currentUser: function() {
		    	return currentUser;
		    }
	  	};
  });