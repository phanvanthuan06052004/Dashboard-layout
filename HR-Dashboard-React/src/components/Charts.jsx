import Chart from "react-apexcharts";

const violet = "#7c3aed", violetL = "#c4b5fd", green = "#10b981", amber = "#f59e0b", slate = "#cbd5e1";
// Tắt animation reveal để tránh lỗi runMaskReveal khi unmount lúc chuyển trang.
const noAnim = { animations: { enabled: false } };

// Mỗi workspace truyền palette riêng (Apex SVG không nhận CSS var).
// Để trống → giữ tông tím mặc định của HR (backward-compatible).

export function Sparkline({ data, up = true, color }) {
  return (
    <Chart
      type="bar"
      width={96}
      height={46}
      series={[{ data }]}
      options={{
        chart: { sparkline: { enabled: true }, ...noAnim },
        plotOptions: { bar: { columnWidth: "55%", borderRadius: 3 } },
        colors: [color || (up ? violet : amber)],
        tooltip: { enabled: false },
      }}
    />
  );
}

export function DeptChart({ cats, fulltime, freelance, colors = [violet, violetL], names = ["Full-time", "Freelance"] }) {
  return (
    <Chart
      type="bar"
      height={300}
      series={[
        { name: names[0], data: fulltime },
        { name: names[1], data: freelance },
      ]}
      options={{
        chart: { stacked: true, toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors,
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

export function AttendanceDonut({ ontime, leave, off, colors = [violet, amber, slate], labels = ["Đúng giờ", "Nghỉ phép", "Vắng"], centerLabel = "Chuyên cần", centerValue }) {
  const total = ontime + leave + off;
  return (
    <Chart
      type="donut"
      width={210}
      height={210}
      series={[ontime, leave, off]}
      options={{
        chart: { fontFamily: "inherit", ...noAnim },
        labels,
        colors,
        stroke: { width: 0 },
        legend: { show: false },
        dataLabels: { enabled: false },
        plotOptions: {
          pie: {
            donut: {
              size: "72%",
              labels: {
                show: true,
                total: { show: true, label: centerLabel, fontSize: "12px", color: "#9298b5", formatter: () => centerValue ?? (total ? ontime + "%" : "0") },
                value: { fontSize: "26px", fontWeight: 800, color: "#0f1222" },
              },
            },
          },
        },
      }}
    />
  );
}

// Donut tổng quát (số lát tuỳ ý) — dùng cho kênh / traffic / health.
export function DonutChart({ series, labels, colors, centerLabel = "Tổng", centerValue, height = 230 }) {
  const total = series.reduce((a, b) => a + b, 0);
  return (
    <Chart
      type="donut"
      width={height}
      height={height}
      series={series}
      options={{
        chart: { fontFamily: "inherit", ...noAnim },
        labels,
        colors,
        stroke: { width: 0 },
        legend: { show: false },
        dataLabels: { enabled: false },
        plotOptions: {
          pie: {
            donut: {
              size: "72%",
              labels: {
                show: true,
                total: { show: true, label: centerLabel, fontSize: "12px", color: "#9298b5", formatter: () => centerValue ?? total },
                value: { fontSize: "24px", fontWeight: 800, color: "#0f1222" },
              },
            },
          },
        },
      }}
    />
  );
}

export function HiringChart({ months, applied, hired, colors = [violet, green], names = ["Ứng tuyển", "Tuyển được"] }) {
  return (
    <Chart
      type="area"
      height={300}
      series={[
        { name: names[0], data: applied },
        { name: names[1], data: hired },
      ]}
      options={{
        chart: { toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors,
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

export function MiniBars({ items, color = violet }) {
  const max = Math.max(...items.map((i) => i.v));
  return (
    <Chart
      type="bar"
      height={200}
      series={[{ name: "Số lượng", data: items.map((i) => i.v) }]}
      options={{
        chart: { toolbar: { show: false }, fontFamily: "inherit", ...noAnim },
        colors: [color],
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
