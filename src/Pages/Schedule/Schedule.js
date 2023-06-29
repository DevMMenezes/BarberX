import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../Shared/Colors";
import HeaderDetails from "../../Components/HeaderDetails";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Divider } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { AxiosReqIBGE, AxiosReqAPI } from "../../Shared/Axios";
import Toast from "react-native-root-toast";
import UserContext from "../../Shared/UserContext";

export default function Schedule({ navigation, route }) {
  const { id, nome_barbearia, Barbearia } = route.params;
  const [SelectedDay, setSelectedDay] = useState("");
  const [agenda, setAgenda] = useState([]);
  const [agendaBarber, setagendaBarber] = useState([]);
  const [gridHorarios, setgridHorarios] = useState([]);
  const { User, setUser } = useContext(UserContext);
  const currentDate = new Date();
  const Today = new Date(currentDate.setDate(currentDate.getDate()));

  const ReqAPIBarbersAgenda = async () => {
    console.log("ReqAPIBarbersAgenda");
    const AgendarData = await AxiosReqAPI.axiosInstance
      .get(`${AxiosReqAPI.BaseURL}agenda/${id}`)
      .catch((error) => {
        console.log("error: " + error.response.status);
        console.log("error: ReqAPIBarbersAgenda");
      });

    if (AgendarData) {
      setAgenda(AgendarData);
      setgridHorarios(AgendarData.data.GridHorariosArray);
    } else {
      setAgenda([]);
      setgridHorarios([]);
    }
  };

  const ReqAPIBarbersAgendaBarber = async (
    id_barbearia,
    id_usuario,
    data_agendamento
  ) => {
    console.log("ReqAPIBarbersAgenda");
    const AgendarData = await AxiosReqAPI.axiosInstance
      .get(
        `${AxiosReqAPI.BaseURL}agenda/${id_barbearia}/${id_usuario}/${data_agendamento}`
      )
      .catch((error) => {
        console.log("error: " + error.response.status);
        // console.log(error.response);
        console.log("error: ReqAPIBarbersAgenda");
      });

    if (AgendarData) {
      setagendaBarber(AgendarData);
      setgridHorarios(AgendarData.data.GridHorariosArray);
    } else {
      setAgenda([]);
      setgridHorarios([]);
    }
  };

  Barbearia.barbearia_usuario.length > 0
    ? useEffect(() => {
        setSelectedDay(Today);
        console.log("entrou");
        console.log(
          Barbearia.barbearia_usuario[0].UsuarioBarbeariaModels.id_barbearia
        );
        console.log(
          Barbearia.barbearia_usuario[0].UsuarioBarbeariaModels.id_usuario
        );
        console.log(Today);
        ReqAPIBarbersAgendaBarber(
          Barbearia.barbearia_usuario[0].UsuarioBarbeariaModels.id_barbearia,
          Barbearia.barbearia_usuario[0].UsuarioBarbeariaModels.id_usuario,
          Today
        );
      }, [])
    : useEffect(() => {
        ReqAPIBarbersAgenda();
        setSelectedDay(Today);
      }, []);

  LocaleConfig.locales.br = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan.",
      "Fev.",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul.",
      "Ago",
      "Set.",
      "Out.",
      "Nov.",
      "Dez.",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  };
  LocaleConfig.defaultLocale = "br";

  return (
    <View style={s.ContainerMain}>
      <StatusBar style="dark" />
      <ScrollView>
        <HeaderDetails props={nome_barbearia} />
        <Calendar
          theme={{
            todayTextColor: Colors.ColorDeepBlue,
            todayBackgroundColor: Colors.ColorGold,
            arrowColor: Colors.ColorDeepBlue,
          }}
          minDate={`${Today}`}
          onDayPress={(day) => {
            setSelectedDay(day.dateString);
          }}
          markedDates={{
            [SelectedDay]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: Colors.ColorDeepBlue,
            },
          }}
        />
        <Divider />
        {Barbearia.barbearia_usuario.length > 0 ? (
          <Text style={s.BarberDispText}>Barbeiros Disponíveis</Text>
        ) : null}
        {Barbearia.barbearia_usuario ? (
          <ScrollView
            horizontal={true}
            style={
              Barbearia.barbearia_usuario.length > 0
                ? s.ContainerImages
                : s.ContainerImagesWithoutMargin
            }
          >
            {Barbearia.barbearia_usuario.map((value) => {
              // console.log(value.id_usuario);
              // console.log(value.UsuarioBarbeariaModels);
              return value.img_perfil ? (
                <TouchableOpacity
                  key={value.id}
                  onPress={() => {
                    console.log(SelectedDay);

                    ReqAPIBarbersAgendaBarber(
                      value.UsuarioBarbeariaModels.id_barbearia,
                      value.UsuarioBarbeariaModels.id_usuario,
                      SelectedDay
                    );
                  }}
                >
                  <Avatar.Image
                    size={105}
                    style={s.Logo}
                    source={{
                      uri: `${AxiosReqAPI.BaseURL}imgperfil/${value.img_perfil}`,
                    }}
                  />
                  <Text style={{ fontSize: 20, alignSelf: "center" }}>
                    {value.nome}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    ReqAPIBarbersAgendaBarber(
                      value.UsuarioBarbeariaModels.id_barbearia,
                      value.UsuarioBarbeariaModels.id_usuario
                    );
                  }}
                  key={value.id}
                >
                  <Avatar.Image
                    size={105}
                    style={s.Logo}
                    source={require("../../../assets/Images/Home/EllipseLogo.png")}
                  />
                  <Text style={{ fontSize: 20, alignSelf: "center" }}>
                    {value.nome}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
        <Divider />

        <Text style={s.HorarioDispText}>Horários Disponíveis</Text>

        <View style={s.ContainerHorarios}>
          {gridHorarios ? (
            gridHorarios.map((value) => {
              return (
                <TouchableOpacity
                  disabled={value.status === "Ocupado" ? true : false}
                  key={value.horario}
                >
                  <View
                    style={
                      value.status === "Ocupado"
                        ? s.TextHorario
                        : s.TextHorarioDisabled
                    }
                  >
                    <Text
                      style={
                        value.status === "Ocupado"
                          ? s.TextHorasDisabled
                          : s.TextHoras
                      }
                    >
                      {value.horario}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <ActivityIndicator
              size="large"
              color={Colors.ColorGold}
              style={{ alignSelf: "center" }}
            />
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          Toast.show("Testando agora a funcao", {
            duration: Toast.durations.LONG,
            position: 70,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }}
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
          Finalizar Agendamento
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorWhite,
    flex: 1,
  },
  BarberDispText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 22,
    marginTop: 10,
  },
  HorarioDispText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 22,
    marginBottom: 10,
    marginTop: 10,
  },
  Logo: {
    resizeMode: "center",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.ColorWhite,
    margin: 5,
  },
  ContainerImages: {
    marginTop: 10,
    marginHorizontal: 10,
    height: 150,
  },
  ContainerImagesWithoutMargin: {
    marginHorizontal: 10,
  },
  ContainerHorarios: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  TextHorario: {
    width: 110,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: Colors.ColorGrayDisabled,
    borderRadius: 5,
  },
  TextHorarioDisabled: {
    width: 110,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: Colors.ColorGold,
  },
  TextHoras: {
    fontSize: 16,
    fontWeight: "bold",
  },
  TextHorasDisabled: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.ColorDeepBlue,
    opacity: 0.5,
  },
});
