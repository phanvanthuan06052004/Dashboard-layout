import Chart from "react-apexcharts";

/* Chart cho cụm Kế toán — file mới, không sửa Charts.jsx.
   Giá trị truyền vào tính theo "triệu ₫". */
const violet = "#7c3aed", green = "#10b981", amber = "#f59e0b", red = "#ef4444", blue = "#3b82f6";
const noAnim = { animations: { enabled: false } };

// Trục/tooltip: 1.250 triệu → "1,25 tỷ"
const fmtM = (v) => (v >= 1000 ? (v / 1000).toFixed(2).replace(".", ",") + " tỷ" : Math.round(v) + " tr");

/* Doanh thu / Chi phí (cột) + Lợi nhuận (đường) — 12 tháng */
export function RevExpProfitChart({ months, revenue, expense, profit }) {
  return (
    <Chart
      height={320}
      series={[
        { name: "Doanh thu", type: "column", data: revenue },
        { name: "Chi phí", type: "column", data: expense },
        { name: "Lợi nhuận", type: "line", data: profit },
      ]}
      options={{
        chart: { stacked: false, toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [violet, amber, green],
        stroke: { width: [0, 0, 3], curve: "smooth" },
        plotOptions: { bar: { columnWidth: "55%", borderRadius: 5, borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        markers: { size: 0, hover: { size: 5 } },
        legend: { position: "top", horizontalAlign: "right", markers: { radius: 6 }, fontWeight: 600 },
        grid: { borderColor: "#eef0f6", strokeDashArray: 4 },
        xaxis: { categories: months, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#9298b5", fontWeight: 600 } } },
        yaxis: { labels: { formatter: fmtM, style: { colors: "#9298b5" } } },
        tooltip: { shared: true, intersect: false, y: { formatter: fmtM } },
      }}
    />
  );
}

/* Cash In / Cash Out (cột) + Net (đường) — 12 tháng */
export function CashFlowChart({ months, cashIn, cashOut, net }) {
  return (
    <Chart
      height={320}
      series={[
        { name: "Tiền vào", type: "column", data: cashIn },
        { name: "Tiền ra", type: "column", data: cashOut },
        { name: "Dòng tiền ròng", type: "line", data: net },
      ]}
      options={{
        chart: { toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [green, red, blue],
        stroke: { width: [0, 0, 3], curve: "smooth" },
        plotOptions: { bar: { columnWidth: "55%", borderRadius: 5, borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        markers: { size: 0, hover: { size: 5 } },
        legend: { position: "top", horizontalAlign: "right", markers: { radius: 6 }, fontWeight: 600 },
        grid: { borderColor: "#eef0f6", strokeDashArray: 4 },
        xaxis: { categories: months, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#9298b5", fontWeight: 600 } } },
        yaxis: { labels: { formatter: fmtM, style: { colors: "#9298b5" } } },
        tooltip: { shared: true, intersect: false, y: { formatter: fmtM } },
      }}
    />
  );
}
