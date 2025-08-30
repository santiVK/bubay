import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../lib/config";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function HomeScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from("profiles").select("*");
      if (data) setUsers(data);
    };
    fetchUsers();
  }, []);

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
            coordinate={{ latitude: user.latitude || 40.4168, longitude: user.longitude || -3.7038 }}
            title={user.name}
            description="Haz clic para chatear"
            onCalloutPress={() => navigation.navigate("Chat", { user })}
          />
        ))}
      </MapView>
      <Button title="Mi Perfil" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { textAlign: "center", fontSize: 18, marginVertical: 10 },
  map: { flex: 1 },
});
