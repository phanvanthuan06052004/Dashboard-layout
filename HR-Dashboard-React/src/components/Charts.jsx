import Chart from "react-apexcharts";

const violet = "#7c3aed", violetL = "#c4b5fd", blue = "#3b82f6", green = "#10b981", amber = "#f59e0b", slate = "#cbd5e1";
// Tắt animation reveal để tránh lỗi runMaskReveal khi unmount lúc chuyển trang.
const noAnim = { animations: { enabled: false } };

export function Sparkline({ data, up = true }) {
  return (
    <Chart
      type="bar"
      width={96}
      height={46}
      series={[{ data }]}
      options={{
        chart: { sparkline: { enabled: true }, ...noAnim },
        plotOptions: { bar: { columnWidth: "55%", borderRadius: 3 } },
        colors: [up ? violet : amber],
        tooltip: { enabled: false },
      }}
    />
  );
}

export function DeptChart({ cats, fulltime, freelance }) {
  return (
    <Chart
      type="bar"
      height={300}
      series={[
        { name: "Full-time", data: fulltime },
        { name: "Freelance", data: freelance },
      ]}
      options={{
        chart: { stacked: true, toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [violet, violetL],
        plotOptions: { bar: { columnWidth: "45%", borderRadius: 6, borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        legend: { position: "top", horizontalAlign: "right", markers: { radius: 6 }, fontWeight: 600 },
        grid: { borderColor: "#eef0f6", strokeDashArray: 4 },
        xaxis: { categories: cats, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#9298b5", fontWeight: 600 } } },
        yaxis: { labels: { style: { colors: "#9298b5" } } },
        tooltip: { shared: true, intersect: false },
      }}
    />
  );
}

export function AttendanceDonut({ ontime, leave, off }) {
  return (
    <Chart
      type="donut"
      width={210}
      height={210}
      series={[ontime, leave, off]}
      options={{
        chart: { fontFamily: "inherit", ...noAnim },
        labels: ["Đúng giờ", "Nghỉ phép", "Vắng"],
        colors: [violet, amber, slate],
        stroke: { width: 0 },
        legend: { show: false },
        dataLabels: { enabled: false },
        plotOptions: {
          pie: {
            donut: {
              size: "72%",
              labels: {
                show: true,
                total: { show: true, label: "Chuyên cần", fontSize: "12px", color: "#9298b5", formatter: () => ontime + "%" },
                value: { fontSize: "26px", fontWeight: 800, color: "#0f1222" },
              },
            },
          },
        },
      }}
    />
  );
}

export function HiringChart({ months, applied, hired }) {
  return (
    <Chart
      type="area"
      height={300}
      series={[
        { name: "Ứng tuyển", data: applied },
        { name: "Tuyển được", data: hired },
      ]}
      options={{
        chart: { toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [violet, green],
        fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02 } },
        stroke: { curve: "smooth", width: 3 },
        dataLabels: { enabled: false },
        legend: { position: "top", horizontalAlign: "right", markers: { radius: 6 }, fontWeight: 600 },
        grid: { borderColor: "#eef0f6", strokeDashArray: 4 },
        xaxis: { categories: months, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#9298b5", fontWeight: 600 } } },
        yaxis: { labels: { style: { colors: "#9298b5" } } },
      }}
    />
  );
}

export function MiniBars({ items }) {
  const max = Math.max(...items.map((i) => i.v));
  return (
    <Chart
      type="bar"
      height={200}
      series={[{ name: "Số lượng", data: items.map((i) => i.v) }]}
      options={{
        chart: { toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [violet],
        plotOptions: { bar: { borderRadius: 6, columnWidth: "50%", distributed: false } },
        dataLabels: { enabled: false },
        grid: { borderColor: "#eef0f6", strokeDashArray: 4 },
        xaxis: { categories: items.map((i) => i.name), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#9298b5", fontWeight: 600, fontSize: "10px" }, rotate: -30 } },
        yaxis: { max: Math.ceil(max * 1.1), labels: { style: { colors: "#9298b5" } } },
        tooltip: { y: { formatter: (v) => v } },
      }}
    />
  );
}
