import * as Lucide from "lucide-react";

/**
 * Render a Lucide icon by name, e.g. <Icon name="Users" size={18} />.
 * Falls back to Circle if the name is unknown.
 */
export default function Icon({ name, size = 18, ...props }) {
  const Cmp = Lucide[name] || Lucide.Circle;
  return <Cmp size={size} {...props} />;
}
