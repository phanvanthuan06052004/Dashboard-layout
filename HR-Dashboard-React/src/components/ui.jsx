import { motion } from "framer-motion";

const STATUS = {
  overdue: ["red", "Overdue"], todo: ["slate", "Todo"], doing: ["blue", "Doing"], done: ["green", "Done"],
  fulltime: ["green", "Full-time"], freelance: ["amber", "Freelance"], "On Track": ["green", "On Track"],
};

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
