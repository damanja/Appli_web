var ListeaFaire = angular.module('Inscription', []);
            
function registerController($scope, $http,$window) {
    $scope.formul = {};

    $scope.createUser = function(){
        $http.post('/createUser', $scope.formul)
        .success(function(){
            $scope.formul = {};
            console.log('Success on registering new user');
            alert("Votre compte a été créer");
            $window.location.href = '/';
        })
        .error(function(){
            alert("Ce nom d'utilisateur existe déjà");
        })
    };
}
