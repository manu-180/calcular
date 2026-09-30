export function Sparkline({
  valores,
  activo = false,
  parcial = false,
}: {
  valores: number[];
  activo?: boolean;
  parcial?: boolean;
}) {
  const n = valores.length;
  if (n < 2) return <div className="h-9" aria-hidden />;
  const max = Math.max(...valores);
  const min = Math.min(...valores);
  const rango = max - min || 1;
  const y = (v: number) => (max === min ? 18 : 32 - ((v - min) / rango) * 28);
  const pts = valores.map((v, i) => [(i / (n - 1)) * 100, y(v)] as const);
  const camino = (lista: (readonly [number, number])[]) =>
    lista.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(2)},${py.toFixed(2)}`).join("");
  const linea = camino(parcial ? pts.slice(0, -1) : pts);
  const lineaParcial = parcial ? camino(pts.slice(-2)) : "";
  const [ux, uy] = pts[n - 1];
  return (
    <div className="relative h-9" aria-hidden>
      <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <path d={`${camino(pts)}L100,36L0,36Z`} className={activo ? "fill-emerald-500/10" : "fill-zinc-900/[0.035]"} />
        <path
          d={linea}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          className={`transition-[stroke] duration-200 ${activo ? "stroke-emerald-600" : "stroke-zinc-400"}`}
        />
        {lineaParcial ? (
          <path
            d={lineaParcial}
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeWidth={1.5}
            strokeDasharray="1.5 3.5"
            strokeLinecap="round"
            className={activo ? "stroke-emerald-600" : "stroke-zinc-400"}
          />
        ) : null}
      </svg>
      <span
        className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 ring-2 ring-white"
        style={{ left: `${ux}%`, top: `${(uy / 36) * 100}%` }}
      />
    </div>
  );
}
