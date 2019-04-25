var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope, $http,$window) {
	$scope.formData = {};
	$scope.formTask = {};
	$scope.changeData = {};
	$http.post('/getUserTaskSet').success(function(data) {
		$scope.laliste = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.createListTodo = function() {
		$http.post('/insertListTask',$scope.formData)
		.success(function(data) {
			$scope.formData = {};
			$scope.laliste = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.createTodo = function(task) {
		$http.post('/insertTask/' + task, $scope.formTask)
		.success(function(data) {
			$scope.formTask = {};
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

	$scope.deleteTodoList = function(id){
		$http.delete('/deleteListTask/'+id)
			.success(function(data){
				$scope.laliste = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});	
	};

	$scope.deconnecter = function(){
		alert("vous allez être déconnecté"); 
		$window.location.href = '/';
	}

	$scope.toggle_visibility = function(idx){
		var e = document.getElementById("addTaskForm"+idx);
		var a= document.getElementById("btnAddTask"+idx);
		e.style.display = ((e.style.display!='none') ? 'none' : 'block');
		a.style.display = ((e.style.display!='none') ? 'none' : 'block');
	} 

	$scope.modifyVisibility = function(id){
		var e = document.getElementById("modifyTaskForm" + id);
		var a = document.getElementById("btnModifyAsk" + id);
		e.style.display = ((e.style.display!='none') ? 'none' : 'block');
		a.style.display = ((e.style.display!='none') ? 'none' : 'block');
	}
}