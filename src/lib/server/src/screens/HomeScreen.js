import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([
    { id: 1, name: "Juan", latitude: 40.4168, longitude: -3.7038 },
    { id: 2, name: "María", latitude: 40.4268, longitude: -3.7138 }
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios entre vecinos (Bubay)</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.4168,
          longitude: -3.7038,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {users.map((user) => (
          <Marker
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            title={user.name}
            description="Haz clic para chatear"
            onCalloutPress={() => navigation.navigate("Chat", { user })}
          />
        ))}
      </MapView>
      <Button
        title="Mi Perfil"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
});
