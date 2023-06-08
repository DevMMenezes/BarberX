import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState, useEffect, useContext } from "react";
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
import AppContext from "../../Shared/AppContext";
import UserContext from "../../Shared/UserContext";
import { AxiosReqIBGE, AxiosReqAPI } from "../../Shared/Axios";

export default function Home({ navigation }) {
  const { CurrentScreen, setCurrentScreen } = useContext(AppContext);
  const { User, setUser } = useContext(UserContext);
  const [City, setCity] = useState("");

  useEffect(() => {
    try {
      const ReqAPI = async () => {
        const response = await AxiosReqIBGE.axiosInstance.get(
          `${AxiosReqIBGE.baseURLIBGE}localidades/municipios/${User.Data.cidade}`
        );
        setCity(response.data);
       
      };

      ReqAPI();
    } catch (error) {
      if (error) {
        console.log(error.message, error);
      }
    }
  }, []);

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

  return (
    <View style={s.ContainerMain}>
      <StatusBar style="light" />
      <View style={s.ContainerTopBar}>
        <Image
          style={s.Logo1}
          source={require("../../../assets/Images/Home/Location.png")}
        />
        <Text style={s.CityText}>
          {City.nome}
        </Text>
        <TouchableOpacity>
          <Image
            style={s.Logo2}
            source={require("../../../assets/Images/Home/Vector.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={s.Title}>Barbearias</Text>
      <FlatList
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
