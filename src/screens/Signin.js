import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Pressable,
} from "react-native";

import Api from "../ApiManager";

export default function Signin() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const windowFontScale = useWindowDimensions().fontScale;
  const windowScale = useWindowDimensions().scale;

  const [username, onChangeText] = React.useState("");
  const [regnum, onChangeRegNum] = React.useState("");
  const [password, onChangePass] = React.useState("");

  const verify = () => {
    if (!username.trim().match(/^[a-zA-Z0-9]+$/)) {
      Alert.alert("Username Invalid");
      return;
    }
    if (!regnum.trim().match(/^\d{2}(BAI|BRS|BPS|BCE)\d{4}$/)) {
      Alert.alert("Registration Number Invalid");
      return;
    }

    const year = parseInt(regnum.substring(0, 2));
    if (year <= 20) {
      Alert.alert("RegistrationNumber Invalid");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Password should be at least 8 characters long.");
      return;
    }
    Api.login(username, regnum, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.KAV}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <SafeAreaView style={styles.SAV}>
            <StatusBar backgroundColor="#ad8840" />

            <View style={[styles.center, styles.h1]}>
              <Image
                style={styles.logo}
                source={require("../../assets/download.jpeg")}
              />

              <Text style={styles.signinText}>Sign in</Text>
              <View style={styles.formContainer}>
                <View style={{ marginLeft: 15, marginTop: 20 }}>
                  <Text style={styles.lable}>Username</Text>
                  <TextInput
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangeText}
                    value={username}
                  />
                  <Text style={styles.lable}>Registration Number</Text>
                  <TextInput
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangeRegNum}
                    value={regnum}
                  />
                  <Text style={styles.lable}>Password</Text>
                  <TextInput
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangePass}
                    value={password}
                  />

                  <Pressable style={styles.button1} onPress={verify}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      Continue
                    </Text>
                  </Pressable>

                  <Pressable style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15,
                        paddingRight: 10,
                      }}
                    >
                      Not Signed up? Sign up
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KAV: {
    flex: 1,
    backgroundColor: "#f74449",
  },
  SAV: { flex: 1, justifyContent: "space-around" },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  formContainer: [
    {
      backgroundColor: "#aa2e32",
      height: 355,
      width: 300,
      borderRadius: 20,
      marginTop: 10,
      borderWidth: 2,
    },
    { marginLeft: 15, marginTop: 20 },
  ],
  signinText: {
    fontSize: 36,
    color: "white",
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
  continueButton: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
