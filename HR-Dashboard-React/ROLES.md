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

## 2. Danh mục dữ liệu (theo hệ thống HR thật)

| Danh mục | Trang | Field chính |
|----------|-------|-------------|
| Thông tin nhân sự | `/employees` | Mã NV, họ tên, trình độ, ngày sinh, giới tính, chuyên ngành, địa chỉ thường trú/hiện tại, trường, CCCD, ngày/nơi cấp, MST, lương, KPI |
| Hợp đồng | `/contracts` | Loại HĐ (HĐLĐ/HĐTK/HĐTV/HĐĐT/HĐTTS), thời hạn, lần HĐLĐ, thử việc, đào tạo, hiệu lực HĐLĐ |
| Lương thưởng & phúc lợi | `/payroll` | Lương cơ bản, phụ cấp, thưởng, mức đóng BH, thực nhận |
| Hồ sơ tài liệu | `/documents` | CV, CCCD, bằng cấp, sơ yếu LL, HĐLĐ, giấy KSK (✓ = đã có) |
| Nghỉ phép | `/leave` | Loại nghỉ, từ/đến ngày, số ngày, lý do, trạng thái duyệt |
| Checkin | `/attendance` | Ngày, giờ vào/ra, số giờ, trạng thái |
| Job Descriptions (JD) | `/jobs` | Vị trí, phòng ban, cấp bậc, số lượng, trạng thái, phụ trách, mô tả |
| Hồ sơ ứng viên (CV) | `/candidates` | Pipeline kéo-thả + hồ sơ ứng viên |

---

## 3. Quyền truy cập trang (sidebar)

✅ = mở được · 🔒 = bị khóa (icon ổ khóa; gõ URL trực tiếp sẽ tự redirect về Overview)

| Trang | CEO | COO | CGO | Trưởng phòng HR | Thành viên |
|-------|:---:|:---:|:---:|:---:|:---:|
| Overview / Calendar / Tasks | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hồ sơ ứng viên (CV) | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Job Descriptions | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Interviews / Offers | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Thông tin nhân sự | ✅ | ✅ | ✅ | ✅ | 🔒 |
| Hợp đồng | ✅ | ✅ | 🔒 | ✅ | 🔒 |
| Hồ sơ tài liệu | ✅ | 🔒 | 🔒 | ✅ | 🔒 |
| Performance & KPI | ✅ | ✅ | ✅ | ✅ | ✅ |
| Checkin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Nghỉ phép | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lương thưởng | ✅ | 🔒 | 🔒 | ✅ | ✅ (của mình) |
| Reports | ✅ | ✅ | ✅ | 🔒 | 🔒 |
| Settings | ✅ | ✅ | 🔒 | 🔒 | 🔒 |

> Tuyển dụng (CV/JD/Interviews/Offers) là nghiệp vụ HR → chỉ **CEO** & **Trưởng phòng HR**.
> Lương cá nhân nhạy cảm → **COO/CGO không truy cập** trang Lương thưởng.

---

## 4. Phạm vi dữ liệu (record-level)

Cùng một trang nhưng số dòng khác nhau theo role (áp dụng cho mọi danh mục nhân sự: Thông tin NS, Hợp đồng, Lương, Tài liệu, Nghỉ phép, Checkin):

| Role | Thấy record nào |
|------|-----------------|
| CEO / COO | Toàn bộ nhân sự |
| CGO | Chỉ nhân sự team Growth / Marketing / Sales |
| Trưởng phòng HR | Chỉ nhân sự team HR |
| Thành viên | Chỉ bản ghi của chính mình |

---

## 5. Quyền theo trường (field-level) — khi click drill-down

Click 1 bản ghi → mở **panel chi tiết**. Trường nhạy cảm bị ẩn theo role, panel hiện ghi chú *"Ẩn theo phân quyền"*.

### 5.1 Thông tin nhân sự
| Nhóm trường | CEO | COO | CGO | Trưởng phòng HR | Thành viên |
|-------------|:---:|:---:|:---:|:---:|:---:|
| Tổ chức (chức danh, phòng ban, quản lý, trạng thái) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cá nhân – cơ bản (giới tính, ngày sinh, địa chỉ) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Email | ✅ | ✅ | ❌ | ✅ | ✅ |
| Điện thoại | ✅ | ❌ | ❌ | ✅ | ✅ |
| Học vấn (trình độ, chuyên ngành, trường, TN) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Giấy tờ** (CCCD, ngày/nơi cấp, MST) 🔒 | ✅ | ❌ | ❌ | ✅ | ✅ (của mình) |
| KPI cá nhân | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Lương (net)** 🔒 | ✅ | ❌ | ❌ | ✅ | ✅ (của mình) |

### 5.2 Lương thưởng & phúc lợi
Toàn bộ trường (lương cơ bản, phụ cấp, thưởng, BH, thực nhận) là **nhạy cảm** → chỉ **CEO / Trưởng phòng HR / Thành viên (của mình)** vào được trang & xem.

### 5.3 Hợp đồng
Mọi trường hiển thị cho role có quyền vào trang (CEO/COO/Trưởng phòng HR). CGO/Thành viên không truy cập.

### 5.4 Hồ sơ ứng viên (Candidate)
| Trường | CEO | Trưởng phòng HR |
|--------|:---:|:---:|
| Vị trí, giai đoạn, nguồn, kinh nghiệm | ✅ | ✅ |
| Email, điện thoại | ✅ | ✅ |
| **Lương mong muốn** 🔒 | ✅ | ✅ |

### 5.5 Project Drill-down (Lớp 2 — click task/dự án)
| Trường | CEO | COO | CGO | Trưởng phòng HR | Thành viên |
|--------|:---:|:---:|:---:|:---:|:---:|
| PM, trạng thái, timeline, KPI | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Doanh thu thực tế / Forecast** 🔒 | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 6. Cài đặt trong code

- **`src/data/roles.js`** — `PAGE_ACCESS` (quyền trang) + `scopeByRole` (lọc record) + field rules cho candidate/project.
- **`src/data/schema.js`** — định nghĩa từng danh mục: cột bảng + nhóm trường drill-down, mỗi field có `roles` (ẩn/hiện theo quyền).
- **`src/data/mockData.js`** — dữ liệu mẫu (nhân sự + hợp đồng + lương + tài liệu + nghỉ phép + checkin + JD).

Đổi quyền chỉ cần sửa các file này — UI tự cập nhật (bảng, drill-down, sidebar đều dùng chung config).
