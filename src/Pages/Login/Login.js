import { useCallback, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
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
import { AxiosReqIBGE, AxiosReqAPI } from "../../Shared/Axios";
import UserContext from "../../Shared/UserContext";
import Toast from "react-native-root-toast";

export default function Login({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const { User, setUser } = useContext(UserContext);
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
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const HandleLogin = async () => {
    if (!Email | !Senha) {
      return Toast.show("Email ou senha não informados", {
        duration: Toast.durations.LONG,
        position: 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: Colors.ColorRed,
        textColor: Colors.ColorWhite,
      });
    }

    await AxiosReqAPI.axiosInstance
      .post(`${AxiosReqAPI.BaseURL}usuarios/login`, {
        email: Email,
        senha: Senha,
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.IDUsuario) {
            const UserData = await AxiosReqAPI.axiosInstance
              .get(
                `${AxiosReqAPI.BaseURL}usuarios/id/${response.data.IDUsuario}`
              )
              .catch((error) => {
                console.log(error.response.status);
              });

            await setUser(UserData.data);
            console.log(User);

            const ReqStore = async () => {
              try {
                const jsonValue = JSON.stringify(UserData.data);
                await AsyncStorage.setItem("UserData", jsonValue);
              } catch (e) {
                await AsyncStorage.removeItem("UserData");
              }
            };

            ReqStore();

            navigation.replace("Welcome");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            return Toast.show("Email ou senha incorretos", {
              duration: Toast.durations.LONG,
              position: 150,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
              backgroundColor: Colors.ColorRed,
              textColor: Colors.ColorWhite,
            });
          }
          if (error.response.status === 400) {
            return Toast.show("Erro ao efetuar Login", {
              duration: Toast.durations.LONG,
              position: 150,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
              backgroundColor: Colors.ColorRed,
              textColor: Colors.ColorWhite,
            });
          }
        }
      });
  };

  return (
    <View style={s.ContainerMain}>
      <SafeAreaView>
        <StatusBar style="dark" />
        <Image
          style={s.Logo}
          source={require("../../../assets/Images/Login/Logo.png")}
        />
        <Text style={s.LoginText}>Login</Text>
        <Text style={s.EmailText}>Digite seu email</Text>
        <TextInput
          style={s.EmailInput}
          onChangeText={setEmail}
          autoFocus={true}
          inputMode="email"
          placeholder="sac.barberx@gmail.com"
        />
        <Text style={s.SenhaText}>Digite sua senha</Text>
        <TextInput
          style={s.SenhaInput}
          onChangeText={setSenha}
          placeholder="Min. 8 Caracteres"
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <Text style={s.EsqueciSenhaText}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.ButtonContainer}
          onPress={() => HandleLogin()}
        >
          <Text style={s.ContinueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={s.CriarContaText}>Criar minha conta!</Text>
        </TouchableOpacity>
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
    height: 67,
  },
  LoginText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 36,
    alignSelf: "center",
    marginLeft: -250,
    marginBottom: 25,
  },
  EmailText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    alignSelf: "center",
    marginLeft: -220,
    marginBottom: 10,
  },
  SenhaText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    alignSelf: "center",
    marginLeft: -220,
    marginBottom: 10,
  },
  EmailInput: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 350,
    paddingLeft: 20,
    marginBottom: 15,
  },
  SenhaInput: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 350,
    paddingLeft: 20,
    marginBottom: 5,
  },
  EsqueciSenhaText: {
    color: Colors.ColorBlue,
    textDecorationLine: "underline",
    alignSelf: "center",
    marginRight: -210,
    marginBottom: 15,
    marginTop: 10,
  },
  ButtonContainer: {
    alignSelf: "center",
    backgroundColor: Colors.ColorDeepBlue,
    borderRadius: 25,
    height: 50,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  ContinueText: {
    color: Colors.ColorWhite,
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
  },
  CriarContaText: {
    color: Colors.ColorBlue,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  SnackBar: {
    alignSelf: "center",
    backgroundColor: Colors.ColorDeepBlue,
    borderRadius: 15,
    height: 50,
    width: 350,
    marginVertical: 480,
  },
});
