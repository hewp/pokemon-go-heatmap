angular.module('googservice', [])
    .factory('googservice', function($rootScope, $http){

        var googleMapService = {};
        googleMapService.newLat  = 0;
        googleMapService.newLong = 0;

        var locations = [];

        var lastMarker;
        var currentSelectedMarker;

        var selectedLat = 37.774;
        var selectedLong = -122.406;


        googleMapService.refresh = function(latitude, longitude, filteredResults){

            locations = [];

            if (filteredResults){

                locations = convertToMapCoords(filteredResults);
                initialize(latitude, longitude, true);
            }

            else {

                $http.get('/entry').success(function(response){

                    locations = convertToMapCoords(response);

                    initialize(latitude, longitude, false);
                }).error(function(err){ console.log( err )});
            }
        };

        var convertToMapCoords = function(response){

            var locations = [];

            for(var i= 0; i < response.length; i++) {
                var entry = response[i];

                var  contentString = '<p><b>Username</b>: ' + entry.username +
                                     '<br><b>Pokemon</b>: ' + entry.pokemon +'</p>';

                locations.push(new Location(
                    new google.maps.LatLng(entry.location[1], entry.location[0]),
                    new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    entry.username,
                    entry.pokemon
                ))
            }

            return locations;
        };


        var Location = function(latlng, infoWindow, username, pokemon){
            this.latlng = latlng;
            this.infoWindow = infoWindow;
            this.username = username;
            this.pokemon = pokemon;
        };


        var initialize = function(latitude, longitude, filter) {

            var myLatLng = {lat: selectedLat, lng: selectedLong};
            var heatmap;
            var pointArray = [];

            if (!map){

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: myLatLng,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
                });


            }
             heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray,
                map: map
            });

            icon = "http://www.pokestadium.com/sprites/xy/pikachu-f-5.gif"

            locations.forEach(function(loc){
                pointArray.push(new google.maps.LatLng(loc.latlng));
                var marker = new google.maps.Marker({
                   position: loc.latlng,
                   map: map,
                   icon: icon
               });

                google.maps.event.addListener(marker, 'click', function(e){

                    currentSelectedMarker = loc;
                    currentSelectedMarker.infoWindow.open(map, marker);
                });
            });

            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: myLatLng,
                optimized: false,
                animation: google.maps.Animation.DROP,
                map: map,
                icon: icon,
                draggable: true
            });
            lastMarker = marker;


            marker.addListener('drag', function(e){
                googleMapService.newLat = marker.getPosition().lat();
                googleMapService.newLong = marker.getPosition().lng();
                $rootScope.$broadcast("dragged");
            });
        };

        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
    });
