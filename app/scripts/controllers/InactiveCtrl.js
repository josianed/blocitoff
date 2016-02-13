(function() {
	'use strict';

	var CONTROLLER_ID = 'InactiveCtrl';

	angular
		.module('blocitoff')
		.controller(CONTROLLER_ID, InactiveCtrl);

	InactiveCtrl.$inject = ['$log', '$firebaseArray'];

	function InactiveCtrl($log, $firebaseArray) {

		var vm = this;

		vm.didTaskExpire = didTaskExpire;

		activate();

		function activate() {
			$log.debug(CONTROLLER_ID + " activated");	
		
			var ref = new Firebase("https://dazzling-inferno-2350.firebaseio.com/");

			vm.tasks = $firebaseArray(ref);
			// retrieve date task was added
			ref.once("child_added", function(snapshot) {
				var newTask = snapshot.val();
				var taskAdded = newTask.ts;
			});
		}

		function getTaskAge(task) {
			var now = new Date();
			var taskTsAsDate = new Date(task.ts);
			return now - taskTsAsDate;
		}

		function didTaskExpire(task) {
			var SECONDS_PER_DAY = 60 * 60 * 24;
			var SEVEN_DAYS_SECS = 0.001 * SECONDS_PER_DAY;
			var taskAgeMs = getTaskAge(task);
			var didExpire = (taskAgeMs / 1000) >= SEVEN_DAYS_SECS;
			return didExpire;
		}

	}

})();