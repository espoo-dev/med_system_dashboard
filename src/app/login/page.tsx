'use client'

import Image from "next/image";
import styles from "../page.module.css";
import { useForm } from 'react-hook-form';
import React from 'react';

type FormInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data)
  };

  React.useEffect(() => {
    setError("username", {
      type: "manual",
      message: "Campo obrigatório"
    });

    setError("password", {
      type: "manual",
      message: "Campo obrigatório"
    });
  }, [setError])

  return (
    <main className={styles.main}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="username">Usuário</label>
            <input {...register("username")} />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="password">Senha</label>
            <input {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <input type="submit" />
        </form>
      </div>
    </main>
  );
}
