# BambuUP HR Dashboard — Phân quyền theo Role

> Tài liệu mô tả: **mỗi role thấy gì, mở được gì, và dữ liệu nào bị ẩn**.
> Dựa trên Figma *Master Role-Based Access Flow*. Đây là bản FE mẫu — đổi role bằng nút **"Quyền"** ở góc phải trên cùng để xem trực tiếp.

---

## 1. Tổng quan 5 role

| Role | Phạm vi (scope) | Team được xem |
|------|-----------------|---------------|
| **CEO – Quỳnh** | Full access mọi team + Cross-team analytics | Tất cả |
| **COO – Châu** | Ops + Finance + Platform | ops, finance, platform, hr (giám sát) |
| **CGO – Tuyết** | Growth + Marketing + Sales | growth, marketing, sales |
| **Trưởng phòng HR** | Chỉ xem data team HR của mình | hr |
| **Thành viên HR** | Chỉ xem data cá nhân | bản thân |

---

## 2. Quyền truy cập trang (sidebar)

✅ = mở được · 🔒 = bị khóa (hiện icon ổ khóa, click vào sẽ không vào được; gõ URL trực tiếp sẽ tự redirect về Overview)

| Trang | CEO | COO | CGO | Trưởng phòng HR | Thành viên |
|-------|:---:|:---:|:---:|:---:|:---:|
| Overview | ✅ | ✅ | ✅ | ✅ | ✅ |
| Calendar | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tasks | ✅ | ✅ | ✅ | ✅ | ✅ |
| Candidates (CV) | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Jobs | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Interviews | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Offers | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Employees | ✅ | ✅ | ✅ | ✅ | 🔒 |
| Performance & KPI | ✅ | ✅ | ✅ | ✅ | ✅ |
| Attendance | ✅ | ✅ | ✅ | ✅ | 🔒 |
| Payroll | ✅ | ✅ | 🔒 | 🔒 | 🔒 |
| Reports | ✅ | ✅ | ✅ | 🔒 | 🔒 |
| Settings | ✅ | ✅ | 🔒 | 🔒 | 🔒 |

> **Recruitment (Candidates/Jobs/Interviews/Offers)** thuộc nghiệp vụ phòng HR → chỉ **CEO** và **Trưởng phòng HR** truy cập.

---

## 3. Phạm vi dữ liệu (record-level)

Cùng một trang nhưng số dòng dữ liệu khác nhau theo role:

| Trang | CEO | COO | CGO | Trưởng phòng HR | Thành viên |
|-------|-----|-----|-----|-----------------|-----------|
| **Employees** | Toàn bộ nhân sự | Toàn bộ (giám sát) | Chỉ Growth/Marketing/Sales | Chỉ team HR | Chỉ hồ sơ bản thân |
| **Performance** | Toàn công ty | Toàn công ty | Chỉ team mình | Toàn công ty (team HR) | Chỉ KPI cá nhân |
| **Overview** | Đầy đủ widget | Đầy đủ | Đầy đủ | Đầy đủ | Ẩn "Tuân thủ hồ sơ" & "Ứng viên mới" (không phải data cá nhân) |

---

## 4. Quyền theo trường dữ liệu (field-level) — khi click drill-down

Khi click vào 1 nhân sự / ứng viên / chỉ số → mở **panel chi tiết**. Các trường nhạy cảm bị ẩn theo role (panel sẽ hiện ghi chú *"Ẩn theo phân quyền"*).

### 4.1 Chi tiết Nhân sự (Employee)
| Trường | CEO | COO | CGO | Trưởng phòng HR | Thành viên |
|--------|:---:|:---:|:---:|:---:|:---:|
| Mã NS, Chức danh, Phòng ban, Loại HĐ, Địa điểm, Ngày vào, Quản lý | ✅ | ✅ | ✅ | ✅ | ✅ |
| Email | ✅ | ✅ | ❌ | ✅ | ✅ |
| Điện thoại | ✅ | ❌ | ❌ | ✅ | ✅ |
| KPI cá nhân | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hình thức hợp đồng | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Lương** 🔒 | ✅ | ❌ | ❌ | ✅ | ✅ (của mình) |

### 4.2 Chi tiết Ứng viên (Candidate)
| Trường | CEO | Trưởng phòng HR |
|--------|:---:|:---:|
| Vị trí, Giai đoạn, Nguồn, Kinh nghiệm | ✅ | ✅ |
| Email, Điện thoại | ✅ | ✅ |
| **Lương mong muốn** 🔒 | ✅ | ✅ |
> (COO/CGO/Thành viên không vào được trang Candidates nên không áp dụng.)

### 4.3 Project Drill-down (Lớp 2 — click 1 task/dự án)
| Trường | CEO | COO | CGO | Trưởng phòng HR | Thành viên |
|--------|:---:|:---:|:---:|:---:|:---:|
| PM, Trạng thái, Timeline, KPI dự án | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Doanh thu thực tế** 🔒 | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Forecast** 🔒 | ✅ | ✅ | ❌ | ❌ | ❌ |
> Doanh thu/Forecast là dữ liệu Finance → chỉ CEO & COO (COO phụ trách Finance).

---

## 5. Tóm tắt trải nghiệm từng role

- **CEO – Quỳnh:** thấy mọi trang, mọi dữ liệu, mọi trường (kể cả lương & doanh thu). Cross-team analytics đầy đủ.
- **COO – Châu:** quản trị vận hành — xem Employees/Performance/Payroll/Reports toàn công ty, xem doanh thu dự án; **không xem** pipeline tuyển dụng và **không xem lương cá nhân**.
- **CGO – Tuyết:** chỉ data Growth/Marketing/Sales; xem KPI & headcount team mình; không vào tuyển dụng, payroll, lương, doanh thu.
- **Trưởng phòng HR:** "chủ" nghiệp vụ tuyển dụng — full Candidates/Jobs/Interviews/Offers + Employees & lương **của team HR**; không xem Reports/Payroll toàn công ty.
- **Thành viên HR:** chỉ thấy **data cá nhân** — KPI của mình, task của mình, hồ sơ & lương của mình. Mọi mục quản lý đều bị khóa.

---

## 6. Cài đặt trong code

Toàn bộ phân quyền nằm tại **`src/data/roles.js`** (single source of truth):
- `PAGE_ACCESS` — quyền truy cập trang.
- `EMPLOYEE_FIELDS`, `CANDIDATE_FIELDS`, `PROJECT_FIELDS` — quyền theo trường (mỗi field có `roles`).
- `scopeEmployees()`, `scopePerformance()` — lọc record theo role.

Đổi quyền chỉ cần sửa file này — UI tự cập nhật.
