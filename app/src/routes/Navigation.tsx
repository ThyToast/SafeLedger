import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../views/Login";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <SafeAreaView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default NavigationStack;
