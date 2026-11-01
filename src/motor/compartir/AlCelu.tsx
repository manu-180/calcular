"use client";

import { useEffect, useMemo, useRef } from "react";
import { encode } from "uqr";
import type { TextosRedes } from "../i18n/redes";
import { ICONOS } from "./iconos";
import "./estilos-al-celu.css";

// Instagram no sube historias desde la compu ni deja que una web le pase la imagen, así que en
// escritorio el botón abre este diálogo: un QR que lleva la tarjeta al teléfono, donde el botón de
// Instagram abre la hoja del sistema con el archivo. Descargar queda como salida secundaria.

const OJO = 7;

function Qr({ texto }: { texto: string }) {
  const { n, modulos } = useMemo(() => {
    // H aguanta el logo del centro tapando módulos.
    const qr = encode(texto, { ecc: "H", border: 0 });
    const n = qr.size;
    const hueco = Math.ceil(n * 0.22);
    const desde = Math.floor((n - hueco) / 2);
    const enOjo = (x: number, y: number) => (x < OJO && y < OJO) || (x >= n - OJO && y < OJO) || (x < OJO && y >= n - OJO);
    const enHueco = (x: number, y: number) => x >= desde && x < desde + hueco && y >= desde && y < desde + hueco;
    let d = "";
    qr.data.forEach((fila, y) =>
      fila.forEach((negro, x) => {
        if (negro && !enOjo(x, y) && !enHueco(x, y)) d += `M${x + 0.1} ${y + 0.1}h0.8v0.8h-0.8z`;
      }),
    );
    return { n, modulos: d };
  }, [texto]);

  const ojos = [
    [0, 0],
    [n - OJO, 0],
    [0, n - OJO],
  ];

  return (
    <svg className="cy-celu-qr" viewBox={`-2 -2 ${n + 4} ${n + 4}`} role="img" aria-hidden="true">
      <rect x={-2} y={-2} width={n + 4} height={n + 4} rx={3.2} fill="#fff" />
      <path d={modulos} fill="#0b1110" />
      {ojos.map(([x, y]) => (
        <g key={`${x}-${y}`} fill="#0b1110">
          <path fillRule="evenodd" d={`M${x + 1.6} ${y}h3.8a1.6 1.6 0 0 1 1.6 1.6v3.8a1.6 1.6 0 0 1-1.6 1.6h-3.8a1.6 1.6 0 0 1-1.6-1.6v-3.8a1.6 1.6 0 0 1 1.6-1.6Zm0.2 1a0.8 0.8 0 0 0-0.8 0.8v3.4a0.8 0.8 0 0 0 0.8 0.8h3.4a0.8 0.8 0 0 0 0.8-0.8v-3.4a0.8 0.8 0 0 0-0.8-0.8Z`} />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.9} />
        </g>
      ))}
    </svg>
  );
}

export interface PropsAlCelu {
  abierto: boolean;
  cerrar: () => void;
  // Lo que abre el QR: la página con la tarjeta de la persona o, si no hay, la imagen misma.
  destino: string;
  pagina: boolean;
  t: TextosRedes;
  bajar: () => void;
}

export function AlCelu({ abierto, cerrar, destino, pagina, t, bajar }: PropsAlCelu) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  const absoluto = useMemo(() => {
    if (typeof window === "undefined") return destino;
    try {
      return new URL(destino, window.location.href).toString();
    } catch {
      return destino;
    }
  }, [destino]);

  return (
    <dialog
      ref={ref}
      className="cy-celu"
      aria-labelledby="cy-celu-titulo"
      onClose={cerrar}
      onClick={(e) => {
        // Click en el fondo (fuera de la tarjeta) cierra, como cualquier hoja.
        if (e.target === e.currentTarget) cerrar();
      }}
    >
      <div className="cy-celu-tarjeta">
        <button type="button" className="cy-celu-cerrar" aria-label={t.cerrar} onClick={cerrar}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
        <div className="cy-celu-codigo">
          {abierto ? <Qr texto={absoluto} /> : null}
          <span className="cy-celu-logo" aria-hidden="true">
            {ICONOS.instagram}
          </span>
        </div>
        <h2 id="cy-celu-titulo" className="cy-celu-titulo">
          {t.alCelu}
        </h2>
        <p className="cy-celu-bajada">{pagina ? t.celuPagina : t.celuImagen}</p>
        <button type="button" className="cy-celu-bajar" onClick={bajar}>
          <span aria-hidden="true">{ICONOS.bajar}</span>
          {t.descargar}
        </button>
      </div>
    </dialog>
  );
}
