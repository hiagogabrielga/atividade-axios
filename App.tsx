import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreens from "./screens/Home";
import FazendasScreens from "./screens/Fazendas";
import ProprietariosScreens from "./screens/Proprietarios";
import VacinasScreens from "./screens/Vacinas";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreens} />
        <Stack.Screen name="Fazendas" component={FazendasScreens} />
        <Stack.Screen name="Proprietarios" component={ProprietariosScreens} />
        <Stack.Screen name="Vacinas" component={VacinasScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

