import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import Resume from "./Resume.js";
import calculateLanguagePercents from "./utils/languagePerc.js";

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
          oneRepo.push(data.name, data.description, data.created_at);
          allRepos.push(oneRepo);
        })
      );

    let uniqueLanguages = [...new Set(languages)];

    const result = calculateLanguagePercents(languages, uniqueLanguages);

    this.setState(
      { repos: allRepos, modalVisible: true, languages: result },
      () => {
        // console.log("what appears here repos", this.state.repos);
      }
    );
  }

  getUser = value => {
    fetch(`http://api.github.com/users/${value}`)
      .then(response => response.json())
      .then(data => this.setState({ user: data }, () => {}));
  };

  closeModal = () => {
    this.setState({ modalVisible: false }, () => {});
  };

  render() {
    const { user, modalVisible, repos, languages } = this.state;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
            GitHub Resume Generator
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginBottom: 20,
              maxWidth: 250
            }}
          >
            Feeling curious? Search for a Github user
          </Text>
          <TextInput
            onChangeText={value => this.getUser(value)}
            placeholder="Enter a username"
            style={{
              height: 40,
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 20
            }}
          />
          {user && user.message !== "Not Found" && (
            <View>
              {user.name ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    marginBottom: 10
                  }}
                >
                  {user.name}
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    marginBottom: 12
                  }}
                >
                  This user has no name ¯\_(ツ)_/¯
                </Text>
              )}
              {user.bio && (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    marginBottom: 10,
                    maxWidth: 250
                  }}
                >
                  {user.bio}
                </Text>
              )}
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    marginBottom: 15
                  }}
                  source={{
                    uri: user.avatar_url
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    marginBottom: 15
                  }}
                >
                  Numbers of repos: {user.public_repos}
                </Text>
                <View>
                  <Button
                    color="#0f4c75"
                    title="Generate Resume"
                    onPress={() => this.getRepos()}
                  ></Button>
                </View>
              </View>
            </View>
          )}
          {user && user.message === "Not Found" && (
            <Text style={{ textAlign: "center" }}>
              No results for that username
            </Text>
          )}
          <Resume
            modalVisible={modalVisible}
            user={user}
            repos={repos}
            closeModal={this.closeModal}
            languages={languages}
          />
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
  }
});
