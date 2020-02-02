import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

function Repos(props) {
  function render() {
    const { repos } = props;
    return (
      <View>
        <View style={styles.separator} />
        <View style={{ marginBottom: 20, paddingBottom: 70 }}>
          {repos &&
            repos.slice(0, 5).map(data => {
              return (
                <View style={{ marginBottom: 10, paddingBottom: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "#ff80b0" }}>
                      {data[0]}
                    </Text>
                    <Text style={{ fontSize: 15 }}>
                      {moment(data[2]).format("YYYY")}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 15 }}>{data[1]}</Text>
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
  repos: {
    // paddingBottom: 50
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15
  }
});
