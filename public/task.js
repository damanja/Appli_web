var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope, $http,$window) {
	$scope.formData = {};
	$scope.changeData = {};
	$http.post('/getUserTaskSet').success(function(data) {
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
	$scope.changeTodo = function(id) {

		$http.put('/updateTaskName/'+id,$scope.changeData)
		.success(function(data) {
			$scope.changeData={};
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

	$scope.deconnecter = function(){
		alert("vous allez être déconnecté");
		/* TODO mis à jour de l'utilisateur */ 
		$window.location.href = '/';
	}
	$scope.mafonction = function(){

		alert("Je commence à comprendre des choses");
	};
}