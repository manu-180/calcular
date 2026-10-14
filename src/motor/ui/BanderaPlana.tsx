import { Children, Fragment, isValidElement, type ReactNode } from "react";

// Solo para la imagen OG (Satori no baja archivos de public/ en el runtime de la ruta og): banderas
// dibujadas a 30x20 de los países que ya estaban. Las páginas usan Bandera.tsx, que pide el archivo
// de public/banderas para cualquier país ISO. Un país sin dibujo acá sale sin bandera en la OG.
const h = (colores: readonly string[]) => colores.map((c, i) => <rect key={i} x="0" y={(20 / colores.length) * i} width="30" height={20 / colores.length + 0.05} fill={c} />);
const v = (colores: readonly string[]) => colores.map((c, i) => <rect key={i} x={(30 / colores.length) * i} y="0" width={30 / colores.length + 0.05} height="20" fill={c} />);
const estrella = (cx: number, cy: number, r: number, fill: string) => {
  const p = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.42 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return <polygon points={p} fill={fill} />;
};

const DIBUJOS: Record<string, () => ReactNode> = {
  AR: () => (
    <>
      {h(["#74ACDF", "#FFFFFF", "#74ACDF"])}
      <circle cx="15" cy="10" r="1.9" fill="#F6B40E" />
    </>
  ),
  PE: () => v(["#D91023", "#FFFFFF", "#D91023"]),
  MX: () => (
    <>
      {v(["#006847", "#FFFFFF", "#CE1126"])}
      <circle cx="15" cy="10" r="2.2" fill="#8C6239" />
    </>
  ),
  CO: () => (
    <>
      <rect width="30" height="10" fill="#FCD116" />
      <rect y="10" width="30" height="5" fill="#003893" />
      <rect y="15" width="30" height="5" fill="#CE1126" />
    </>
  ),
  EC: () => (
    <>
      <rect width="30" height="10" fill="#FFDD00" />
      <rect y="10" width="30" height="5" fill="#034EA2" />
      <rect y="15" width="30" height="5" fill="#ED1C24" />
      <ellipse cx="15" cy="10" rx="2.4" ry="3" fill="#7A5C2E" />
    </>
  ),
  CL: () => (
    <>
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect y="10" width="30" height="10" fill="#D52B1E" />
      <rect width="10" height="10" fill="#0039A6" />
      {estrella(5, 5, 2.6, "#FFFFFF")}
    </>
  ),
  UY: () => (
    <>
      {h(["#FFFFFF", "#0038A8", "#FFFFFF", "#0038A8", "#FFFFFF", "#0038A8", "#FFFFFF", "#0038A8", "#FFFFFF"])}
      <rect width="11.1" height="11.1" fill="#FFFFFF" />
      <circle cx="5.55" cy="5.55" r="3.1" fill="#FCD116" />
    </>
  ),
  PY: () => (
    <>
      {h(["#D52B1E", "#FFFFFF", "#0038A8"])}
      <circle cx="15" cy="10" r="2" fill="none" stroke="#2F7D32" strokeWidth="0.8" />
    </>
  ),
  BO: () => h(["#D52B1E", "#F9E300", "#007934"]),
  VE: () => (
    <>
      {h(["#FFCC00", "#00247D", "#CF142B"])}
      {Array.from({ length: 8 }, (_, i) => {
        const a = Math.PI * (0.15 + (0.7 * i) / 7);
        return <circle key={i} cx={15 - 5.2 * Math.cos(a)} cy={12.4 - 4.2 * Math.sin(a)} r="0.55" fill="#FFFFFF" />;
      })}
    </>
  ),
  CR: () => (
    <>
      <rect width="30" height="20" fill="#002B7F" />
      <rect y="3.33" width="30" height="13.34" fill="#FFFFFF" />
      <rect y="6.67" width="30" height="6.66" fill="#CE1126" />
    </>
  ),
  PA: () => (
    <>
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect x="15" width="15" height="10" fill="#DA121A" />
      <rect y="10" width="15" height="10" fill="#072357" />
      {estrella(7.5, 5, 2.4, "#072357")}
      {estrella(22.5, 15, 2.4, "#DA121A")}
    </>
  ),
  NI: () => (
    <>
      {h(["#0067C6", "#FFFFFF", "#0067C6"])}
      <polygon points="15,7.6 17.4,11.8 12.6,11.8" fill="#3A9B5C" />
    </>
  ),
  DO: () => (
    <>
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect width="13" height="8" fill="#002D62" />
      <rect x="17" width="13" height="8" fill="#CE1126" />
      <rect y="12" width="13" height="8" fill="#CE1126" />
      <rect x="17" y="12" width="13" height="8" fill="#002D62" />
    </>
  ),
  GT: () => (
    <>
      {v(["#4997D0", "#FFFFFF", "#4997D0"])}
      <circle cx="15" cy="10" r="2" fill="none" stroke="#5B8C3A" strokeWidth="0.8" />
    </>
  ),
  SV: () => (
    <>
      {h(["#0F47AF", "#FFFFFF", "#0F47AF"])}
      <circle cx="15" cy="10" r="1.8" fill="none" stroke="#C9A227" strokeWidth="0.7" />
    </>
  ),
  HN: () => (
    <>
      {h(["#0073CF", "#FFFFFF", "#0073CF"])}
      {[
        [15, 10],
        [11.5, 8.4],
        [11.5, 11.6],
        [18.5, 8.4],
        [18.5, 11.6],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.75" fill="#0073CF" />
      ))}
    </>
  ),
  BR: () => (
    <>
      <rect width="30" height="20" fill="#009C3B" />
      <polygon points="15,2.4 27.4,10 15,17.6 2.6,10" fill="#FFDF00" />
      <circle cx="15" cy="10" r="4.4" fill="#002776" />
    </>
  ),
  ZZ: () => (
    <>
      <rect width="30" height="20" fill="#1E2A44" />
      <polygon points="0,20 30,0 30,20" fill="#E8A33D" />
      <circle cx="9" cy="7" r="2.6" fill="#F6F1E6" />
    </>
  ),
};

function aplanar(nodo: ReactNode): ReactNode[] {
  return Children.toArray(nodo).flatMap((n) => (isValidElement(n) && n.type === Fragment ? aplanar((n.props as { children?: ReactNode }).children) : [n]));
}

// Para la imagen OG: Satori (next/og) solo acepta elementos de SVG adentro de un <svg>, sin
// fragmentos, y no sabe qué hacer con className.
export function BanderaPlana({ pais, ancho }: { pais: string; ancho: number }) {
  const dibujo = DIBUJOS[pais];
  if (!dibujo) return null;
  return (
    <svg viewBox="0 0 30 20" width={ancho} height={(ancho * 2) / 3}>
      {aplanar(dibujo())}
    </svg>
  );
}
