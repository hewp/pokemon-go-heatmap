var queryCtrl = angular.module('queryCtrl', ['geolocation', 'googservice']);
queryCtrl.controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, googservice){

    $scope.formData = {};
    var queryBody = {};

    geolocation.getLocation().then(function(data){
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Set the latitude and longitude equal to the HTML5 coordinates
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    });


    $rootScope.$on("clicked", function(){

        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(googservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(googservice.clickLong).toFixed(3);
        });
    });


    $scope.queryEntries = function(){

        queryBody = {
            longitude: parseFloat($scope.formData.longitude),
            latitude: parseFloat($scope.formData.latitude),
            pokemon: $scope.formData.pokemon,
        };

        $http.post('/query', queryBody)

            .success(function(queryResults){
                googservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);
            })
            .error(function(queryResults){
                console.log('Error ' + queryResults);
            })
    };
});

