"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  PREFIJO_HASH,
  capturarBase,
  crearRegistro,
  esControlElegible,
  esRutaCalculo,
  raizCalculadora,
  raizPagina,
  type Registro,
  type ValorCampo,
} from "@/lib/formulario";
import { haySesion } from "@/lib/sesion-cliente";
import { leerPendiente, type Pendiente } from "./pendiente";

const Barra = dynamic(() => import("./Barra"), { ssr: false });

export type Motivo =
  | { tipo: "uso" }
  | { tipo: "compartido"; hash: string }
  | { tipo: "pendiente"; pendiente: Pendiente };

export type Contexto = {
  base: { actual: Record<string, ValorCampo> | null };
  registro: Registro;
};

// Montado una sola vez en el layout: no hace nada hasta que alguien toca un control dentro
// de <main>. Hasta ese momento son cinco listeners pasivos y una lectura del hash.
export function HerramientasCalculo() {
  const pathname = usePathname();
  const [motivo, setMotivo] = useState<Motivo | null>(null);
  const [ctx] = useState<Contexto>(() => ({ base: { actual: null }, registro: crearRegistro() }));

  useEffect(() => {
    const c = ctx;
    c.base.actual = null;
    c.registro.limpiar();
    setMotivo(null);
    if (!esRutaCalculo(pathname)) return;

    const usar = () => setMotivo((m) => m ?? { tipo: "uso" });

    // La foto de los valores iniciales se toma antes del primer cambio: así el link no
    // arrastra campos que quedaron vacíos y sí los que la persona vació a propósito.
    const alTocar = (e: Event) => {
      if (c.base.actual) return;
      const main = raizPagina();
      const t = e.target;
      if (main && t instanceof Element && main.contains(t) && t.closest("input,select,textarea,button,[role=tab]"))
        c.base.actual = capturarBase(main);
    };

    const alClic = (e: MouseEvent) => {
      const main = raizPagina();
      const t = e.target;
      if (!main || !(t instanceof Element)) return;
      const btn = t.closest("button");
      if (!btn || !main.contains(btn)) return;
      c.registro.registrar(btn, main);
      if (e.isTrusted && raizCalculadora(main)?.contains(btn)) usar();
    };

    const alCambiar = (e: Event) => {
      if (e.isTrusted && esControlElegible(e.target)) usar();
    };

    const alHash = () => {
      const h = window.location.hash;
      if (h.startsWith(PREFIJO_HASH)) setMotivo({ tipo: "compartido", hash: h });
    };

    const opc = { capture: true, passive: true } as const;
    document.addEventListener("focusin", alTocar, opc);
    document.addEventListener("pointerdown", alTocar, opc);
    document.addEventListener("click", alClic, opc);
    document.addEventListener("input", alCambiar, opc);
    document.addEventListener("change", alCambiar, opc);
    window.addEventListener("hashchange", alHash);

    alHash();
    const reintento = window.setTimeout(alHash, 0);
    if (!window.location.hash.startsWith(PREFIJO_HASH) && haySesion()) {
      const p = leerPendiente(pathname);
      if (p) setMotivo({ tipo: "pendiente", pendiente: p });
    }

    return () => {
      window.clearTimeout(reintento);
      document.removeEventListener("focusin", alTocar, opc);
      document.removeEventListener("pointerdown", alTocar, opc);
      document.removeEventListener("click", alClic, opc);
      document.removeEventListener("input", alCambiar, opc);
      document.removeEventListener("change", alCambiar, opc);
      window.removeEventListener("hashchange", alHash);
    };
  }, [pathname, ctx]);

  if (!motivo) return null;
  return <Barra key={pathname} pathname={pathname} motivo={motivo} ctx={ctx} />;
}

export default HerramientasCalculo;
