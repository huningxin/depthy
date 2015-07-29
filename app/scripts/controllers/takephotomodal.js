'use strict';

angular.module('depthyApp')
.controller('TakePhotoModalCtrl', function ($scope, $modalInstance, ga, depthy, $timeout, StateModal) {

  $scope.hasEPAPI = (typeof realsense != 'undefined') && (typeof realsense.EnhancedPhotography != 'undefined');
  $scope.pause = false;

  var getting_image = false;
  var width = 640, height = 480;
  var preview_canvas, preview_context, preview_data;
  var ep;
  var takenPhoto;

  // wait for dom
  $timeout(function() {
    console.log('runtime has EP API: ' + $scope.hasEPAPI);
    if ($scope.hasEPAPI) {
      preview_canvas = document.getElementById('preview');
      preview_context = preview_canvas.getContext('2d');
      preview_data = preview_context.createImageData(width, height);
      ep = realsense.EnhancedPhotography;
      ep.startPreview({colorWidth:640, colorHeight:480, colorFramerate: 30.0,
                       depthWidth:320, depthHeight:240, depthFramerate: 30.0
      }).then(function(e) { console.log(e); },
                             function(e) { console.log(e); });
      ep.onpreview = function(e) {
        if (getting_image)
          return;
        if ($scope.pause)
          return;
        getting_image = true;
        ep.getPreviewImage().then(
            function(image) {
              preview_data.data.set(image.data);
              preview_context.putImageData(preview_data, 0, 0);
              getting_image = false;
            }, function() {});
      };
    }
  }, depthy.modalWait);

  $scope.buttonClicked = function() {
    function takePhoto() {
      if ($scope.hasEPAPI) {
        $scope.pause = true;
        ep.takeSnapShot().then(
          function(photo) {
            takenPhoto = photo;
            takenPhoto.getColorImage().then(
                function(image) {
                  preview_data.data.set(image.data);
                  preview_context.putImageData(image_data, 0, 0);
                },
                function(e) { statusElement.innerHTML += e; });},
          function(e) { statusElement.innerHTML += e; });
      }
    }

    function resumePreview() {
      if ($scope.hasEPAPI) {
        $scope.pause = false;
      }
    }

    if (!$scope.pause) {
      takePhoto();
    } else {
      resumePreview();
    }
  };

  $scope.stopPreview = function() {
    if ($scope.hasEPAPI) {
      var ep = realsense.EnhancedPhotography;
      ep.stopPreview().then(function(e) { console.log(e); },
                            function(e) { console.log(e); });
    }
  };

  $scope.done = function() {
    depthy.loadDepthPhoto(takenPhoto);
    console.log('done');
  }

});
