import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormInput } from '../components/FormInput';
import { LoginSchema } from '../utils/validationSchemas';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

export default function LoginScreen({ onLoginSuccess, onGoToRegister }) {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const savedData = await AsyncStorage.getItem('@user_data');
        const user = savedData ? JSON.parse(savedData) : null;

        if (user && values.email === user.email && values.password === user.password) {
          onLoginSuccess();
        } else {
          Alert.alert('Gagal', 'Email atau Password salah!');
        }
      } catch (e) {
        Alert.alert('Error', 'Gagal membaca data');
      }
    },
  });

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Login</Text>
        <FormInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <FormInput
          label="Password"
          secureTextEntry
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
          <Text style={styles.btnText}>MASUK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGoToRegister} style={{ marginTop: 20 }}>
          <Text style={{ color: '#007AFF', textAlign: 'center' }}>Belum punya akun? Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});