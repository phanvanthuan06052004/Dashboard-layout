import { AnimatePresence, motion } from "framer-motion";
import Icon from "../../components/Icon";

/* Drawer shell dùng chung cho cụm Admin (Users / Roles / Audit).
   Tái dùng 100% class .drawer* sẵn có — điều khiển bằng local state.
   props: open, onClose, chip, title, sub, profile{name,sub,img}, footer, children */
export default function AdminDrawer({ open, onClose, chip = "Admin", title, sub, profile, footer, children, wide }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside 
            className={`drawer ${wide ? "drawer--wide" : ""}`} 
            style={wide ? { width: "800px", maxWidth: "90vw" } : {}}
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <div className="drawer__head">
              <button className="icon-btn drawer__close" onClick={onClose}><Icon name="X" /></button>
              <span className="chip chip--violet">{chip}</span>
              <div className="drawer__title">{title}</div>
              {sub && <div className="drawer__sub">{sub}</div>}
            </div>

            {profile && (
              <div className="drawer__profile">
                <div className="avatar"><img src={profile.img} alt={profile.name} /></div>
                <div><h3>{profile.name}</h3><p>{profile.sub}</p></div>
              </div>
            )}

            <div className="drawer__body">{children}</div>

            {footer && <div className="drawer__foot">{footer}</div>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* Field hàng (k/v) tiện dùng trong drawer admin */
export function DField({ icon, label, children, muted }) {
  return (
    <div className="field">
      <span className="field__k">{icon && <Icon name={icon} size={16} />}{label}</span>
      <span className={"field__v" + (muted ? " muted" : "")}>{children}</span>
    </div>
  );
}
