import { useState } from "react";
import "./App.css";

//Expenses for the month
const data = [
  { name: "Phone", expense: 151 },
  { name: "Electricity", expense: 100 },
  { name: "Car", expense: 5 },
  { name: "House", expense: 43 },
  { name: "Food", expense: 56 },
  { name: "Leisure", expense: 182 },
];

function App() {
  const [expensesData, setExpensesData] = useState(data);
  const maxExpense = 200;
  const chartHeight = maxExpense + 20;
  const barWidth = 50;
  const barMargin = 30;
  const numberofBars = expensesData.length;
  let width = numberofBars * (barWidth + barMargin);

  return (
    <>
      <Chart height={chartHeight} width={width}>
        {expensesData.map((data, index) => {
          const barHeight = data.expense;
          return (
            <Bar
              key={data.name}
              x={index * (barWidth + barMargin)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
            />
          );
        })}
      </Chart>
    </>
  );
}

const Chart = ({ children, width, height }) => (
  <svg
    viewBox={`0 0 ${width} ${height + 100}`}
    width="100%"
    height="70%"
    preserveAspectRatio="xMidYMax meet"
  >
    {children}
  </svg>
);

const Bar = ({ x, y, width, height }) => (
  <>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgba(0, 171, 89, 0.5)"
    />
    <rect x="40" y="100" fill="yellow" rx="4">
      {" "}
      <text>300</text>
    </rect>

    <text x={x + width / 3} y={y - 5}>
      ${height}
    </text>
    <text x={x + width / 3} y={220 + 10}>
      {" "}
      hii{" "}
    </text>
  </>
);

export default App;





///////
