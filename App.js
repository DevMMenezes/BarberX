import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppContextProvider } from "./src/Shared/AppContext";

const Stack = createNativeStackNavigator();

import Welcome from "./src/Pages/Welcome/Welcome";
import Login from "./src/Pages/Login/Login";
import Schedule from "./src/Pages/Schedule/Schedule";
import Register from "./src/Pages/Register/Register";
import FinnishRegister from "./src/Pages/Register/FinnishRegister";
import Home from "./src/Pages/Home/Home";
import Favorites from "./src/Pages/Favorites/Favorites";

export default function App() {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <Stack.Navigator initialRouteName="Schedule">
          <Stack.Screen
            name="FinnishRegister"
            component={FinnishRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Schedule"
            component={Schedule}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
}
