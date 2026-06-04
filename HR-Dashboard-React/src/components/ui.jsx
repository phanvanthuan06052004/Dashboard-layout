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
  // ---- Client Excellence (CRM) ----
  active: ["green", "Active"], trial: ["blue", "Trial"], churned: ["red", "Đã rời"], prospect: ["amber", "Tiềm năng"],
  healthy: ["green", "Healthy"], atRisk: ["amber", "At-risk"], critical: ["red", "Critical"],
  won: ["green", "Thắng"], lost: ["red", "Thua"], lead: ["blue", "Tiềm năng"],
  consulting: ["blue", "Đang tư vấn"], proposal: ["amber", "Đề xuất"], negotiation: ["violet", "Đàm phán"],
  renewal: ["violet", "Gia hạn"],
  // ---- Exec risk levels ----
  high: ["red", "Mức cao"], medium: ["amber", "Mức vừa"], low: ["blue", "Mức thấp"],
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
