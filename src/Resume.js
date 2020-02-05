import React from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Repos from "./Repos.js";

export default function Resume({
  user,
  modalVisible,
  repos,
  languages,
  closeModal,
  openRepo
}) {
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
                      <Text style={styles.nameText}>{user.name}</Text>
                    ) : (
                      <Text style={styles.noNameText}>
                        This user has no name ¯\_(ツ)_/¯
                      </Text>
                    )}
                    <View style={styles.separator} />
                    {user.blog !== "" && (
                      <View style={styles.flexContainer}>
                        <Text>{user.blog}</Text>
                        <MaterialCommunityIcons
                          style={styles.icon}
                          name="web"
                          size={20}
                          color="#ff80b0"
                        />
                      </View>
                    )}

                    {user.location !== null && (
                      <View style={styles.flexContainer}>
                        <Text>Based in {user.location}</Text>
                        <Entypo
                          style={styles.icon}
                          name="location"
                          size={20}
                          color="#ff80b0"
                        />
                      </View>
                    )}

                    {user.hireable && (
                      <View style={styles.flexContainer}>
                        <Text>Available for hire</Text>
                        <AntDesign
                          style={styles.icon}
                          name="check"
                          size={20}
                          color="#ff80b0"
                        />
                      </View>
                    )}
                    <View style={styles.languages}>
                      {languages && languages.length > 0 && (
                        <View style={styles.flexContainer}>
                          <Text>Languages</Text>
                          <Entypo
                            style={styles.icon}
                            name="keyboard"
                            size={20}
                            color="#ff80b0"
                          />
                        </View>
                      )}
                      <View>
                        {languages &&
                          languages.map(data => {
                            return (
                              <Text style={styles.language}>
                                {" "}
                                - {data[0]} : {(data[1] * 100).toFixed(2)}%
                              </Text>
                            );
                          })}
                      </View>
                    </View>
                  </View>
                )}
                <Text style={styles.subtitle}>Popular repositories</Text>
                <Repos repos={repos} openRepo={openRepo} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  },
  nameText: {
    fontSize: 25,
    color: "#35495e",
    fontWeight: "bold"
  },
  noNameText: {
    fontSize: 15,
    marginBottom: 15
  },
  text: {
    marginBottom: 10
  },
  languages: {
    marginBottom: 15
  },
  language: { marginBottom: 6 },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  icon: {
    marginLeft: 7
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#35495e",
    marginTop: 15
  }
});
