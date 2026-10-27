"use client";

import "./panel.css";
import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { Bandera } from "@/motor/ui/Bandera";
import { MERCADO_AR, MERCADO_GLOBAL, MERCADOS_INTL, mercadoMedido } from "@/lib/medicion/mercados";
import { dolares, haceCuanto, importe, nombrePais, numero, periodo, porcentaje } from "@/lib/panel/formato";
import type { FilaMercado, Importe, PanelDatos, Rango, Reparto } from "@/lib/panel/tipos";
import { SelectorFechas } from "./Calendario";
import { SelectorRango } from "./Encabezado";
import { useAhora } from "./hooks";
import { IcoBolsa, IcoGlobo, IcoLupa, IcoPersonas, IcoRefrescar } from "./iconos";
import { Marca, nombreMercado, paisDe } from "./paises";
import { Bandeja, Seccion, TARJETA, Vacio } from "./ui";
import { usePanelDatos } from "./usePanelDatos";

type Pais = {
  codigo: string;
  nombre: string;
  pais: string | null;
  sitio: "calcular.ar" | "CalcularYa";
  visitantes: number;
  usos: number;
  ventas: number;
  ingresos: Importe[];
  ingresosUsd: number;
  embudo: FilaMercado["embudo"];
};

type Filtro = "todos" | "visitas" | "ventas" | "sin";
type Orden = "visitantes" | "ventas" | "ingresos" | "conversion" | "nombre";

const ORDENES: { clave: Orden; texto: string }[] = [
  { clave: "visitantes", texto: "Más visitas" },
  { clave: "ingresos", texto: "Más plata" },
  { clave: "ventas", texto: "Más ventas" },
  { clave: "conversion", texto: "Mejor conversión" },
  { clave: "nombre", texto: "Nombre" },
];

// Con menos visitas que esto la conversión es ruido: una venta en 3 visitas no es «el mejor país».
const MIN_VISITAS_CONVERSION = 20;

const alfabetico = new Intl.Collator("es");
const conversion = (p: Pais) => (p.visitantes > 0 ? p.ventas / p.visitantes : 0);
const pct = (f: number) => porcentaje(f, f > 0 && f < 0.01 ? 2 : 1);

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Todos los mercados publicados, tengan o no visitas, más los que midieron datos y ya no están en el
// registro. El inicio de CalcularYa no es un país: se cuenta aparte.
function armarPaises(datos: PanelDatos, nombre: (c: string) => string): { paises: Pais[]; inicio: FilaMercado | null } {
  const filas = new Map((datos.mercados ?? []).map((m) => [m.mercado, m]));
  const codigos = new Set<string>([MERCADO_AR.codigo, ...MERCADOS_INTL.map((m) => m.codigo), ...filas.keys()]);
  codigos.delete(MERCADO_GLOBAL);
  const paises = [...codigos].map((codigo): Pais => {
    const f = filas.get(codigo);
    return {
      codigo,
      nombre: nombre(codigo),
      pais: mercadoMedido(codigo)?.pais ?? paisDe(codigo),
      sitio: codigo === MERCADO_AR.codigo ? "calcular.ar" : "CalcularYa",
      visitantes: f?.visitantes ?? 0,
      usos: f?.usos ?? 0,
      ventas: f?.ventas ?? 0,
      ingresos: f?.ingresos ?? [],
      ingresosUsd: f?.ingresosUsd ?? 0,
      embudo: f?.embudo ?? null,
    };
  });
  return { paises, inicio: filas.get(MERCADO_GLOBAL) ?? null };
}

function ordenar(lista: Pais[], orden: Orden): Pais[] {
  const valor = (p: Pais) =>
    orden === "conversion" ? (p.visitantes >= MIN_VISITAS_CONVERSION ? conversion(p) : -1) : orden === "ingresos" ? p.ingresosUsd : orden === "nombre" ? 0 : p[orden];
  return [...lista].sort((a, b) => valor(b) - valor(a) || b.visitantes - a.visitantes || alfabetico.compare(a.nombre, b.nombre));
}

