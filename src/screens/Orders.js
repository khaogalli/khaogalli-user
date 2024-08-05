import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { cancel_order, get_orders } from "../services/api";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "@react-navigation/native";
export default function Home({ route, navigation }) {
  const [i, setI] = useState("paid");
  const username = route.params.username;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [modalOrder, setModalOrder] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [canCancel, setCanCancel] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navigation])
  );

  const getData = async () => {
    setRefreshing(true);
    let res = await get_orders(100);
    setLoading(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    console.log(res.data);
    setOrders(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const name = username;

  const openModal = (order) => {
    setModalOrder(order);
    let ct = new Date();
    let orderTime = new Date(order.created_at);
    console.log(ct - orderTime);
    if (ct - orderTime < 60000) {
      console.log("can");
      setCanCancel(true);
    } else {
      console.log("cannot");
      setCanCancel(false);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        openModal(item);
      }}
    >
      {item.status == i ? (
        <>
          <View style={[styles.renderItem, styles.listShadow]}>
            <View style={{ padding: 10 }}>
              <Text>Order ID</Text>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.dateTime}>
              <Text>{item.created_at.substring(0, 10)}</Text>
              <Text>{item.created_at.substring(11, 19)}</Text>
            </View>
          </View>
        </>
      ) : null}
    </Pressable>
  );
  var grandTotal = 0;
  const displayItems = () => {
    if (!modalOrder || !modalOrder.items) {
      return <Text>No items found.</Text>;
    }

    modalOrder.items.map((item) => {
      grandTotal += item.price * item.quantity;
    });

    return modalOrder.items.map((item, index) => (
      <View
        key={index}
        style={{
          padding: 10,
          flexDirection: "row",
        }}
      >
        <Text style={{ width: 120 }}>{item.name}</Text>
        <Text style={{ width: 100 }}>{item.quantity}</Text>
        <Text>Rs. {item.quantity * item.price}</Text>
      </View>
    ));
  };

  const cancelOrder = async (orderID) => {
    try {
      let res = await cancel_order(orderID);
    } catch (err) {
      console.log(err);
    }
  };

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
          ></View>
        </View>
        <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              setI("paid");
            }}
            style={[
              {
                borderBottomWidth: i == "paid" ? 2 : 0,
              },
              styles.filterButton,
            ]}
          >
            <View>
              <Text>Pending</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setI("completed");
            }}
            style={[
              {
                borderBottomWidth: i == "completed" ? 2 : 0,
              },
              styles.filterButton,
            ]}
          >
            <View>
              <Text>Completed</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setI("cancelled");
            }}
            style={[
              {
                borderBottomWidth: i == "cancelled" ? 2 : 0,
              },
              styles.filterButton,
            ]}
          >
            <View>
              <Text>Cancelled</Text>
            </View>
          </Pressable>
        </View>
        {!loading ? (
          <View style={styles.bottomView}>
            <FlatList
              style={{ width: "100%", marginTop: 5 }}
              data={orders}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={getData} />
              }
            />
          </View>
        ) : (
          <>
            <View
              style={[
                styles.renderItem,
                {
                  height: 85,
                  backgroundColor: "#333333",
                  opacity: 0.5,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                {
                  height: 85,
                  backgroundColor: "#333333",
                  opacity: 0.4,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                {
                  height: 85,
                  backgroundColor: "#333333",
                  opacity: 0.3,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                {
                  height: 85,
                  backgroundColor: "#333333",
                  opacity: 0.2,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                {
                  height: 85,
                  backgroundColor: "#333333",
                  opacity: 0.1,
                },
              ]}
            ></View>
          </>
        )}
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
                      <Text style={styles.heading}>Order</Text>
                      <Text style={styles.heading1}>{modalOrder.id}</Text>
                      <View style={styles.table}>
                        <View style={styles.header}>
                          <Text style={styles.headerText}>Item</Text>
                          <Text style={styles.headerText}>Qty</Text>
                          <Text style={styles.headerText}>Amount</Text>
                        </View>
                        {displayItems()}
                      </View>
                      <View style={styles.total}>
                        <Text style={styles.totalAmount}>
                          Grand Total: Rs. {grandTotal}
                        </Text>
                      </View>
                      {canCancel ? (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              cancelOrder(modalOrder.id);
                              setI("cancelled");
                              closeModal();
                            }}
                            style={{
                              margin: 10,
                              backgroundColor: "red",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            <View>
                              <Text>Cancel</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  </TouchableWithoutFeedback>
                </BlurView>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  table: {
    marginBottom: 20,
  },
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  heading1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  heading2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    width: "33%", // Adjusting width to fit three columns
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
