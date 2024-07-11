import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../services/AuthContext";
import { get_menu } from "../services/api";

export default function Restaurants({ route, navigation }) {
  const windowWidth = useWindowDimensions().width;
  const { user } = useContext(AuthContext);
  const name = route.params.itemName;
  const restaurantID = route.params.itemId;
  console.log(restaurantID);

  var cart = {
    //send to BE
    UID: "",
    Res: "",
    ResID: "",
    Order: [],
  };

  const [menu, setMenu] = useState([]);
  const [itemlist, setItemList] = useState([]);

  useEffect(() => {
    let getData = async () => {
      setMenu([
        //api end point
        {
          id: "A1",
          name: "",
          price: "B1",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A2",
          name: "",
          price: "B2",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A3",
          name: "",
          price: "B3",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A4",
          name: "",
          price: "B4",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A5",
          name: "",
          price: "B5",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A6",
          name: "",
          price: "B6",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A7",
          name: "",
          price: "B7",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A8",
          name: "",
          price: "B8",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A9",
          name: "",
          price: "B9",
          desc: require("../../assets/dp.png"),
        },
        {
          id: "A10",
          name: "",
          price: "B10",
          desc: require("../../assets/dp.png"),
        },
      ]);
      let res = await get_menu(restaurantID);
      setMenu(res.data.menu);
      console.log(res.data.menu);
      setItemList(
        res.data.menu.map((menuItem) => ({
          item: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          qty: 0,
        }))
      );
      console.log(itemlist);
    };

    getData();
  }, []);

  var res_name = name; // api end point

  cart.Res = res_name;
  cart.UID = user.id;
  cart.ResID = restaurantID;

  const qty = (item, op) => {
    setItemList((prevItemList) =>
      prevItemList.map((itemData) =>
        itemData.item === item
          ? {
              ...itemData,
              qty: Math.max(0, itemData.qty + (op === "+" ? 1 : -1)),
            }
          : itemData
      )
    );
    console.log(itemlist);
  };

  const addItem = (itemlist) => {
    const selectedItems = itemlist.filter((itemData) => itemData.qty > 0);
    cart.Order = selectedItems;
    console.log("final cart:");
    console.log(cart);
    navigation.navigate("Summary", { cart });
  };

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <Image source={item.pic} style={styles.row_icon} />
      <View style={{ padding: 10 }}>
        <Text>Name: {item.name}</Text>
        <Text>price: {item.price}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <View style={styles.buttom_con}>
          <TouchableOpacity
            onPress={() => {
              console.log(item.name);
              qty(item.id, "+");
            }}
          >
            <Text style={styles.button_inc}>+</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>
            {itemlist.find((i) => i.item === item.id)?.qty}
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log(item.name);
              qty(item.items, "-");
            }}
          >
            <Text style={styles.button_dec}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.kba}
        >
          <View>
            <StatusBar backgroundColor="#ad8840" />
            <View>
              {
                <Image
                  style={[
                    styles.primary_bg,
                    {
                      width: windowWidth,
                    },
                  ]}
                  source={require("../../assets/backdrop.jpeg")}
                />
              }
              <View>
                <Image
                  style={styles.secondary_dp}
                  source={require("../../assets/dp1.png")} // fetched from api.
                />
              </View>
            </View>
            <View style={styles.h1view}>
              <Text style={styles.h1}>{res_name}</Text>
            </View>

            <View style={{ padding: 5 }}>
              <FlatList
                data={menu}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollToEnd={true}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              addItem(itemlist);
            }}
          >
            <View style={styles.confirmOrderView}>
              <Text style={styles.confirmOrderText}>Confirm Order</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kba: {
    backgroundColor: "#f3f5f9",
  },
  h1: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
  },
  h1view: {
    marginTop: 150,
    padding: 10,
    alignItems: "center",
  },
  secondary_dp: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    top: "100%",
    left: "50%",
    marginTop: -5,
    marginLeft: -70,
  },
  primary_bg: {
    resizeMode: "cover",
    position: "absolute",
  },
  rows: [
    {
      padding: 15,
      marginBottom: 7,
      margin: 2,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
    },
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  ],
  row_icon: { height: 55, width: 55, borderRadius: 10 },
  buttom_con: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
  },
  button_inc: {
    fontSize: 20,
    fontWeight: "900",
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: "#ad8840",
  },
  qty: { fontWeight: "bold", color: "red" },
  button_dec: {
    fontSize: 25,
    fontWeight: "900",
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: "#ad8840",
  },
  confirmOrderView: {
    height: 50,
    width: 400,
    borderColor: "#cd3131",
    borderWidth: 3,
    alignSelf: "center",
    marginBottom: 30,
    backgroundColor: "#ff3c3c",
    borderRadius: 10,
  },
  confirmOrderText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    color: "#ffbf00",
  },
});
