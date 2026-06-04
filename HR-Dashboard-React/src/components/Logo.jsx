/**
 * BambuUP bamboo mark — 3 thân tre (vàng → xanh nhạt → xanh đậm) + lá.
 * SVG tái tạo từ logo thương hiệu để nét ở mọi kích thước.
 */
export default function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 108 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BambuUP">
      {/* Leaf */}
      <path
        d="M14 92 C 1 88 1 71 13 66 C 13 77 15 85 19 91 C 17 92 15 92 14 92 Z"
        fill="#c8d400"
      />
      {/* Stalk 1 — yellow */}
      <g stroke="#c8d400" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="9" y="8" width="22" height="96" rx="11" />
        <line x1="9" y1="46" x2="31" y2="46" />
        <path d="M20 56 v8 a5 5 0 0 0 5 5 h1" />
      </g>
      {/* Stalk 2 — light green */}
      <g stroke="#7cc242" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="43" y="8" width="22" height="96" rx="11" />
        <line x1="43" y1="46" x2="65" y2="46" />
        <path d="M54 56 v8 a5 5 0 0 0 5 5 h1" />
      </g>
      {/* Stalk 3 — dark green */}
      <g stroke="#159b4e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="77" y="8" width="22" height="96" rx="11" />
        <line x1="77" y1="46" x2="99" y2="46" />
        <path d="M88 56 v8 a5 5 0 0 0 5 5 h1" />
      </g>
    </svg>
  );
}
