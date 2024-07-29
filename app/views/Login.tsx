import { Platform, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../src/hooks/useRedux";
import { loginSlice } from "../redux/appSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MAIN_COLORS } from "../constants/colors";
import useBiometricAuthentication from "../src/hooks/useBiometricAuthentication";

type NavProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: NavProps) => {
  const dispatch = useAppDispatch();
  const isAndroid = Platform.OS === "android";

  const onSuccess = () => {
    dispatch(loginSlice.actions.logIn());
    navigation.navigate("Transaction");
  };

  const onUserAuthenticated = () => navigation.navigate("Transaction");

  const { authenticateFirstTime, isAuthenticated } = useBiometricAuthentication(
    {
      onSuccess,
      onUserAuthenticated,
    }
  );

  const renderIcon = () => {
    const iconProps = { size: 64, color: "white" };

    if (isAuthenticated) {
      return <FontAwesome5 name="arrow-circle-right" {...iconProps} />;
    } else if (isAndroid) {
      return <FontAwesome5 name="fingerprint" {...iconProps} />;
    } else {
      return <MaterialCommunityIcons name="face-recognition" {...iconProps} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isAuthenticated
          ? "Welcome, authenticated user"
          : "Welcome, please authenticate to enter"}
      </Text>
      <TouchableOpacity hitSlop={16} onPress={authenticateFirstTime}>
        {renderIcon()}
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: MAIN_COLORS.BACKGROUND_COLOR,
    height: "100%",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 32,
    fontSize: 24,
    textAlign: "center",
  },
});
