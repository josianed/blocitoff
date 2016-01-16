(function() {
	function ActiveCtrl($scope, $firebaseArray) {

		var taskData = new Firebase("https://dazzling-inferno-2350.firebaseio.com/");

		$scope.data = $firebaseArray(taskData);

	}

	angular
		.module('blocitoff')
		.controller('ActiveCtrl', ['$scope', '$firebaseArray', ActiveCtrl]);
})();