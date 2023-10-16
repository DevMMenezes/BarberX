import * as React from "react";
import { useContext } from "react";
import { Colors } from "../../Shared/Colors";
import BottomBar from "../../Components/BottomBar";
import UserContext from "../../Shared/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native";

export default function Profile({ navigation }) {
  const { User, setUser } = useContext(UserContext);
  return (
    <View style={s.ContainerMain}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={s.Title}>
          <Image
            style={s.Logo}
            source={require("../../../assets/Images/Home/EllipseLogo.png")}
          />
          <Text style={s.TitleText}>{User.nome ? User.nome : "Usuário"}</Text>
        </View>
        <Text style={s.TitleCat}>Minha Conta</Text>
        <TouchableOpacity style={s.Cat1}>
          <Text style={s.CatText}>Dados Pessoais</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={s.Cat1}>
          <Text style={s.CatText}>Meus Endereços</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={s.Cat1}>
          <Text style={s.CatText}>Mudar Número</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={s.Cat1End}>
          <Text style={s.CatText}>Mudar Senha</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        {/*CATEGORIA AJUSTES*/}
        <Text style={s.TitleCat}>Ajustes</Text>
        <TouchableOpacity style={s.Cat1}>
          <Text style={s.CatText}>Notificações</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={s.Cat1End}>
          <Text style={s.CatText}>Privacidade</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        <Text style={s.TitleCat}>Sobre Nós</Text>
        <TouchableOpacity style={s.Cat1}>
          <Text style={s.CatText}>Notificações</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={s.Cat1}>
          <Text style={s.CatText}>Privacidade</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={s.Cat1End}
          onPress={async () => {
            await AsyncStorage.removeItem("UserData");
            navigation.replace("Login");
          }}
        >
          <Text style={s.CatText}>Sair</Text>
          <Image
            style={s.ForwardButton}
            source={require("../../../assets/Images/DetailsHome/GoBack.png")}
          />
        </TouchableOpacity>
      </ScrollView>
      <BottomBar props={navigation} />
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    flex: 1,
    backgroundColor: Colors.ColorWhite,
  },
  Title: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 22,
    marginTop: 50,
    marginBottom: 50,
  },
  Logo: {
    alignSelf: "center",
    width: 70,
    height: 70,
  },
  TitleText: {
    color: Colors.ColorDeepBlue,
    fontSize: 25,
    marginHorizontal: 24,
    marginBottom: 13,
    marginTop: 15,
    alignSelf: "center",
  },
  TitleCat: {
    color: Colors.ColorDeepBlue,
    fontSize: 23,
    marginHorizontal: 24,
    marginBottom: 13,
  },
  Cat1End: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginLeft: 15,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  Cat1: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  CatText: { fontSize: 20, fontWeight: "300" },
  ForwardButton: {
    width: 40,
    height: 20,
    alignSelf: "center",
    transform: [{ rotate: "180deg" }],
  },
});
