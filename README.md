# Full Stack Real-Time Chat Website

In this project, I will make a Full-stack real-time chat app using React JS and Firebase. 

You can create an account and chat with your friends in this chat app. In the chat, you can also send the images.

I will create the authentication using Firebase and store the chat images in Firebase storage. I will store the chat messages on the Firestore Database, which sends the chat messages in real time. 


## Demo

By clicking this link you can see the demonstration of the full stack real-time chat website.

Link 👇
https://drive.google.com/file/d/1DaTTg_E8wPOxg03M1VPbIDha54J_ih75/view?usp=sharing


## Installation

#### Clone the repository and install the project dependencies using npm
```bash
  git clone https://github.com/MrTharinduDasantha/Full-Stack-Real-Time-Chat-App.git
  cd Full-Stack-Real-Time-Chat-App
  npm install
```
#### Firebase Configuration
Before running the app, you need to set up Firebase with your own configuration details:
- In your Firebase console, create a new project.
- Go to Project Settings and locate the Firebase configuration details. 
- Go to the firebase.js file in the config folder in the src folder.
- By clicking this link you can see the demonstration of the full stack real-time chat website.
- Go to the firebase.js file in the config folder in the src folder. 
- Go to the section given in the code below.
```bash
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Enter your api key here",
  authDomain: "Enter your auth domain here",
  projectId: "Enter your project id here",
  storageBucket: "Enter your storage bucket here",
  messagingSenderId: "Enter your messaging sender id here",
  appId: "Enter your app id here"
}
```
- Replace the placeholders in firebaseConfig in the project with your actual Firebase details.
- Save the changes.
#### Run the Project
After setting up Firebase, you can start the development server.
```bash
npm run dev
```


## Screenshots

![image alt](https://github.com/MrTharinduDasantha/Full-Stack-Real-Time-Chat-App/blob/dfb60fd417d424326a8e23f22569556cc62b551c/Img%20-%201.png)
![image alt](https://github.com/MrTharinduDasantha/Full-Stack-Real-Time-Chat-App/blob/dfb60fd417d424326a8e23f22569556cc62b551c/Img%20-%202.png)
![image alt](https://github.com/MrTharinduDasantha/Full-Stack-Real-Time-Chat-App/blob/dfb60fd417d424326a8e23f22569556cc62b551c/Img%20-%203.png)
![image alt](https://github.com/MrTharinduDasantha/Full-Stack-Real-Time-Chat-App/blob/dfb60fd417d424326a8e23f22569556cc62b551c/Img%20-%204.png)

<h3 align="center"> Don't forget to leave a star ⭐️ </h3>
