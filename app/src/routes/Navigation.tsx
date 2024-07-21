import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TransactionScreen from "../../views/TransactionScreen";
import TransactionDetail from "../../views/TransactionDetail";
import Login from "../../views/Login";
import LogoutButton from "../../components/LogoutButton";

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#D6AD60",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Transaction"
          component={TransactionScreen}
          options={(navigation) => ({
            headerBackVisible: false,
            headerRight: () => <LogoutButton {...navigation} />,
          })}
        />
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
