(function() {
'use strict'; //turns on strict mode in the browser, first line of new scope
	var CONTROLLER_ID = 'ActiveCtrl';	

	angular
		.module('blocitoff')
		.controller(CONTROLLER_ID, ActiveCtrl);

	ActiveCtrl.$inject = ['$log', '$firebaseArray'];

	function ActiveCtrl($log, $firebaseArray) {
		
		var vm = this;
		//bindable methods
		vm.didTaskExpire = didTaskExpire;
		vm.addTask = addTask;

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
			var SEVEN_DAYS_SECS = 7 * SECONDS_PER_DAY;
			var taskAgeMs = getTaskAge(task);
			var didExpire = (taskAgeMs / 1000) >= SEVEN_DAYS_SECS;
			return didExpire;
		}
		
		// vm.tasks.$delete();

		//adding tasks to firebase
		function addTask(task) {
			var now = new Date();
			vm.tasks.$add({
				description: "New task added!",
				ts: now.toUTCString()
			});
		}
	}
	
})();