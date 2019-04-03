var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope, $http) {
	$scope.formData = {};
	$http.get('/getTaskSet').success(function(data) {
		$scope.laliste = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});
	$scope.createTodo = function() {
		$http.post('/insertTask',$scope.formData)
		.success(function(data) {
			$scope.formData = {};
			$scope.laliste = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
	$scope.updateTodo = function(id) {
		$http.put('/updateTaskDone/'+id)
		.success(function(data) {
			$scope.laliste = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
	$scope.deleteTodo = function(id) {
		$http.delete('/deleteTask/'+id)
			.success(function(data) {
				$scope.laliste = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}
