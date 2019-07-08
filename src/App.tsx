import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";
import Home from './Home';
import "./App.css";
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

interface State {
  user: User | null;
  width: number | null;
  height: number | null;
}

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged (
      async (user) => {
        this.setState({ user: user });
        if (user) {
          const refUser = db.collection("users").doc(user.uid);
          const newValue: NewValue = { lastAccessed: firebase.firestore.FieldValue.serverTimestamp() };
          const doc = (await refUser.get()).data();
          if (!doc || !doc.name) {
            newValue.name = user.displayName;
          }
          await refUser.set(newValue, { merge: true });
        }
      }
    );
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  unregisterAuthObserver() {};

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Route exact path="/" render={() => <Home user={this.state.user} />} />
          <Route exact path="/login" render={() => <Login user={this.state.user} />} />
          <Route exact path="/about" render={() => <About user={this.state.user} />} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
