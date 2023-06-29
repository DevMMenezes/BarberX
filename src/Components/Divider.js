import { StyleSheet, Image } from "react-native";

export default function Divider() {
  return (
    <Image
      style={s.Divider}
      source={require("../../assets/Images/Home/Divider.png")}
    />
  );
}

const s = StyleSheet.create({
  Divider: {
    position: "absolute",
    bottom: -5,
    width: "97%",
    height: 1,
    right: 3,
  },
});
