import * as React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar, Title } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { List } from "react-native-paper";

import { Colors } from "../../Shared/Colors";
import HeaderDetails from "../../Components/HeaderDetails";
import Unchecked from "../../Components/Unchecked";
import Checked from "../../Components/Checked";
import { AxiosReqIBGE, AxiosReqAPI } from "../../Shared/Axios";
import Toast from "react-native-root-toast";

export default function DetailsHome({ navigation, route }) {
  const { id, nome_barbearia, img_perfil_barbearia } = route.params;
  const [expanded, setExpanded] = useState([]);
  const [Barbearia, setBarbearia] = useState([]);
  const [ConfigBarbearia, setConfigBarbearia] = useState([]);
  const [Procedimentos, setProcedimentos] = useState([]);
  const [dataCheck, setdataCheck] = useState([]);
  const [sumProcedimentos, setSumProcedimentos] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  const handlePress = (index) => {
    if (expanded.includes(index)) {
      const indexArray = expanded.indexOf(index);
      expanded.splice(indexArray, 1);
      setExpanded([...expanded]);
    } else {
      expanded.push(index);
      setExpanded([...expanded]);
    }
  };

  useEffect(() => {
    ReqAPIBarber();
  }, []);

  const handleContinue = () => {
    console.log("datachec");
    console.log(dataCheck);
    if (dataCheck.length <= 0) {
      return Toast.show("Selecione algum procedimento", {
        duration: Toast.durations.LONG,
        position: 90,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: Colors.ColorRed,
        textColor: Colors.ColorWhite,
      });
    } else {
      return navigation.navigate("Schedule", {
        id,
        nome_barbearia,
        sumProcedimentos,
        Barbearia
      });
    }
  };
  const toggleCheck = (index, price) => {
    if (dataCheck.includes(index)) {
      const indexArray = dataCheck.indexOf(index);
      dataCheck.splice(indexArray, 1);
      setdataCheck([...dataCheck]);

      setSumProcedimentos(parseFloat(sumProcedimentos) - parseFloat(price));
    } else {
      dataCheck.push(index);
      setdataCheck([...dataCheck]);
      setSumProcedimentos(parseFloat(sumProcedimentos) + parseFloat(price));
    }
  };

  const Item = ({ props }) => {
    return (
      <List.Accordion
        style={{
          backgroundColor: Colors.ColorWhite,
          width: "100%",
        }}
        titleStyle={{
          color: Colors.ColorDeepBlue,
          backgroundColor: Colors.ColorWhite,
          fontSize: 22,
          fontWeight: "bold",
        }}
        expanded={expanded.includes(props.id) ? true : false}
        onPress={() => handlePress(props.id)}
        title={props.ProcedimentosModels.length > 0 ? props.nome_secao : null}
      >
        {props.ProcedimentosModels.map((value) => (
          <TouchableOpacity
            key={value.id}
            style={s.BtnItem}
            onPress={() => toggleCheck(value.id, value.preco_procedimento)}
          >
            <List.Item
              titleStyle={{
                color: Colors.ColorDeepBlue,
                backgroundColor: Colors.ColorWhite,
                fontSize: 20,
                height: 35,
              }}
              title={value.nome_procedimentos}
            />
            <View style={{ position: "absolute", bottom: 0, left: 19 }}>
              <Text style={{ color: Colors.ColorGreen }}>{`${Number.parseFloat(
                value.preco_procedimento
              ).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}`}</Text>
            </View>

            <View style={{ position: "absolute", right: 20, bottom: 17 }}>
              {dataCheck.includes(value.id) ? <Checked /> : <Unchecked />}
            </View>
          </TouchableOpacity>
        ))}
      </List.Accordion>
    );
  };

  const ReqAPIBarber = async () => {
    await AxiosReqAPI.axiosInstance
      .get(`${AxiosReqAPI.BaseURL}barbearia/id/${id}`)
      .then((response) => {
        setProcedimentos(response.data.DataProcedimentos);
        setBarbearia(response.data.Data);
        setConfigBarbearia(response.data.DataConfigBarbearia);
        setisLoading(false);
      })
      .catch((error) => {
        console.log("error: " + error.response.status);
      });
  };
  return (
    <View style={s.ContainerMain}>
      <StatusBar style="dark" />
      {!isLoading ? (
        <ScrollView>
          <HeaderDetails props={nome_barbearia} />
          <Image
            style={s.Fundo}
            source={require("../../../assets/Images/DetailsHome/Fundo.png")}
          />
          {img_perfil_barbearia ? (
            <Avatar.Image
              size={147}
              style={s.Logo}
              source={{
                uri: `${AxiosReqAPI.BaseURL}imgperfilbarber/${img_perfil_barbearia}`,
              }}
            />
          ) : (
            <Avatar.Image
              size={147}
              style={s.Logo}
              source={require("../../../assets/Images/Home/EllipseLogo.png")}
            />
          )}
          {Date > ConfigBarbearia.horario_abertura &&
          ConfigBarbearia.horario_pausa_ini < Date ? (
            <Text style={s.TextBarbeariaAberta}>Barbearia Aberta</Text>
          ) : Date > ConfigBarbearia.horario_pausa_fin &&
            ConfigBarbearia.horario_fechamento < Date ? (
            <Text style={s.TextBarbeariaAberta}>Barbearia Aberta</Text>
          ) : (
            <Text style={s.TextBarbeariaFechada}>Barbearia Fechada</Text>
          )}

          <Text style={s.TextHoraFechamento}>{`Fecha às ${
            Date > ConfigBarbearia.horario_abertura &&
            ConfigBarbearia.horario_pausa_ini < Date
              ? ConfigBarbearia.horario_pausa_ini
              : ConfigBarbearia.horario_fechamento
          }`}</Text>
          <FlatList
            data={Procedimentos}
            renderItem={({ item }) => <Item props={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          color={Colors.ColorGold}
          style={{ alignSelf: "center", marginTop: "100%" }}
        />
      )}

      <TouchableOpacity
        onPress={() => handleContinue()}
        style={{
          alignSelf: "center",
          backgroundColor: Colors.ColorDeepBlue,
          borderRadius: 25,
          height: 50,
          width: 350,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: Colors.ColorWhite,
            fontSize: 16,
          }}
        >
          Continuar
        </Text>
        <Text
          style={{
            color: Colors.ColorWhite,
            fontSize: 15,
          }}
        >
          {parseFloat(sumProcedimentos).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorWhite,
    height: "100%",
  },
  Fundo: {
    height: 125,
    width: "100%",
    marginTop: 10,
  },
  Logo: {
    height: 150,
    width: 150,
    resizeMode: "center",
    position: "absolute",
    alignSelf: "center",
    marginTop: 149,
    borderWidth: 2,
    borderColor: Colors.ColorWhite,
    borderRadius: 100,
  },
  TextBarbeariaAberta: {
    alignSelf: "center",
    fontFamily: "DMSans_400Regular_Italic",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.ColorGreen,
    marginTop: 90,
  },
  TextBarbeariaFechada: {
    alignSelf: "center",
    fontFamily: "DMSans_400Regular_Italic",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.ColorRed,
    marginTop: 90,
  },
  TextHoraFechamento: {
    alignSelf: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    marginTop: 3,
    marginBottom: 15,
  },
  BtnItem: {},
});
