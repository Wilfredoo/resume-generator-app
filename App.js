import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";

class App extends Component {
  state = {
    user: null,
    text: {}
  };

  getUser = value => {
    fetch(`http://api.github.com/users/${value}`)
      .then(response => response.json())
      .then(data =>
        this.setState({ user: data }, () => {
          console.log(this.state.user);
        })
      );
  };

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
        {this.state.user && this.state.user !== null ? (
          <View>
            <Text>{this.state.user.name}</Text>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: this.state.user.avatar_url
              }}
            />
          </View>
        ) : (
          <Text>No results</Text>
        )}
        {/* <Text>aaa</Text> */}
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
