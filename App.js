import React, { useContext, useState } from "react";
import Api from "./src/ApiManager";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//pages common to both
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import ChangePassword from "./src/screens/ChangePassword";
//pages for user
import Home from "./src/screens/Home";
import Restaurants from "./src/screens/Restaurants";
import Summary from "./src/screens/Summary";
import Orders from "./src/screens/Orders";
import Profile from "./src/screens/Profile";
import { AuthContext, AuthProvider } from "./src/services/AuthContext";

const Stack = createNativeStackNavigator();

const App = () => {
  const initialScreen = "Signup";

  const { user } = useContext(AuthContext);
  console.log(user);
  return user ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: ({ current, layouts }) => {
            const { index } = current;
            const inputRange = [index - 1, index, index + 1];
            const translateX = current.progress.interpolate({
              inputRange,
              outputRange: [layouts.screen.width, 0, -layouts.screen.width],
            });

            return {
              cardStyle: {
                transform: [{ translateX }],
              },
            };
          },
          transitionSpec: {
            open: { animation: "timing", config: { duration: 1200 } },
            close: { animation: "timing", config: { duration: 1200 } },
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Restaurants"
          component={Restaurants}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: ({ current, layouts }) => {
            const { index } = current;
            const inputRange = [index - 1, index, index + 1];
            const translateX = current.progress.interpolate({
              inputRange,
              outputRange: [layouts.screen.width, 0, -layouts.screen.width],
            });

            return {
              cardStyle: {
                transform: [{ translateX }],
              },
            };
          },
          transitionSpec: {
            open: { animation: "timing", config: { duration: 1200 } },
            close: { animation: "timing", config: { duration: 1200 } },
          },
        }}
      >
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { BlurView } from "expo-blur";

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={openModal} style={styles.button}>
//         <Text style={styles.buttonText}>Open Pop-up</Text>
//       </TouchableOpacity>

//       {modalVisible && (
//         <Modal
//           transparent={true}
//           animationType="fade"
//           visible={modalVisible}
//           onRequestClose={closeModal}
//         >
//           <TouchableWithoutFeedback onPress={closeModal}>
//             <View style={styles.modalBackground}>
//               <BlurView intensity={50} style={styles.blurContainer}>
//                 <TouchableWithoutFeedback>
//                   <View style={styles.modalContent}>
//                     <Text style={styles.modalText}>This is a pop-up!</Text>
//                     <TouchableOpacity
//                       onPress={closeModal}
//                       style={styles.closeButton}
//                     >
//                       <Text style={styles.buttonText}>Close</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </TouchableWithoutFeedback>
//               </BlurView>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     padding: 10,
//     backgroundColor: "blue",
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   blurContainer: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "red",
//     borderRadius: 5,
//   },
// });

// export default App;
