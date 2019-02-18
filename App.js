import React from "react";
import * as firebase from "firebase";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "./components/input";
import { Button } from "./components/Button";

export default class App extends React.Component {
  state = {
    email: "",
    password: ""
  };

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDTwnYvoGCJCQdAr2IxTueg8stqnAJBIwo",
      authDomain: "fir-auth-16628.firebaseapp.com",
      databaseURL: "https://fir-auth-16628.firebaseio.com",
      projectId: "fir-auth-16628",
      storageBucket: "fir-auth-16628.appspot.com"
    };

    firebase.initializeApp(firebaseConfig);
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err.toString());
    }
  };

  LogInUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
        });
    } catch (err) {
      console.log(err.toString());
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Enter your email..."
          label="Email Address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder="Enter your password..."
          label="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          onPress={() => this.LogInUser(this.state.email, this.state.password)}
        >
          Log In
        </Button>
        <Button
          onPress={() => this.signUpUser(this.state.email, this.state.password)}
        >
          Sign Up
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});
