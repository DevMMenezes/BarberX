import { useCallback, useState } from "react";
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

export default function Register({ navigation }) {
  const [typeRegister, setTypeRegister] = useState(true);
  const [typeButton, setTypeButton] = useState("Cliente");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [spassword, setSpassword] = useState("");
  const [SnackShow, setSnackShow] = useState(false);
  const [SnackShowPass, setSnackShowPass] = useState(false);

  const SelectTypeRegisterClient = () => {
    setTypeRegister(!typeRegister);
    if (typeButton === "Cliente") {
      setTypeButton("Barbeiro");
    } else {
      setTypeButton("Cliente");
    }
  };

  const SelectTypeRegisterBarbeiro = () => {
    setTypeRegister(!typeRegister);
    if (typeButton === "Cliente") {
      setTypeButton("Barbeiro");
    } else {
      setTypeButton("Cliente");
    }
  };

  const HandleSubmit = () => {
    if (!email | !phone | !password | !spassword) {
      return setSnackShow(true);
    }
    if (password != spassword) {
      return setSnackShowPass(true);
    }

    let myBody = {
      email: email,
      phone: phone,
      password: password,
      type: typeButton,
    };

    navigation.navigate("FinnishRegister", { myBody: myBody });

    console.log(myBody);
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
          <Text style={s.SelecionarText}>Selecione um:</Text>
          <View style={s.ContainerSelect}>
            <TouchableOpacity
              style={
                typeRegister
                  ? s.ButtonContainerSelectBlack
                  : s.ButtonContainerSelectGray
              }
              onPress={SelectTypeRegisterClient}
              disabled={typeRegister}
            >
              <Text style={s.ContinueText}>Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                typeRegister
                  ? s.ButtonContainerSelectGray
                  : s.ButtonContainerSelectBlack
              }
              onPress={SelectTypeRegisterBarbeiro}
              disabled={!typeRegister}
            >
              <Text style={s.ContinueText}>Barbeiro</Text>
            </TouchableOpacity>
          </View>
          <Text style={s.EmailText}>Digite seu email</Text>
          <TextInput
            onChangeText={setEmail}
            style={s.EmailInput}
            autoFocus={true}
            inputMode="email"
            placeholder="sac.barberx@gmail.com"
          />
          <Text style={s.TelefoneText}>Digite seu Telefone</Text>
          <TextInput
            onChangeText={setPhone}
            style={s.EmailInput}
            inputMode="tel"
            placeholder="(00) 0 0000-0000"
          />
          <Text style={s.SenhaText}>Digite sua senha</Text>
          <TextInput
            onChangeText={setPassword}
            style={s.SenhaInput}
            placeholder="Min. 8 Caracteres"
            secureTextEntry={true}
          />
          <Text style={s.ConfirmaSenhaText}>Confirme sua senha</Text>
          <TextInput
            onChangeText={setSpassword}
            style={s.ConfirmaSenhaInput}
            placeholder="Conf. sua senha"
            secureTextEntry={true}
          />
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
          <Snackbar
            style={s.SnackBar}
            visible={SnackShowPass}
            duration={2500}
            onDismiss={() => {
              setSnackShowPass(false);
            }}
          >
            As senhas estão incorretas!
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
  SelecionarText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: -40,
  },
  ButtonContainerSelectBlack: {
    backgroundColor: Colors.ColorDeepBlue,
    borderRadius: 25,
    height: 50,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainerSelectGray: {
    backgroundColor: Colors.ColorGray,
    borderRadius: 25,
    height: 50,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  ContainerSelect: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
  },
  EmailText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
  },
  TelefoneText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
  },
  SenhaText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
  },
  ConfirmaSenhaText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
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
    marginBottom: 15,
  },
  ConfirmaSenhaInput: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.ColorGray,
    height: 45,
    width: 350,
    paddingLeft: 20,
    marginBottom: 20,
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
  SnackBar: {
    alignSelf: "center",
    backgroundColor: Colors.ColorDeepBlue,
    borderRadius: 15,
    height: 50,
    width: 350,
    marginVertical: 666,
  },
});
