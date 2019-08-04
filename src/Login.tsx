import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Redirect } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { User } from "firebase";
import Header from "./Header";

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (result: any) => {
      const { additionalUserInfo, credential } = result;
      if (additionalUserInfo && credential
        && credential.providerId === firebase.auth.TwitterAuthProvider.PROVIDER_ID) {
        console.log("Twitter user name=", additionalUserInfo.username);
      }
      return false;
    }
  }
};

function Login(props: { user: User | null }) {
  const { user } = props;
  if (!user) {
    return (
      <>
        <Header user={user} />
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </>
    );
  }

  return <Redirect to={"/"} />
};

export default Login;