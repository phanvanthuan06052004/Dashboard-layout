import { useState } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import AdminDrawer, { DField } from "../admin/AdminDrawer";
import { projects, vnd } from "../../data/accountingData";

export default function ContractTracking() {
  const [activeTab, setActiveTab] = useState("outflow"); // outflow | inflow | non-project
  const [selectedContract, setSelectedContract] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  
  // Contract review scheduling states
  const [contractFile, setContractFile] = useState(null);
  const [reviewer, setReviewer] = useState("Kế toán");
  const [reviewDeadline, setReviewDeadline] = useState("");
  const [clientDeadline, setClientDeadline] = useState("");
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Mock contract data for columns requested on page 6
  const contractsOutflow = [
    { stt: 1, id: "HĐ-2026-018", partner: "Tập đoàn VinGroup", project: "VinGroup Innovation Lab", type: "Hợp đồng dịch vụ", value: 1200000000, signedDate: "15/01/2026", expiryDate: "31/12/2026", status: "Đã ký", paid: "600 tr ₫", hardCopy: "Có", storage: "Tủ số 2 - Ngăn A" },
    { stt: 2, id: "HĐ-2026-022", partner: "Công ty CP Công nghệ FPT", project: "Chuyển đổi số Bộ Công Thương", type: "BB nghiệm thu", value: 2000000000, signedDate: "01/03/2026", expiryDate: "30/11/2026", status: "Đang review", paid: "600 tr ₫", hardCopy: "Không", storage: "—" },
    { stt: 3, id: "HĐ-2026-031", partner: "Viettel Solutions", project: "FPT Startup Accelerator Batch 3", type: "Hợp đồng dịch vụ", value: 850000000, signedDate: "01/04/2026", expiryDate: "31/08/2026", status: "Đã ký", paid: "400 tr ₫", hardCopy: "Có", storage: "Tủ số 2 - Ngăn B" },
    { stt: 4, id: "HĐ-2026-009", partner: "Ngân hàng Techcombank", project: "BIDV CVC Advisory", type: "BB thanh lý", value: 1500000000, signedDate: "15/04/2026", expiryDate: "31/12/2026", status: "Đang review", paid: "500 tr ₫", hardCopy: "Không", storage: "—" },
    { stt: 5, id: "HĐ-2026-044", partner: "Shopee Việt Nam", project: "Techstars – FinTech Platform", type: "Hợp đồng dịch vụ", value: 750000000, signedDate: "15/03/2026", expiryDate: "15/09/2026", status: "Đã ký", paid: "350 tr ₫", hardCopy: "Có", storage: "Tủ số 1 - Ngăn C" },
  ];

  const contractsInflow = [
    { stt: 1, id: "HĐ-CTV-001", partner: "Đỗ Quang Huy", project: "Chuyển đổi số Bộ Công Thương", type: "Hợp đồng CTV", value: 240000000, signedDate: "10/02/2026", expiryDate: "30/11/2026", status: "Đã ký", paid: "220 tr ₫", hardCopy: "Có", storage: "Hồ sơ CTV - Tủ 3" },
    { stt: 2, id: "HĐ-CTV-002", partner: "Vũ Thị Lan", project: "Chuyển đổi số Bộ Công Thương", type: "Hợp đồng CTV", value: 120000000, signedDate: "12/02/2026", expiryDate: "30/11/2026", status: "Đã ký", paid: "120 tr ₫", hardCopy: "Có", storage: "Hồ sơ CTV - Tủ 3" },
    { stt: 3, id: "HĐ-CTV-003", partner: "Bùi Minh Đức", project: "FPT Startup Accelerator Batch 3", type: "Hợp đồng CTV", value: 200000000, signedDate: "05/03/2026", expiryDate: "31/08/2026", status: "Đang review", paid: "175 tr ₫", hardCopy: "Không", storage: "—" },
    { stt: 4, id: "HĐ-CTV-004", partner: "Trịnh Thị Mai", project: "BIDV CVC Advisory", type: "Hợp đồng CTV", value: 200000000, signedDate: "08/04/2026", expiryDate: "31/12/2026", status: "Đang review", paid: "100 tr ₫", hardCopy: "Không", storage: "—" },
  ];

  const contractsNonProject = [
    { stt: 1, id: "HĐ-VP-2026", partner: "Công ty Thuê văn phòng VIP", project: "Thuê văn phòng công ty", type: "Hợp đồng thuê nhà", value: 480000000, signedDate: "01/01/2026", expiryDate: "31/12/2026", status: "Đã ký", paid: "240 tr ₫", hardCopy: "Có", storage: "Tủ tổng - Ngăn 1" },
    { stt: 2, id: "HĐ-NET-2026", partner: "Nhà mạng Viettel Telecom", project: "Đường truyền Internet VP", type: "Hợp đồng dịch vụ", value: 36000000, signedDate: "01/01/2026", expiryDate: "31/12/2027", status: "Đã ký", paid: "18 tr ₫", hardCopy: "Có", storage: "Tủ tổng - Ngăn 2" },
  ];

  const list = activeTab === "outflow" ? contractsOutflow : activeTab === "inflow" ? contractsInflow : contractsNonProject;

  const handleScheduleReview = (e) => {
    e.preventDefault();
    setScheduleSuccess(true);
    setTimeout(() => {
      setScheduleSuccess(false);
      setIsReviewOpen(false);
      // Reset form
      setContractFile(null);
      setReviewDeadline("");
      setClientDeadline("");
    }, 2000);
  };

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Theo dõi Hợp đồng tài chính</h2>
          <p>Kế toán kiểm soát các điều khoản hợp đồng đầu ra (doanh thu) & đầu vào (chi phí/CTV) theo dự án</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft" onClick={() => setIsReviewOpen(true)}>
            <Icon name="CalendarClock" size={16} />Đặt lịch review hợp đồng
          </button>
          <button className="btn btn--primary">
            <Icon name="Plus" size={16} />Thêm hợp đồng mới
          </button>
        </div>
      </div>

      {/* Quick Action Banner (Feedback lần 1 page 5) */}
      <div className="locked-note" style={{ background: "var(--violet-50)", borderColor: "var(--violet-200)", color: "var(--violet-700)", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Icon name="Info" size={18} />
          <span><b>Quy trình phê duyệt hợp đồng:</b> Team dự án ném file lên platform → Đặt lịch Reviewer → Hệ thống tự động đẩy lịch hẹn lên Calendar cho Kế toán & Admin.</span>
        </div>
        <button className="btn btn--soft" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => setIsReviewOpen(true)}>Thử quy trình review</button>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 16 }}>
        <button className={`tab-btn ${activeTab === "outflow" ? "active" : ""}`} onClick={() => setActiveTab("outflow")}>
          <Icon name="ArrowUpRight" size={16} style={{ marginRight: 6 }} />Hợp đồng đầu ra (Doanh thu dự án)
        </button>
        <button className={`tab-btn ${activeTab === "inflow" ? "active" : ""}`} onClick={() => setActiveTab("inflow")}>
          <Icon name="ArrowDownLeft" size={16} style={{ marginRight: 6 }} />Hợp đồng đầu vào (Chi phí / CTV)
        </button>
        <button className={`tab-btn ${activeTab === "non-project" ? "active" : ""}`} onClick={() => setActiveTab("non-project")}>
          <Icon name="FileText" size={16} style={{ marginRight: 6 }} />Hợp đồng không theo dự án
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Số hiệu HĐ</th>
                <th>Đối tác / Vendor</th>
                <th>Dự án liên kết</th>
                <th>Phân loại</th>
                <th>Giá trị hợp đồng</th>
                <th>Đã thanh toán</th>
                <th>Thời hạn ký kết</th>
                <th>Trạng thái</th>
                <th>Bản cứng</th>
                <th>Lưu trữ bản cứng</th>
                <th style={{ width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} onClick={() => setSelectedContract(c)} style={{ cursor: "pointer" }}>
                  <td>{c.stt}</td>
                  <td><span className="mono">{c.id}</span></td>
                  <td><b style={{ color: "var(--ink-900)" }}>{c.partner}</b></td>
                  <td><small>{c.project}</small></td>
                  <td><span className="tag tag--violet">{c.type}</span></td>
                  <td><b>{vnd(c.value)}</b></td>
                  <td style={{ color: "var(--green-500)", fontWeight: 700 }}>{c.paid}</td>
                  <td>
                    <small style={{ color: "var(--ink-500)" }}>Ký: {c.signedDate}</small><br />
                    <small style={{ color: "var(--ink-400)" }}>Hết: {c.expiryDate}</small>
                  </td>
                  <td>
                    <Tag tone={c.status === "Đã ký" ? "green" : "amber"}>{c.status}</Tag>
                  </td>
                  <td>
                    <span style={{ color: c.hardCopy === "Có" ? "var(--green-500)" : "var(--red-500)", fontWeight: 700 }}>{c.hardCopy}</span>
                  </td>
                  <td><small>{c.storage}</small></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="icon-btn" title="Chi tiết" onClick={() => setSelectedContract(c)}><Icon name="Eye" size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Detail Drawer */}
      <AdminDrawer
        open={!!selectedContract}
        onClose={() => setSelectedContract(null)}
        chip="Hợp đồng"
        title="Chi tiết hợp đồng"
        sub={selectedContract?.id || ""}
      >
        {selectedContract && (
          <>
            <div className="mini-grid">
              <div className="mini-card"><small>Giá trị HĐ</small><b>{vnd(selectedContract.value)}</b></div>
              <div className="mini-card"><small>Trạng thái</small><Tag tone={selectedContract.status === "Đã ký" ? "green" : "amber"}>{selectedContract.status}</Tag></div>
              <div className="mini-card"><small>Bản cứng</small><b style={{ color: selectedContract.hardCopy === "Có" ? "var(--green-500)" : "var(--red-500)" }}>{selectedContract.hardCopy}</b></div>
            </div>

            <div className="drawer__sectitle">Thông tin chi tiết hợp đồng</div>
            <DField icon="Hash" label="Số hiệu hợp đồng">{selectedContract.id}</DField>
            <DField icon="User" label="Đối tác / Vendor">{selectedContract.partner}</DField>
            <DField icon="Briefcase" label="Dự án liên kết">{selectedContract.project}</DField>
            <DField icon="Tag" label="Phân loại">{selectedContract.type}</DField>
            <DField icon="Calendar" label="Ngày ký">{selectedContract.signedDate}</DField>
            <DField icon="CalendarX" label="Ngày hết hạn">{selectedContract.expiryDate}</DField>
            <DField icon="CreditCard" label="Đã thanh toán thực tế">{selectedContract.paid}</DField>
            <DField icon="Archive" label="Lưu trữ bản cứng tại">{selectedContract.storage}</DField>

            <div className="drawer__sectitle">Hồ sơ scan đính kèm</div>
            <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải file scan hợp đồng...")}>
              <Icon name="FilePdf" size={18} style={{ color: "var(--red-500)" }} />
              <div className="task-main" style={{ marginLeft: 8 }}>
                <div className="task-title" style={{ color: "var(--violet-600)" }}>{selectedContract.id}_scan_ban_ky.pdf</div>
                <div className="task-meta">Tải về bản scan có mộc đỏ đầy đủ</div>
              </div>
              <Icon name="Download" size={16} />
            </div>

            <div className="drawer__sectitle">Hành động</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }} onClick={() => alert("Đang gửi yêu cầu đối soát thanh toán đợt tiếp theo...")}>
                <Icon name="ArrowLeftRight" size={16} />Yêu cầu thanh toán theo tiến độ
              </button>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }} onClick={() => alert("Mở lịch sử phê duyệt hợp đồng...")}>
                <Icon name="History" size={16} />Xem lịch sử điều chỉnh & feedback
              </button>
            </div>
          </>
        )}
      </AdminDrawer>

      {/* Contract Review Schedule Modal / Drawer (Page 5) */}
      <AdminDrawer
        open={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        chip="Đặt lịch"
        title="Yêu cầu Review & Phản hồi hợp đồng"
        sub="Quy trình tự động gửi thông báo qua platform"
      >
        <form onSubmit={handleScheduleReview} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {scheduleSuccess && (
            <div className="locked-note" style={{ background: "var(--green-50, #f0fdf4)", borderColor: "var(--green-200)", color: "var(--green-700)" }}>
              <Icon name="CheckCircle2" size={16} /> Đã đặt lịch thành công! Đã tự động cập nhật lịch hẹn lên Calendar của reviewer.
            </div>
          )}

          <div>
            <label className="label" style={{ fontWeight: 700, fontSize: 13, display: "block", marginBottom: 6 }}>1. Tải lên dự thảo hợp đồng (.docx, .pdf)</label>
            <input type="file" required onChange={(e) => setContractFile(e.target.files[0]?.name || "hop_dong_du_thao.docx")} style={{ border: "1px dashed var(--line)", padding: 16, borderRadius: 12, width: "100%", cursor: "pointer", background: "var(--bg)" }} />
            {contractFile && <small style={{ color: "var(--violet-600)", fontWeight: 700, marginTop: 4, display: "block" }}>Đã chọn: {contractFile}</small>}
          </div>

          <div>
            <label className="label" style={{ fontWeight: 700, fontSize: 13, display: "block", marginBottom: 6 }}>2. Chỉ định người duyệt hợp đồng (Reviewer)</label>
            <select value={reviewer} onChange={(e) => setReviewer(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--line)", background: "var(--card)", outline: "none", fontWeight: 600 }}>
              <option value="Kế toán">Kế toán (Kiểm tra điều khoản thanh toán & tài chính)</option>
              <option value="Admin">Admin (Kiểm tra tính pháp lý & hồ sơ doanh nghiệp)</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label" style={{ fontWeight: 700, fontSize: 13, display: "block", marginBottom: 6 }}>3. Hạn Kế toán phản hồi</label>
              <input type="date" required value={reviewDeadline} onChange={(e) => setReviewDeadline(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line)" }} />
            </div>
            <div>
              <label className="label" style={{ fontWeight: 700, fontSize: 13, display: "block", marginBottom: 6 }}>4. Hạn gửi Khách hàng</label>
              <input type="date" required value={clientDeadline} onChange={(e) => setClientDeadline(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line)" }} />
            </div>
          </div>

          <div>
            <label className="label" style={{ fontWeight: 700, fontSize: 13, display: "block", marginBottom: 6 }}>5. Nội dung cần lưu ý review</label>
            <textarea placeholder="Nhập các điều khoản cần reviewer đọc kỹ hoặc điều chỉnh..." style={{ width: "100%", minHeight: 80, padding: 10, borderRadius: 8, border: "1px solid var(--line)", outline: "none" }} />
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: "100%", padding: 12, marginTop: 12, justifyContent: "center" }}>
            <Icon name="Send" size={16} /> Gửi yêu cầu & Cập nhật Calendar
          </button>
        </form>
      </AdminDrawer>
    </Page>
  );
}
