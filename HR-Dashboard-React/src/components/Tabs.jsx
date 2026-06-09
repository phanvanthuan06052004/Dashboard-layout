import Icon from "./Icon";

/**
 * Thanh tab dạng segmented control.
 * tabs: [{ key, label, icon?, count? }], active: key, onChange(key)
 */
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={"tab" + (active === t.key ? " is-active" : "")}
          onClick={() => onChange(t.key)}
        >
          {t.icon && <Icon name={t.icon} size={15} />}
          <span>{t.label}</span>
          {t.count != null && <span className="tab__count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
