var app = angular.module('pokemonApp', ['entryCtrl', 'queryCtrl', 'geolocation', 'googservice', 'ngRoute'])

    .config(function($routeProvider){
        $routeProvider.when('/entry', {
            controller: 'entryCtrl',
            templateUrl: 'partials/addEntryTemp.html',

        }).when('/visualize', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryTemp.html',

        }).otherwise({redirectTo:'/entry'})
    });
