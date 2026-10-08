"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Bandera } from "./Bandera";
import { IconoChevron, IconoGlobo } from "./Iconos";

export interface OpcionPais {
  codigo: string;
  nombre: string;
  pais: string;
  href: string;
}

interface Props {
  actual: OpcionPais | null;
  opciones: readonly OpcionPais[];
  textos: { elegir: string; latinoamerica: string; todos: string; hrefTodos: string };
}

export function SelectorPais({ actual, opciones, textos }: Props) {
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const idPanel = useId();

  useEffect(() => {
    if (!abierto) return;
    const alClick = (ev: PointerEvent) => {
      if (raiz.current && !raiz.current.contains(ev.target as Node)) setAbierto(false);
    };
    const alTecla = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("pointerdown", alClick);
    document.addEventListener("keydown", alTecla);
    raiz.current?.querySelector<HTMLAnchorElement>("[aria-current='true'], a")?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("pointerdown", alClick);
      document.removeEventListener("keydown", alTecla);
    };
  }, [abierto]);

  return (
    <div className="cy-selector" ref={raiz} data-abierto={abierto || undefined}>
      <button
        ref={boton}
        type="button"
        className="cy-selector-boton"
        aria-expanded={abierto}
        aria-controls={idPanel}
        aria-label={`${textos.elegir}. ${actual ? actual.nombre : textos.latinoamerica}`}
        onClick={() => setAbierto((a) => !a)}
      >
        {actual ? <Bandera pais={actual.pais} ancho={20} /> : <IconoGlobo className="cy-selector-globo" />}
        <span className="cy-selector-nombre">{actual ? actual.nombre : textos.latinoamerica}</span>
        <IconoChevron className="cy-selector-chevron" />
      </button>
      <div id={idPanel} className="cy-selector-panel" inert={!abierto}>
        <p className="cy-selector-titulo">{textos.elegir}</p>
        <ul className="cy-selector-lista">
          {opciones.map((o, i) => (
            <li key={o.codigo} style={{ "--i": i } as CSSProperties}>
              <a href={o.href} className="cy-selector-opcion" aria-current={actual?.codigo === o.codigo ? "true" : undefined}>
                <Bandera pais={o.pais} ancho={22} />
                <span>{o.nombre}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={textos.hrefTodos} className="cy-selector-todos">
          {textos.todos}
        </a>
      </div>
    </div>
  );
}
