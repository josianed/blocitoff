(function() {
	function ActiveCtrl($log, $firebaseArray) {
		var vm = this;

		// vm.getTaskAge = getTaskAge;
		vm.didTaskExpire = didTaskExpire;

		$log.debug("ActiveCtrl activated");
		var ref = new Firebase("https://dazzling-inferno-2350.firebaseio.com/");

		vm.tasks = $firebaseArray(ref);
		// retrieve date task was added
		ref.once("child_added", function(snapshot) {
			var newTask = snapshot.val();
			var taskAdded = newTask.ts;
		});

		var getTaskAge = function(task) {
			var now = new Date();
			var taskTsAsDate = new Date(task.ts);
			return now - taskTsAsDate;
		}

		var didTaskExpire = function(task) {
			var SECONDS_PER_DAY = 60 * 60 * 24;
			var SEVEN_DAYS_SECS = 7 * SECONDS_PER_DAY;
			var taskAgeMs = getTaskAge(task);
			var didExpire = (taskAgeMs / 1000) >= SEVEN_DAYS_SECS;
			return didExpire;
		}
		
		// vm.tasks.$delete();

		//adding tasks to firebase
		// var now = new Date();
		// vm.tasks.$add({
		// 	description: "Do all the things!",
		// 	ts: now.toUTCString()
		// });
	}

	angular
		.module('blocitoff')
		.controller('ActiveCtrl', ['$log', '$firebaseArray', ActiveCtrl]);
})();