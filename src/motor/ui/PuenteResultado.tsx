"use client";

import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { rastrear } from "../compartir/medir";
import { IconoCompartir } from "../compartir/iconos";
import { variantePuente, type VariantePuente } from "../compartir/ref";
import { textosCompartir } from "../i18n/compartir";
import { rutaMundo } from "../mundo/rutas";
import { guardarTraspaso } from "../mundo/traspaso";
import type { ContextoSerializado, DefinicionCalculadora } from "../tipos";
import { IconoFlecha } from "./Iconos";
import "./estilos-compartir.css";

// Cuántos países dice la línea-puente. Es un piso, no la cuenta exacta: sube cuando entren más
// calculadoras de sueldo neto (hoy son 45) y nunca puede quedar por encima de las que hay.
const PAISES_PUENTE = 40;

// El menú y el share se bajan al aparecer el primer resultado, nunca con la carga de la página.
const BotonCompartir = lazy(() => import("../compartir/BotonCompartir"));

// Una exposición por página y variante: el componente se monta y desmonta mientras la persona edita.
const expuestos = new Set<string>();

function BotonEnReposo({ texto, aria, alTocar }: { texto: string; aria: string; alTocar: () => void }) {
  return (
    <div className="cy-compartir">
      <button type="button" className="cy-compartir-boton" aria-label={aria} aria-busy="true" onClick={alTocar}>
        <span className="cy-compartir-cara" data-rol="reposo" aria-hidden="true">
          <IconoCompartir />
          <span>{texto}</span>
        </span>
      </button>
    </div>
  );
}

// Lo que sigue al resultado de cada calculadora: un «Compartir» discreto (el link de esta calculadora,
// sin montos) y, solo en sueldo neto, una línea que lleva a «Tu sueldo en el mundo». Va debajo del
// resultado y con su misma voz tipográfica: ni banner, ni popup, ni antes del número.
export function PuenteResultado({
  calculadora,
  concepto,
  crudos,
  contexto,
  leible,
}: {
  calculadora: string;
  concepto: string | null;
  crudos: Readonly<Record<string, unknown>>;
  leible?: Pick<DefinicionCalculadora, "campos" | "resultado" | "mundo"> | null;
  contexto: ContextoSerializado;
}) {
  const t = useMemo(() => textosCompartir(contexto.idioma, contexto.trato, contexto.locale), [contexto.idioma, contexto.trato, contexto.locale]);
  const esSueldo = concepto === "sueldo-neto";
  // Se lee en el primer render del navegador: este componente solo existe con un resultado en pantalla,
  // que nunca se pinta en el servidor. Con un efecto la línea aparecería un cuadro después y movería la página.
  const [variante] = useState<VariantePuente | null>(() => (esSueldo && typeof window !== "undefined" ? variantePuente() : null));
  const [pidio, setPidio] = useState(false);

  useEffect(() => {
    if (!variante) return;
    const clave = `${window.location.pathname}|${variante}`;
    if (expuestos.has(clave)) return;
    expuestos.add(clave);
    rastrear("puente_visto", { props: { v: variante } });
  }, [variante]);

  const mostrarPuente = variante === "con";
  const alIrAlMundo = () => {
    guardarTraspaso(contexto.mercado, calculadora, crudos, leible ?? undefined);
    rastrear("puente_clic", { props: { v: "con" } });
  };

  return (
    <div className="cy-puente" data-solo={!mostrarPuente || undefined}>
      {mostrarPuente ? (
        <p className="cy-puente-linea">
          {t.puenteIntro}{" "}
          <a className="cy-puente-enlace" href={rutaMundo(contexto.mercado, contexto.idioma)} onClick={alIrAlMundo}>
            {t.puenteEnlace(PAISES_PUENTE)}
            <IconoFlecha className="cy-puente-flecha" />
          </a>
        </p>
      ) : null}
      <Suspense fallback={<BotonEnReposo texto={t.boton} aria={t.botonAria} alTocar={() => setPidio(true)} />}>
        <BotonCompartir calculadora={calculadora} contexto={contexto} variante={variante} abrirAlMontar={pidio} />
      </Suspense>
    </div>
  );
}
