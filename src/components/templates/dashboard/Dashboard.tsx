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
  LineChart,
  Line,
} from "recharts";
import "./Dashboard.scss";
import Text from "@/components/atoms/Text";
import CountUp from "react-countup";

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
        <div className="chartdiv" style={{width: `100%`}}>
          <BarChart
            width={window.innerWidth > 736 ? (window.innerWidth/2 - 100) : (window.innerWidth-50)}
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
            width={window.innerWidth > 736 ? (window.innerWidth/2 - 100) : (window.innerWidth-50)}
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
};

export default Dashboard;
