import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const HomeScreen = ({ onLogout }) => {
  const [name, setName] = useState('');
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('@user_data');
      if (data) setName(JSON.parse(data).name);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Selamat Datang,</Text>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={onLogout} style={styles.logout}>
        <Text style={{ color: 'red' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [screen, setScreen] = useState('Login');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {screen === 'Login' && <LoginScreen onLoginSuccess={() => setScreen('Home')} onGoToRegister={() => setScreen('Register')} />}
      {screen === 'Register' && <RegisterScreen onGoToLogin={() => setScreen('Login')} />}
      {screen === 'Home' && <HomeScreen onLogout={() => setScreen('Login')} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 20 },
  name: { fontSize: 30, fontWeight: 'bold', color: '#007AFF' },
  logout: { marginTop: 20, padding: 10, borderWidth: 1, borderColor: 'red', borderRadius: 5 }
});

const checkDatabase = async () => {
  try {
    const data = await AsyncStorage.getItem('@user_data');
    if (data !== null) {
      // 1. Muncul di layar HP (Pop-up)
      alert("Data Ketemu: " + data); 
      // 2. Muncul di terminal
      console.log("ISI DATABASE LOKAL:", JSON.parse(data));
    } else {
      alert("Database Kosong! Belum ada data tersimpan.");
    }
  } catch (error) {
    alert("Error membaca data: " + error);
  }
};