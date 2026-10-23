// La baldosa de CalcularYa (la misma del favicon del layout intl) para el pie del embed. Los ids del
// degradé son propios: dos copias en una página con el mismo id se pisan.
export function MarcaCalcularYa({ tamano = 16 }: { tamano?: number }) {
  return (
    <svg viewBox="0 0 512 512" width={tamano} height={tamano} aria-hidden="true" focusable="false" className="cye-baldosa">
      <defs>
        <linearGradient id="cye-t" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="116" fill="url(#cye-t)" />
      <rect x="136" y="186" width="240" height="58" rx="29" fill="#fff" />
      <rect x="136" y="268" width="240" height="58" rx="29" fill="#fff" />
    </svg>
  );
}
