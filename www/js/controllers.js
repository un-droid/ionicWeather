angular.module("app.controllers", ["app.services"])
    .controller("AppCtrl", function ($scope, Settings) {

        $scope.settings = {
            units:"si"
        };

        $scope.selectUnits = function () {
            Settings.units =$scope.settings.units;
                console.log($scope.settings);
        };
    })
    .controller("WeatherCtrl", function ($scope, WeatherService, $ionicLoading, Settings, $ionicPlatform, $cordovaGeolocation,Location) {

        $ionicPlatform.ready(function () {
           if(Location.lat==0){
               var options = {
                   timeout: 1000,
                   enableHighAccuracy: false
               };

               $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                  Location.lat = position.coords.latitude;
                  Location.long = position.coords.longitude;
                   updateWeather();
               }, function (err) {
                   console.log(err);
               });
           }
        });

        function updateWeather() {
            $scope.isLoading = true;
            $ionicLoading.show({
                template: "Loading"
            });
            WeatherService.getForecast(Location.lat,Location.long).then(function (data) {
                $scope.isLoading = false;
                console.log(data.data);
                $scope.timeZone = data.data.timezone;
                $scope.current = data.data.currently;
                $scope.highTemp = data.data.daily.data[0].temperatureMax;
                $scope.lowTemp = data.data.daily.data[0].temperatureMin;
                $scope.currentTemp = $scope.current.temperature;
                $ionicLoading.hide();
                $scope.$broadcast("scroll.refreshComplete");
            });
        }

        updateWeather();

        $scope.$watch(function () {
            return Settings.units
        }, function (newVal, oldVal) {
            console.log(oldVal);
            if (newVal !== oldVal) {
                updateWeather();
            }
        });

        $scope.refreshWeather = function () {
            updateWeather();

        }

    });