import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { place_order } from "../services/api";

export default function App({ route, navigation }) {
  const cart = route.params.cart;
  const user = route.params.user; 
  const order = cart.Order;
  const resName = cart.Res;
  const resID = cart.ResID;
  console.log(order);
  console.log(resName);
  console.log(resID);

  let orderItems = [
    { item: "1", name: "Item 1", quantity: 2, price: 10 },
    { item: "2", name: "Item 2", quantity: 1, price: 15 },
    { item: "3", name: "Item 3", quantity: 3, price: 20 },
  ];

  orderItems = order;

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>{item.qty}</Text>
      <Text style={styles.itemAmount}>Rs. {item.price * item.qty}</Text>
    </View>
  );

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#ad8840" />
      <View style={styles.container}>
        <Text style={styles.heading}>Order</Text>
        <Text style={styles.heading1}>{resName}</Text>
        <View style={styles.table}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Item</Text>
            <Text style={styles.headerText}>Qty</Text>
            <Text style={styles.headerText}>Amount</Text>
          </View>
          <FlatList
            data={orderItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Grand Total:</Text>
          <Text style={styles.totalAmount}>Rs. {getTotalAmount()}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Proceed to Payment")}
          >
            <Text style={styles.buttonText}>Proceed to Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              let order = {
                restaurant_id: resID,
                items: orderItems.map((item) => ({
                  id: item.item,
                  quantity: item.qty,
                })),
              };
              console.log(order);
              try {
                let res = await place_order(order);
                console.log(res.data);
                navigation.navigate("Home", { user });
              } catch (err) {
                console.log(err.response.data);
              }
            }}
          >
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  itemName: {
    fontSize: 16,
    width: "33%", // Adjusting width to fit three columns
    textAlign: "center",
  },
  itemQuantity: {
    fontSize: 16,
    width: "33%", // Adjusting width to fit three columns
    textAlign: "center",
  },
  itemAmount: {
    fontSize: 16,
    width: "33%", // Adjusting width to fit three columns
    textAlign: "center",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#ffbf00",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
