// Basic example of controlling the loading screen
AFRAME.registerComponent('loading-screen', {
  init: function () {
    const scene = this.el.sceneEl
    document.fullscreenEnabled = true;
    const reasons = XR.XrDevice.incompatibleReasonsDetails;
    const device = XR.XrDevice.deviceEstimate();
    const loadingImg = document.getElementById(`loadingImg`);

    if (!XR.XrDevice.isDeviceBrowserCompatible()) {
      if (device.os != "iOS" && device.os != "Android") {
        console.log('unsupported OS')
        loadingImg.src = "AuxGraphics/DesktopScreenBackground2.jpg";
        desktopImgForeground.style.visibility = 'visible';
      } else if (XR.XrDevice.IncompatibilityReasons.UNSUPPORTED_BROWSER) {
        console.log('unsupported BROWSER');
        loadingImg.src = "AuxGraphics/AlmostThere.jpg";
      } else {
        console.log('default')
        loadingImg.src = "AuxGraphics/Error.jpg";
      }
    }

    //Detects when the device orientation has changed
    XR.addCameraPipelineModule({
      name: 'screenorientation',
      onDeviceOrientationChange: ({ GLctx, videoWidth, videoHeight, orientation }) => {
        console.log(orientation)
        if (orientation != 0) {
          // loadingScreen.style.backgroundImage = "url('AuxGraphics/Landscape.jpg')";
          loadingImg.src = "AuxGraphics/Landscape.jpg";
          loadingScreen.style.display = 'block';
        } else if (orientation == 0 && loadingScreen.style.display != 'none' && cameraStatus != 'hasStream') {
          loadingImg.src = "AuxGraphics/CameraPrompt.jpg";
        } else if (orientation == 0) {
          console.log('orientation: ', orientation);
          loadingScreen.style.display = 'none';
        }
      },
    })

    //Triggers when the scene has loaded after the user allow camera permissions
    scene.addEventListener('realityready', () => {
      console.log('reality ready');
    });

    //Triggers when there is an error upon loading the scene
    scene.addEventListener('realityerror', (event) => {
      console.log(device.os)
    });

    //Triggers with the status of whether the user has accepted or denied camera permissions
    scene.addEventListener('camerastatuschange', event => {
      if (event.detail.status == 'hasStream') {
        loadingImg.src = "AuxGraphics/LoadingScreen.jpg"
        cameraStatus = event.detail.status;
      };
      if (event.detail.status == 'failed') {
        loadingImg.src = "AuxGraphics/CancelCamera.jpg";
      };
    });
  };
});

//Triggered when camera permissions prompt is prompting
AFRAME.registerComponent('req-camera-permissions', {
  init: function () {
    const scene = this.el.sceneEl
    console.log('requesting camera permissions init()');
    XR.addCameraPipelineModule({
      name: 'camerastartupmodule',
      onCameraStatusChange: ({ status }) => {
        console.log(status)
        if (status == 'requesting' && XR.XrDevice.deviceEstimate().os != 'Android') {
          loadingImg.src = "AuxGraphics/CameraPrompt.jpg";
        }
      },
    });
    if (window.orientation != 0) {
      loadingImg.src = "AuxGraphics/Landscape.jpg";
      loadingImg.style.width = '100%';
      loadingImg.style.height = 'auto';
      console.log(window.orientation)
    } else {
      loadingImg.src = "AuxGraphics/LoadingScreen.jpg";
      scene.setAttribute('xrweb', '');

    }
  }
});