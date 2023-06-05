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

export default function Favorites({ navigation }) {
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
      favor: true,
    },
    {
      nome: "Carroom Instituto e Barbearia",
      rate: 4.0,
      distance: "1,9 km",
      favor: true,
    },
    {
      nome: "Barbearia off",
      rate: 2.0,
      distance: "1,9 km",
      favor: true,
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
      <Text style={s.RateBarber}>{`${parseFloat(props.rate)}  `}</Text>
      <Image
        style={s.LocationLogo}
        source={require("../../../assets/Images/Home/Location.png")}
      />
      <Text style={s.DistanceBarber}>{`${props.distance}`}</Text>
      <TouchableOpacity style={s.FavorContainer}>
        {props.favor ? (
          <Image
            style={s.LogoFavor}
            source={require("../../../assets/Images/Home/Favo.png")}
          />
        ) : (
          <Image
            style={s.LogoFavor}
            source={require("../../../assets/Images/Home/DesFavo.png")}
          />
        )}
      </TouchableOpacity>

      <Image
        style={s.Divider}
        source={require("../../../assets/Images/Home/Divider.png")}
      />
    </TouchableOpacity>
  );

  return (
    <View style={s.ContainerMain}>
      <StatusBar style="dark" />

      <Text style={s.Title}>Favoritos</Text>
      <FlatList
        style={s.FlatList}
        data={barberData}
        renderItem={({ item }) => <Item props={item} />}
        keyExtractor={(item) => item.nome}
      />
      <BottomBar props={navigation} />
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorWhite,
    flex: 1,
  },
  Title: {
    color: Colors.ColorDeepBlue,
    fontSize: 25,
    fontFamily: "DMSans_700Bold",
    marginTop: 110,
    marginHorizontal: 22,
    marginBottom: 13,
  },
  ContainerBarber: {
    display: "flex",
    flexDirection: "row",
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
    maxWidth: 170,
  },
  FavorContainer: {
    position: "absolute",
    right: 15,
    bottom: 30,
    width: 35,
    height: 35,
  },
  LogoFavor: {
    width: 33.17,
    height: 32,
  },
  StarLogo: {
    width: 18,
    height: 18,
    margin: 3,
    position: "absolute",
    left: 87,
    bottom: 8,
  },
  LocationLogo: {
    width: 18,
    height: 18,
    margin: 3,
    position: "absolute",
    left: 125,
    bottom: 7,
  },
  RateBarber: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    position: "absolute",
    left: 109,
    bottom: 10,
  },
  DistanceBarber: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    position: "absolute",
    left: 150,
    bottom: 10,
  },
  Divider: {
    position: "absolute",
    bottom: -5,
    width: "97%",
    height: 1,
    right: 3,
  },
});
