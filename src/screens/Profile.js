import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";

const ProfilePage = () => {
  const handleChangePassword = () => {
    Alert.alert("Change Password button pressed");
  };

  const handleLogout = () => {
    Alert.alert("Logout button pressed");
  };

  const handleGeneratePDF = () => {
    Alert.alert("Generate PDF button pressed");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/favicon.png")}
        style={styles.profileImage}
      />
      <Text style={{ fontWeight: "900", fontSize: 26 }}>John Doe</Text>
      <Text style={styles.regNumber}>Reg No: 123456</Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleGeneratePDF}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>Change Password</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleGeneratePDF}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>Orders</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleGeneratePDF}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
            }}
          >
            <Text style={styles.name}>Download History</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleGeneratePDF}>
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              width: 230,
              alignItems: "center",
              backgroundColor: "#ff3c3c",
            }}
          >
            <Text style={styles.name}>Sign Out</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
  },
  regNumber: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 10,
  },
});

export default ProfilePage;
