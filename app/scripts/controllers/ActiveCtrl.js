(function() {
'use strict'; //turns on strict mode in the browser, first line of new scope
	var CONTROLLER_ID = 'ActiveCtrl';	

	angular
		.module('blocitoff')
		.controller(CONTROLLER_ID, ActiveCtrl);

	ActiveCtrl.$inject = ['$scope', '$log', '$firebaseArray', '$firebaseObject'];

	function ActiveCtrl($scope, $log, $firebaseArray, $firebaseObject) {
		
		var vm = this;
		//bindable methods
		vm.didTaskExpire = didTaskExpire;
		vm.addTask = addTask;
		vm.newTask = {};
		vm.taskCompleted = taskCompleted;
		vm.update_task_completed = update_task_completed;
		vm.tasks = [];

		activate();

		function activate() {
			$log.debug(CONTROLLER_ID + " activated");

			var ref = new Firebase("https://dazzling-inferno-2350.firebaseio.com/");

			vm.tasks = $firebaseArray(ref);
			// // retrieve date task was added
			// ref.once("child_added", function(snapshot) {
			// 	var newTask = snapshot.val();
			// 	var taskAdded = newTask.ts;
			// 	var isComplete = newTask.completed;
			// });
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
		function addTask() {
			var now = new Date();
			// vm.newTask.description = "Hello";
			vm.newTask.ts = now.toUTCString();
			vm.newTask.completed = false;
			// vm.newTask.priority = "High";
			vm.tasks.$add(vm.newTask);
			vm.newTask = {};
		}

		// function taskCompleted(task) {
		// 	var markedComplete = true;
		// 	console.log("marked as complete " + markedComplete);
		// 	// vm.task.isComplete = true;
		// 	// vm.tasks.$save(task);
		// 	return markedComplete;
		// 	// return isComplete;
		// }

		function taskCompleted(task) {
			console.log("completed!")
			vm.tasks.$save(task);
		}

		function update_task_completed(task, index) {
			console.log(task, index);
			// alert(task.completed);
			// task.$save();
			
			var refToObj = new Firebase("https://dazzling-inferno-2350.firebaseio.com/" + task.$id);

			var t = $firebaseObject(refToObj);
			t.completed = task.completed;
			t.$save();
			activate();
		}

	}
	
})();