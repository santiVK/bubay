import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";

export default function ChatScreen({ route }) {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim() === "") return;
    const newMessage = { id: Date.now().toString(), text, sender: "Yo" };
    setMessages([...messages, newMessage]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat con {user.name}</Text>
      <FlatList
        style={styles.messages}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.sender}: {item.text}</Text>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  messages: { flex: 1, marginBottom: 10 },
  message: { padding: 5, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginRight: 5 },
});
