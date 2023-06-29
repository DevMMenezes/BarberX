import { StyleSheet, View } from "react-native";
import { Colors } from "../Shared/Colors";

export default function Unchecked() {
  return <View style={s.Unchecked}></View>;
}

const s = StyleSheet.create({
  Unchecked: {
    backgroundColor: Colors.ColorWhite,
    width: 28,
    height: 28,
    borderRadius: 20,
    borderWidth: 1,

  },
});
