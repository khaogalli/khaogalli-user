import React, { useRef, useState } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";

const ProfilePage = ({ route, navigation }) => {
  const username = route.params.username;

  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    console.log("fadein");
    Animated.timing(opacity, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
    opacity.current = 1;
  };

  const fadeOut = () => {
    console.log("fadeout");
    Animated.timing(opacity, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  };

  const [userName, setUserName] = useState(username);
  const [type, setType] = useState(0); // 0 for student, 1 for restaurant //get from api
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [valid, setValid] = useState(false);

  validate = (password) => {
    //get password from api
    //if password is correct
    if (password == "heet") {
      console.log("if :" + opacity.current);
      console.log(opacity);
      setValid(true);
      fadeIn();
    } else {
      console.log("else :" + opacity.current);
      console.log(opacity);
      fadeOut();
      setValid(false);
    }
  };

  const changePassword = () => {
    opacity.current = 0;
    console.log("Password Changed");
    //varification code
    setValid(true);
    opacity.current = 0;
    if (type == 1) navigation.navigate("ResProfile", { username });
    else navigation.navigate("Profile", { username });
  };

  const saveChanges = () => {
    if (type == 1) navigation.navigate("ResProfile", { username });
    else navigation.navigate("Profile", { username });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ad8840" />
        <TouchableOpacity // upload profle page yet to be made so this is a placeholder for now
          onPress={() => {
            console.log("Edit Profile");
          }}
        >
          <Image
            source={require("../../assets/download.jpeg")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.lable}>Username</Text>
        <TextInput
          style={[styles.input, { height: 40, width: 270 }]}
          onChangeText={setUserName}
          value={userName}
        />

        <Text style={styles.lable}>Password</Text>
        <TextInput
          style={[
            styles.input,
            password
              ? valid
                ? { backgroundColor: "rgba(0, 255, 0, 0.1)", opacity: 1 }
                : { backgroundColor: "rgba(255, 0, 0, 0.1)", opacity: 1 }
              : {},
          ]}
          onChangeText={(text) => {
            setPassword(text);
            validate(text); // Call validate with the new text value
          }}
          value={password}
          onChange={validate}
        />

        {valid ? (
          <Animated.View style={{ opacity: opacity }}>
            <Text style={[styles.lable, { textAlign: "center" }]}>
              New Password
            </Text>
            <TextInput
              style={[styles.input]}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <Text style={[styles.lable, { textAlign: "center" }]}>
              Confirm Password
            </Text>
            <TextInput
              style={[styles.input]}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Animated.View>
        ) : null}

        {valid ? (
          <TouchableOpacity style={styles.button1} onPress={changePassword}>
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button1} onPress={saveChanges}>
            <Text style={styles.changePasswordText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  changePasswordText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  signouttButtonText: {
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    width: 230,
    alignItems: "center",
    backgroundColor: "#ff3c3c",
  },
  buttonText: {
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    width: 230,
    alignItems: "center",
  },
  userName: { fontWeight: "900", fontSize: 26 },
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
  input: {
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    height: 40,
    width: 270,
  },
  lable: {
    fontSize: 18,
    color: "black",
    marginBottom: 5,
  },
  button1: {
    width: 270,
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#ffbf00",
    marginTop: 12,
    justifyContent: "center",
  },
});

export default ProfilePage;
