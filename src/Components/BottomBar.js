import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../Shared/Colors";

export default function BottomBar({ navigation }) {
  return (
    <View style={s.ContainerMain}>
      <TouchableOpacity>
        <Image
          style={{ width: 30, height: 43 }}
          source={require("../../assets/Images/Home/BtnHome.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={{ width: 51, height: 43 }}
          source={require("../../assets/Images/Home/BtnFavo.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={{ width: 65, height: 43 }}
          source={require("../../assets/Images/Home/BtnAgenda.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={{ width: 30, height: 43 }}
          source={require("../../assets/Images/Home/BtnPerfil.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorDeepBlue,
    height: 74,
    width: "100%",
    alignSelf: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    marginTop: 2
  },
});
