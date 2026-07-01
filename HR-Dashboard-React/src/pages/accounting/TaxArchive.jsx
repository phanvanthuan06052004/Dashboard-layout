import { useState } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";

export default function TaxArchive() {
  const [activeTab, setActiveTab] = useState("archive"); // archive | tender
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedQuarter, setSelectedQuarter] = useState("Q2");

  // Mock list of tax files for 2026 Q2
  const [gtgtBoSungList, setGtgtBoSungList] = useState([
    { name: "To_khai_GTGT_bo_sung_lan_1_Q2_2026.pdf", date: "15/06/2026", size: "2.1 MB" }
  ]);

  const [tncnBoSungList, setTncnBoSungList] = useState([]);

  const addBoSung = (type) => {
    const filename = `To_khai_${type}_bo_sung_lan_${(type === 'GTGT' ? gtgtBoSungList.length : tncnBoSungList.length) + 1}_Q2_2026.pdf`;
    const newDoc = {
      name: filename,
      date: new Date().toLocaleDateString("vi-VN"),
      size: "1.8 MB"
    };
    if (type === 'GTGT') {
      setGtgtBoSungList(prev => [...prev, newDoc]);
    } else {
      setTncnBoSungList(prev => [...prev, newDoc]);
    }
  };

  // Mock BCTC consolidated for Bidding (Sheet nhỏ 2 page 7)
  const tenderBCTC = [
    { year: 2026, status: "Dự kiến (Chưa kiểm toán)", companyVi: "BCTC_BambuUP_2026_dudoan.pdf", auditVi: "—", auditEn: "—" },
    { year: 2025, status: "Đã hoàn tất kiểm toán", companyVi: "BCTC_BambuUP_2025_signed.pdf", auditVi: "BCKT_BambuUP_2025_tiengviet.pdf", auditEn: "AuditReport_BambuUP_2025_English.pdf" },
    { year: 2024, status: "Đã hoàn tất kiểm toán", companyVi: "BCTC_BambuUP_2024_signed.pdf", auditVi: "BCKT_BambuUP_2024_tiengviet.pdf", auditEn: "AuditReport_BambuUP_2024_English.pdf" },
    { year: 2023, status: "Đã hoàn tất kiểm toán", companyVi: "BCTC_BambuUP_2023_signed.pdf", auditVi: "BCKT_BambuUP_2023_tiengviet.pdf", auditEn: "AuditReport_BambuUP_2023_English.pdf" },
    { year: 2022, status: "Đã hoàn tất kiểm toán", companyVi: "BCTC_BambuUP_2022_signed.pdf", auditVi: "BCKT_BambuUP_2022_tiengviet.pdf", auditEn: "AuditReport_BambuUP_2022_English.pdf" },
    { year: 2021, status: "Đã hoàn tất kiểm toán", companyVi: "BCTC_BambuUP_2021_signed.pdf", auditVi: "BCKT_BambuUP_2021_tiengviet.pdf", auditEn: "—" },
    { year: 2020, status: "Đã hoàn tất kiểm toán", companyVi: "BCTC_BambuUP_2020_signed.pdf", auditVi: "BCKT_BambuUP_2020_tiengviet.pdf", auditEn: "—" },
  ];

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Kho lưu trữ hồ sơ Thuế & Báo cáo tài chính</h2>
          <p>Lưu trữ pháp lý tờ khai thuế GTGT, TNCN, TNDN theo Quý/Năm & Báo cáo tài chính phục vụ làm hồ sơ thầu</p>
        </div>
      </div>

      {/* Main Tab bar */}
      <div className="tabs" style={{ marginBottom: 16 }}>
        <button className={`tab-btn ${activeTab === "archive" ? "active" : ""}`} onClick={() => setActiveTab("archive")}>
          <Icon name="FolderArchive" size={16} style={{ marginRight: 6 }} />Chi tiết hồ sơ Thuế & BCTC theo năm
        </button>
        <button className={`tab-btn ${activeTab === "tender" ? "active" : ""}`} onClick={() => setActiveTab("tender")}>
          <Icon name="ClipboardList" size={16} style={{ marginRight: 6 }} />Tổng hợp BCTC thầu (Cấp quyền team dự án)
        </button>
      </div>

      {activeTab === "archive" ? (
        <>
          {/* Year Switcher (page 6) */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
            {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map(y => (
              <button key={y} className="btn"
                onClick={() => setSelectedYear(y)}
                style={{
                  background: selectedYear === y ? "var(--violet-600)" : "var(--card)",
                  color: selectedYear === y ? "#fff" : "var(--ink-700)",
                  border: selectedYear === y ? "1px solid var(--violet-600)" : "1px solid var(--line)",
                  fontWeight: selectedYear === y ? 800 : 600,
                  padding: "8px 16px",
                  borderRadius: 10,
                  cursor: "pointer"
                }}>
                Năm {y}
              </button>
            ))}
          </div>

          {/* Quarter Switcher (page 6) */}
          <div className="card" style={{ padding: "8px 16px", display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-600)" }}>Chọn kỳ:</span>
            {["Q1", "Q2", "Q3", "Q4", "Cả năm"].map(q => (
              <button key={q}
                onClick={() => setSelectedQuarter(q)}
                style={{
                  border: "none",
                  background: selectedQuarter === q ? "var(--violet-50)" : "transparent",
                  color: selectedQuarter === q ? "var(--violet-600)" : "var(--ink-500)",
                  fontWeight: selectedQuarter === q ? 800 : 600,
                  fontSize: 13,
                  padding: "6px 12px",
                  borderRadius: 8,
                  cursor: "pointer"
                }}>
                {q}
              </button>
            ))}
            {selectedYear === 2026 && selectedQuarter === "Q2" && (
              <Tag tone="violet" style={{ marginLeft: "auto" }}><Icon name="Lock" size={12} style={{ marginRight: 4 }} /> Số liệu đã khoá - Sổ lần 1</Tag>
            )}
          </div>

          <div className="grid grid--2">
            {/* 1) THUẾ GTGT */}
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink-900)" }}><Icon name="Receipt" size={16} style={{ color: "var(--violet-600)", marginRight: 6 }} />1) Thuế Giá trị gia tăng (GTGT)</h3>
                <button className="btn btn--soft" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => addBoSung('GTGT')}>+ Tờ khai bổ sung</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Tờ khai thuế chính thức</small>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải file To_khai_thue_GTGT_chinh_thuc...")}>
                    <Icon name="FilePdf" size={16} style={{ color: "var(--red-500)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>To_khai_thue_GTGT_{selectedQuarter}_{selectedYear}.pdf</span>
                    <Icon name="Download" size={14} />
                  </div>
                </div>

                {gtgtBoSungList.length > 0 && (
                  <div>
                    <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Tờ khai thuế bổ sung</small>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {gtgtBoSungList.map((doc, idx) => (
                        <div key={idx} className="task-row" style={{ cursor: "pointer" }} onClick={() => alert(`Tải file bổ sung: ${doc.name}`)}>
                          <Icon name="FilePdf" size={16} style={{ color: "var(--red-400)" }} />
                          <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>{doc.name}</span>
                          <span style={{ fontSize: 11, color: "var(--ink-400)", marginRight: 8 }}>{doc.date}</span>
                          <Icon name="Download" size={14} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Bảng tính thuế chi tiết</small>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải bảng tính Excel...")}>
                    <Icon name="FileSpreadsheet" size={16} style={{ color: "var(--green-500)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>Bang_tinh_thue_GTGT_{selectedQuarter}_{selectedYear}.xlsx</span>
                    <Icon name="Download" size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* 2) THUẾ TNCN */}
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink-900)" }}><Icon name="Users" size={16} style={{ color: "var(--violet-600)", marginRight: 6 }} />2) Thuế Thu nhập cá nhân (TNCN)</h3>
                <button className="btn btn--soft" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => addBoSung('TNCN')}>+ Tờ khai bổ sung</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Tờ khai thuế chính thức</small>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải file To_khai_TNCN...")}>
                    <Icon name="FilePdf" size={16} style={{ color: "var(--red-500)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>To_khai_thue_TNCN_{selectedQuarter}_{selectedYear}.pdf</span>
                    <Icon name="Download" size={14} />
                  </div>
                </div>

                {tncnBoSungList.length > 0 && (
                  <div>
                    <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Tờ khai thuế bổ sung</small>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {tncnBoSungList.map((doc, idx) => (
                        <div key={idx} className="task-row" style={{ cursor: "pointer" }} onClick={() => alert(`Tải file bổ sung: ${doc.name}`)}>
                          <Icon name="FilePdf" size={16} style={{ color: "var(--red-400)" }} />
                          <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>{doc.name}</span>
                          <span style={{ fontSize: 11, color: "var(--ink-400)", marginRight: 8 }}>{doc.date}</span>
                          <Icon name="Download" size={14} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Bảng tính thuế chi tiết</small>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải bảng tính Excel...")}>
                    <Icon name="FileSpreadsheet" size={16} style={{ color: "var(--green-500)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>Bang_tinh_thue_TNCN_{selectedQuarter}_{selectedYear}.xlsx</span>
                    <Icon name="Download" size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid--2 mt">
            {/* 3) THUẾ TNDN */}
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink-900)" }}><Icon name="Building" size={16} style={{ color: "var(--violet-600)", marginRight: 6 }} />3) Thuế Thu nhập doanh nghiệp (TNDN)</h3>
                <Tag tone="amber">Cuối năm</Tag>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Tờ khai tạm nộp hàng quý</small>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải file To_khai_tam_nop...")}>
                    <Icon name="FilePdf" size={16} style={{ color: "var(--red-500)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>To_khai_thue_TNDN_tam_nop_{selectedQuarter}_{selectedYear}.pdf</span>
                    <Icon name="Download" size={14} />
                  </div>
                </div>
                {selectedQuarter === "Cả năm" && (
                  <>
                    <div>
                      <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Tờ khai quyết toán thuế năm chính thức</small>
                      <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải tờ khai quyết toán chính thức...")}>
                        <Icon name="FilePdf" size={16} style={{ color: "var(--red-500)" }} />
                        <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>Quyet_toan_TNDN_chinh_thuc_{selectedYear}.pdf</span>
                        <Icon name="Download" size={14} />
                      </div>
                    </div>
                    <div>
                      <small style={{ color: "var(--ink-500)", display: "block", marginBottom: 4 }}>Bảng tính thuế quyết toán năm</small>
                      <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Đang tải bảng tính quyết toán Excel...")}>
                        <Icon name="FileSpreadsheet" size={16} style={{ color: "var(--green-500)" }} />
                        <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>Bang_tinh_quyet_toan_TNDN_{selectedYear}.xlsx</span>
                        <Icon name="Download" size={14} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 4) BÁO CÁO TÀI CHÍNH */}
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink-900)" }}><Icon name="FileText" size={16} style={{ color: "var(--violet-600)", marginRight: 6 }} />4) Báo cáo tài chính (BCTC)</h3>
                <Tag tone="amber">Cuối năm</Tag>
              </div>

              {selectedQuarter === "Cả năm" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Tải bộ BCTC & Thuyết minh...")}>
                    <Icon name="FilePdf" size={16} style={{ color: "var(--red-500)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>Bo_BCTC_kem_thuyet_minh_BambuUP_{selectedYear}.pdf</span>
                    <Icon name="Download" size={14} />
                  </div>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Tải ghi chú điều chỉnh...")}>
                    <Icon name="FileText" size={16} style={{ color: "var(--violet-600)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>Ghi_chu_dieu_chinh_BCTC_BambuUP_{selectedYear}.pdf</span>
                    <Icon name="Download" size={14} />
                  </div>
                  <div className="task-row" style={{ cursor: "pointer" }} onClick={() => alert("Tải BCTC đã kiểm toán...")}>
                    <Icon name="FileCheck" size={16} style={{ color: "var(--green-600)" }} />
                    <span className="task-title" style={{ fontSize: 13, color: "var(--violet-600)", flex: 1, marginLeft: 8 }}>BCTC_kiem_toan_BambuUP_{selectedYear}.pdf</span>
                    <Icon name="Download" size={14} />
                  </div>
                </div>
              ) : (
                <p style={{ color: "var(--ink-400)", padding: 20, textAlign: "center", fontSize: 12.5 }}>BCTC chính thức chỉ phát sinh ở kỳ "Cả năm" cuối năm</p>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Báo cáo tài chính thầu (Sheet nhỏ 2 page 7) */
        <div className="card">
          <div className="card__head" style={{ padding: "16px 20px 8px 20px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink-900)" }}><Icon name="Award" size={18} style={{ color: "var(--violet-600)", marginRight: 8 }} />Hồ sơ Báo cáo Tài chính phục vụ Đấu thầu (Team dự án / CE xem & tải trực tiếp)</h3>
          </div>
          <div className="table-wrap" style={{ padding: "0 12px 12px 12px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Năm tài chính</th>
                  <th>Trạng thái pháp lý</th>
                  <th>BCTC Công ty (Bản ký duyệt Việt)</th>
                  <th>BCTC Kiểm toán (Bản ký Việt)</th>
                  <th>BCTC Kiểm toán (Bản Anh)</th>
                </tr>
              </thead>
              <tbody>
                {tenderBCTC.map((t) => (
                  <tr key={t.year}>
                    <td><b style={{ color: "var(--violet-600)", fontSize: 14 }}>{t.year}</b></td>
                    <td>
                      <Tag tone={t.status.includes("đã") || t.status.includes("hoàn") ? "green" : "amber"}>{t.status}</Tag>
                    </td>
                    <td>
                      {t.companyVi !== "—" ? (
                        <span style={{ color: "var(--violet-600)", display: "inline-flex", alignItems: "center", cursor: "pointer", fontWeight: 600 }} onClick={() => alert(`Đang tải: ${t.companyVi}`)}>
                          <Icon name="FilePdf" size={14} style={{ marginRight: 6, color: "var(--red-500)" }} />{t.companyVi}
                        </span>
                      ) : "—"}
                    </td>
                    <td>
                      {t.auditVi !== "—" ? (
                        <span style={{ color: "var(--violet-600)", display: "inline-flex", alignItems: "center", cursor: "pointer", fontWeight: 600 }} onClick={() => alert(`Đang tải: ${t.auditVi}`)}>
                          <Icon name="FileCheck" size={14} style={{ marginRight: 6, color: "var(--green-500)" }} />{t.auditVi}
                        </span>
                      ) : "—"}
                    </td>
                    <td>
                      {t.auditEn !== "—" ? (
                        <span style={{ color: "var(--violet-600)", display: "inline-flex", alignItems: "center", cursor: "pointer", fontWeight: 600 }} onClick={() => alert(`Đang tải: ${t.auditEn}`)}>
                          <Icon name="FileGlobe" size={14} style={{ marginRight: 6, color: "var(--blue-500)" }} />{t.auditEn}
                        </span>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Page>
  );
}
