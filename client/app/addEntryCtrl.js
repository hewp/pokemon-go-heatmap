var entryCtrl = angular.module('entryCtrl', ['geolocation', 'googservice']);
entryCtrl.controller('entryCtrl', function($scope, $http, $rootScope, geolocation, googservice){

    $scope.formData = {};
    var coords = {};

    $scope.formData.longitude = -122.412;
    $scope.formData.latitude = 37.776;

    //HTML 5 to get user location
    geolocation.getLocation().then(function(data){

        coords = {lat: data.coords.latitude, long: data.coords.longitude};

        $scope.formData.longitude = parseFloat(coords.long).toFixed(5);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(5);

        googservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    $rootScope.$on("dragged", function(){

        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(googservice.newLat).toFixed(2);
            $scope.formData.longitude = parseFloat(googservice.newLong).toFixed(2);
        });
    });

    $scope.refreshLoc = function(){
        geolocation.getLocation().then(function(data){
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            $scope.formData.longitude = parseFloat(coords.long).toFixed(5);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(5);
            googservice.refresh(coords.lat, coords.long);
        });
    };

    $scope.createEntry = function() {

        var entryData = {
            username: $scope.formData.username,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            pokemon: $scope.formData.pokemon
        };

        $http.post('/entry', entryData)
            .success(function (data) {

                $scope.formData.username = "";
                $scope.formData.pokemon = "";

                googservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});

