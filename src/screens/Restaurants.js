import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  Platform,
  RefreshControl,
  Alert,
} from "react-native";
import { AuthContext } from "../services/AuthContext";
import {
  get_menu,
  ITEM_IMAGE_URL,
  place_order,
  RESTAURANT_IMAGE_URL,
} from "../services/api";
import { BlurView } from "expo-blur";
import { Image as ExpoImage } from "expo-image";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Restaurants({ route, navigation }) {
  const windowWidth = useWindowDimensions().width;
  const { user } = useContext(AuthContext);
  const name = route.params.itemName;
  const restaurantID = route.params.itemId;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("No Description Available");
  const [tilte, setTitle] = useState("");
  const [item_ID, setItemID] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  var cart = {
    UID: "",
    Res: "",
    ResID: "",
    Order: [],
  };

  const [menu, setMenu] = useState([]);
  const [itemlist, setItemList] = useState([]);

  let getData = async () => {
    setRefreshing(true);
    let res = await get_menu(restaurantID);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setLoading(false);
    setMenu(res.data.menu);
    setItemList(
      res.data.menu.map((menuItem) => ({
        item: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        qty: 0,
      }))
    );
  };

  useEffect(() => {
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
  };

  const addItem = (itemlist) => {
    const selectedItems = itemlist.filter((itemData) => itemData.qty > 0);
    cart.Order = selectedItems;
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        openModal();
        setTitle(item.name);
        setItemID(item.id);
        if (item.description != "") {
          setDescription(item.description);
        } else {
          setDescription("No Description Available");
        }
      }}
    >
      <View style={styles.rows}>
        {searchKey != "" ? (
          typeof searchKey === "string" &&
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ? (
            <>
              <ExpoImage
                source={{
                  uri: ITEM_IMAGE_URL + item.id,
                }}
                placeholder={require("../../assets/grey.png")}
                priority="high"
                style={styles.row_icon}
              />
              <View style={{ padding: 10 }}>
                <Text>{item.name}</Text>
                <Text>Rs. {item.price}</Text>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <View style={styles.buttom_con}>
                  <TouchableOpacity
                    onPress={() => {
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
                      qty(item.id, "-");
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
            <ExpoImage
              source={{
                uri: ITEM_IMAGE_URL + item.id,
              }}
              placeholder={"../../assets/grey.png"}
              priority="high"
              style={styles.row_icon}
            />
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              <Text>Rs. {item.price}</Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
              {item.available ? (
                <View style={styles.buttom_con}>
                  <TouchableOpacity
                    onPress={() => {
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
                      qty(item.id, "-");
                    }}
                  >
                    <Text style={styles.button_dec}>-</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={{ color: "#ff3c3c", fontSize: 16 }}>
                  Not Available
                </Text>
              )}
            </View>
          </>
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.top}>
          <View>
            <StatusBar backgroundColor="#ad8840" />
            <View>
              <Image
                source={require("../../assets/backdrop.jpeg")}
                style={[
                  styles.primary_bg,
                  {
                    width: windowWidth,
                  },
                ]}
                onError={(error) => {
                  console.error("Image failed to load:", error);
                }}
                priority="high"
              />
              <View>
                <ExpoImage
                  style={styles.secondary_dp}
                  source={{
                    uri: RESTAURANT_IMAGE_URL + restaurantID,
                  }}
                  placeholder={require("../../assets/grey.png")}
                  priority="high"
                />
              </View>
            </View>
            <View style={styles.h1view}>
              <Text style={styles.h1}>{res_name}</Text>
            </View>
            <View style={styles.search}>
              <Image
                source={require("../../assets/looking.gif")}
                style={styles.searchGif}
              />
              <TextInput
                onChangeText={setSearchKey}
                value={searchKey}
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>
        <View style={styles.middle}>
          {!loading ? (
            <View style={{ padding: 5, flex: 1 }}>
              <FlatList
                data={menu}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollToEnd={true}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={getData} />
                }
              />
            </View>
          ) : (
            <>
              <View
                style={[
                  styles.rows,
                  styles.loading,
                  {
                    opacity: 0.5,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.rows,
                  styles.loading,
                  {
                    opacity: 0.4,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.rows,
                  styles.loading,
                  {
                    opacity: 0.3,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.rows,
                  styles.loading,
                  {
                    opacity: 0.2,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.rows,
                  styles.loading,
                  {
                    opacity: 0.1,
                  },
                ]}
              ></View>
            </>
          )}
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={async () => {
              addItem(itemlist);
              let order = {
                restaurant_id: restaurantID,
                items: cart.Order.map((item) => ({
                  id: item.item,
                  quantity: item.qty,
                })),
              };
              try {
                if (order.items.length === 0) {
                  Alert.alert(
                    "Empty Cart",
                    "Please select atleast one item to place order",
                    [{ text: "OK" }]
                  );
                  return;
                }
                let res = await place_order(order);
                navigation.navigate("Summary", { order: res.data.order });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <View style={styles.confirmOrderView}>
              <Text style={styles.confirmOrderText}>Place Order</Text>
            </View>
          </TouchableOpacity>
        </View>
        {modalVisible && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalBackground}>
                <BlurView intensity={50} style={styles.blurContainer}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                      <Text
                        style={[styles.modalText, { textAlign: "justify" }]}
                      >
                        {tilte}
                      </Text>
                      <ExpoImage
                        source={{
                          uri: ITEM_IMAGE_URL + item_ID,
                        }}
                        placeholder={"../../assets/grey.png"}
                        priority="high"
                        style={styles.row_icon}
                      />
                      <Text style={styles.modalText}>{description}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </BlurView>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: 85,
    backgroundColor: "#333333",
  },
  searchInput: {
    height: 53,
    borderRadius: 25,
    padding: 10,
    width: "93%",
    position: "absolute",
    right: 0,
  },
  searchGif: {
    height: 35,
    width: 35,
    borderRadius: 20,
    marginLeft: 5,
  },
  search: {
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
  },
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
      padding: 10,
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
  row_icon: { height: 65, width: 65, borderRadius: 10 },
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  blurContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
  },
});
