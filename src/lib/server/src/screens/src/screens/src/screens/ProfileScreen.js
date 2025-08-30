import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const saveProfile = () => {
    alert(`Perfil guardado:\nNombre: ${name}\nEmail: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <Text>Nombre:</Text>
      <TextInput style={styles.input} placeholder="Tu nombre" value={name} onChangeText={setName} />
      <Text>Email:</Text>
      <TextInput style={styles.input} placeholder="Tu email" value={email} onChangeText={setEmail} />
      <Button title="Guardar Perfil" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginBottom: 15 },
});
