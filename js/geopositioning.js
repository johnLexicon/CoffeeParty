
function createDrivingDirectionMap() {
    var mapDiv = document.getElementById('map')
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 5000
        });
    }
    else{
        mapDiv.innerHTML = "No support for geolocation, we can't find you";
    }
}

function showMap(latitude, longitude){
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var route = {
        origin: new google.maps.LatLng(latitude, longitude),
        destination: "Sankt Eriksgatan 22, Stockholm", //Sankt Eriksgatan 22, 112 39 Stockholm
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(50.8504500, 4.3487800),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    /** Rendering the map  **/
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, mapOptions);
    directionsRenderer.setMap(map);
    directionsService.route(route, function(result, status){
        if(status === google.maps.DirectionsStatus.OK){
            directionsRenderer.setDirections(result);
        }
    });
}

function onSuccess(position){
    showMap(position.coords.latitude, position.coords.longitude);
}

function onError(error){
    var mapDiv = document.getElementById('map');
    switch(error.code){
        case error.PERMISSION_DENIED:
            mapDiv.innerHTML = "User denied the request for GeoLocation";
            break;
        case error.POSITION_UNAVAILABLE:
            mapDiv.innerHTML = "Location information is unavailable";
            break;
        case error.TIMEOUT:
            mapDiv.innerHTML = "The request to get user location timed out";
            break;
        case error.UNKNOWN_ERROR:
            mapDiv.innerHTML = "An unknown error occurred";
            break;
    }
}

