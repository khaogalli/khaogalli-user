import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={Signin}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Signup" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
