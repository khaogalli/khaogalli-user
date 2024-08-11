import React, { useContext, useState } from "react";
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
import Notification from "./src/screens/Notification";
import Profile from "./src/screens/Profile";
import Analysis from "./src/screens/Analysis";
import { AuthContext, AuthProvider } from "./src/services/AuthContext";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/");
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Summary: "summary",
    },
  },
};

const App = () => {
  const initialScreen = "Signup";

  const { user } = useContext(AuthContext);
  return user ? (
    <NavigationContainer linking={linking}>
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
          name="Analysis"
          component={Analysis}
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
        <Stack.Screen
          name="Notification"
          component={Notification}
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