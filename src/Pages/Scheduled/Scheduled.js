import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Colors } from "../../Shared/Colors";
import BottomBar from "../../Components/BottomBar";
import UserContext from "../../Shared/UserContext";
import { AxiosReqIBGE, AxiosReqAPI } from "../../Shared/Axios";
import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";
var moment = require("moment/min/moment-with-locales");

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";

export default function Scheduled({ navigation }) {
  const { User, setUser } = useContext(UserContext);
  const [Agenda, setAgenda] = useState("");

  const ReqAPIBarbers = async () => {
    console.log("ReqAPIBarbersScheduled");
    const UserData = await AxiosReqAPI.axiosInstance
      .get(`${AxiosReqAPI.BaseURL}agenda/user/${1}`)
      .catch((error) => {
        console.log("error: " + error.response.status);
        console.log("error: ReqAPIBarbersScheduled");
      });
    if (UserData) {
      setAgenda(UserData.data.Data);
    } else {
      console.log(UserData);
    }
  };

  useEffect(() => {
    ReqAPIBarbers();
    console.log("verificando loopíng");
  }, []);

  return (
    <View style={s.ContainerMain}>
      <StatusBar style="dark" />
      <Text style={s.Title}>Agendamento</Text>
      <ScrollView>
        {Agenda ? (
          Agenda.map((state) => {
            let DataAgenda = moment(state.data_agendamento)
              .locale("pt-br")
              .format("LL");
            return (
              <View key={state.id} style={s.Card}>
                <View style={s.CardTop}>
                  <Image
                    style={s.Logo}
                    source={require("../../../assets/Images/Home/EllipseLogo.png")}
                  />
                  <Text style={s.TitleCard}>{state.barber.nome}</Text>
                </View>
                <Text style={s.TitleFalar}>Falar com a Barbearia</Text>
                <Divider />
                <View style={s.CardBot}>
                  <Text style={s.TitleDetalhes}>Detalhes do Agendamento</Text>

                  <Text style={s.TextDetalhes}>
                    {DataAgenda + " às " + state.hora_agendada}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <ActivityIndicator size="large" color={Colors.ColorGold} />
        )}
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
    color: Colors.ColorDeepBlue,
    fontSize: 25,
    fontWeight: 400,
    marginLeft: 22,
    marginTop: 50,
    marginBottom: 50,
  },
  Card: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: Colors.ColorGrayDisabled,
  },
  CardTop: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    borderColor: Colors.ColorGrayDisabled,
  },
  CardBot: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    borderColor: Colors.ColorGrayDisabled,
  },
  Logo: {
    alignSelf: "center",
    width: 50,
    height: 50,
  },
  TitleCard: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 20,
  },
  TitleFalar: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.ColorBlue,
    textDecorationLine: "underline",
    alignSelf: "center",
    marginBottom: 10,
  },
  TitleDetalhes: {
    marginTop: 3,
  },
  TextDetalhes: {
    fontSize: 13,
  },
});
