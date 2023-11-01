"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import "./Dashboard.scss";
import Text from "@/components/atoms/Text";
import CountUp from "react-countup";
import { User } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import {
  countAllReports,
  countReceivedReports,
  countRejectedReports,
  countReviewedReports,
  getReportCountsByCategory,
} from "@/services/reports";
import { childAbuseCategories } from "@/constants/categories";
import { createProfile } from "@/services/users";

interface DashboardProps {
  user: User;
}

const Grid = styled.div`
  margin-left: 1rem;
  width: 100%;
  display: flex;
  flex-grow: 1;
  gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 736px) {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }
`;

const StatCard = styled.div<{
  index: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  background: linear-gradient(-30deg, #6fcdec, #b7defe);

  &:hover {
    border: 1px solid grey;
    scale: 1.015;
  }

  @media screen and (max-width: 736px) {
    width: 90%;
    &:hover {
      border: none;
    }
  }
`;

function Dashboard({ user }: DashboardProps) {
  const userData = user.user_metadata;

  useEffect(() => {
    if (!userData.isAdmin) redirect("/app/reports");
  }, []);

  // Sample data for analytics
  const [reportsReceived, setReportsReceived] = useState(0);
  const [reportsReviewed, setReportsReviewed] = useState(0);
  const [reportsPending, setReportsPending] = useState(0);
  const [reportsRejected, setReportsRejected] = useState(0);
  const [barChartData, setBarChartData] = useState<any>([]);

  useEffect(() => {
    async function fetchReportCounts() {

      await createProfile({
        id: user?.id,
        isAdmin: user?.user_metadata.isAdmin,
        email: user?.email
      }) 

      const totalReports = await countAllReports();
      const reviewedReports = await countReviewedReports(); // Define the actual count of reviewed reports
      const pendingReports = await countReceivedReports();
      const rejectedReports = await countRejectedReports(); // Define the actual count of reporters

      totalReports && setReportsReceived(totalReports);
      reviewedReports && setReportsReviewed(reviewedReports);
      pendingReports && setReportsPending(pendingReports);
      rejectedReports && setReportsRejected(rejectedReports);

      const chartData = []
      for (let i = 0; i < childAbuseCategories.length; i++) {
        const countForCategory = await getReportCountsByCategory(
          childAbuseCategories[i].value
        );
        console.log(childAbuseCategories[i].value, countForCategory);
        chartData.push({ category: childAbuseCategories[i], reports: countForCategory })
      }
      setBarChartData(chartData);
    }

    fetchReportCounts();
  }, []);
  // Sample data for the line chart
  const lineData = [
    { month: "January", categoryA: 10, categoryB: 15 },
    { month: "February", categoryA: 12, categoryB: 18 },
    { month: "March", categoryA: 8, categoryB: 16 },
    { month: "April", categoryA: 14, categoryB: 20 },
    { month: "May", categoryA: 16, categoryB: 13 },
    { month: "June", categoryA: 11, categoryB: 17 },
  ];

  // Generate an array of unique category names
  const categories = Object.keys(lineData[0]).filter((key) => key !== "month");

  return (
    <div className="dashboard">
      <div className="stats">
        <Grid>
          <StatCard index={1}>
            <Text color="white" weight="bold">
              Total Reports
            </Text>
            <Text color="white" size="large" weight="bold">
              <CountUp end={reportsReceived} />
            </Text>
          </StatCard>
          <StatCard index={2}>
            <Text color="white" weight="bold">
              Reports Pending
            </Text>
            <Text color="white" size="large" weight="bold">
              <CountUp end={reportsPending} />
            </Text>
          </StatCard>
          <StatCard index={3}>
            <Text color="white" weight="bold">
              Reviewed
            </Text>
            <Text color="white" size="large" weight="bold">
              <CountUp end={reportsReviewed} />
            </Text>
          </StatCard>
          <StatCard index={4}>
            <Text color="white" weight="bold">
              Rejected
            </Text>
            <Text color="white" size="large" weight="bold">
              <CountUp end={reportsRejected} />
            </Text>
          </StatCard>
        </Grid>
      </div>
      <br />
      <br />
      <div className="chartContainer">
        <div className="chartdiv" style={{ width: `100%` }}>
          <BarChart
            width={
              window.innerWidth > 736
                ? window.innerWidth / 2 - 100
                : window.innerWidth - 50
            }
            height={300}
            data={barChartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reports" fill="#333333" />
          </BarChart>
        </div>
        <div className="chartdiv">
          <LineChart
            width={
              window.innerWidth > 736
                ? window.innerWidth / 2 - 100
                : window.innerWidth - 50
            }
            height={300}
            data={lineData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((category, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={category}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
