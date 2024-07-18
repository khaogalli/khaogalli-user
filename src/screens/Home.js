import React, { useState, useContext, useEffect } from "react";
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
import { AuthContext } from "../services/AuthContext";
import {
  get_orders,
  get_restaurants,
  RESTAURANT_IMAGE_URL,
  USER_IMAGE_URL,
} from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { genNonce } from "../services/utils";

export default function Home({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const username = user.username;
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    let getData = async () => {
      console.log("get data");
      // setRestaurants([
      //   // this is the list of restaurants frm api...
      //   { name: "A1", id: "B1", pic: require("../../assets/dp.png") }, // pic is the source of the profile picture of the restaurant... http url made by backend and sent here
      //   { name: "A2", id: "B2", pic: require("../../assets/dp.png") },
      //   { name: "A3", id: "B3", pic: require("../../assets/dp.png") },
      //   { name: "A4", id: "B4", pic: require("../../assets/dp.png") },
      //   { name: "A5", id: "B5", pic: require("../../assets/dp.png") },
      //   { name: "A6", id: "B6", pic: require("../../assets/dp.png") },
      //   { name: "A7", id: "B7", pic: require("../../assets/dp.png") },
      //   { name: "A8", id: "B8", pic: require("../../assets/dp.png") },
      //   { name: "A9", id: "B9", pic: require("../../assets/dp.png") },
      //   { name: "A10", id: "B10", pic: require("../../assets/dp.png") },
      // ]);
      try {
        let res = await get_restaurants();
        setRestaurants(res.data.restaurants);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const name = username;

  const goToProfile = () => {
    navigation.navigate("Profile", { username });
  };

  const goToRestaurants = (itemId, itemName) => {
    console.log("resid " + itemId);
    navigation.navigate("Restaurants", { itemId, itemName });
  };

  const [nonce, setNonce] = useState(genNonce());

  const resetNonce = () => {
    setNonce(genNonce());
  };

  const [photo, setPhoto] = useState(USER_IMAGE_URL + user.id);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        console.log(item.id);
        goToRestaurants(item.id, item.name);
      }}
    >
      <View style={[styles.renderItem, styles.listShadow]}>
        <Image
          source={{ uri: RESTAURANT_IMAGE_URL + item.id }}
          style={{ height: 55, width: 55, borderRadius: 10 }}
        />
        <View style={{ padding: 10 }}>
          <Text>{item.name}</Text>
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
            <Image
              source={{ uri: USER_IMAGE_URL + user.id }}
              style={{
                borderWidth: 1,
                borderColor: "black",
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
              />
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
