import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";

export default function Home() {
  const [i, setI] = useState(true);
  const Orders = [
    {
      OderID: "134",
      status: "0",
      UserID: "645893",
      Date: "2021-10-10",
      Time: "12:30:00",
    },
    {
      OderID: "12234",
      status: "1",
      UserID: "645893",
      Date: "2021-10-10",
      Time: "12:30:00",
    },
    {
      OderID: "134",
      status: "0",
      UserID: "645893",
      Date: "2021-10-10",
      Time: "12:30:00",
    },
    {
      OderID: "12234",
      status: "1",
      UserID: "645893",
      Date: "2021-10-10",
      Time: "12:30:00",
    },
  ];

  const name = "username";

  const renderItem = ({ item }) => (
    <>
      {item.status == i ? (
        <Pressable
          onPress={() => {
            console.log(item.OderID);
          }}
        >
          <View style={[styles.renderItem, styles.listShadow]}>
            <View style={{ padding: 10 }}>
              <Text>Order ID: {item.OderID}</Text>
              <Text> Customer ID: {item.UserID}</Text>
            </View>
            <View style={styles.dateTime}>
              <Text>{item.Date}</Text>
              <Text>{item.Time}</Text>
            </View>
          </View>
        </Pressable>
      ) : null}
    </>
  );

  return (
    <>
      <StatusBar backgroundColor="#ad8840" />
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.userName}>{name}</Text>
          <View
            style={{
              alignSelf: "flex-end",
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 10,
            }}
          >
            <Image source={require("../../assets/favicon.png")} />
          </View>
        </View>
        <Pressable
          onPress={() => {
            setI(!i);
          }}
          style={[
            {
              backgroundColor: i ? "red" : "green",
            },
            styles.filterButton,
          ]}
        >
          <View>{i ? <Text>Pending</Text> : <Text>Completed</Text>}</View>
        </Pressable>
        <View style={styles.bottomView}>
          <FlatList
            style={{ width: "100%", marginTop: 5 }}
            data={Orders}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    padding: 10,
    alignItems: "center",
    width: "25%",
    borderRadius: 10,
    marginLeft: 10,
  },
  userName: {
    fontSize: 28,
    position: "absolute",
    left: 0,
    verticalAlign: "middle",
    paddingTop: 5,
    paddingLeft: 10,
    color: "black",
  },
  dateTime: {
    padding: 10,
    position: "absolute",
    right: 0,
    marginBottom: 5,
  },
  container: {
    flex: 1,
  },
  topView: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  bottomView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  renderItem: {
    padding: 15,
    marginBottom: 7,
    margin: 2,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  listShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 2,
  },

  center: {
    paddingTop: "40%",
    alignItems: "center",
    backgroundColor: "#f74449",
  },

  h1: {
    paddingTop: 10,
    alignItems: "center",
  },

  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#431213",
    color: "white",
  },
  lable: {
    fontSize: 18,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingRight: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  button1: {
    width: 270,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffbf00",
    marginTop: 12,
    justifyContent: "center",
  },
  header: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    position: "absolute",
    top: 0,
    left: 0,
    height: 60,
  },
});
