
var mapApp = angular.module("mapApp",[]);
mapApp.controller("myController",function($scope,$http) {




  $scope.markers = [];

		$scope.map = new google.maps.Map(document.getElementById("map"), {
			zoom: 4,
			center: new google.maps.LatLng(40.0000, -98.0000)
		});


      var infowindow = new google.maps.InfoWindow;        	

 

      //  All of these are ways create new variables & scope variables that are functions
      // var createMarker = function(city){}
      // var createMarker = (city)=> {}
      // $scope.createMarker = function(city){}
      // $scope.methodCall = (city)=> {}

      function createMarker (city){
        	var latLon = city.latLon.split(",");
        	var lat = Number(latLon[0]);
        	var long = Number(latLon[1]);
        

          var marker = new google.maps.Marker({
            position: {lat: lat, lng: long},
            map: $scope.map,
            title: city.city
          });

          // Add weather info

            var apiKey = '&appid=d450908ff6741f873ecc6fdd489f1969';
         
            var currTemp;
            var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' +city.city+'&units=imperial'+apiKey;  

              $http.get(weatherURL).success(function(weatherData){

                  currTemp = weatherData.main.temp;
                  console.log(currTemp);




              


          /////////////////////////////////////////////



          var contentString = '<div id="content">'+ '<h1>' + city.city + '</h1>' +
          '<div id="siteNotice">'+
          '<div id="pop">' + 'Total Population: ' + city.yearEstimate + '</div>' +
          '<div id="census">' + '2010 Census: ' + city.lastCensus + '</div>' +
          '<div id="change">' + 'Population Change: ' + city.change + '</div>' +
          '<div id="density">' + 'Population density: ' + city.lastPopDensity + '</div>' +
          '<div id="state">' + 'State: ' + city.state + '</div>' +
          '<div id="land">' + 'Land Area: ' +city.landArea + '</div>' +
          '<div id="directions"><button onclick="initMap(\''+ city.city +'\');" class="directions">Get Directions' +
          '</button></div>' +
          '<div id="weather">' +currTemp +'</div>' + 
          '</div>'+
          '</div>';

          infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          // marker.content = "Content";
          marker.addListener('click', function() {

            $scope.map = new google.maps.Map(document.getElementById("map"), {
              zoom: 8,
              center: new google.maps.LatLng(lat, long)
            });


            infowindow.setContent(contentString);
            infowindow.open($scope.map, marker);
          });
          $scope.markers.push(marker);

        });


      }

      $scope.cityClick = function(i) {

        google.maps.event.trigger($scope.markers[i],'click');
      
      }


    $scope.cities = cities;
		for(i=0;i<cities.length;i++){
			createMarker(cities[i]);

		}

// var origin = "city";
// var desitination = "Atlanta";
// var cityURL = "https://maps.googleapis.com/maps/api/directions/json?origin=Knoxville" + "&destination=Atlanta&key=AIzaSyCa4bcc6OqketdaLk6Dsxb6ynqfHrHlzLg";

    
//     $.getJSON(cityURL, function(directionsData){
//         console.log(directionsData);
//       });
  
  

   initMap = function(city) {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 40, lng: -98}  // Australia.
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map,
    panel: document.getElementById('right-panel')
  });

  directionsDisplay.addListener('directions_changed', function() {
    // computeTotalDistance(directionsDisplay.getDirections());
  });

  displayRoute('Atlanta', city, directionsService,
      directionsDisplay);
}

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

// function computeTotalDistance(result) {
//   var total = 0;
//   var myroute = result.routes[0];
//   for (var i = 0; i < myroute.legs.length; i++) {
//     total += myroute.legs[i].distance.value;
//   }
//   total = total / 1000;
//   document.getElementById('total').innerHTML = total + ' km';
// }








		})




