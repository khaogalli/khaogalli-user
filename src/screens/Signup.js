import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";

export default function Signup({ route, navigation }) {
  const [username, onChangeText] = React.useState("Heet"); // for testing purposes
  const [regnum, onChangeRegNum] = React.useState("");
  const [password, onChangePass] = React.useState("");
  const [type, setType] = React.useState(0);

  goToSignin = () => {
    navigation.navigate("Signin");
  };

  verify = () => {
    if (type == 0) {
      navigation.navigate("Home", { username });
    } else {
      navigation.navigate("ResHome", { username });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <StatusBar backgroundColor="#ad8840" />

          <View style={styles.center}>
            <Image
              style={[styles.logo, styles.h1]}
              source={require("../../assets/download.jpeg")}
            />

            <Text style={styles.signupText}>Sign up</Text>
            <View style={styles.formContainer}>
              <View style={{ marginLeft: 15, marginTop: 20 }}>
                <Text style={styles.lable}>Username</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangeText}
                  value={username}
                />
                <Text style={styles.lable}>Password</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangeRegNum}
                  value={regnum}
                />
                <Text style={styles.lable}>Confirm Password</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangePass}
                  value={password}
                />

                <TouchableOpacity style={styles.button1} onPress={verify}>
                  <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: 15 }}
                  onPress={goToSignin}
                >
                  <Text style={styles.footerText}>
                    Already Signed up? Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    paddingRight: 10,
  },
  continueText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  formContainer: {
    backgroundColor: "#aa2e32",
    height: 355,
    width: 300,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 2,
  },
  signupText: {
    paddingTop: 3,
    fontSize: 36,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#f74449",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 2,
  },

  center: {
    marginTop: "0%",
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
});
