import * as Progress from "react-native-progress";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../Shared/Colors";
import { useEffect,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosReqIBGE, AxiosReqAPI } from "../../Shared/Axios";
import UserContext from "../../Shared/UserContext";


export default function Welcome({ navigation }) {
  const { User, setUser } = useContext(UserContext);

  useEffect(() => {
    const ReqStore = async () => {
      try {
        const UserStore = await AsyncStorage.getItem("UserData");
        const UserStoreJSON = await JSON.parse(UserStore);

        if (UserStoreJSON) {
          const UserData = await AxiosReqAPI.axiosInstance
            .post(`${AxiosReqAPI.BaseURL}usuarios/verifica`, {
              id: UserStoreJSON.Data.id,
              senhaStore: UserStoreJSON.Data.senha,
            })
            .catch((error) => {
              console.log(error.response.status);
            });

          if (UserData.data.login) {
            await setUser(UserStoreJSON)
            return navigation.replace("Home");
          } else {
            return navigation.replace("Login");
          }
        } else return navigation.replace("Login");
      } catch (e) {
        await AsyncStorage.removeItem("UserData");
      }
    };

    ReqStore();
  }, []);

  return (
    <View style={s.ContainerMain}>
      <StatusBar style="light" />
      <Image
        style={s.Logo}
        source={require("../../../assets/Images/Welcome/Logo.png")}
      />
      <Progress.Bar
        style={s.Progress}
        color={Colors.ColorGold}
        unfilledColor={Colors.ColorWhite}
        progress={0.3}
        width={200}
        borderWidth={0}
        indeterminate={true}
      />
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    flex: 1,
    backgroundColor: Colors.ColorDeepBlue,
    justifyContent: "center",
  },
  Logo: {
    alignSelf: "center",
    marginBottom: 300,
    width: 303,
    height: 109,
  },
  Progress: {
    alignSelf: "center",
  },
});
