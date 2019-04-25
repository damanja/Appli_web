var ListeaFaire = angular.module('Connexion', []);

function loginController($scope, $http, $window) {
    $scope.formul = {};
    
    $scope.connect = function(){
        $http.post('/checkuser', $scope.formul)
        .success(function(){
            $scope.formul = {};
            $window.location.href = '/task.html';
        })
        .error(function(){
            $scope.formul = {};
            alert("Invalid password/username")
            console.log('Error on login');
        })
    };
}
