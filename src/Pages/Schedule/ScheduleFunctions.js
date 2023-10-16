import { AxiosReqIBGE, AxiosReqAPI } from "../../Shared/Axios";
import Toast from "react-native-root-toast";
import { Colors } from "../../Shared/Colors";

module.exports = {
  async HandleAgendar(
    navigator,
    id_barbearia,
    DateAgenda,
    horarioAgenda,
    NomeCliente,
    TelefoneUser,
    IdUser
  ) {
    if (
      !id_barbearia |
      !DateAgenda |
      !horarioAgenda |
      !NomeCliente |
      !TelefoneUser |
      !IdUser
    ) {
      return Toast.show("Dados do Agendamento Não Preenchidos", {
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
      .post(`${AxiosReqAPI.BaseURL}agenda`, {
        id_barbearia: id_barbearia,
        data_agendamento: DateAgenda,
        hora_agendada: horarioAgenda,
        nome_cliente: NomeCliente,
        telefone_cliente: TelefoneUser,
        id_usuario: IdUser,
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data) {
            Toast.show("Agendado com Sucesso", {
              duration: Toast.durations.LONG,
              position: 150,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
              backgroundColor: Colors.ColorGreen,
              textColor: Colors.ColorDeepBlue,
            });
          }
          return navigator.replace("Home");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          // if (error.response.status === 403) {
          //   return Toast.show("Email ou senha incorretos", {
          //     duration: Toast.durations.LONG,
          //     position: 150,
          //     shadow: true,
          //     animation: true,
          //     hideOnPress: true,
          //     delay: 0,
          //     backgroundColor: Colors.ColorRed,
          //     textColor: Colors.ColorWhite,
          //   });
          // }
          // if (error.response.status === 400) {
          //   return Toast.show("Erro ao efetuar Login", {
          //     duration: Toast.durations.LONG,
          //     position: 150,
          //     shadow: true,
          //     animation: true,
          //     hideOnPress: true,
          //     delay: 0,
          //     backgroundColor: Colors.ColorRed,
          //     textColor: Colors.ColorWhite,
          //   });
          // }
        }
      });
  },

  AdicionaZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  },

  
};
