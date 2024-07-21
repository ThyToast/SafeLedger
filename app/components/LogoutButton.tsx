import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch } from "../src/hooks/useRedux";
import { loginSlice } from "../redux/appSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type NavProps = NativeStackScreenProps<RootStackParamList>;

const LogoutButton = ({ navigation }: NavProps) => {
  const dispatch = useAppDispatch();
  const onPress = () => {
    dispatch(loginSlice.actions.logOut());
    navigation.popToTop();
  };
  return (
    <FontAwesome name="sign-out" size={24} color="white" onPress={onPress} />
  );
};

export default LogoutButton;
