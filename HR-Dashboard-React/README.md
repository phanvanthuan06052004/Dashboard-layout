# BambuUP · HR Dashboard (React)

Bản **React** của HR Dashboard — UI mẫu để team/sếp review luồng, layout và **phân quyền theo role**.
Tập trung vào **Headcount · KPI · CV** theo Figma *Master Role-Based Access Flow*.

## Tech stack
- **Vite + React** (không cần backend)
- **react-router-dom** — điều hướng + route guard theo quyền
- **@dnd-kit** — kéo-thả pipeline ứng viên (Candidates) mượt
- **react-apexcharts** — biểu đồ
- **lucide-react** — icon
- **framer-motion** — animation (drawer trượt, chuyển trang)

## Tính năng chính
1. **UI dashboard** đầy đủ: Overview, Candidates (kanban kéo-thả), Employees (table), Performance & KPI, + placeholders.
2. **Click vào từng vùng → drill-down panel** hiện chi tiết:
   - Click **stat card / chart** → phân rã chỉ số.
   - Click **nhân sự** → hồ sơ (trường nhạy cảm ẩn theo role).
   - Click **ứng viên** → hồ sơ tuyển dụng.
   - Click **task** → Project Drill-down (Lớp 2: Info · Revenue · Team).
3. **Role switcher** (nút "Quyền" góc phải) — đổi giữa CEO / COO / CGO / Trưởng phòng HR / Thành viên.
   Sidebar khóa mục không có quyền, dữ liệu & trường tự ẩn. Chi tiết: xem **[ROLES.md](./ROLES.md)**.

## Chạy local
```bash
cd HR-Dashboard-React
npm install
npm run dev      # http://localhost:5173
```

## Deploy Vercel (free)
```bash
npm run build    # tạo thư mục dist/
vercel           # hoặc import repo trên vercel.com
```
- Framework preset: **Vite** · Build: `npm run build` · Output: `dist`
- `vercel.json` đã có rewrite cho SPA (react-router).

## Cấu trúc
```
src/
├── data/
│   ├── mockData.js     # dữ liệu mẫu
│   └── roles.js        # ⭐ phân quyền (trang + trường + scope)
├── context/AppContext.jsx   # role + drawer drill-down
├── components/         # Sidebar, Topbar, RoleSwitcher, Charts, DrillDrawer, Layout...
├── pages/              # Overview, Candidates, Employees, Performance, Placeholder
└── App.jsx             # routes + guard
```
> Dữ liệu là mock; khi tích hợp thật sẽ nối với **BambuUP Brainz** (Centralized Data Layer).
