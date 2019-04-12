var ListeaFaire = angular.module('Connexion', []);

function loginController($scope, $http, $window) {
    $scope.formul = {};
    
    $scope.connect = function(){
        $http.post('/checkuser', $scope.formul)
        .success(function(){
            $scope.formul = {};
//            console.log("Vous êtes connecté");
            $window.location.href = '/task.html';
          //  console.log('Success on registering new user');
        })
        .error(function(){
            $scope.formul = {};
            alert("Invalid password/username")
            console.log('Error on login');
        })
    };
}
