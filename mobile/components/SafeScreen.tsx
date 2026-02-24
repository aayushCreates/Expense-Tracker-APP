import { COLORS } from "@/constants/colors";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ child }: {
  child: any;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      paddingTop: insets.top,
      flex: 1, 
      backgroundColor: COLORS.background
    }}>
      {
        child
      }
    </View>
  );
};

export default SafeScreen;
