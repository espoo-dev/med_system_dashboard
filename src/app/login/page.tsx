'use client'

import Image from "next/image";
import styles from "../page.module.css";
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import AuthService from "@/domain/services/AuthService";
import LoginCredentialsModel from "@/domain/models/LoginCredentialsModel";
import { useRouter } from "next/navigation";

export default function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginCredentialsModel>();
  const authService = new AuthService()
  const [loadingLogin, setLoadingLogin] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: LoginCredentialsModel) => {
    setLoadingLogin(true)
    const response = await authService.login(data)
    setLoadingLogin(false)

    if (response.token) {
      authService.setUser(response)
      router.push('/')
    }

    console.log('response ->', response)
  };

  React.useEffect(() => {
    setError("email", {
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
            <input {...register("email")} value={'roandersonfelipe@gmail.com'} />
            {/* {errors.username && <p>{errors.username.message}</p>} */}
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="password">Senha</label>
            <input {...register("password")} value={'R7r12345'} />
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </div>

          <input type="submit" disabled={loadingLogin} />
        </form>
      </div>
    </main>
  );
}
