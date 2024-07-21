import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as LocalAuthentication from "expo-local-authentication";
import { useAppDispatch, useAppSelector } from "../src/hooks/useRedux";
import { loginSlice } from "../redux/appSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type NavProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: NavProps) => {
  const isAuthenticated = useAppSelector((state) => state.login.loggedIn);
  const dispatch = useAppDispatch();

  const authenticate = async () => {
    const message = "Please set authentication method on your device";
    const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync();

    if (hasHardwareAuth === false) {
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert(message);
      }
    }

    if (!isAuthenticated) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        dispatch(loginSlice.actions.logIn());
      }
    } else {
      navigation.navigate("Transaction");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isAuthenticated
          ? "Welcome, authenticated user"
          : "Welcome, please authenticate to enter"}
      </Text>
      <TouchableOpacity hitSlop={16} onPress={authenticate}>
        <FontAwesome5
          name={isAuthenticated ? "arrow-circle-right" : "fingerprint"}
          size={64}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#0A1045",
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
