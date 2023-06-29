import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  Modal,
  ActivityIndicator,
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
  const { Barbers, setBarbers } = useContext(AppContext);
  const { User, setUser } = useContext(UserContext);
  const [City, setCity] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [StateSelected, setStateSelected] = useState(User.estado);
  const [CitySelected, setSelectMuni] = useState(User.cidade);
  const [StatesLoaded, setStatesLoaded] = useState("");
  const [CityLoaded, setCityLoaded] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      console.log("Refreshing");
      await ReqAPICityCurrent();
      await ReqAPIBarbers();
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    ReqAPICityCurrent();
    ReqAPIBarbers();
    console.log("verificando loopíng");
  }, []);

  const ReqAPICityCurrent = async () => {
    console.log("ReqAPICityCurrent");

    const response = await AxiosReqIBGE.axiosInstance.get(
      `${AxiosReqIBGE.baseURLIBGE}localidades/municipios/${CitySelected}`
    );
    setCity(response.data);
  };

  //BUSCA TODOS OS BARBEIROS POR CIDADE
  const ReqAPIBarbers = async () => {
    console.log("ReqAPIBarbers");
    const UserData = await AxiosReqAPI.axiosInstance
      .get(
        `${AxiosReqAPI.BaseURL}barbearia/id_usuario/${User.id}/${CitySelected}`
      )
      .catch((error) => {
        console.log("error: " + error.response.status);
        console.log("error: ReqAPIBarbers");
      });

    const DataItem = UserData.data.Data;
    if (DataItem) {
      await setBarbers(DataItem);
    } else {
      await setBarbers("");
    }
  };

  const ReqAPISearchState = async () => {
    await AxiosReqIBGE.axiosInstance
      .get(`${AxiosReqIBGE.baseURLIBGE}localidades/estados`)
      .then((response) => {
        setStatesLoaded(response.data);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    try {
      const ReqAPISearchCities = async () => {
        const response = await AxiosReqIBGE.axiosInstance.get(
          `${AxiosReqIBGE.baseURLIBGE}localidades/estados/${StateSelected}/municipios`
        );
        setCityLoaded(response.data);
      };

      ReqAPISearchCities();
    } catch (error) {
      if (error) {
        console.log(error.message, error);
      }
    }
  }, [StateSelected]);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  const onLayoutRootView = useCallback(async () => {}, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  const HandleSubmit = async () => {
    console.log({
      email: User.email,
      cidade: CitySelected,
      estado: StateSelected,
    });
    const ReqAPIHandleSubmit = async () => {
      await AxiosReqAPI.axiosInstance
        .put(`${AxiosReqAPI.BaseURL}usuarios`, {
          id: User.id,
          email: User.email,
          cidade: CitySelected,
          estado: StateSelected,
        })
        .then(async (response) => {
          await setUser(response.data.Data);
        })
        .catch((error) => {
          console.log(error.request);
          console.log(error.response);
        });
    };

    await ReqAPIHandleSubmit();
    await ReqAPICityCurrent();
    await ReqAPIBarbers();
    setModalVisible(!modalVisible);
  };

  const handleFavorites = async (id_barbearia, favorito) => {
    console.log({
      id_usuario: User.id,
      id_barbearia: id_barbearia,
      favorito: favorito,
    });
    await AxiosReqAPI.axiosInstance
      .post(`${AxiosReqAPI.BaseURL}barbearia/vinculafavorito`, {
        id_usuario: User.id,
        id_barbearia: id_barbearia,
        favorito: favorito,
      })
      .then(async (response) => {
        await ReqAPIBarbers();
      })
      .catch((error) => {
        console.log(error.request);
      });
  };

  const Item = ({ props }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailsHome", {
          id: props.id,
          nome_barbearia: props.nome_barbearia,
          img_perfil_barbearia: props.img_perfil_barbearia,
        });
        // console.log({ id: props.id, nome_barbearia: props.nome_barbearia });
      }}
      style={s.ContainerBarber}
    >
      {props.img_perfil_barbearia ? (
        <Image
          style={s.LogoBarber}
          source={{
            uri: `${AxiosReqAPI.BaseURL}imgperfilbarber/${props.img_perfil_barbearia}`,
          }}
        />
      ) : (
        <Image
          style={s.LogoBarber}
          source={require("../../../assets/Images/Home/EllipseLogo.png")}
        />
      )}

      <Text style={s.NameBarber}>{props.nome_barbearia}</Text>
      <Image
        style={s.StarLogo}
        source={require("../../../assets/Images/Home/Star.png")}
      />
      <Text style={s.RateBarber}>{0}</Text>
      <Image
        style={s.LocationLogo}
        source={require("../../../assets/Images/Home/Location.png")}
      />
      <Text style={s.DistanceBarber}>{0}</Text>
      <TouchableOpacity
        style={s.FavorContainer}
        onPress={() =>
          handleFavorites(props.id, props.favorito === "S" ? "N" : "S")
        }
      >
        {props.favorito == "S" ? (
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
      <StatusBar style="light" />
      <View style={s.ContainerTopBar}>
        <Image
          style={s.Logo1}
          source={require("../../../assets/Images/Home/Location.png")}
        />
        <Text style={s.CityText}>{City.nome}</Text>
        <TouchableOpacity
          onPress={() => {
            ReqAPISearchState();
            setModalVisible(!modalVisible);
          }}
        >
          <Image
            style={s.Logo2}
            source={require("../../../assets/Images/Home/Vector.png")}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={s.Modal}>
          {/* ESTADO */}
          <Text style={s.TitleModal}>Alterando a localização</Text>
          <Text style={s.EstadoText}>Selecione seu estado</Text>
          <View style={s.BorderPickView}>
            <Picker
              style={s.PickInput}
              mode="dropdown"
              selectedValue={StateSelected}
              onValueChange={(itemValue, itemIndex) => {
                setStateSelected(itemValue);
              }}
            >
              {StatesLoaded ? (
                StatesLoaded.map((state) => {
                  return (
                    <Picker.Item
                      style={s.PickItemInput}
                      label={state.nome}
                      value={state.id}
                      key={state.id}
                    />
                  );
                })
              ) : (
                <ActivityIndicator size="large" color={Colors.ColorGold} />
              )}
            </Picker>
          </View>
          {/* ESTADO */}
          {/* CIDADE */}
          <Text style={s.EstadoText}>Selecione sua cidade</Text>
          <View style={s.BorderPickView}>
            <Picker
              style={s.PickInput}
              mode="dropdown"
              selectedValue={CitySelected}
              onValueChange={(itemValue, itemIndex) => setSelectMuni(itemValue)}
            >
              {CityLoaded ? (
                CityLoaded.map((state) => {
                  return (
                    <Picker.Item
                      style={s.PickItemInput}
                      label={state.nome}
                      value={state.id}
                      key={state.id}
                    />
                  );
                })
              ) : (
                <ActivityIndicator size="large" color={Colors.ColorGold} />
              )}
            </Picker>
          </View>
          {/* CIDADE */}
          <TouchableOpacity onPress={HandleSubmit} style={s.ButtonContainer}>
            <Text style={s.ContinueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={s.Title}>Barbearias</Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={Barbers}
        renderItem={({ item }) => <Item props={item} />}
        keyExtractor={(item) => item.id}
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
    borderRadius: 50,
    resizeMode: "center",
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
  Modal: {
    display: "flex",
    flexDirection: "column",
    height: 350,
    width: 290,
    backgroundColor: Colors.ColorWhite,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 13,
  },
  TitleModal: {
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    marginBottom: 30,
    alignSelf: "center",
    marginTop: 10,
  },
  EstadoText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    marginBottom: 15,
    alignSelf: "center",
    marginLeft: -120,
  },
  BorderPickView: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 275,
    paddingLeft: 20,
    marginBottom: 15,
  },
  PickInput: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 275,
    paddingLeft: 20,
    marginBottom: 15,
    marginVertical: -5,
  },
  PickItemInput: {
    color: Colors.ColorDeepBlue,
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
  },
  ButtonContainer: {
    alignSelf: "center",
    backgroundColor: Colors.ColorDeepBlue,
    borderRadius: 25,
    height: 50,
    width: 275,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  ContinueText: {
    color: Colors.ColorWhite,
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
  },
});
