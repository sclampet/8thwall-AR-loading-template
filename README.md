# Template For Web AR projects - 8thWall, AFRAME, Three.js

# Overview

The following is a starting off point for getting started in Web AR. This does not include any code that deals with the actual 3D scene. This is just for the initial loading process which includes the following...

* Detecting if the user is not on a supported device or browser, and providing helpful information for how to view the XR experience.

* Displaying a loading overlay and camera permissions prompt while the scene and libraries are loading, and while the camera is starting up.

* Hiding the scene and showing an error image when an error occurs at runtime.

* Displaying an overlay graphic when the user turns device to enter Landscape mode.

# Graphics Info

This project does not include graphics. However, you can add your own and name rename them to the following...

* [AlmostThere] - To be displayed when the user isn't in viewing the app in a web browser.

* [CamerPrompt] - Displayed when camera permissions are being asked.

* [CancelCamera] -Displayed when the user selects 'Cancel' from the camera permissions prompt.

* [DesktopScreenBackground] - Displayed when the user opens the app from a Desktop device. This usually displays a QR code that they can scan with their mobile device.

* [Landscape] - Displayed when the user tries to view the app in landscape mode. Should only be used if other elements in your app aren't responsively designed.

* [Error] - Displayed when an error occurs upon loading, asking for camera permissions, etc...

* [LoadingScreen] - Displayed while loading your 3D scene.
