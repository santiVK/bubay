import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../lib/config";

export default function ChatScreen({ route }) {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  useEffect(() => {
    const subscription = supabase
      .from(`messages:receiver=eq.${user.name}`)
      .on("INSERT", (payload) => setMessages((prev) => [...prev, payload.new]))
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await supabase.from("messages").insert([{ sender: "Yo", receiver: user.name, content: text }]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat con {user.name}</Text>
      <FlatList
        style={styles.messages}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.message}>{item.sender}: {item.content}</Text>}
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
