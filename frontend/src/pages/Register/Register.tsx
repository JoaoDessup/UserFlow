import React from 'react';
import styles from './Register.module.scss';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../validations/registerSchema';
import { registerUser } from '../../services/authService';

import AuthCard from '../../components/AuthCard/AuthCard';
import { useNavigate } from 'react-router-dom';

type RegisterData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.error) {
        alert(`Erro: ${error.response.data.error}`);
      } else {
        alert('Erro inesperado ao cadastrar usuário.');
      }
    }
  };

  return (
    <AuthCard title="Cadastro" height='425px'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.iptForm}>
          <input type="text" placeholder="Nome" {...register('name')} />
          <div className={styles.iptError}>
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        </div>

        <div className={styles.iptForm}>
          <input type="text" placeholder="Sobrenome" {...register('lastName')} />
          <div className={styles.iptError}>
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
        </div>

        <div className={styles.iptForm}>
          <input type="email" placeholder="Email" {...register('email')} />
          <div className={styles.iptError}>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>

        <div className={styles.iptForm}>
          <input type="password" placeholder="Senha" {...register('password')} />
          <div className={styles.iptError}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
      <p className={styles.login}>Já possui conta? <a onClick={() => navigate('/')}>Entrar</a></p>
    </AuthCard>
  );
};

export default Register;
