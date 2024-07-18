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
  TextInput,
} from "react-native";
import { AuthContext } from "../services/AuthContext";
import {
  get_restaurants,
  RESTAURANT_IMAGE_URL,
  USER_IMAGE_URL,
} from "../services/api";
import { genNonce } from "../services/utils";

export default function Home({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const username = user.username;
  const [restaurants, setRestaurants] = useState([]);
  let [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    let getData = async () => {
      console.log("get data");
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

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          console.log(item.id);
          goToRestaurants(item.id, item.name);
        }}
      >
        {searchKey != "" ? (
          typeof searchKey === "string" &&
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ? (
            <View style={[styles.renderItem, styles.listShadow]}>
              <Image
                source={{ uri: RESTAURANT_IMAGE_URL + item.id }}
                defaultSource={require("../../assets/grey.png")}
                style={{ height: 55, width: 55, borderRadius: 10 }}
              />
              <View style={{ padding: 10 }}>
                <Text>{item.name}</Text>
              </View>
              <View>
                <Image
                  source={require("../../assets/next.png")}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    marginLeft: 230,
                  }}
                />
              </View>
            </View>
          ) : null
        ) : (
          <View style={[styles.renderItem, styles.listShadow]}>
            <Image
              source={{ uri: RESTAURANT_IMAGE_URL + item.id }}
              defaultSource={require("../../assets/grey.png")}
              style={{ height: 55, width: 55, borderRadius: 10 }}
            />
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/next.png")}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  marginLeft: 230,
                }}
              />
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ad8840" />
      <View style={styles.topView}>
        <Text style={styles.headerTextLeftAlign}>{name}</Text>
        <View style={styles.profilePicture}>
          <TouchableOpacity onPress={goToProfile}>
            <Image
              source={{ uri: USER_IMAGE_URL + user.id }}
              defaultSource={require("../../assets/user.png")}
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
      <View
        style={{
          height: 50,
          borderRadius: 25,
          marginHorizontal: 5,
          padding: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: "#ffffff",
          marginBottom: 5,
        }}
      >
        <Image
          source={require("../../assets/looking.gif")}
          style={{ height: 35, width: 35, borderRadius: 20, marginLeft: 5 }}
        />
        <TextInput
          onChangeText={setSearchKey}
          value={searchKey}
          style={{
            height: 53,
            borderRadius: 25,
            padding: 10,
            width: "93%",
            position: "absolute",
            right: 0,
          }}
        />
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
    paddingTop: 5,
  },
  bottomView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    fontSize: 24,
    position: "absolute",
    left: 0,
    verticalAlign: "middle",
    paddingLeft: 10,
    color: "black",
    fontWeight: "bold",
  },
  profilePicture: {
    alignSelf: "flex-end",
    paddingRight: 10,
    paddingBottom: 10,
  },
});
