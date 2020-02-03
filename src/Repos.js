import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

function Repos(props) {
  function render() {
    const { repos } = props;
    return (
      <View>
        <View style={styles.separator} />
        <View style={styles.reposContainer}>
          {repos &&
            repos.slice(0, 5).map(data => {
              return (
                <View style={styles.repo}>
                  <View style={styles.repoHeader}>
                    <Text style={styles.repoName}>{data[0]}</Text>
                    <Text style={styles.text}>
                      {moment(data[2]).format("YYYY")}
                    </Text>
                  </View>
                  <Text style={styles.text}>{data[1]}</Text>
                </View>
              );
            })}

          {repos.length === 0 && <Text>This user has no repositories</Text>}
        </View>
      </View>
    );
  }
  return render();
}
export default Repos;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15
  },
  reposContainer: { marginBottom: 20, paddingBottom: 70 },
  repo: { marginBottom: 10, paddingBottom: 15 },
  repoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  repoName: { fontSize: 15, color: "#ff80b0" },
  text: { fontSize: 15 }
});
