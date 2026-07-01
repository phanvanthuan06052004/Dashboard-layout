import { useState } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";

export default function AccountingDocs() {
  const [activeFolder, setActiveFolder] = useState("all");

  const docs = [
    // 4.1. Tài liệu liên phòng ban
    { id: "doc-1", category: "inter-dept", title: "Quy chế làm việc & Quy trình phối hợp", desc: "Quy chế nội bộ công ty về chi tiêu, trình duyệt & tạm ứng thanh toán", type: "pdf", size: "3.2 MB", date: "15/01/2026" },
    { id: "doc-2", category: "inter-dept", title: "Quy chế quản lý sử dụng quỹ phúc lợi", desc: "Hướng dẫn đề xuất chi các hoạt động nội bộ phòng ban", type: "pdf", size: "1.5 MB", date: "22/02/2026" },
    
    // 4.2. Tài liệu nội bộ
    { id: "doc-3", category: "internal", title: "Phân công công việc nội bộ team Kế toán", desc: "Sơ đồ nhiệm vụ chi tiết: Công nợ, Hoá đơn, Thuế, Lương & Sổ cái", type: "xlsx", size: "1.1 MB", date: "02/06/2026" },
    { id: "doc-4", category: "internal", title: "Kho tàng luật pháp & văn bản chính sách thuế 2026", desc: "Hệ thống quy định về Thuế GTGT mới, giảm trừ gia cảnh thuế TNCN", type: "docx", size: "4.8 MB", date: "20/05/2026" },
    { id: "doc-5", category: "internal", title: "Ghi chú họp tuần team Tài chính Kế toán", desc: "Tổng kết nội dung xử lý công nợ tồn đọng & BHXH nhân viên mới", type: "docx", size: "520 KB", date: "22/06/2026" },
  ];

  const filteredDocs = activeFolder === "all" ? docs : docs.filter(d => d.category === activeFolder);

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Kho tài liệu Kế toán</h2>
          <p>Lưu trữ quy chế liên phòng ban, quy định chi tiêu, phân công công việc nội bộ và ghi chú họp của team Kế toán</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--primary" onClick={() => alert("Chức năng tải lên tài liệu mới...")}>
            <Icon name="Upload" size={16} />Tải lên tài liệu
          </button>
        </div>
      </div>

      <div className="grid grid--stats" style={{ marginBottom: 16 }}>
        <div className="card stat" style={{ borderLeft: "3px solid var(--violet-600)", cursor: "pointer" }} onClick={() => setActiveFolder("all")}>
          <div className="stat__top"><Icon name="FolderOpen" size={16} style={{ color: "var(--violet-600)" }} />Tất cả tài liệu</div>
          <div className="stat__val" style={{ fontSize: 24 }}>{docs.length}</div>
          <div className="stat__cap">Tài liệu đang lưu trữ</div>
        </div>
        <div className="card stat" style={{ borderLeft: "3px solid var(--blue-500)", cursor: "pointer" }} onClick={() => setActiveFolder("inter-dept")}>
          <div className="stat__top"><Icon name="Users2" size={16} style={{ color: "var(--blue-500)" }} />4.1. Tài liệu liên phòng ban</div>
          <div className="stat__val" style={{ fontSize: 24 }}>{docs.filter(d => d.category === "inter-dept").length}</div>
          <div className="stat__cap">Quy chế phối hợp công ty</div>
        </div>
        <div className="card stat" style={{ borderLeft: "3px solid var(--green-500)", cursor: "pointer" }} onClick={() => setActiveFolder("internal")}>
          <div className="stat__top"><Icon name="FolderLock" size={16} style={{ color: "var(--green-500)" }} />4.2. Tài liệu nội bộ Kế toán</div>
          <div className="stat__val" style={{ fontSize: 24 }}>{docs.filter(d => d.category === "internal").length}</div>
          <div className="stat__cap">Phân công, luật thuế, biên bản họp</div>
        </div>
      </div>

      <div className="card">
        <div className="card__head" style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink-900)" }}>
            <Icon name="FolderOpen" size={18} style={{ color: "var(--violet-600)", marginRight: 8 }} />
            Danh sách file trong thư mục: {activeFolder === "all" ? "Tất cả tài liệu" : activeFolder === "inter-dept" ? "Tài liệu liên phòng ban" : "Tài liệu nội bộ Kế toán"}
          </h3>
        </div>
        
        <div className="card__pad" style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="task-row" style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, background: "var(--bg)", borderRadius: 10 }}>
                {doc.type === "pdf" ? (
                  <Icon name="FilePdf" size={22} style={{ color: "var(--red-500)" }} />
                ) : doc.type === "xlsx" ? (
                  <Icon name="FileSpreadsheet" size={22} style={{ color: "var(--green-500)" }} />
                ) : (
                  <Icon name="FileText" size={22} style={{ color: "var(--blue-500)" }} />
                )}
              </div>
              
              <div className="task-main" style={{ marginLeft: 12 }}>
                <div className="task-title" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-900)" }}>{doc.title}</div>
                <div className="task-meta" style={{ marginTop: 2, fontSize: 12.5, color: "var(--ink-500)" }}>{doc.desc}</div>
              </div>
              
              <div style={{ textAlign: "right", marginRight: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-600)", display: "block" }}>{doc.size}</span>
                <span style={{ fontSize: 11, color: "var(--ink-400)", display: "block", marginTop: 2 }}>Cập nhật: {doc.date}</span>
              </div>
              
              <div style={{ display: "flex", gap: 6 }}>
                <Tag tone={doc.category === "inter-dept" ? "blue" : "green"}>
                  {doc.category === "inter-dept" ? "Liên phòng" : "Nội bộ"}
                </Tag>
                <button className="icon-btn" title="Tải xuống" onClick={() => alert(`Đang tải file: ${doc.title}`)} style={{ border: "1px solid var(--line)" }}>
                  <Icon name="Download" size={16} />
                </button>
              </div>
            </div>
          ))}

          {filteredDocs.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không có tài liệu nào trong thư mục này.</p>
          )}
        </div>
      </div>
    </Page>
  );
}
