import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Dimensions,
  Image,
  SafeAreaView
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

class App extends Component {
  state = {
    text: {},
    modalVisible: false
  };

  async getRepos() {
    console.log("get those repos");
    let allRepos = [];
    await fetch(`http://api.github.com/users/${this.state.user.login}/repos`)
      .then(response => response.json())
      .then(data =>
        data.forEach(thing => {
          // console.log("names", thing.name, thing.language, thing.created_at);
          let oneRepo = [];
          oneRepo.push(
            thing.name,
            thing.description,
            thing.language,
            thing.created_at
          );
          allRepos.push(oneRepo);
        })
      );
    this.setState({ repos: allRepos, modalVisible: true }, () => {
      console.warn("state with repos", this.state.repos);
    });
  }

  // async getLanguages() {
  //   await fetch(`http://api.github.com/users/${this.state.user.login}/Colibri`)
  //     .then(response => response.json())
  //     .then(data =>
  //       console.log("languages", data)
  //     );
  // }

  getUser = value => {
    fetch(`http://api.github.com/users/${value}`)
      .then(response => response.json())
      .then(data =>
        this.setState({ user: data }, () => {
          // console.warn(this.state.user);
        })
      );
  };

  render() {
    const { user, text } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
            GitHub Resume Generator
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
              marginBottom: 10
            }}
          />

          {user && user.message !== "Not Found" && (
            <View>
              <Text
                style={{ textAlign: "center", fontSize: 15, marginBottom: 10 }}
              >
                {user.name}
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 12, marginBottom: 10 }}
              >
                {user.bio}
              </Text>

              <Image
                style={{ width: 150, height: 150, marginBottom: 10 }}
                source={{
                  uri: user.avatar_url
                }}
              />
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    marginBottom: 10
                  }}
                >
                  Numbers of repos: {user.public_repos}
                </Text>
                <Button
                  onPress={() => this.getRepos()}
                  title="More about this user"
                />
              </View>
            </View>
          )}

          {user && user.message === "Not Found" && (
            <Text style={{ textAlign: "center" }}>
              No results for that username
            </Text>
          )}
        </View>
        <Modal visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalFlex}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: false }, () => {});
                  }}
                >
                  <AntDesign
                    style={styles.back}
                    name="leftcircle"
                    size={50}
                    color="#fa163f"
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View>
                  {user && (
                    <View>
                      <Text
                        style={{
                          fontSize: 25,
                          fontStyle: "bold",
                          marginBottom: 15
                        }}
                      >
                        {user.name}
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10
                        }}
                      >
                        {user.blog}
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10
                        }}
                      >
                        Based in {user.location}
                      </Text>

                      {user.hireable && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 15
                          }}
                        >
                          <Text style={{}}>Available for hire</Text>
                          <AntDesign
                            style={{ marginLeft: 5 }}
                            name="check"
                            size={20}
                            color="green"
                          />
                        </View>
                      )}
                    </View>
                  )}
                  <Text
                    style={{
                      fontSize: 20,
                      fontStyle: "bold",
                      marginBottom: 15
                    }}
                  >
                    Repositories
                  </Text>
                  {this.state.repos &&
                    this.state.repos.slice(0, 5).map(data => {
                      return (
                        <View style={{ marginBottom: 10, paddingBottom: 20 }}>
                          <Text style={{ fontSize: 15, color: "#fa163f" }}>
                            {data[0]}
                          </Text>
                          <Text style={{ fontSize: 15 }}>{data[1]}</Text>
                          <Text>{data[2]}</Text>
                          <Text>{data[3]}</Text>
                        </View>
                      );
                    })}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  modal: {
    padding: 20,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modalFlex: {
    // flexDirection: "row",
    // alignItems: "center"
  },
  back: {
    marginBottom: 20
  }
});
