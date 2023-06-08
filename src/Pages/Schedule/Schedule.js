import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import { Colors } from "../../Shared/Colors";
import BottomBar from "../../Components/BottomBar";

export default function Schedule({ navigation }) {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  let barberData = [
    {
      nome: "Barbearia Novo Visual",
      rate: "5,0",
      distance: "1,9 km",
      favor: true,
    },
    {
      nome: "Barbearia Arretado",
      rate: "3,0",
      distance: "1,9 km",
    },
    {
      nome: "Carroom Instituto e Barbearia",
      rate: 4.0,
      distance: "1,9 km",
    },
    {
      nome: "Barbearia off2",
      rate: 2.0,
      distance: "1,9 km",
    },
    {
      nome: "Barbearia off",
      rate: 1.0,
      distance: "1,9 km",
    },
    {
      nome: "Barbearia Queiroz",
      rate: 4.0,
      distance: "1,9 km",
    },
    {
      nome: "Salão Novo Perfil",
      rate: 2.0,
      distance: "1,9 km",
    },
    {
      nome: "Junior Lima",
      rate: 5.0,
      distance: "1,9 km",
    },
    {
      nome: "Novo Estilo",
      rate: 1.0,
      distance: "1,9 km",
    },
    {
      nome: "Novizu BarberShop",
      rate: 0.0,
      distance: "1,9 km",
    },
  ];

  return (
    <View style={s.ContainerMain}>
      <StatusBar style="dark" />
      <Image
          style={s.Logo}
          source={require("../../../assets/Images/Login/Logo.png")}
        />

      <Text style={s.Title}>Agendados</Text>
      <ScrollView>{barberData.map((barber) => {})}</ScrollView>
      <BottomBar props={navigation} />
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorWhite,
    flex: 1,
  },
  Logo: {
    alignSelf: "center",
    width: 150,
    height: 47,
    marginTop: 70
  },
  Title: {
    color: Colors.ColorDeepBlue,
    fontSize: 25,
    fontFamily: "DMSans_700Bold",
    marginHorizontal: 24,
    marginBottom: 13,
    marginTop: 15,
  },
});
