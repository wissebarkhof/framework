angular.module('frameworkAdmin', [])

.controller('eventController', function($scope, $http) {

    $scope.newEvent = {};
    $scope.events = {};

    // Get all events
    $http.get('/api/v1/event')
        .success((data) => {
            $scope.events = data;
            console.log('Events: ', data);
        })
        .error((err) => {
            console.log(err);
        });

    // Create a new event
    $scope.createEvent = () => {
        $http.post('/api/v1/event', $scope.newEvent)
            .success((data) => {
                $scope.newEvent = {};
                $scope.events = data;
                console.log(data);
            })
            .error((error) => {
                console.log(error);
            });
    };

    // Delete an event
    $scope.deleteEvent = (eventId) => {
        $http.delete('/api/v1/event/' + eventId)
            .success((data) => {
                $scope.events = data;
                console.log(data);
            })
            .error((error) => {
                console.log(error);
            });
    };


});