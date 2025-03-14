import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../validations/registerSchema';
import { registerUser } from '../../services/authService';

type RegisterData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
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
      console.log('Usuário cadastrado:', response.data);
      alert('Cadastro realizado com sucesso!');
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Erro: ${error.response.data.error}`);
      } else {
        alert('Erro inesperado ao cadastrar usuário.');
      }
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nome" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="text" placeholder="Sobrenome" {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Senha" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
