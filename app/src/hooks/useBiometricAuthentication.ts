import * as LocalAuthentication from "expo-local-authentication";
import { Alert, Platform, ToastAndroid } from "react-native";
import { loginSlice } from "../../redux/appSlice";
import { useAppSelector, useAppDispatch } from "./useRedux";

interface useBiometricAuthenticationProps {
  onSuccess?: () => void;
  onUserAuthenticated?: () => void;
}

const useBiometricAuthentication = (props: useBiometricAuthenticationProps) => {
  const { onSuccess, onUserAuthenticated } = props;
  const isAuthenticated = useAppSelector((state) => state.login.loggedIn);
  const isAndroid = Platform.OS === "android";

  const authenticateFirstTime = async () => {
    const message = "Please set authentication method on your device";
    const hasHardwareAuth =
      (await LocalAuthentication.hasHardwareAsync()) &&
      (await LocalAuthentication.isEnrolledAsync());

    if (hasHardwareAuth === false) {
      if (isAndroid) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert(message);
      }
    }

    if (
      !isAuthenticated &&
      (await LocalAuthentication.authenticateAsync()).success
    ) {
      onSuccess?.();
    } else if (isAuthenticated) {
      onUserAuthenticated?.();
    }
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    return result.success;
  };

  return { authenticate, authenticateFirstTime, isAuthenticated };
};

export default useBiometricAuthentication;
