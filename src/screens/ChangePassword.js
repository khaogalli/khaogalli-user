import React, { useContext, useRef, useState, useEffect } from "react";
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
  Pressable,
} from "react-native";
import { AuthContext } from "../services/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { upload_user_image, USER_IMAGE_URL } from "../services/api";
import * as FileSystem from "expo-file-system";

import { genNonce } from "../services/utils";


const ProfilePage = ({ route, navigation }) => {
  const { update_user, user } = useContext(AuthContext);
  let username = user.username;

  const [userName, setUserName] = useState(username);
  const [type, setType] = useState(0); // 0 for student, 1 for restaurant //get from api
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [pressed, setPressed] = useState(0);

  useEffect(() => {
    console.log("hi1");
    const doSomething = async () => {
      console.log("hi");
      let user = {};
      let changed = false;
      if (userName != username) {
        changed = true;
        user.username = userName;
      }
      if (password != "" && NewPassword == confirmPassword) {
        // todo validate new password
        user.update_pass = {
          old_password: password,
          new_password: confirmPassword,
        };
        changed = true;
      }

      if (!changed) {
        return;
      }
      console.log("something");

      try {
        await update_user(user);
        navigation.navigate("Profile");
      } catch (error) {
        console.log(error);
      }
    };
    doSomething();
  }, [pressed]);

  const [nonce, setNonce] = useState(genNonce());

  const resetNonce = () => {
    setNonce(genNonce());
  };

  const [photo, setPhoto] = useState(USER_IMAGE_URL + user.id);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };

    requestPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      try {
        const base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        const res = await upload_user_image(base64);
        resetNonce();
        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error reading file or uploading image:", error);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ad8840" />
        <TouchableOpacity // upload profle page yet to be made so this is a placeholder for now
          onPress={() => {
            console.log("Edit Profile");
            pickImage();
          }}
        >
          <Image
            source={{ uri: photo }} //require("../../assets/download.jpeg")
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
          style={[styles.input]}
          onChangeText={(text) => {
            setPassword(text); // Call validate with the new text value
          }}
          value={password}
        />

        {password != "" ? (
          <View>
            <Text style={[styles.lable, { textAlign: "center" }]}>
              New Password
            </Text>
            <TextInput
              style={[styles.input]}
              onChangeText={setNewPassword}
              value={NewPassword}
            />

            <Text style={[styles.lable, { textAlign: "center" }]}>
              Confirm Password
            </Text>
            <TextInput
              style={[styles.input]}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            setPressed(pressed + 1);
          }}
        >
          <Text style={styles.changePasswordText}>Save Changes</Text>
        </TouchableOpacity>
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
