"use client";
import React from "react";
import styled from "@emotion/styled";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Dashboard.scss";
import Text from "@/components/atoms/Text";
import CountUp from "react-countup";

const Grid = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 1rem;
  justify-content: space-between;
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
`;

const Dashboard: React.FC = () => {
  // Sample data for analytics
  const reportsReceived = 156;
  const reportsReviewed = 78;
  const reportsPending = 78;
  const reporters = 20;

  // Sample data for bar chart
  const barChartData = [
    { category: "Category A", reports: 12 },
    { category: "Category B", reports: 19 },
    { category: "Category C", reports: 3 },
    { category: "Category D", reports: 5 },
    { category: "Category E", reports: 2 },
  ];

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
              Reporters
            </Text>
            <Text color="white" size="large" weight="bold">
              <CountUp end={reporters} />
            </Text>
          </StatCard>
        </Grid>
      </div>
      <br />
      <br />
      <div className="chartContainer">
        <h2>Reports by Category</h2>
        <BarChart width={400} height={300} data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reports" fill="#8884d8" />
        </BarChart>
      </div>
      <div className="chartContainer">
        <h2>Reports by Category</h2>
        <BarChart width={400} height={300} data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reports" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
