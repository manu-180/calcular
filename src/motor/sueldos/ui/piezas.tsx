import type { CSSProperties } from "react";

// Piezas sin estado, para el módulo (cliente) y la página (servidor).

// Escala logarítmica: los sueldos crecen en proporción, y así p25, mediana y p75 caen donde el ojo
// espera aunque el rango sea asimétrico.
// Sin `tope`, la escala es la de la celda; en una tabla va la misma para todas las filas (`tope` = el
// p25 más bajo y el p75 más alto), así las barras se comparan entre ocupaciones.
function escala(p25: number, p75: number, tope?: { min: number; max: number }) {
  const margen = tope ? 1.15 : 1.9;
  const lo = Math.log((tope?.min ?? p25) / margen);
  const hi = Math.log((tope?.max ?? p75) * margen);
  return (x: number) => Math.min(100, Math.max(0, ((Math.log(Math.max(x, 1)) - lo) / (hi - lo)) * 100));
}

// La banda es la mitad del medio (p25 a p75), la marca fina la mediana y el punto, si va, el sueldo de
// quien compara. Decorativo: el texto de al lado dice lo mismo.
export function BarraRango({ p25, p50, p75, propio, tope }: { p25: number; p50: number; p75: number; propio?: number | null; tope?: { min: number; max: number } }) {
  const x = escala(p25, p75, tope);
  const estilo = {
    "--a": `${x(p25)}%`,
    "--b": `${x(p75)}%`,
    "--m": `${x(p50)}%`,
    ...(propio ? { "--p": `${x(propio)}%` } : {}),
  } as CSSProperties;
  return (
    <span className="cy-su-barra" style={estilo} aria-hidden="true" data-propio={propio ? "" : undefined}>
      <span className="cy-su-barra-banda" />
      <span className="cy-su-barra-mediana" />
      {propio ? <span className="cy-su-barra-propio" /> : null}
    </span>
  );
}

// Cuántos aportes tiene la celda de los K que hacen falta, en puntos (como el año de la página del
// mundo). El texto accesible lo pone quien lo usa.
export function PuntosProgreso({ n, k, etiqueta }: { n: number; k: number; etiqueta: string }) {
  const llenos = Math.min(n, k);
  return (
    <span className="cy-su-puntos" role="img" aria-label={etiqueta}>
      {Array.from({ length: k }, (_, i) => (
        <i key={i} data-lleno={i < llenos ? "" : undefined} style={{ "--i": i } as CSSProperties} />
      ))}
    </span>
  );
}
