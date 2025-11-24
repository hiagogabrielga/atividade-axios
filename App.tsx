import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreens from "./screens/Home";
import FazendasScreens from "./screens/Fazendas";
import ProprietariosScreens from "./screens/Proprietarios";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreens} />
        <Drawer.Screen name="Fazendas" component={FazendasScreens} />
        <Drawer.Screen name="Proprietarios" component={ProprietariosScreens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

