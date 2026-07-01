import Chart from "react-apexcharts";

/* Chart cho cụm Kế toán — file mới, không sửa Charts.jsx.
   Giá trị truyền vào tính theo "triệu ₫". */
const violet = "#7c3aed", green = "#10b981", amber = "#f59e0b", red = "#ef4444", blue = "#3b82f6";
const noAnim = { animations: { enabled: false } };

// Trục/tooltip: 1.250 triệu → "1,25 tỷ"
const fmtM = (v) => (v >= 1000 ? (v / 1000).toFixed(2).replace(".", ",") + " tỷ" : Math.round(v) + " tr");
// Format VND shorthand for raw values
const fmtVnd = (v) => {
  const abs = Math.abs(v);
  if (abs >= 1e9) return (v / 1e9).toFixed(2).replace(".", ",") + " tỷ";
  if (abs >= 1e6) return Math.round(v / 1e6) + " tr";
  return v.toLocaleString("vi-VN") + " ₫";
};

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

/* Doanh thu theo Line dịch vụ — Donut */
const DONUT_PALETTE = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
export function ServiceLineDonut({ data }) {
  const labels = data.map((d) => d.label);
  const series = data.map((d) => d.value);
  return (
    <Chart
      type="donut"
      height={300}
      series={series}
      options={{
        chart: { fontFamily: "inherit", ...noAnim },
        labels,
        colors: DONUT_PALETTE.slice(0, labels.length),
        legend: { position: "bottom", fontWeight: 600, fontSize: "12px", markers: { radius: 6 } },
        dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%`, style: { fontSize: "11px", fontWeight: 700 } },
        tooltip: { y: { formatter: fmtVnd } },
        plotOptions: { pie: { donut: { size: "58%", labels: { show: true, total: { show: true, label: "Tổng DT", formatter: (w) => fmtVnd(w.globals.seriesTotals.reduce((a, b) => a + b, 0)) } } } } },
        stroke: { width: 2, colors: ["#fff"] },
      }}
    />
  );
}

/* Doanh thu theo Nhóm khách hàng — Horizontal Bar */
export function CustomerGroupBar({ data }) {
  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);
  return (
    <Chart
      type="bar"
      height={300}
      series={[{ name: "Doanh thu", data: values }]}
      options={{
        chart: { toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [violet],
        plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "55%", borderRadiusApplication: "end" } },
        dataLabels: { enabled: true, formatter: fmtVnd, style: { fontSize: "11px", fontWeight: 700 }, offsetX: 10 },
        grid: { borderColor: "#eef0f6", strokeDashArray: 4 },
        xaxis: { labels: { formatter: fmtVnd, style: { colors: "#9298b5", fontWeight: 600 } } },
        yaxis: { labels: { style: { colors: "#9298b5", fontWeight: 600, fontSize: "12px" } } },
        tooltip: { y: { formatter: fmtVnd } },
        categories: labels,
      }}
    />
  );
}

/* Lợi nhuận theo Line dịch vụ — Donut */
export function ServiceLineProfitDonut({ data }) {
  const labels = data.map((d) => d.label);
  const series = data.map((d) => d.value);
  return (
    <Chart
      type="donut"
      height={300}
      series={series}
      options={{
        chart: { fontFamily: "inherit", ...noAnim },
        labels,
        colors: DONUT_PALETTE.slice(0, labels.length),
        legend: { position: "bottom", fontWeight: 600, fontSize: "12px", markers: { radius: 6 } },
        dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%`, style: { fontSize: "11px", fontWeight: 700 } },
        tooltip: {
          y: {
            formatter: (v, { seriesIndex }) => {
              const item = data[seriesIndex];
              return `Lợi nhuận: ${fmtVnd(item.actualProfit)} (Biên: ${item.grossMargin}%)`;
            }
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: "58%",
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "Tổng lợi nhuận",
                  formatter: () => {
                    const totalProfit = data.reduce((a, b) => a + b.actualProfit, 0);
                    return fmtVnd(totalProfit);
                  }
                }
              }
            }
          }
        },
        stroke: { width: 2, colors: ["#fff"] },
      }}
    />
  );
}

/* Tài chính theo Nhóm khách hàng — Grouped Horizontal Bar (DT, Chi phí, Lợi nhuận) */
export function CustomerGroupGroupedBar({ data }) {
  const categories = data.map((_, i) => `Nhóm ${i + 1}`);
  const revenues = data.map(d => d.revenue);
  const costs = data.map(d => d.cost);
  const profits = data.map(d => d.profit);

  return (
    <Chart
      type="bar"
      height={300}
      series={[
        { name: "Doanh thu dự kiến", data: revenues },
        { name: "Chi phí thực tế", data: costs },
        { name: "Lợi nhuận thực tế", data: profits }
      ]}
      options={{
        chart: { toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [violet, amber, green],
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 4,
            barHeight: "75%",
            borderRadiusApplication: "end"
          }
        },
        dataLabels: { enabled: false },
        grid: { borderColor: "#eef0f6", strokeDashArray: 4 },
        xaxis: {
          categories: categories,
          labels: { formatter: fmtVnd, style: { colors: "#9298b5", fontWeight: 600 } }
        },
        yaxis: {
          labels: { style: { colors: "#9298b5", fontWeight: 600, fontSize: "12px" } }
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (val, { seriesIndex, dataPointIndex }) => {
              const item = data[dataPointIndex];
              let suffix = "";
              if (seriesIndex === 2) {
                suffix = ` (Biên: ${item.grossMargin}%)`;
              }
              return fmtVnd(val) + suffix;
            }
          }
        }
      }}
    />
  );
}


