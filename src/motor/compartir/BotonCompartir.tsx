"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { textosCompartir } from "../i18n/compartir";
import type { ContextoSerializado } from "../tipos";
import { usarCompartir, type CanalCompartir } from "./index";
import { IconoCheck, IconoCompartir } from "./iconos";
import type { VariantePuente } from "./ref";

// Se baja recién cuando hay un resultado en pantalla (PuenteResultado lo precarga en un momento
// ocioso): el hook de compartir, el menú de escritorio y su medición no pesan en la carga de la página.

const CANALES_WEB: readonly { canal: Exclude<CanalCompartir, "nativo" | "copiar">; nombre: string }[] = [
  { canal: "whatsapp", nombre: "WhatsApp" },
  { canal: "x", nombre: "X" },
  { canal: "telegram", nombre: "Telegram" },
  { canal: "linkedin", nombre: "LinkedIn" },
];

function paginaActual(): { url: string; titulo: string } {
  if (typeof window === "undefined") return { url: "", titulo: "" };
  const h1 = document.querySelector("h1")?.textContent?.trim() ?? "";
  const titulo = (h1 || document.title).slice(0, 90);
  // Solo origen y ruta: ni la query ni el hash, que podrían traer lo que la persona cargó.
  return { url: `${window.location.origin}${window.location.pathname}`, titulo };
}

export default function BotonCompartir({
  calculadora,
  contexto,
  variante,
  abrirAlMontar,
}: {
  calculadora: string;
  contexto: ContextoSerializado;
  variante: VariantePuente | null;
  abrirAlMontar: boolean;
}) {
  const t = useMemo(() => textosCompartir(contexto.idioma, contexto.trato, contexto.locale), [contexto.idioma, contexto.trato, contexto.locale]);
  const [pagina] = useState(paginaActual);
  const datos = useMemo(() => (variante ? { v: variante } : undefined), [variante]);
  const opciones = useMemo(
    () => ({ origen: `calculadora:${calculadora}` as const, url: pagina.url, titulo: pagina.titulo, texto: t.mensaje(pagina.titulo), datos }),
    [calculadora, pagina, t, datos],
  );
  const { compartir, compartirEn, estado, soportaNativo } = usarCompartir(opciones);
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const idMenu = useId();

  const cerrar = useCallback((devolverFoco: boolean) => {
    setAbierto(false);
    if (devolverFoco) boton.current?.focus();
  }, []);

  const alTocar = () => {
    if (soportaNativo) void compartir();
    else setAbierto((a) => !a);
  };

  const yaAbrio = useRef(false);
  useEffect(() => {
    if (!abrirAlMontar || yaAbrio.current) return;
    yaAbrio.current = true;
    if (soportaNativo) void compartir();
    else setAbierto(true);
  }, [abrirAlMontar, soportaNativo, compartir]);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (ev: PointerEvent) => {
      if (!raiz.current?.contains(ev.target as Node)) setAbierto(false);
    };
    document.addEventListener("pointerdown", fuera);
    return () => document.removeEventListener("pointerdown", fuera);
  }, [abierto]);

  const alTeclear = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Escape" && abierto) {
      ev.stopPropagation();
      cerrar(true);
      return;
    }
    if (!abierto || (ev.key !== "ArrowDown" && ev.key !== "ArrowUp")) return;
    const items = Array.from(raiz.current?.querySelectorAll<HTMLButtonElement>(".cy-compartir-item") ?? []);
    if (!items.length) return;
    ev.preventDefault();
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const sig = ev.key === "ArrowDown" ? (i + 1) % items.length : (i <= 0 ? items.length : i) - 1;
    items[sig].focus();
  };

  const elegir = (canal: CanalCompartir) => {
    void compartirEn(canal);
    cerrar(true);
  };

  const anuncio = estado === "copiado" ? t.copiado : estado === "compartido" ? t.compartido : estado === "error" ? t.errorAyuda : "";

  return (
    <div className="cy-compartir" ref={raiz} onKeyDown={alTeclear} data-abierto={abierto || undefined}>
      <button
        ref={boton}
        type="button"
        className="cy-compartir-boton"
        data-estado={estado}
        aria-label={t.botonAria}
        aria-expanded={soportaNativo ? undefined : abierto}
        aria-controls={soportaNativo ? undefined : idMenu}
        onClick={alTocar}
      >
        <span className="cy-compartir-cara" data-rol="reposo" aria-hidden="true">
          <IconoCompartir />
          <span>{t.boton}</span>
        </span>
        <span className="cy-compartir-cara" data-rol="hecho" aria-hidden="true">
          <IconoCheck />
          <span>{estado === "compartido" ? t.compartido : t.copiado}</span>
        </span>
      </button>
      <span role="status" className="cy-compartir-voz">
        {anuncio}
      </span>
      {estado === "error" ? (
        <p className="cy-compartir-error" aria-hidden="true">
          {t.errorCorto}
        </p>
      ) : null}
      {abierto ? (
        <div className="cy-compartir-menu" id={idMenu} role="group" aria-label={t.menuTitulo}>
          <button type="button" className="cy-compartir-item" onClick={() => elegir("copiar")}>
            <span>{t.copiar}</span>
          </button>
          {CANALES_WEB.map(({ canal, nombre }) => (
            <button key={canal} type="button" className="cy-compartir-item" onClick={() => elegir(canal)}>
              <span>{nombre}</span>
              <span className="cy-compartir-voz">{t.nuevaPestana}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