// nombres viene del servidor: Node y el navegador traen tablas de países distintas (Hong Kong se llama
// distinto en cada uno) y nombrarlos de los dos lados rompe la hidratación.
export function PaginaPaises({ inicial, demo, nombres }: { inicial: PanelDatos; demo: string | null; nombres: Record<string, string> }) {
  const p = usePanelDatos(inicial, demo);
  const { datos, rango } = p;
  const ahora = useAhora(datos.generado);
  const { paises, inicio } = useMemo(() => armarPaises(datos, (c) => nombres[c] ?? nombreMercado(c)), [datos, nombres]);
  const region = (iso: string) => nombres[`iso:${iso}`] ?? nombrePais(iso);

  const totales = useMemo(() => {
    const conVisitas = paises.filter((x) => x.visitantes > 0);
    const visitantes = paises.reduce((a, x) => a + x.visitantes, 0);
    const ventas = paises.reduce((a, x) => a + x.ventas, 0);
    const usd = paises.reduce((a, x) => a + x.ingresosUsd, 0);
    const banderas = new Set(paises.map((x) => x.pais ?? x.codigo)).size;
    return { conVisitas: conVisitas.length, conVentas: paises.filter((x) => x.ventas > 0).length, visitantes, ventas, usd, banderas };
  }, [paises]);

  return (
    <div className="mx-auto w-full lg:ml-[calc(50%_-_min(35rem,_50vw_-_1.5rem))] lg:w-[min(70rem,_calc(100vw_-_3rem))]">
      <div className="space-y-10 pb-6 sm:space-y-12">
        <header className="panel-aparece space-y-5">
          <Link
            href={demo ? `/dashboard?demo=${demo}&r=${rango}` : `/dashboard?r=${rango}`}
            className="group inline-flex h-9 items-center gap-1.5 rounded-full pl-2 pr-3.5 text-sm font-medium text-zinc-600 transition-[background-color,color] duration-200 hover:bg-zinc-900/[0.05] hover:text-zinc-900"
          >
            <svg className="size-4 transition-transform duration-200 ease-snappy group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M16 10H5M9 5.5 4.5 10 9 14.5" />
            </svg>
            Volver al panel
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-zinc-900/[0.05] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">Panel privado</span>
                {demo ? (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-900">
                    {demo === "vacio" ? "Demo sin datos" : "Datos de ejemplo"}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-zinc-900 sm:text-4xl">Tus países</h1>
              <p className="mt-1.5 max-w-xl text-[15px] text-zinc-600">
                {numero(paises.length)} sitios en {numero(totales.banderas)} países: Argentina en calcular.ar y el resto en CalcularYa. Lo que pasó {periodo(rango)}
                {rango === "hoy" ? ", hasta ahora" : ""}.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex w-full items-center gap-2 sm:w-auto">
              <SelectorRango rango={rango} pendientes={p.pendientes} onRango={p.cambiarRango} />
              <SelectorFechas rango={rango} pendiente={!!p.pendientes[rango]} onRango={p.cambiarRango} />
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="tabular-nums">Actualizado {haceCuanto(datos.generado, ahora)}</span>
              <button
                type="button"
                onClick={() => void p.actualizar()}
                disabled={p.cargando}
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-white px-3.5 font-medium text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_14px_-6px_rgba(0,0,0,0.16)] ring-1 ring-zinc-900/[0.07] transition-[transform,box-shadow] duration-200 ease-fluid hover:-translate-y-px active:translate-y-0 active:scale-[0.97] disabled:cursor-progress"
              >
                <IcoRefrescar className={`size-4 text-zinc-500 ${p.cargando ? "animate-spin" : "transition-transform duration-500 ease-fluid group-hover:rotate-90"}`} />
                {p.cargando ? "Actualizando" : "Actualizar"}
              </button>
            </div>
          </div>
        </header>

        {p.sesionVencida ? (
          <p role="alert" className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-700/15">
            Tu sesión se venció, así que no puedo traer números nuevos.{" "}
            <a href="/login?next=/dashboard/paises" className="font-medium underline underline-offset-2">
              Volvé a entrar
            </a>
            .
          </p>
        ) : p.falla ? (
          <p role="alert" className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-700/15">
            No pude actualizar los números. Te muestro los últimos que tengo; probá de nuevo en un minuto.
          </p>
        ) : null}

        <div className={`space-y-10 transition-opacity duration-300 sm:space-y-12 ${p.esDeOtroRango ? "opacity-50" : ""}`} aria-busy={p.esDeOtroRango}>
          <Resumen paises={paises} totales={totales} inicio={inicio} />
          {!datos.mercados ? (
            <p className="rounded-2xl bg-zinc-900/[0.035] px-4 py-3 text-sm text-zinc-600 ring-1 ring-inset ring-zinc-900/[0.055]">
              La base todavía no separa los números por país: hasta que corra la migración de medición por país, todo lo que ves es de calcular.ar.
            </p>
          ) : null}
          <Destacados paises={paises} />
          <Listado paises={paises} rango={rango} demo={demo} totalVisitas={totales.visitantes} />
          <DeDonde datos={datos} region={region} />
        </div>
      </div>
    </div>
  );
}

function Resumen({
  paises,
  totales,
  inicio,
}: {
  paises: Pais[];
  totales: { conVisitas: number; conVentas: number; visitantes: number; ventas: number; usd: number };
  inicio: FilaMercado | null;
}) {
  const cubiertos = paises.length ? totales.conVisitas / paises.length : 0;
  const tiles = [
    {
      etiqueta: "Países con visitas",
      valor: `${numero(totales.conVisitas)}`,
      extra: `de ${numero(paises.length)}`,
      nota: totales.conVisitas ? `${porcentaje(cubiertos, 0)} de tus sitios ya recibe gente` : "Todavía ninguno recibió gente",
      barra: cubiertos,
    },
    {
      etiqueta: "Visitas",
      valor: numero(totales.visitantes),
      nota: inicio && inicio.visitantes > 0 ? `y ${numero(inicio.visitantes)} más en el inicio de CalcularYa` : "Cada persona cuenta una vez por día",
    },
    {
      etiqueta: "Ventas",
      valor: numero(totales.ventas),
      nota: totales.ventas ? `en ${totales.conVentas === 1 ? "1 país" : `${numero(totales.conVentas)} países`} · compran ${pct(totales.visitantes ? totales.ventas / totales.visitantes : 0)}` : "Sin ventas en este período",
    },
    {
      etiqueta: "Ingresos",
      valor: dolares(totales.usd),
      nota: totales.usd > 0 ? "Todo pasado a dólares al día de cada venta" : "Cuando entre una venta, la ves acá",
    },
  ];
  return (
    <section aria-label="Resumen" className="panel-aparece" style={{ ["--i" as string]: 1 }}>
      <Bandeja>
        <ul className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
          {tiles.map((t) => (
            <li key={t.etiqueta} className={`${TARJETA} flex flex-col p-4 sm:p-5`}>
              <span className="text-[13px] font-medium text-zinc-600">{t.etiqueta}</span>
              <span className="mt-2 flex items-baseline gap-1.5">
                <span className="text-[1.5rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-zinc-900 sm:text-[2rem]">{t.valor}</span>
                {t.extra ? <span className="text-sm tabular-nums text-zinc-500">{t.extra}</span> : null}
              </span>
              {t.barra !== undefined ? (
                <span aria-hidden className="mt-3 block h-1.5 overflow-hidden rounded-full bg-zinc-100">
                  <span className="panel-barra block h-full rounded-full bg-emerald-500" style={{ clipPath: `inset(0 ${100 - Math.max(t.barra ? 2 : 0, t.barra * 100)}% 0 0 round 999px)` }} />
                </span>
              ) : null}
              <span className="mt-auto pt-3 text-xs leading-relaxed text-zinc-500">{t.nota}</span>
            </li>
          ))}
        </ul>
      </Bandeja>
    </section>
  );
}

function Destacados({ paises }: { paises: Pais[] }) {
  const masVisitas = ordenar(paises, "visitantes")[0];
  const masPlata = ordenar(paises, "ingresos")[0];
  const mejor = ordenar(paises, "conversion")[0];
  const cartas = [
    {
      titulo: "Donde más entran",
      pais: masVisitas?.visitantes ? masVisitas : null,
      dato: masVisitas ? `${numero(masVisitas.visitantes)} visitas` : "",
      vacio: "Todavía nadie entró en este período.",
      icono: <IcoPersonas className="size-4" />,
    },
    {
      titulo: "Donde más plata entra",
      pais: masPlata?.ingresosUsd ? masPlata : null,
      dato: masPlata ? `${dolares(masPlata.ingresosUsd)} en ${masPlata.ventas === 1 ? "1 venta" : `${numero(masPlata.ventas)} ventas`}` : "",
      vacio: "Sin ventas en este período.",
      icono: <IcoBolsa className="size-4" />,
    },
    {
      titulo: "Donde mejor convierten",
      pais: mejor && mejor.visitantes >= MIN_VISITAS_CONVERSION && mejor.ventas > 0 ? mejor : null,
      dato: mejor ? `compra el ${pct(conversion(mejor))} de los que entran (${numero(mejor.ventas)} de ${numero(mejor.visitantes)})` : "",
      vacio: `Aparece cuando un país con ${MIN_VISITAS_CONVERSION} visitas o más tenga una venta.`,
      icono: <IcoGlobo className="size-4" />,
    },
  ];
  return (
    <Seccion id="destacados" indice={2} titulo="Lo que hay que saber" bajada="Los tres países que hoy marcan la diferencia.">
      <Bandeja>
        <ul className="grid gap-1.5 md:grid-cols-3">
          {cartas.map((c) => (
            <li key={c.titulo} className={`${TARJETA} relative overflow-hidden p-5`}>
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-600">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-700/10">{c.icono}</span>
                {c.titulo}
              </span>
              {c.pais ? (
                <>
                  <span className="mt-4 flex items-center gap-3">
                    <BanderaGrande pais={c.pais.pais} codigo={c.pais.codigo} />
                    <span className="min-w-0 truncate text-xl font-semibold tracking-[-0.02em] text-zinc-900">{c.pais.nombre}</span>
                  </span>
                  <span className="mt-1.5 block text-sm tabular-nums text-zinc-600">{c.dato}</span>
                </>
              ) : (
                <span className="mt-4 block text-sm leading-relaxed text-zinc-500">{c.vacio}</span>
              )}
            </li>
          ))}
        </ul>
      </Bandeja>
    </Seccion>
  );
}

function BanderaGrande({ pais, codigo, chica = false }: { pais: string | null; codigo: string; chica?: boolean }) {
  const ancho = chica ? 24 : 36;
  return (
    <span aria-hidden className={`relative inline-flex shrink-0 overflow-hidden rounded-[5px] ring-1 ring-zinc-900/10 ${chica ? "h-4 w-6" : "h-6 w-9"}`}>
      <span className="absolute inset-0 inline-flex items-center justify-center bg-zinc-100 text-[9px] font-semibold uppercase tracking-wide text-zinc-600">{pais ?? codigo}</span>
      {pais ? <Bandera pais={pais} ancho={ancho} className="absolute inset-0 h-full w-full object-cover" /> : null}
    </span>
  );
}

const PRIMERAS = 24;

function Listado({ paises, rango, demo, totalVisitas }: { paises: Pais[]; rango: Rango; demo: string | null; totalVisitas: number }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [orden, setOrden] = useState<Orden>("visitantes");
  const [busqueda, setBusqueda] = useState("");
  const [cuantas, setCuantas] = useState(PRIMERAS);
  const diferida = useDeferredValue(busqueda);
  const idBusqueda = useId();

  const ordenados = useMemo(() => {
    const l = ordenar(paises, orden);
    return orden === "nombre" ? [...paises].sort((a, b) => alfabetico.compare(a.nombre, b.nombre)) : l;
  }, [paises, orden]);
  const puesto = useMemo(() => new Map(ordenar(paises, "visitantes").map((x, i) => [x.codigo, i + 1])), [paises]);
  const cuenta = {
    todos: paises.length,
    visitas: paises.filter((x) => x.visitantes > 0).length,
    ventas: paises.filter((x) => x.ventas > 0).length,
    sin: paises.filter((x) => x.visitantes === 0).length,
  };
  const q = normalizar(diferida.trim());
  const filtrados = ordenados.filter((x) => {
    if (filtro === "visitas" && x.visitantes === 0) return false;
    if (filtro === "ventas" && x.ventas === 0) return false;
    if (filtro === "sin" && x.visitantes > 0) return false;
    return !q || normalizar(`${x.nombre} ${x.codigo}`).includes(q);
  });
  // En «Todos» los que no tuvieron visitas van al final como chips: la grilla queda para los que tienen algo que contar.
  const activos = filtro === "todos" ? filtrados.filter((x) => x.visitantes > 0) : filtro === "sin" ? [] : filtrados;
  const quietos = filtro === "todos" || filtro === "sin" ? filtrados.filter((x) => x.visitantes === 0) : [];
  const visibles = q ? activos : activos.slice(0, cuantas);
  const tope = Math.max(1, ...paises.map((x) => x.visitantes));

  const FILTROS: { clave: Filtro; texto: string }[] = [
    { clave: "todos", texto: "Todos" },
    { clave: "visitas", texto: "Con visitas" },
    { clave: "ventas", texto: "Con ventas" },
    { clave: "sin", texto: "Sin visitas" },
  ];

  return (
    <Seccion id="todos" indice={3} titulo="País por país" bajada="Tocá un país para abrir su detalle completo en el panel: embudo, calculadoras y compras.">
      <div className="mb-3 flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Mostrar" className="flex gap-1 overflow-x-auto rounded-full bg-zinc-900/[0.05] p-1 ring-1 ring-inset ring-zinc-900/[0.06] [scrollbar-width:none]">
          {FILTROS.map((f) => {
            const activo = filtro === f.clave;
            return (
              <button
                key={f.clave}
                type="button"
                aria-pressed={activo}
                onClick={() => {
                  setFiltro(f.clave);
                  setCuantas(PRIMERAS);
                }}
                className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.96] ${
                  activo ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.16)]" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {f.texto}
                <span className={`text-xs tabular-nums ${activo ? "text-zinc-500" : "text-zinc-400"}`}>{numero(cuenta[f.clave])}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor={idBusqueda} className="relative block min-w-0 flex-1 sm:w-60 sm:flex-none">
            <span className="sr-only">Buscar un país</span>
            <IcoLupa className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              id={idBusqueda}
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar un país"
              autoComplete="off"
              className="h-11 w-full rounded-full bg-white pl-10 pr-4 text-[16px] text-zinc-900 ring-1 ring-inset ring-zinc-900/[0.08] placeholder:text-zinc-500 sm:h-10 sm:text-sm"
            />
          </label>
          <label className="shrink-0">
            <span className="sr-only">Ordenar por</span>
            <select
              value={orden}
              onChange={(e) => {
                setOrden(e.target.value as Orden);
                setCuantas(PRIMERAS);
              }}
              className="h-11 rounded-full bg-white px-3.5 text-[16px] font-medium text-zinc-800 ring-1 ring-inset ring-zinc-900/[0.08] sm:h-10 sm:text-sm"
            >
              {ORDENES.map((o) => (
                <option key={o.clave} value={o.clave}>
                  {o.texto}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <Bandeja>
        {visibles.length ? (
          <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((x) => (
              <li key={x.codigo}>
                <CartaPais pais={x} puesto={puesto.get(x.codigo) ?? 0} tope={tope} totalVisitas={totalVisitas} href={hrefPais(x.codigo, rango, demo)} />
              </li>
            ))}
          </ul>
        ) : filtro !== "sin" && !(filtro === "todos" && quietos.length) ? (
          <div className={TARJETA}>
            <Vacio>{q ? "Ningún país se llama así." : filtro === "ventas" ? "Ningún país vendió en este período." : "Ningún país tuvo visitas en este período."}</Vacio>
          </div>
        ) : null}

        {!q && activos.length > visibles.length ? (
          <div className="flex justify-center pt-1.5">
            <button
              type="button"
              onClick={() => setCuantas((n) => n + PRIMERAS)}
              className="h-10 rounded-full bg-white px-5 text-sm font-medium text-zinc-800 ring-1 ring-zinc-900/[0.07] transition-[transform] duration-200 hover:-translate-y-px active:scale-[0.97]"
            >
              Ver {numero(Math.min(PRIMERAS, activos.length - visibles.length))} más de {numero(activos.length - visibles.length)}
            </button>
          </div>
        ) : null}

        {quietos.length ? (
          <div className={`${TARJETA} p-5 ${visibles.length ? "mt-1.5" : ""}`}>
            <h3 className="text-[15px] font-semibold text-zinc-900">Todavía sin visitas</h3>
            <p className="mt-0.5 text-sm text-zinc-600">
              {quietos.length === 1 ? "1 sitio publicado" : `${numero(quietos.length)} sitios publicados`} que nadie abrió {periodo(rango)}. Es normal en los nuevos: Google tarda semanas en mostrarlos.
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {quietos.map((x) => (
                <li key={x.codigo}>
                  <Link
                    href={hrefPais(x.codigo, rango, demo)}
                    className="inline-flex h-8 items-center gap-2 rounded-full bg-zinc-50 pl-2 pr-3 text-[13px] text-zinc-700 ring-1 ring-inset ring-zinc-900/[0.06] transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    <Marca pais={x.pais} codigo={x.codigo} />
                    {x.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Bandeja>
    </Seccion>
  );
}

function hrefPais(codigo: string, rango: Rango, demo: string | null): string {
  const q = new URLSearchParams({ r: rango, mercado: codigo });
  if (demo) q.set("demo", demo);
  return `/dashboard?${q}#paises`;
}

const PASOS: { clave: "visitas" | "usaron" | "ofertas" | "ventas"; texto: string }[] = [
  { clave: "visitas", texto: "Entraron" },
  { clave: "usaron", texto: "Usaron" },
  { clave: "ofertas", texto: "Vieron oferta" },
  { clave: "ventas", texto: "Compraron" },
];

function CartaPais({ pais: x, puesto, tope, totalVisitas, href }: { pais: Pais; puesto: number; tope: number; totalVisitas: number; href: string }) {
  const parte = totalVisitas ? x.visitantes / totalVisitas : 0;
  const otras = x.ingresos.filter((i) => i.moneda !== "USD" && i.monto > 0);
  const tasa = conversion(x);
  const embudo = x.embudo;
  const topeEmbudo = embudo ? Math.max(1, embudo.visitas) : 1;
  return (
    <Link
      href={href}
      className={`${TARJETA} group flex h-full flex-col p-5 transition-[transform,box-shadow] duration-300 ease-fluid hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(0,0,0,0.05),0_16px_32px_-16px_rgba(0,0,0,0.22)] active:translate-y-0`}
    >
      <span className="flex items-start gap-3">
        <BanderaGrande pais={x.pais} codigo={x.codigo} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-zinc-900">{x.nombre}</span>
          <span className="block text-xs text-zinc-500">
            {x.sitio}
            {x.sitio === "CalcularYa" ? ` · /${x.codigo}` : ""}
          </span>
        </span>
        {x.visitantes > 0 ? <span className="shrink-0 rounded-full bg-zinc-900/[0.05] px-2 py-0.5 text-[11px] font-medium tabular-nums text-zinc-600">#{puesto}</span> : null}
      </span>

      <span className="mt-5 flex items-end justify-between gap-3">
        <span>
          <span className="block text-xs text-zinc-500">Visitas</span>
          <span className="block text-[1.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-zinc-900">{numero(x.visitantes)}</span>
        </span>
        <span className="pb-0.5 text-right text-xs tabular-nums text-zinc-500">{porcentaje(parte, parte > 0 && parte < 0.01 ? 1 : 0)} del total</span>
      </span>
      <span aria-hidden className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <span className="panel-barra block h-full rounded-full bg-emerald-500" style={{ clipPath: `inset(0 ${100 - Math.max(x.visitantes ? 2 : 0, (x.visitantes / tope) * 100)}% 0 0 round 999px)` }} />
      </span>

      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-zinc-100 pt-4 text-sm">
        <div>
          <dt className="text-xs text-zinc-500">Usaron</dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900">{numero(x.usos)}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Ventas</dt>
          <dd className={`mt-0.5 font-semibold tabular-nums ${x.ventas ? "text-zinc-900" : "text-zinc-400"}`}>{numero(x.ventas)}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Ingresos</dt>
          <dd className={`mt-0.5 font-semibold tabular-nums ${x.ingresosUsd ? "text-emerald-700" : "text-zinc-400"}`}>
            {x.ingresosUsd ? dolares(x.ingresosUsd) : "—"}
            {otras.map((i) => (
              <span key={i.moneda} className="block text-[11px] font-normal text-zinc-500">
                {importe(i.monto, i.moneda)}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      {embudo && embudo.visitas > 0 ? (
        <div className="mt-4" aria-label="Embudo">
          <ul className="grid grid-cols-4 gap-1">
            {PASOS.map((paso, i) => {
              const n = embudo[paso.clave];
              return (
                <li key={paso.clave} title={`${paso.texto}: ${numero(n)}`}>
                  <span aria-hidden className="block h-8 overflow-hidden rounded-md bg-zinc-100">
                    <span
                      className={`block h-full w-full origin-bottom rounded-md ${i === PASOS.length - 1 ? "bg-emerald-700" : "bg-emerald-500/80"}`}
                      style={{ transform: `scaleY(${n > 0 ? Math.max(0.06, n / topeEmbudo) : 0})` }}
                    />
                  </span>
                  <span className="mt-1 block truncate text-[10px] leading-tight text-zinc-500">{paso.texto}</span>
                  <span className="block text-[11px] font-medium tabular-nums text-zinc-700">{numero(n)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs">
        <span className={`rounded-full px-2 py-0.5 font-medium ring-1 ring-inset ${x.ventas ? "bg-emerald-50 text-emerald-800 ring-emerald-700/15" : "bg-zinc-50 text-zinc-500 ring-zinc-900/[0.06]"}`}>
          {x.ventas ? `Compran ${pct(tasa)}` : "Sin ventas"}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-zinc-500 transition-colors duration-200 group-hover:text-zinc-900">
          Ver detalle
          <svg className="size-3.5 transition-transform duration-200 ease-snappy group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

function DeDonde({ datos, region }: { datos: PanelDatos; region: (iso: string) => string }) {
  return (
    <Seccion
      id="origen-real"
      indice={4}
      titulo="Dónde está la gente de verdad"
      bajada="Arriba se cuenta por sitio (alguien en España puede leer la edición de México). Acá, el país desde el que se conectan."
    >
      <Bandeja>
        <div className="grid gap-1.5 md:grid-cols-2">
          <ListaReal titulo="Desde dónde entran" region={region} filas={datos.paises} vacio="Sin visitas medidas en este período." />
          <ListaReal
            titulo="Desde dónde compran"
            region={region}
            filas={datos.paisesCompra ?? []}
            vacio={datos.paisesCompra ? "Sin compras en este período." : "La base todavía no guarda el país de quien compra."}
          />
        </div>
      </Bandeja>
    </Seccion>
  );
}

function ListaReal({ titulo, filas, vacio, region }: { titulo: string; filas: Reparto[]; vacio: string; region: (iso: string) => string }) {
  const total = filas.reduce((a, f) => a + f.n, 0) || 1;
  const tope = Math.max(1, ...filas.map((f) => f.n));
  return (
    <div className={`${TARJETA} p-5`}>
      <h3 className="text-[15px] font-semibold text-zinc-900">{titulo}</h3>
      {filas.length ? (
        <ul className="mt-4 space-y-3">
          {filas.slice(0, 10).map((f) => {
            const conocido = /^[A-Z]{2}$/.test(f.clave);
            return (
              <li key={f.clave}>
                <span className="flex items-center gap-2.5 text-sm">
                  {conocido ? <BanderaGrande pais={f.clave} codigo={f.clave} chica /> : <span className="h-4 w-6 shrink-0 rounded-[4px] bg-zinc-100" aria-hidden />}
                  <span className="min-w-0 flex-1 truncate text-zinc-800">{conocido ? region(f.clave) : "Sin dato"}</span>
                  <span className="shrink-0 tabular-nums text-zinc-500">{numero(f.n)}</span>
                  <span className="w-11 shrink-0 text-right font-medium tabular-nums text-zinc-900">{porcentaje(f.n / total, 0)}</span>
                </span>
                <span aria-hidden className="ml-[2.125rem] mt-1.5 block h-1 overflow-hidden rounded-full bg-zinc-100">
                  <span className="block h-full rounded-full bg-zinc-400" style={{ width: `${(f.n / tope) * 100}%` }} />
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{vacio}</p>
      )}
    </div>
  );
}
