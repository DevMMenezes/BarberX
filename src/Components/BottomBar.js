import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../Shared/Colors";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Shared/AppContext";

export default function BottomBar({ props }) {
  const { CurrentScreen, setCurrentScreen } = useContext(AppContext);

  const Pages = {
    Home: "Home",
    Favorites: "Favorites",
    Schedule: "Schedule",
    Profile: "Profile",
  };

  const HandleHome = () => {
    setCurrentScreen("Home");
    props.navigate("Home");
  };
  const HandleFavorites = () => {
    setCurrentScreen("Favorites");
    props.navigate("Favorites");
  };
  const HandleSchedule = () => {
    setCurrentScreen("Schedule");
    props.navigate("Schedule");
  };
  const HandleProfile = () => {
    setCurrentScreen("Register");
    props.navigate("Register");
  };

  return (
    <View style={s.ContainerMain}>
      <TouchableOpacity onPress={HandleHome}>
        {CurrentScreen === Pages.Home ? (
          <Image
            style={{ width: 30, height: 43 }}
            source={require("../../assets/Images/Home/BtnHomeSelected.png")}
          />
        ) : (
          <Image
            style={{ width: 30, height: 43 }}
            source={require("../../assets/Images/Home/BtnHome.png")}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={HandleFavorites}>
        {CurrentScreen === Pages.Favorites ? (
          <Image
            style={{ width: 51, height: 43 }}
            source={require("../../assets/Images/Home/BtnFavoSelected.png")}
          />
        ) : (
          <Image
            style={{ width: 51, height: 43 }}
            source={require("../../assets/Images/Home/BtnFavo.png")}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={HandleSchedule}>
        {CurrentScreen === Pages.Schedule ? (
          <Image
            style={{ width: 65, height: 43 }}
            source={require("../../assets/Images/Home/BtnAgendaSelected.png")}
          />
        ) : (
          <Image
            style={{ width: 65, height: 43 }}
            source={require("../../assets/Images/Home/BtnAgenda.png")}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={HandleProfile}>
        {CurrentScreen === Pages.Profile ? (
          <Image
            style={{ width: 30, height: 43 }}
            source={require("../../assets/Images/Home/BtnPerfilSelected.png")}
          />
        ) : (
          <Image
            style={{ width: 30, height: 43 }}
            source={require("../../assets/Images/Home/BtnPerfil.png")}
          />
        )}
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
    marginTop: 2,
  },
});
