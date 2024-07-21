import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { get_orders } from "../services/api";

export default function Home({ route, navigation }) {
  const [i, setI] = useState(true);
  const username = route.params.username;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await get_orders(100);
      setLoading(false);
      console.log(res.data);
      setOrders(res.data);
    };
    getData();
  }, []);
  const name = username;

  const renderItem = ({ item }) => (
    <>
      {item.pending == i ? (
        <Pressable
          onPress={() => {
            console.log(item.OderID);
          }}
        >
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
          ></View>
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
        {!loading ? (
          <View style={styles.bottomView}>
            <FlatList
              style={{ width: "100%", marginTop: 5 }}
              data={orders}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
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
