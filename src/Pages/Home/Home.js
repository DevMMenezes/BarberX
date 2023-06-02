import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
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

export default function Home({ navigation }) {
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
      nome: "BarberX1 do BarberX12312311111111111",
      rate: 5.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX2",
      rate: 3.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX3",
      rate: 4.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX4",
      rate: 2.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX5",
      rate: 1.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX6",
      rate: 4.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX7",
      rate: 2.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX8",
      rate: 5.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX9",
      rate: 1.0,
      distance: "1,9 km",
    },
    {
      nome: "BarberX10",
      rate: 0.0,
      distance: "1,9 km",
    },
  ];

  const Item = ({ props }) => (
    <TouchableOpacity style={s.ContainerBarber}>
      <Image
        style={s.LogoBarber}
        source={require("../../../assets/Images/Home/EllipseLogo.png")}
      />
      <Text style={s.NameBarber}>{props.nome}</Text>
      <Image
        style={s.StarLogo}
        source={require("../../../assets/Images/Home/Star.png")}
      />
      <Text style={s.RateBarber}>{`${props.rate} - ${props.distance}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={s.ContainerMain}>
      <StatusBar style="light" />
      <View style={s.ContainerTopBar}>
        <Image
          style={s.Logo1}
          source={require("../../../assets/Images/Home/Location.png")}
        />
        <Text style={s.CityText}>Cidade - CE</Text>
        <TouchableOpacity>
          <Image
            style={s.Logo2}
            source={require("../../../assets/Images/Home/Vector.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={s.Title}>Barbearias</Text>
      <FlatList
        style={s.FlatList}
        data={barberData}
        renderItem={({ item }) => <Item props={item} />}
        keyExtractor={(item) => item.nome}
      />
      <BottomBar />
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorWhite,
    flex: 1,
  },
  ContainerTopBar: {
    backgroundColor: Colors.ColorDeepBlue,
    height: 113,
    width: "100%",
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  CityText: {
    color: Colors.ColorWhite,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    marginVertical: 24,
  },
  Logo1: {
    marginHorizontal: 20,
    marginVertical: 24,
    height: 24,
    width: 24,
  },
  Logo2: {
    marginHorizontal: 20,
    marginVertical: 30,
    width: 14,
    height: 8,
  },
  Title: {
    color: Colors.ColorDeepBlue,
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    marginTop: 20,
    marginHorizontal: 24,
  },
  FlatList: {},
  ContainerBarber: {
    display: "flex",
    flexDirection:"row",
    margin: 10,
    height: 85,
  },
  LogoBarber: {
    width: 80.41,
    height: 77.78,
  },
  NameBarber: {
    color: Colors.ColorDeepBlue,
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    marginLeft: 10,
    marginTop: 20,
    maxWidth: 170
  },
  LogoFavor: {
    width: 33,
    height: 32,
    marginLeft: 10,
    marginTop: 20,
  },
  StarLogo: {
    width: 18,
    height: 18,
    marginLeft: 10,
    marginTop: 20,
  },
  RateBarber: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
});
