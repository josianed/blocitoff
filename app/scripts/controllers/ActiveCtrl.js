(function() {
	// console.log("ActiveCtrl.js loaded");
	function ActiveCtrl($log, $firebaseArray) {
		var vm = this;

		$log.debug("ActiveCtrl activated");
		var ref = new Firebase("https://dazzling-inferno-2350.firebaseio.com/");

		vm.tasks = $firebaseArray(ref);
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