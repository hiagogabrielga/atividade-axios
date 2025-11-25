import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export default function HomeScreens() {
  type RootStackParamList = {
    Home: undefined;
    Fazendas: undefined;
    Proprietarios: undefined;
    Vacinas: undefined;
  };

  type NavProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Vacinação</Text>
      <Text style={styles.subtitulo}>
        Controle de fazendas, proprietários e muito mais
      </Text>

      <View style={styles.areaCards}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Fazendas")}
        >
          <Text style={styles.cardTitulo}>Fazendas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Proprietarios")}
        >
          <Text style={styles.cardTitulo}>Proprietários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Vacinas")}
        >
          <Text style={styles.cardTitulo}>Vacinas</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F0FA",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1B4F72",
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 16,
    color: "#2E86C1",
    marginTop: 5,
    marginBottom: 30,
    textAlign: "center",
  },

  areaCards: {
    width: "100%",
    marginTop: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 6,
    borderLeftColor: "#2980B9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4F72",
  },
});
