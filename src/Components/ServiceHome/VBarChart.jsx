import { useState, useEffect } from "react";
import React from "react";
import { Chart } from "react-google-charts";

export default function VBarChart() {
  const [finishedServices, setFinishedServices] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const previousSixMonths = getPreviousSixMonths();

  function getPreviousSixMonths() {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      months.unshift(`${month + 1}/${year}`);
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    return months;
  }

  // export const datas = [
  //   ["Month", "Sales", "Expenses", "Profit"],
  //   ...previousSixMonths.map((month, index) => {
  //     const [monthNumber, year] = month.split("/");
  //     const isCurrentYear = year === currentYear.toString();
  //     const isCurrentMonth = monthNumber === currentMonth.toString();
  //     if (isCurrentYear && isCurrentMonth) {
  //       return [month, 0, 0, 0];
  //     }
  //     return [month, null, null, null];
  //   }),
  // ];

  useEffect(() => {
    const previousSixMonths = getPreviousSixMonths();
    fetch("http://localhost:5000/center/finishedServices", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        schema: JSON.parse(window.sessionStorage.getItem("schema")),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching Finished Service data");
        }
        return response.json();
      })
      .then((data) => {
        const finishedServicesByMonth = previousSixMonths.map((month) => {
          return data.data.fs.filter((service) => {
            const serviceDate = new Date(service.service_date);
            const serviceMonth = serviceDate.getMonth() + 1;
            const serviceYear = serviceDate.getFullYear();
            const [monthNumber, year] = month.split("/");
            return (
              serviceMonth === parseInt(monthNumber) &&
              serviceYear === parseInt(year)
            );
          });
        });
        setFinishedServices(finishedServicesByMonth);
      })

      .catch((error) =>
        console.error("Error fetching Finished Service data:", error)
      );
  }, []);
  // const data = [
  //   ["Month", "Sales"],
  //   [previousSixMonths[0], finishedServices[0].length],
  //   [previousSixMonths[1], finishedServices[1].length],
  //   [previousSixMonths[2], finishedServices[2].length],
  //   [previousSixMonths[3], finishedServices[3].length],
  //   [previousSixMonths[4], finishedServices[4].length],
  //   [previousSixMonths[5], finishedServices[5].length],
  // ];
  const data = [
    ["Month", "Sales"],
    ...finishedServices.map((service, index) => {
      return [previousSixMonths[index], service.length];
    }),
  ];
  // const data = [
  //   ["Month", "Sales"],
  //   [previousSixMonths[0], 1],
  //   [previousSixMonths[1], 1],
  //   [previousSixMonths[2], 2],
  //   [previousSixMonths[3], 3],
  //   [previousSixMonths[4], 5],
  //   [previousSixMonths[5], 3],
  // ];

  const options = {
    chart: {
      title: `Company Performance (Last 6 Months)`,
      subtitle: `Months, Sales: ${previousSixMonths[0]} - ${previousSixMonths[5]}`,
    },
    colors: ["rgb(53, 138, 148)", "#188310"],
  };
  return (
    <Chart
      chartType="Bar"
      width="1000px"
      height="400px"
      data={data}
      options={options}
    />
  );
}
