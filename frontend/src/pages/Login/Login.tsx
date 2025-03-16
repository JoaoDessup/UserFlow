import React from 'react';
import styles from './Login.module.scss';

import { loginSchema } from '../../validations/loginSchema';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

import AuthCard from '../../components/AuthCard/AuthCard';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

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
      navigate('/');
    } catch (error: any) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <AuthCard title='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.iptForm}>
          <input type="email" {...register('email')} placeholder="Email" />
          <div className={styles.iptError}>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>
        <div className={styles.iptForm}>
          <input type="password" {...register('password')} placeholder="Senha" />
          <div className={styles.iptError}>
          {errors.password && <p>{errors.password.message}</p>}
          </div>
          <p className={styles.forgot}>Esqueceu a senha?</p>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p className={styles.register}>Não possui conta? <a onClick={() => navigate('/register')}>Clique aqui.</a></p> 
    </AuthCard>

  );
};

export default Login;
