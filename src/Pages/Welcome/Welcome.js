import * as Progress from "react-native-progress";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../Shared/Colors";

export default function Welcome({ navigation }) {
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
  },
  Logo: {
    alignSelf: "center",
    marginVertical: "65%",
    width: 303,
    height: 109
  },
  Progress: {
    alignSelf: "center",
  },
});
