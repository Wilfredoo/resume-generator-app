import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class App extends Component {
  state = {
    user: "",
    text: {}
  };

  getRepos = () => {
    console.log(this.state.user, "user");
    fetch(`http://api.github.com/users/${this.state.user.login}/repos`)
      .then(response => response.json())
      .then(data =>
        this.setState({ user: data }, () => {
          console.log(this.state.user);
        })
      );
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
    const { user, text } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
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
            {user && user !== null ? (
              <View>
                <Text>{user.name}</Text>
                <Text>{user.bio}</Text>
                <Text>{user.location}</Text>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{
                    uri: user.avatar_url
                  }}
                />
                <Text>Numbers of repos: {user.public_repos}</Text>
                <Button
                  onPress={() => this.getRepos()}
                  title="See Repos Info"
                />
              </View>
            ) : (
              <Text>No results</Text>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
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
