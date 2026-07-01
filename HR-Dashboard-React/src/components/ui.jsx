import { motion } from "framer-motion";

const STATUS = {
  overdue: ["red", "Overdue"], todo: ["slate", "Todo"], doing: ["blue", "Doing"], done: ["green", "Done"],
  fulltime: ["green", "Chính thức"], freelance: ["amber", "Freelance"], "On Track": ["green", "On Track"],
  probation: ["amber", "Thử việc"], training: ["blue", "Đào tạo"], intern: ["slate", "Thực tập"],
  approved: ["green", "Đã duyệt"], pending: ["amber", "Chờ duyệt"], processing: ["blue", "Đang xử lý"], rejected: ["red", "Từ chối"],
  present: ["green", "Đúng giờ"], late: ["amber", "Đi muộn"], absent: ["red", "Vắng"],
  open: ["blue", "Đang tuyển"], closed: ["slate", "Đã đóng"], draft: ["amber", "Nháp"],
  // ---- Marcom ----
  running: ["green", "Đang chạy"], ended: ["slate", "Đã kết thúc"], scheduled: ["blue", "Đã lên lịch"],
  published: ["green", "Đã đăng"], paused: ["amber", "Tạm dừng"],
  new: ["slate", "Lead mới"], mql: ["amber", "MQL"], sql: ["blue", "SQL"], opp: ["violet", "Opportunity"],
  // Messenger segmentation (Audience Intelligence)
  converted: ["green", "Đã chuyển đổi"], hot: ["red", "Hot"], warm: ["amber", "Warm"], cold: ["slate", "Cold"],
  // ---- Client Excellence (CRM cũ — giữ tương thích) ----
  active: ["green", "Active"], trial: ["blue", "Trial"], churned: ["red", "Đã rời"], prospect: ["amber", "Tiềm năng"],
  healthy: ["green", "Healthy"], atRisk: ["amber", "At-risk"], critical: ["red", "Critical"],
  won: ["green", "Thắng (Won)"], lost: ["red", "Thua (Lost)"], lead: ["blue", "Tiềm năng"],
  consulting: ["blue", "Đang tư vấn"], proposal: ["amber", "Đề xuất"], negotiation: ["amber", "Đàm phán"],
  renewal: ["violet", "Gia hạn"],
  // ---- Client Excellence (tái dựng theo CEMS) ----
  // Account status
  inDiscussion: ["blue", "Đang trao đổi"], dormant: ["slate", "Tạm ngừng"], former: ["red", "Ngừng hợp tác"], strategic: ["violet", "Tài khoản CL"],
  // Opportunity stages
  discussion: ["blue", "Trao đổi"], proposalDev: ["amber", "Soạn Proposal"], submitted: ["violet", "Đã nộp"],
  // Project status / RAG health
  planning: ["slate", "Lập kế hoạch"], onHold: ["amber", "Tạm dừng"], completed: ["green", "Hoàn thành"],
  green: ["green", "Đúng tiến độ"], yellow: ["amber", "Cần chú ý"], red: ["red", "Rủi ro"],
  // Deliverable status
  notStarted: ["slate", "Chưa bắt đầu"], inProgress: ["blue", "Đang làm"], inReview: ["violet", "Đang review"], overdueD: ["red", "Quá hạn"],
  // Startup pipeline rounds
  applied: ["slate", "Đã nộp đơn"], qualified: ["blue", "Đạt sơ tuyển"], shortlisted: ["amber", "Vào shortlist"], finalist: ["violet", "Chung kết"], winner: ["green", "Quán quân"],
  // Matchmaking stages
  matchmaking: ["slate", "Matchmaking"], followup: ["blue", "Follow-up"], businessDiscussion: ["amber", "Bàn hợp tác"], pilot: ["violet", "Pilot/POC"], partnership: ["green", "Partnership"],
  // Event status
  upcoming: ["blue", "Sắp diễn ra"], held: ["green", "Đã tổ chức"],
  // ---- Exec risk levels ----
  high: ["red", "Mức cao"], medium: ["amber", "Mức vừa"], low: ["blue", "Mức thấp"],
  // ---- HR: trạng thái ký kết văn bản (Sheet 02/03) ----
  signed: ["green", "Đã ký kết"], sent: ["blue", "Đã gửi"], reviewing: ["amber", "Chờ duyệt"], drafting: ["slate", "Dự thảo"],
  // ---- HR: trạng thái Offer (Sheet 06) ----
  confirmed: ["green", "Đã confirm"], preparing: ["blue", "Chuẩn bị HĐ"],
  // ---- HR: trạng thái thưởng Referral (Sheet 06) ----
  passed: ["blue", "Hồ sơ đạt"], paid: ["green", "Đã chi thưởng"],
  // ---- HR: trạng thái nhân sự (Sheet 01) ----
  terminated: ["red", "Đã nghỉ"],
  // ---- HR: L&D / IDP & training (Sheet 08) ----
  notstarted: ["slate", "Chưa bắt đầu"], doing2: ["blue", "Đang học"],
  // ---- HR: đánh giá CV (Sheet 06) ----
  Fit: ["green", "Fit"], Consider: ["amber", "Consider"], "Chờ đánh giá": ["slate", "Chờ đánh giá"],
};

// Contract type → tone
const HD_TONE = { HĐLĐ: "green", HĐTK: "violet", HĐTV: "amber", HĐĐT: "blue", HĐTTS: "slate" };
export function ContractTag({ type }) {
  return <span className={`tag tag--${HD_TONE[type] || "slate"}`}>{type}</span>;
}

export function Tag({ status, tone, children }) {
  if (status) {
    const [t, label] = STATUS[status] || ["slate", status];
    return <span className={`tag tag--${t}`}><span className="dotmini" />{label}</span>;
  }
  return <span className={`tag tag--${tone || "slate"}`}>{children}</span>;
}

/* ---- HR shared cell renderers (dùng cho RecordTable + DrillDrawer) ---- */
const COMP_GROUP = { core: ["violet", "Cốt lõi"], technical: ["blue", "Chuyên môn"], leadership: ["amber", "Lãnh đạo"] };
export function CompGroup({ g }) {
  const [t, l] = COMP_GROUP[g] || ["slate", g];
  return <span className={`tag tag--${t}`}>{l}</span>;
}
export function Level({ v }) {
  const n = Number(v) || 0;
  return (
    <span className="lvl">
      {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= n ? "on" : ""} />)}
      <b>{n}/5</b>
    </span>
  );
}
export function GapTag({ v }) {
  const n = Number(v);
  if (Number.isNaN(n)) return <span>—</span>;
  const t = n < 0 ? "red" : n > 0 ? "green" : "slate";
  return <span className={`tag tag--${t}`}>{n > 0 ? `+${n}` : n}{n < 0 ? " · cần đào tạo" : ""}</span>;
}
export function YesNo({ v }) {
  const yes = v === "Có" || v === true || v === "Yes";
  return <span className={`tag tag--${yes ? "green" : "slate"}`}>{yes ? "Có" : "Không"}</span>;
}

export function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
