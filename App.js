import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

class App extends Component {
  state = {
    user: {},
    text: {}
  };

  getUser = value => {
    // console.log("button clicked", value);
    fetch(`http://api.github.com/users/${value}`)
      .then(response => response.json())
      .then(data => console.log(data.name));
  };

  // getUser = () => {
  //   const name = this.ref.name.value;
  //   console.log(name);
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text>App</Text>
        <TextInput
          onChangeText={value => this.getUser(value)}
          placeholder="Enter a username"
          style={{
            height: 40,
            width: 200,
            borderColor: "gray",
            borderWidth: 1
          }}
        />
        {/* <Button onPress={() => this.getUser} title="See user" /> */}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
