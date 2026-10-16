"use client";

import { useEffect, useState } from "react";
import type { FechaISO } from "../tipos";
import { Bandera } from "./Bandera";
import { FechaViva } from "./FechaViva";
import { paisDelVisitante, recordarPais } from "./geo-cliente";
import { IconoFlecha } from "./Iconos";
import { edicionPara, idiomasDelNavegador } from "./paises";

export interface PaisArranque {
  codigo: string;
  pais: string;
  nombre: string;
  href: string;
  idioma?: string;
  estas: string;
  resumen: string;
  ultimoDato: string;
  ir: string;
  otro: string;
  fecha?: { iso: FechaISO; absoluta: string };
}

export interface NeutroArranque {
  titulo: string;
  texto: string;
  ultimoDato: string;
  ir: string;
  banderas: readonly string[];
  fecha?: { iso: FechaISO; absoluta: string };
}

interface Props {
  paises: readonly PaisArranque[];
  neutro: NeutroArranque;
  hoy: string;
  ayer: string;
  ancla: string;
}

// El hueco del arranque se reserva con la tarjeta neutra (mismo alto que la del país, ver
// .cy-arranque en estilos-inicio.css): cuando llega el país no se mueve nada (CLS 0).
export function ArranquePais({ paises, neutro, hoy, ayer, ancla }: Props) {
  const [pais, setPais] = useState<PaisArranque | null>(null);

  useEffect(() => {
    let vivo = true;
    void paisDelVisitante().then((iso) => {
      const p = iso ? edicionPara(paises, iso, idiomasDelNavegador()) : undefined;
      if (vivo && p) setPais(p);
    });
    // Elegir un país en la grilla también es una elección explícita: se guarda para la próxima vez.
    const alClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest<HTMLAnchorElement>("a[data-cy-pais]");
      if (a) recordarPais(a.dataset.cyPais);
    };
    document.addEventListener("click", alClick);
    return () => {
      vivo = false;
      document.removeEventListener("click", alClick);
    };
  }, [paises]);

  return (
    <div className="cy-arranque" data-estado={pais ? "pais" : "neutro"}>
      <div className="cy-arranque-carta cy-arranque-neutro" aria-hidden={pais ? true : undefined} inert={pais ? true : undefined}>
        <div className="cy-arranque-nucleo">
          <span className="cy-arranque-banderas" aria-hidden="true">
            {neutro.banderas.map((b) => (
              <Bandera key={b} pais={b} ancho={26} />
            ))}
          </span>
          <div className="cy-arranque-texto">
            <p className="cy-arranque-titulo">{neutro.titulo}</p>
            <p className="cy-arranque-resumen">
              <span className="cy-punto-vivo" aria-hidden="true" />
              {neutro.texto}{" "}
              {neutro.fecha ? (
                <span className="cy-arranque-fecha">
                  {neutro.ultimoDato}: <FechaViva fecha={neutro.fecha.iso} absoluta={neutro.fecha.absoluta} hoy={hoy} ayer={ayer} />.
                </span>
              ) : null}
            </p>
          </div>
          <a className="cy-arranque-ancla" href={ancla}>
            {neutro.ir}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>

      {pais ? (
        <div className="cy-arranque-carta cy-arranque-pais" role="region" aria-label={pais.estas}>
          <div className="cy-arranque-nucleo">
            <span className="cy-arranque-bandera">
              <Bandera pais={pais.pais} ancho={40} />
            </span>
            <div className="cy-arranque-texto">
              <p className="cy-arranque-titulo">{pais.estas}</p>
              <p className="cy-arranque-resumen">
                {pais.resumen}{" "}
                {pais.fecha ? (
                  <span className="cy-arranque-fecha">
                    {pais.ultimoDato}: <FechaViva fecha={pais.fecha.iso} absoluta={pais.fecha.absoluta} hoy={hoy} ayer={ayer} />.
                  </span>
                ) : null}
              </p>
            </div>
            <div className="cy-arranque-acciones">
              <a className="cy-boton cy-boton-principal cy-arranque-ir" href={pais.href} data-cy-pais={pais.codigo}>
                <span>{pais.ir}</span>
                <span className="cy-boton-icono">
                  <IconoFlecha />
                </span>
              </a>
              <a className="cy-arranque-otro" href={ancla}>
                {pais.otro}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
