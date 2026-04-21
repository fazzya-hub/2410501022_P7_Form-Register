import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const FormInput = ({ label, error, touched, ...rest }) => {
  const isError = touched && error;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isError && styles.inputError]}
        placeholderTextColor="#999"
        {...rest}
      />
      {isError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, backgroundColor: '#fff' },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
});