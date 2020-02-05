import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import Resume from "./Resume.js";
import calculateLanguagePercents from "./utils/languagePercent.js";
import { Linking } from "expo";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
    }}
  >
    {children}
  </TouchableWithoutFeedback>
);

class Main extends Component {
  state = {
    text: {},
    modalVisible: false
  };

  getUsername = value => {
    this.setState({ username: value }, () => {});
  };

  searchUser = async () => {
    await fetch(`http://api.github.com/users/${this.state.username}`)
      .then(response => response.json())
      .then(data => this.setState({ user: data }, () => {}));
  };

  async getRepos() {
    let allRepos = [];
    let languages = [];
    let languagesPercents = [];

    await fetch(
      `http://api.github.com/users/${this.state.user.login}/repos?sort=stars`
    )
      .then(response => response.json())
      .then(data =>
        data.forEach(data => {
          let oneRepo = [];
          languages.push(data.language);
          languagesPercents.push(data.language);
          oneRepo.push(
            data.name,
            data.description,
            data.created_at,
            data.html_url
          );
          allRepos.push(oneRepo);
        })
      );

    let uniqueLanguages = [...new Set(languages)];

    const result = calculateLanguagePercents(languages, uniqueLanguages);

    this.setState(
      { repos: allRepos, modalVisible: true, languages: result },
      () => {}
    );
  }

  async generateResume() {
    await this.searchUser();
    if (this.state.user && this.state.user.message === "Not Found") {
      return;
    }
    this.getRepos();
  }

  closeModal = () => {
    this.setState({ modalVisible: false }, () => {});
  };

  openRepo = url => {
    return Linking.openURL(url);
  };

  render() {
    const { user, modalVisible, repos, languages } = this.state;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={styles.title}>GitHub Resume Generator</Text>

          <Text style={styles.text}>Just search for a Github user</Text>
          <TextInput
            onChangeText={value => this.getUsername(value)}
            placeholder="Enter a username"
            style={styles.input}
          />
          {user && user.message === "Not Found" && (
            <Text style={styles.text}>
              No results for that username ¯\_(ツ)_/¯
            </Text>
          )}
          <Button
            disabled={!this.state.username}
            color="#0f4c75"
            title="Generate Resume"
            onPress={() => this.generateResume()}
          ></Button>

          <Resume
            modalVisible={modalVisible}
            user={user}
            repos={repos}
            closeModal={this.closeModal}
            languages={languages}
            openRepo={this.openRepo}
          />
          {!user && !repos && modalVisible && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </DismissKeyboard>
    );
  }
}
export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
    maxWidth: 260
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    marginBottom: 35,
    marginTop: 15
  },
  textName: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 10
  },
  bio: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 10,
    maxWidth: 250,
    fontStyle: "italic"
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});
