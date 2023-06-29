import { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
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
import Toast from "react-native-root-toast";
import { Colors } from "../../Shared/Colors";

export default function Register({ navigation }) {
  const [typeRegister, setTypeRegister] = useState(true);
  const [typeButton, setTypeButton] = useState("Cliente");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [spassword, setSpassword] = useState("");


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
      return Toast.show("Preencha todos os dados", {
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
    if (password != spassword) {
      return Toast.show("Senhas estão diferentes", {
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

    let myBody = {
      email: email,
      telefone: phone,
      senha: password,
      tipo: typeButton,
    };

    console.log(myBody);

    navigation.navigate("FinnishRegister", { myBody: myBody });
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
      // await SplashScreen.hideAsync();
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
    height: 67,
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
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainerSelectGray: {
    backgroundColor: Colors.ColorGray,
    borderRadius: 25,
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  ContainerSelect: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginLeft: 5,
    marginRight: 5,
  },
  EmailText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginBottom: 15,
    alignSelf: "center",
    marginLeft: -220,
  },
  TelefoneText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginBottom: 15,
    alignSelf: "center",
    marginLeft: -200,
  },
  SenhaText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginBottom: 15,
    alignSelf: "center",
    marginLeft: -220,
  },
  ConfirmaSenhaText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginBottom: 15,
    alignSelf: "center",
    marginLeft: -200,
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
    marginBottom: 30,
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
