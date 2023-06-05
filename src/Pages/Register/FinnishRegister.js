import { useCallback, useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { Snackbar } from "react-native-paper";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
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
import { AxiosReq } from "../../Shared/Axios";

export default function FinnishRegister({ navigation, route }) {
  const [StateSelected, setStateSelected] = useState(12); // Acre code
  const [StatesLoaded, setStatesLoaded] = useState("");
  const [CityLoaded, setCityLoaded] = useState("");
  const [CitySelected, setSelectMuni] = useState(2700201); // Acrelandia code
  const [NameSelected, setNameSelected] = useState("");
  const [SnackShow, setSnackShow] = useState(false);

  const { myBody } = route.params;
  useEffect(() => {
    try {
      const ReqAPI = async () => {
        const response = await AxiosReq.axiosInstance.get(
          `${AxiosReq.baseURLIBGE}localidades/estados?orderBy=nome`
        );
        setStatesLoaded(response.data);
      };

      ReqAPI();
    } catch (error) {
      if (error) {
        console.log(error.message, error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      const ReqAPI = async () => {
        const response = await AxiosReq.axiosInstance.get(
          `${AxiosReq.baseURLIBGE}localidades/estados/${StateSelected}/municipios`
        );
        setCityLoaded(response.data);
      };

      ReqAPI();
    } catch (error) {
      if (error) {
        console.log(error.message, error);
      }
    }
  }, [StateSelected]);

  const HandleSubmit = () => {
    if (!NameSelected | !StateSelected | !CitySelected) {
      return setSnackShow(true);
    }
    myBody["name"] = NameSelected;
    myBody["state"] = StateSelected;
    myBody["city"] = CitySelected;
    console.log(myBody);

    navigation.navigate("Home");
  };

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
      <SafeAreaView>
        <ScrollView>
          <StatusBar style="dark" />
          <Image
            style={s.Logo}
            source={require("../../../assets/Images/Login/Logo.png")}
          />
          {myBody.type === "Cliente" ? (
            <Text style={s.NameText}>Digite seu nome</Text>
          ) : (
            <Text style={s.NameText}>Digite o nome da barbearia</Text>
          )}
          <TextInput
            style={s.NameInput}
            autoFocus={true}
            inputMode="text"
            placeholder="Escreva aqui"
            onChangeText={setNameSelected}
          />
          {/* ESTADO */}
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
                <ActivityIndicator />
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
                <ActivityIndicator />
              )}
            </Picker>
          </View>
          {/* CIDADE */}
          <TouchableOpacity onPress={HandleSubmit} style={s.ButtonContainer}>
            <Text style={s.ContinueText}>Continue</Text>
          </TouchableOpacity>
          <Snackbar
            style={s.SnackBar}
            visible={SnackShow}
            duration={2500}
            onDismiss={() => {
              setSnackShow(false);
            }}
          >
            Preencha todos os dados!
          </Snackbar>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    flex: 1,
    backgroundColor: Colors.ColorWhite,
  },
  Logo: {
    alignSelf: "center",
    marginVertical: 80,
    width: 185,
    height: 67
  },
  NameText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
  },
  NameInput: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 350,
    paddingLeft: 20,
    marginBottom: 15,
  },
  EstadoText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
  },
  BorderPickView: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 350,
    paddingLeft: 20,
    marginBottom: 15,
  },
  PickInput: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 350,
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
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  ContinueText: {
    color: Colors.ColorWhite,
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
  },
  SnackBar: {
    alignSelf: "center",
    backgroundColor: Colors.ColorDeepBlue,
    borderRadius: 15,
    height: 50,
    width: 350,
    marginVertical: 480
    
  },
});
