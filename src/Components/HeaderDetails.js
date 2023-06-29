import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { Colors } from "../Shared/Colors";
import { useNavigation } from "@react-navigation/native";

export default function HeaderDetails({ props }) {
  const { goBack } = useNavigation();
  return (
    <View style={s.ContainerMain}>
      <TouchableOpacity onPress={() => goBack()}>
        <Image
          style={s.Logo}
          source={require("../../assets/Images/DetailsHome/GoBack.png")}
        />
      </TouchableOpacity>
      <Text style={s.TitleHeader}>{props}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorWhite,
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  Logo: {
    width: 48,
    height: 48,
    margin: 10,
  },
  TitleHeader: {
    fontFamily: "DMSans_500Medium",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 7,
  },
});
