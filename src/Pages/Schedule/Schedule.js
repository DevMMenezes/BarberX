import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../Shared/Colors";
import { Agenda } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Schedule({ navigation }) {
  return (
    <View>
      <Agenda
        items={{
          "2012-05-22": [{ name: "item 1 - any js object" }],
          "2012-05-23": [{ name: "item 2 - any js object", height: 80 }],
          "2012-05-24": [],
          "2012-05-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Agenda container style
        style={{}}
      />
    </View>
  );
}

const s = StyleSheet.create({
  ContainerMain: {
    backgroundColor: Colors.ColorWhite,
  },
});
