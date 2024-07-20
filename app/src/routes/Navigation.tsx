import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TransactionScreen from "../../views/TransactionScreen";
import TransactionDetail from "../../views/TransactionDetail";
import Login from "../../views/Login";
import { SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen
          name="TransactionDetails"
          options={{ title: "Transaction Details" }}
          component={TransactionDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
