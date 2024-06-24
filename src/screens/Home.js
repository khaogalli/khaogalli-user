import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Api from "../ApiManager";

export default function Home({ route, navigation }) {
  let restaurants = [
    // this is the list of restaurants frm api...
    { name: "A1", status: "B1", pic: require("../../assets/dp.png") }, // pic is the source of the profile picture of the restaurant... http url made by backend and sent here
    { name: "A2", status: "B2", pic: require("../../assets/dp.png") },
    { name: "A3", status: "B3", pic: require("../../assets/dp.png") },
    { name: "A4", status: "B4", pic: require("../../assets/dp.png") },
    { name: "A5", status: "B5", pic: require("../../assets/dp.png") },
    { name: "A6", status: "B6", pic: require("../../assets/dp.png") },
    { name: "A7", status: "B7", pic: require("../../assets/dp.png") },
    { name: "A8", status: "B8", pic: require("../../assets/dp.png") },
    { name: "A9", status: "B9", pic: require("../../assets/dp.png") },
    { name: "A10", status: "B10", pic: require("../../assets/dp.png") },
  ];

  const username = Api.Info.username;
  const userID = Api.Info.regnum;
  const tocken = Api.Info.tocken;
  const profilePic = Api.Info.profilePic; // source of the profile picture of the user... source={profilePic}

  Api.Home(username, userID, tocken); // api end point for fetching the list of restaurants....

  restaurants = Api.restaurantList;

  const name = username;

  const goToProfile = () => {
    navigation.navigate("Profile", { username });
  };

  const goToRestaurants = (itemName) => {
    console.log(itemName);
    navigation.navigate("Restaurants", { itemName, name });
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        console.log(item.name);
        goToRestaurants(item.name);
      }}
    >
      <View style={[styles.renderItem, styles.listShadow]}>
        <Image
          source={item.pic}
          style={{ height: 55, width: 55, borderRadius: 10 }}
        />
        <View style={{ padding: 10 }}>
          <Text>Name: {item.name}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ad8840" />
      <View style={styles.topView}>
        <Text style={styles.headerTextLeftAlign}>
          WELCOME BACK!!{"\n"}
          {name}
        </Text>
        <View style={styles.profilePicture}>
          <TouchableOpacity onPress={goToProfile}>
            <Image source={require("../../assets/favicon.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomView}>
        <FlatList
          style={{ width: "100%" }}
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  headerTextLeftAlign: {
    fontSize: 16,
    position: "absolute",
    left: 0,
    verticalAlign: "middle",
    paddingLeft: 10,
    color: "black",
  },
  profilePicture: {
    alignSelf: "flex-end",
    paddingRight: 10,
    paddingBottom: 10,
  },
});
