## Purpose

This is a start-up kit for a Firebase web project, which uses React.js, Material-UI and TypeScript.   
You only need **15 minutes** to start up!

After finishing an instruction below, you'll see an app which has:
- Header and Drawer with page navigations
- Routing function by react-router-dom
- Logging in function by Firebase
    - When a user signs up, their data will be stored on Cloud Firestore
- Settings ready to deploy to Firebase Hosting

## Screen Shots

### Routing
![smartphone_routing](https://raw.github.com/wiki/BumpeiShimada/firebase-startup-kit-typescript/images/smartphone_routing.gif)

### Sign Up
![smartphone_signup](https://raw.github.com/wiki/BumpeiShimada/firebase-startup-kit-typescript/images/smartphone_signup.gif)

### Desktop ver.
![desktop](https://raw.github.com/wiki/BumpeiShimada/firebase-startup-kit-typescript/images/desktop.gif)

## Instruction

1. Git clone this repository
2. Run "npm install firebase-tools -g" to install firebase tools. 
3. Run "yarn install" once to get necessary node modules.
4. Open the firebase console (from https://firebase.google.com) and add a project
5. From the dashboard of this project, add an app and choose "web" (</>).
6. From the setting of this app, choose "Config" (in Firebase SDK snippet)
7. Copy the config file, and paste into src/firebaseConfig.ts file.  
8. Replace the word "skelton-us" in .firebaserc file with your Firebase project name.
9. Open the firebase console, and create a Cloud Firestore (make it "secure" for now). 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `firebase deploy`

Deploys the app to the Firebase cloud. You need to run "yarn build" before the deployment.

## Acknowledgment

This is the TypeScript version of [firebase-startup-kit](https://github.com/snakajima/firebase-startup-kit).  
Thank you very much [@snakajima](https://github.com/snakajima)!