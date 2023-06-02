import { useCallback } from "react";
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

export default function Login({ navigation }) {
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
        <StatusBar style="dark" />
        <Image
          style={s.Logo}
          source={require("../../../assets/Images/Login/Logo.png")}
        />
        <Text style={s.LoginText}>Login</Text>
        <Text style={s.EmailText}>Digite seu email</Text>
        <TextInput
          style={s.EmailInput}
          autoFocus={true}
          inputMode="email"
          placeholder="sac.barberx@gmail.com"
        />
        <Text style={s.SenhaText}>Digite sua senha</Text>
        <TextInput
          style={s.SenhaInput}
          placeholder="Min. 8 Caracteres"
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <Text style={s.EsqueciSenhaText}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.ButtonContainer}>
          <Text style={s.ContinueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
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
    height: 67
  },
  LoginText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 36,
    marginLeft: 20,
    marginBottom: 20,
  },
  EmailText: {
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
    textAlign: "right",
    marginRight: 20,
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
  CriarContaText: {
    color: Colors.ColorBlue,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
});
