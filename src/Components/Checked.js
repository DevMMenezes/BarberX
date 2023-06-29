import { StyleSheet, View } from "react-native";
import { Colors } from "../Shared/Colors";

export default function Checked() {
  return (
    <View style={s.Checked}>
      <View style={s.Check}></View>
    </View>
  );
}

const s = StyleSheet.create({
  Checked: {
    backgroundColor: Colors.ColorWhite,
    width: 28,
    height: 28,
    borderRadius: 20,
    borderWidth: 1,
  },
  Check: {
    backgroundColor: Colors.ColorGold,
    position: "absolute",
    width: 23,
    height: 23,
    borderRadius: 20,
    right: 1.5,
    bottom: 1.5
  },
});
