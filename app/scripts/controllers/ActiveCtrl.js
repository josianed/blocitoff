(function() {
	function ActiveCtrl($scope, $firebaseArray) {

		var ref = new Firebase("https://dazzling-inferno-2350.firebaseio.com/");

		$scope.task = $firebaseArray(ref);
	}

	angular
		.module('blocitoff')
		.controller('ActiveCtrl', ['$scope', '$firebaseArray', ActiveCtrl]);
})();