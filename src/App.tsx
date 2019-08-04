import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";
import Home from './Home';
import * as firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { User, firestore } from "firebase";
import Login from "./Login";
import About from "./About";

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();
const db = firebase.firestore();

interface NewValue {
  lastAccessed: firestore.FieldValue;
  name?: string | null;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(()=>{
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      async (user) => {
        setUser(user);
        if (user) {
          const refUser = db.collection("users").doc(user.uid);
          const newValue: NewValue = { lastAccessed:firebase.firestore.FieldValue.serverTimestamp() };
          const doc = (await refUser.get()).data();
          if (!doc || !doc.name) {
            newValue.name = user.displayName;
          }
          await refUser.set(newValue, { merge: true });
        }
      }
    );
    return unregisterAuthObserver;
  }, []);
    
  const params = { user, db };
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Route exact path="/" render={(props) => <Home {...props} {...params} />} />
        <Route exact path="/about" render={(props) => <About {...props} {...params} />} />
        <Route exact path="/login" render={(props) => <Login {...props} {...params} />} />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
