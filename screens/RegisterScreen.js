import React, { useState } from 'react';
import { 
  ScrollView, View, Text, StyleSheet, TouchableOpacity, 
  Image, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormInput } from '../components/FormInput';
import { RegisterSchema } from '../utils/validationSchemas';

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

export default function RegisterScreen({ onGoToLogin }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Gagal akses galeri karena gak dapet izin.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],      
      quality: 0.5,       
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const userData = { ...values, profileImage: image };
        await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
        
        Alert.alert('Sukses', 'Registrasi & Foto Berhasil Disimpan!', [
          { text: 'OK', onPress: onGoToLogin }
        ]);
      } catch (e) {
        Alert.alert('Error', 'Gagal simpen data');
      }
    },
  });

  return (
    <KeyboardAvoidingView behavior={BEHAVIOR} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Daftar Akun</Text>
        
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={{ fontSize: 12 }}>Pilih Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <FormInput 
          label="Nama Lengkap" 
          onChangeText={formik.handleChange('name')} 
          onBlur={formik.handleBlur('name')}
          value={formik.values.name} 
          error={formik.errors.name} 
          touched={formik.touched.name} 
        />

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
          <Text style={styles.btnText}>DAFTAR SEKARANG</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onGoToLogin} style={{ marginTop: 15 }}>
          <Text style={{ color: '#007AFF', textAlign: 'center' }}>Balik ke Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  imagePicker: { alignSelf: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  placeholder: { 
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#eee', 
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle: 'dashed' 
  },
  btn: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});