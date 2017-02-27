angular.module("app.services", [])
  .service("WeatherService", function ($http,Settings) {
    this.getForecast = function (long, lat) {

      var getForeCastRequrstObj = {
        action: "getForecast",
        data: {
            lat: lat,
            long:long,
            units: Settings.units
        }
      };

      return $http({
          method: 'POST',
          url: 'js/server.php',
          data: getForeCastRequrstObj,
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
        .then(function successCallback(response) {
            return response;

        }, function errorCallback(response) {
          console.log(response);
        });
    }
  })
    .factory("Settings", function () {
        var Settings = {
            units: 'si'
        };
        return Settings;
    })
    .factory("Location", function () {
        var Location = {
            lat:0,
            long:0
        };
        return Location;
    });
