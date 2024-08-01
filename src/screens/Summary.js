import React, { useContext, useState } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from "react-native";
import { get_payment_session, place_order } from "../services/api";
import { AuthContext } from "../services/AuthContext";

export default function App({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const order = route.params.order;
  const resName = order.restaurant_name;
  const resID = order.restaurant_id;
  const [paid, setPaid] = useState(false);
  console.log(order);
  console.log(resName);
  console.log(resID);

  const orderItems = order.items;

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>{item.quantity}</Text>
      <Text style={styles.itemAmount}>Rs. {item.price * item.quantity}</Text>
    </View>
  );

  const getTotalAmount = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
            onPress={async () => {
              try {
                let pay_res = await get_payment_session(order.id);
                console.log(pay_res.data);
                switch (pay_res.data.status) {
                  case "Pending":
                    Linking.openURL(pay_res.data.url);
                    break;
                  case "Paid":
                    setPaid(true);
                    navigation.navigate("Orders", { username: user.username });
                    break;
                  case "Failed":
                    Alert.alert("Error", "Payment Failed", [
                      {
                        text: "Ok",
                        onPress: () =>
                          navigation.navigate("Restaurant", {
                            itemId: resID,
                            itemName: resName,
                          }),
                      },
                    ]);
                    break;
                  default:
                    console.log("Unknown status");
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {paid ? (
              <Text style={styles.buttonText}>Verify</Text>
            ) : (
              <Text style={styles.buttonText}>Proceed to pay</Text>
            )}
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
