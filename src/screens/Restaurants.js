import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AuthContext } from "../services/AuthContext";
import {
  get_menu,
  ITEM_IMAGE_URL,
  RESTAURANT_IMAGE_URL,
} from "../services/api";

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
      console.log("test", itemlist);
    };

    getData();
  }, []);

  var res_name = name;
  let [searchKey, setSearchKey] = useState("");
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
      {searchKey != "" ? (
        typeof searchKey === "string" &&
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ? (
          <>
            <Image
              source={{ uri: ITEM_IMAGE_URL + item.id }}
              defaultSource={require("../../assets/grey.png")}
              style={styles.row_icon}
            />
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
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
          </>
        ) : null
      ) : (
        <>
          <Image
            source={{ uri: ITEM_IMAGE_URL + item.id }}
            defaultSource={require("../../assets/grey.png")}
            style={styles.row_icon}
          />
          <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
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
        </>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.top}>
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
                source={{ uri: RESTAURANT_IMAGE_URL + restaurantID }}
                defaultSource={require("../../assets/grey.png")} // fetched from api.
              />
            </View>
          </View>
          <View style={styles.h1view}>
            <Text style={styles.h1}>{res_name}</Text>
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
        </View>
      </View>
      <View style={styles.middle}>
        <View style={{ padding: 5, flex: 1 }}>
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
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => {
            addItem(itemlist);
          }}
        >
          <View style={styles.confirmOrderView}>
            <Text style={styles.confirmOrderText}>Confirm Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  top: {},
  middle: {
    flex: 1,
  },
  bottom: {},
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
    top: "100%",
    left: "50%",
    marginTop: -5,
    marginLeft: -70,
    borderRadius: 100,
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
