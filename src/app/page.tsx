'use client'

import Image from "next/image";
import styles from "./page.module.css";
import AuthService from "@/domain/services/AuthService";
import { redirect } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import DashboardService from "@/domain/services/DashboardService";
import ApexCharts from 'apexcharts';
import SelectInput, { SelectOption } from "@/components/select/select.component";
import { PayloadAmountByDay } from "@/domain/models/AmountByDay";
import UserService from "@/domain/services/UserService";
import UserModel from "@/domain/models/UserModel";

export default function Home() {
  const authService = new AuthService();
  const dashboardService = new DashboardService();
  const userService = new UserService();
  const amoutProceduresChart = 'area-chart';
  const [users, setUsers] = useState<SelectOption[]>();

  const eventsProceduresFilterMock: PayloadAmountByDay = {
    start_date: '01/03/2024',
    end_date: '30/03/2024'
  };

  const loadIndicators = async (filter?: PayloadAmountByDay): Promise<void> => {
    const amountByDay = await dashboardService.getAmountByDay(filter || eventsProceduresFilterMock);
    const chartOnScreen = document.getElementById(amoutProceduresChart);

    if (chartOnScreen && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(chartOnScreen, 
        {
          chart: {
            type: 'bar'
          },
          series: [{
            name: 'Events Procedures',
            data: Object.values(amountByDay.days)
          }],
          xaxis: {
            categories: Object.keys(amountByDay.days)
          }
        }
      );
      chart.render();
    }
  };

  // const options =  {
  //   chart: {
  //     height: "100%",
  //     maxWidth: "100%",
  //     type: "area",
  //     fontFamily: "Inter, sans-serif",
  //     dropShadow: {
  //       enabled: false,
  //     },
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   tooltip: {
  //     enabled: true,
  //     x: {
  //       show: false,
  //     },
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       opacityFrom: 0.55,
  //       opacityTo: 0,
  //       shade: "#1C64F2",
  //       gradientToColors: ["#1C64F2"],
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     width: 6,
  //   },
  //   grid: {
  //     show: false,
  //     strokeDashArray: 4,
  //     padding: {
  //       left: 2,
  //       right: 2,
  //       top: 0
  //     },
  //   },
  //   series: [
  //     {
  //       name: "New users",
  //       data: [6500, 6418, 6456, 6526, 6356, 6456],
  //       color: "#1A56DB",
  //     },
  //   ],
  //   xaxis: {
  //     categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
  //     labels: {
  //       show: false,
  //     },
  //     axisBorder: {
  //       show: false,
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //   },
  //   yaxis: {
  //     show: false,
  //   },
  // }

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

      <div id={amoutProceduresChart} style={{width: '700px'}}></div>

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
