"use client";

import "./panel.css";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KpiClave, PanelDatos } from "@/lib/panel/tipos";
import { Busquedas } from "./Busquedas";
import { Calculadoras } from "./Calculadoras";
import { Compras } from "./Compras";
import { Cuentas } from "./Cuentas";
import { DetalleKpi } from "./DetalleKpi";
import { DetallePagina } from "./DetallePagina";
import { Embudos } from "./Embudos";
import { Encabezado } from "./Encabezado";
import { Hoja } from "./Hoja";
import { desplazarA, useAncho, useMenosMovimiento } from "./hooks";
import { Kpis } from "./Kpis";
import { Lecturas } from "./Lecturas";
import { META_KPI, TARJETAS } from "./meta";
import { Origen } from "./Origen";
import { PorPais } from "./paises";
import { SinDatos } from "./SinDatos";
import { usePanelDatos } from "./usePanelDatos";

type EnHoja = { tipo: "kpi"; clave: KpiClave } | { tipo: "pagina"; path: string };

export default function Panel({ inicial, demo }: { inicial: PanelDatos; demo: string | null }) {
  const p = usePanelDatos(inicial, demo);
  const { datos, rango } = p;
  const ancho = useAncho();
  const reducido = useMenosMovimiento();

  const [kpi, setKpi] = useState<KpiClave | null>(null);
  const [ultimoKpi, setUltimoKpi] = useState<KpiClave | null>(null);
  const [pagina, setPagina] = useState<string | null>(null);
  const [ultimaPagina, setUltimaPagina] = useState<string | null>(null);
  const [hoja, setHoja] = useState<EnHoja | null>(null);
  const [ultimaHoja, setUltimaHoja] = useState<EnHoja | null>(null);
  const empujado = useRef(false);

  // La hoja del celular suma una entrada al historial para que «atrás» la cierre en vez de
  // sacarte del panel. Sin URL: el parche de Next copia su estado interno y no navega.
  const abrirHoja = useCallback((h: EnHoja) => {
    setHoja(h);
    setUltimaHoja(h);
    if (!empujado.current) {
      window.history.pushState({ panelHoja: true }, "");
      empujado.current = true;
    }
  }, []);

  const cerrarHoja = useCallback(() => {
    setHoja(null);
    if (empujado.current) {
      empujado.current = false;
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const atras = () => {
      if (!empujado.current) return;
      empujado.current = false;
      setHoja(null);
    };
    window.addEventListener("popstate", atras);
    return () => window.removeEventListener("popstate", atras);
  }, []);

  const abrirKpi = useCallback(
    (clave: KpiClave) => {
      if (ancho) {
        setKpi(clave);
        setUltimoKpi(clave);
      } else abrirHoja({ tipo: "kpi", clave });
    },
    [ancho, abrirHoja],
  );

  const abrirPagina = useCallback(
    (path: string) => {
      if (ancho) {
        setPagina(path);
        setUltimaPagina(path);
      } else abrirHoja({ tipo: "pagina", path });
    },
    [ancho, abrirHoja],
  );

  const ancla = useCallback(
    (href: string) => {
      const destino = href.slice(1);
      if (destino.startsWith("kpi-")) {
        const clave = destino.slice(4) as KpiClave;
        if (TARJETAS.includes(clave)) {
          if (hoja) cerrarHoja();
          abrirKpi(clave);
          desplazarA("kpis", !reducido);
          return;
        }
      }
      if (hoja) cerrarHoja();
      window.setTimeout(() => desplazarA(destino, !reducido), hoja ? 280 : 0);
    },
    [abrirKpi, cerrarHoja, hoja, reducido],
  );

  const mostrarEnHoja = hoja ?? ultimaHoja;
  const filaHoja =
    mostrarEnHoja?.tipo === "pagina" ? datos.paginas.find((f) => f.path === mostrarEnHoja.path) : undefined;
  const tituloHoja =
    mostrarEnHoja?.tipo === "kpi" ? META_KPI[mostrarEnHoja.clave].etiqueta : (filaHoja?.titulo ?? "Detalle");

  return (
    <div className="mx-auto w-full lg:ml-[calc(50%_-_min(35rem,_50vw_-_1.5rem))] lg:w-[min(70rem,_calc(100vw_-_3rem))]">
      <div className="space-y-10 pb-6 sm:space-y-12">
        <Encabezado
          datos={datos}
          rango={rango}
          mercado={p.mercado}
          pendientes={p.pendientes}
          cargando={p.cargando}
          demo={demo}
          onRango={p.cambiarRango}
          onMercado={p.cambiarMercado}
          onPrecargar={p.precargarMercado}
          onActualizar={() => void p.actualizar()}
        />

        {p.sesionVencida ? (
          <p role="alert" className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-700/15">
            Tu sesión se venció, así que no puedo traer números nuevos.{" "}
            <a href="/login?next=/dashboard" className="font-medium underline underline-offset-2">
              Volvé a entrar
            </a>
            .
          </p>
        ) : p.falla ? (
          <p role="alert" className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-700/15">
            No pude actualizar los números. Te muestro los últimos que tengo; probá de nuevo en un minuto.
          </p>
        ) : null}

        <div
          className={`space-y-10 transition-opacity duration-300 sm:space-y-12 ${p.esDeOtroRango ? "opacity-50" : ""}`}
          aria-busy={p.esDeOtroRango}
        >
          {datos.mercados && datos.mercados.length > 0 ? (
            <PorPais datos={datos} mercado={p.mercado} onMercado={p.cambiarMercado} onPrecargar={p.precargarMercado} />
          ) : null}
          {datos.sinDatos ? (
            <SinDatos rango={rango} />
          ) : (
            <>
              <Lecturas lecturas={datos.lecturas} onAncla={ancla} />
              <Kpis
                datos={datos}
                rango={rango}
                ancho={ancho}
                abierto={ancho ? kpi : null}
                ultimoAbierto={ultimoKpi}
                onAbrir={abrirKpi}
                onCerrar={() => setKpi(null)}
                onAncla={ancla}
              />
              <Embudos datos={datos} />
              <Calculadoras
                datos={datos}
                rango={rango}
                ancho={ancho}
                abierta={ancho ? pagina : null}
                ultimaAbierta={ultimaPagina}
                onAbrir={abrirPagina}
                onCerrar={() => setPagina(null)}
              />
              <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-6">
                <Origen datos={datos} />
                <Busquedas datos={datos} rango={rango} />
              </div>
              <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-6">
                <Compras datos={datos} rango={rango} />
                <Cuentas datos={datos} rango={rango} />
              </div>
            </>
          )}
        </div>
      </div>

      {!ancho ? (
        <Hoja abierta={hoja !== null} titulo={tituloHoja} onCerrar={cerrarHoja}>
          {mostrarEnHoja?.tipo === "kpi" ? (
            <DetalleKpi clave={mostrarEnHoja.clave} datos={datos} rango={rango} onAncla={ancla} enHoja />
          ) : filaHoja ? (
            <DetallePagina fila={filaHoja} datos={datos} rango={rango} enHoja />
          ) : null}
        </Hoja>
      ) : null}
    </div>
  );
}
