# Loading Screens Web AR Template - 8thWall

# Overview

The following is a starting off point for getting started in Web AR. This does not include any code that deals with the actual 3D scene. This is just for the initial loading process which includes the following...

1. Detecting if the user is not on a supported device or browser, and providing helpful information for how to view the XR experience.

2. Displaying a loading overlay and camera permissions prompt while the scene and libraries are loading, and while the camera is starting up.

3. Hiding the scene and showing an error image when an error occurs at runtime.

4. Displaying an overlay graphic when the user turns device to enter Landscape mode.

# Live Example

The following is a live application I have built for Sony that uses this code structure.

* [Spider-Man Into The Spider-Verse](https://sites.sonypictures.com/spiderverse/spiderversear/)

# Getting Started

Please follow this [Getting Started](https://github.com/8thwall/web/tree/master/gettingstarted) to get yourself up and running with 8th Wall so you can run this project. Once you're up and running see the info below regarding graphics.

# Graphics Info

This project does not include graphics. However, you can add your own and name rename them to the following...

* [AlmostThere] - To be displayed when the user isn't in viewing the app in a web browser.

* [CamerPrompt] - Displayed when camera permissions are being asked.

* [CancelCamera] -Displayed when the user selects 'Cancel' from the camera permissions prompt.

* [DesktopScreenBackground] - Displayed when the user opens the app from a Desktop device. This usually displays a QR code that they can scan with their mobile device.

* [Landscape] - Displayed when the user tries to view the app in landscape mode. Should only be used if other elements in your app aren't responsively designed.

* [Error] - Displayed when an error occurs upon loading, asking for camera permissions, etc...

* [LoadingScreen] - Displayed while loading your 3D scene.
