(function() {
	function inactiveTasks() {
		return {
			templateUrl: '/templates/directives/inactive-tasks.html',
			replace: false,
			restrict: 'A',
			link: function(scope, element, attributes) {

				scope.isActive = function(task) {
					// retrieve date task was added
					ref.once("child_added", function(snapshot) {
						var newTask = snapshot.val();
						var taskAdded = newTask.ts;
					});

					var active = true;
					var today = new Date();
					var expired =  new Date(today.setDate(today.getDate() - 7)).toString();

					if (taskAdded < expired) {
						active = false;
					}

					return active;
				};

			}
		}
	}	


	angular
		.module('blocitoff')
		.directive('inactiveTasks', inactiveTasks);
})();