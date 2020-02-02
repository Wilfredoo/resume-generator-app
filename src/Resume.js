import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Repos from "./Repos.js";

function Resume(props) {
  function render() {
    const { user, modalVisible, repos, languages, closeModal } = props;
    return (
      <View style={styles.container}>
        <Modal visible={modalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalFlex}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    closeModal();
                  }}
                >
                  <AntDesign
                    style={styles.back}
                    name="leftcircle"
                    size={50}
                    color="#12cad6"
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View>
                  {user && (
                    <View>
                      {user.name ? (
                        <Text
                          style={{
                            fontSize: 25,
                            color: "#35495e",
                            fontWeight: "bold"
                          }}
                        >
                          {user.name}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            marginBottom: 15
                          }}
                        >
                          This user has no name ¯\_(ツ)_/¯
                        </Text>
                      )}
                      <View style={styles.separator} />
                      {user.blog !== "" && (
                        <Text
                          style={{
                            marginBottom: 10
                          }}
                        >
                          {user.blog}
                        </Text>
                      )}
                      {user.location !== null && (
                        <Text
                          style={{
                            marginBottom: 10
                          }}
                        >
                          Based in {user.location}
                        </Text>
                      )}
                      <View
                        style={{
                          marginBottom: 15
                        }}
                      >
                        <Text>Languages</Text>
                        <View>
                          {languages &&
                            languages.map(data => {
                              return (
                                <Text>
                                  {" "}
                                  - {data[0]} : {(data[1] * 100).toFixed(2)}%
                                </Text>
                              );
                            })}
                        </View>
                      </View>

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
                      fontWeight: "bold",
                      color: "#35495e",
                      marginTop: 15
                    }}
                  >
                    Popular repositories
                  </Text>
                  <Repos repos={repos} />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  return render();
}
export default Resume;

const styles = StyleSheet.create({
  modal: {
    padding: 25,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  back: {
    marginBottom: 20
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15
  }
});
