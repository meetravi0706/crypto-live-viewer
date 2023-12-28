import React, { useEffect, useRef } from "react";
import { Chart } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(document.getElementById("line-chart"), {
      type: "line",
      data: {
        labels: coinHistory?.data?.history.map((entry) =>
          new Date(entry.timestamp).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Price In USD",
            data: coinHistory?.data?.history.map((entry) => entry.price),
            fill: false,
            backgroundColor: "#0071bd",
            borderColor: "#0071bd",
          },
        ],
      },
      options: {
        scales: {
          //   x: [
          //     {
          //       type: "time",
          //       time: {
          //         unit: "day",
          //       },
          //     },
          //   ],
          y: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      chartRef.current.destroy();
    };
  }, [coinHistory]);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <canvas id="line-chart" />
    </>
  );
};

export default LineChart;
