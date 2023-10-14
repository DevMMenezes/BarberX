import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppContextProvider } from "./src/Shared/AppContext";
import { UserContextProvider } from "./src/Shared/UserContext";
import { RootSiblingParent } from "react-native-root-siblings";

const Stack = createNativeStackNavigator();

import Welcome from "./src/Pages/Welcome/Welcome";
import Login from "./src/Pages/Login/Login";
import Schedule from "./src/Pages/Schedule/Schedule";
import Register from "./src/Pages/Register/Register";
import FinnishRegister from "./src/Pages/Register/FinnishRegister";
import Home from "./src/Pages/Home/Home";
import Favorites from "./src/Pages/Favorites/Favorites";
import DetailsHome from "./src/Pages/DetailsHome/DetailsHome";
import Profile from "./src/Pages/Profile/Profile";

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <AppContextProvider>
          <UserContextProvider>
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DetailsHome"
                component={DetailsHome}
                options={{ headerShown: false }}
              />
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
                options={{ headerShown: false, animation: "none" }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false, animation: "none" }}
              />
              <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{ headerShown: false, animation: "none" }}
              />
            </Stack.Navigator>
          </UserContextProvider>
        </AppContextProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
