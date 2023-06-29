import { Colors } from "../Shared/Colors";
import Toast from "react-native-root-toast";

export default function ToastMSG(props) {
   Toast.show(props, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}
