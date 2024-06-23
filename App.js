import React, { Profiler, useState } from "react";
import Api from "./src/ApiManager";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//pages common to both
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import ChangePassword from "./src/screens/ChangePassword";
import Profile from "./src/screens/Profile";
//pages for user
import Home from "./src/screens/Home";
import Restaurants from "./src/screens/Restaurants";
import Summary from "./src/screens/Summary";
import Orders from "./src/screens/Orders";
//pages for restaurant
import ResHome from "./src/screens/ResHome";
import ResOrder from "./src/screens/ResOrder";
import SetMenu from "./src/screens/SetMenu";
import ResProfile from "./src/screens/ResProfile";

const Stack = createNativeStackNavigator();

const App = () => {
  const initialScreen = "Signup";

  const [isSignedIn, setIsSignedIn] = useState(false);
  Api.onAuthChange = setIsSignedIn;
  return (
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
        <Stack.Screen
          name="ResHome"
          component={ResHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResOrder"
          component={ResOrder}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SetMenu"
          component={SetMenu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResProfile"
          component={ResProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  //isSignedIn ? <Home /> : <Home />;
};

export default App;
