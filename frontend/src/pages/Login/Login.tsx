import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../validations/loginSchema';
import { z } from 'zod';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type LoginData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      const token = response.data.token;
      login(token);
      navigate('/home');
    } catch (error: any) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <div>
      <h2>Loginn</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" {...register('password')} placeholder="Senha" />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
