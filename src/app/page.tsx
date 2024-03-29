'use client'

import Image from "next/image";
import styles from "./page.module.css";
import AuthService from "@/domain/services/AuthService";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import DashboardService from "@/domain/services/DashboardService";
import ApexCharts from 'apexcharts';
import SelectInput, { SelectOption } from "@/components/select/select.component";
import { PayloadAmountByDay } from "@/domain/models/AmountByDay";
import UserService from "@/domain/services/UserService";
import UserModel from "@/domain/models/UserModel";
import { BarChart, BarChartConfig } from "@/components/charts/apex-charts";

export default function Home() {
  const authService = new AuthService();
  const dashboardService = new DashboardService();
  const userService = new UserService();
  const [users, setUsers] = useState<SelectOption[]>();

  const [chartData, setChartData] = useState<BarChartConfig>({
    categories: [],
    seriesData: []
  });


  const eventsProceduresFilterMock: PayloadAmountByDay = {
    start_date: '01/03/2024',
    end_date: '30/03/2024'
  };

  const loadIndicators = async (filter?: PayloadAmountByDay): Promise<void> => {
    const amountByDay = await dashboardService.getAmountByDay(filter || eventsProceduresFilterMock);

    setChartData({
      categories: Object.keys(amountByDay.days).map(date => String(date)),
      seriesData: Object.values(amountByDay.days).map(serie => Number(serie))
    })
  };

  useLayoutEffect(() => {
    const isAuth = authService.isAuthenticated();
    if(!isAuth){
      redirect("/login");
    }

    loadUsers();
    loadIndicators();
  }, []);

  const handleSelectUserChange = (userId: string | number) => {
    let filter = {
      ...eventsProceduresFilterMock
    };

    if (userId) {
      filter.user_id = Number(userId)
    }
    loadIndicators(filter);
  };

  const loadUsers = async () => {
    const users = await userService.listUsers();
    setUsers(users.map((user: UserModel) => {
      return {
        label: user.email,
        value: user.id
      }
    }));
  }
  
  return (
    <main className={styles.main}>
      <SelectInput 
        label="Usuário"
        options={users as SelectOption[]}
        onChange={handleSelectUserChange}
      />

      <div style={{width: '100%'}}>
        <BarChart data={chartData} onDataUpdate={setChartData} />
      </div>

      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
