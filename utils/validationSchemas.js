import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Format email salah').required('Email wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Nama minimal 3 karakter').required('Wajib diisi'),
  email: Yup.string().email('Format email salah').required('Wajib diisi'),
  password: Yup.string().min(8, 'Minimal 8 karakter').required('Wajib diisi'),
});