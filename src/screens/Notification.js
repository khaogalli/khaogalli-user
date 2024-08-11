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
} from "react-native";
import { get_noti } from "../services/api";
import { BlurView } from "expo-blur";

export default function Home({ route, navigation }) {
  const username = route.params.username;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [modalNoti, setModalNoti] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const getData = async () => {
    setRefreshing(true);
    try {
      let res = await get_noti();
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const name = username;

  const openModal = (noti) => {
    setModalNoti(noti);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function isexpired(item) {
    const timestamp = new Date(item.created_at);
    const currentTime = new Date();
    const ttlTime = new Date(timestamp.getTime() + item.ttl_minutes * 60000);
    return currentTime > ttlTime;
  }

  const renderItem = ({ item }) =>
    !isexpired(item) ? (
      <Pressable
        onPress={() => {
          openModal(item);
        }}
      >
        <>
          <View style={[styles.renderItem, styles.listShadow]}>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 20 }}>{item.restaurant_name}</Text>
              <Text>{item.title}</Text>
            </View>
            <View style={styles.dateTime}>
              <Text>{item.created_at.substring(0, 10)}</Text>
              <Text>
                {new Date(item.created_at).toLocaleTimeString("en-GB", {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Text>
            </View>
          </View>
        </>
      </Pressable>
    ) : null;

  const displayItems = () => {
    if (!modalNoti) {
      return <Text>No items found.</Text>;
    }

    return (
      <View style={styles.DisItem}>
        <Text style={styles.DisItemBody}>{modalNoti.body}</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#ad8840" />
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.userName}>{name}</Text>
        </View>

        {!loading ? (
          <View style={styles.bottomView}>
            <FlatList
              style={{ width: "100%", marginTop: 5 }}
              data={notifications}
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
                styles.loading,
                {
                  opacity: 0.5,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                styles.loading,
                {
                  opacity: 0.4,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                styles.loading,
                {
                  opacity: 0.3,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                styles.loading,
                {
                  opacity: 0.2,
                },
              ]}
            ></View>
            <View
              style={[
                styles.renderItem,
                styles.loading,
                {
                  opacity: 0.2,
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
                      <Text style={styles.heading1}>{modalNoti.title}</Text>
                      <View style={styles.table}>
                        <View style={styles.header}></View>
                        {displayItems()}
                      </View>
                      <Text>{modalNoti.created_at.substring(0, 10)}</Text>
                      <Text>
                        {new Date(modalNoti.created_at).toLocaleTimeString(
                          "en-GB",
                          {
                            hour12: true,
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )}
                      </Text>
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
  DisItemBody: { width: "100%", textAlign: "center" },
  LoadingItem: {
    height: 85,
    backgroundColor: "#333333",
    opacity: 0.5,
  },
  loading: {
    height: 85,
    backgroundColor: "#333333",
  },
  DisItem: {
    padding: 10,
    flexDirection: "column",
  },
  table: {
    marginBottom: 20,
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
  heading1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
    marginBottom: 10,
  },
});
