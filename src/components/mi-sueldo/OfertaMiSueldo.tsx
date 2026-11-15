"use client";

import { useId, type ReactNode } from "react";
import { useComprar } from "@/components/compra/directa";
import { PrecioArriba } from "@/components/oferta/PrecioArriba";
import { HojaCalculo } from "@/components/HojaCalculo";
import { hojaMiSueldo, pct } from "@/components/mi-sueldo/modelo";
import { PLANILLA_MS, type Datos } from "@/lib/prefill/mi-sueldo";
import { nombrePeriodo, sumarMeses } from "@/lib/inflacion";
import { IPC_DIA_PUBLICACION } from "@/data/inflacion";
import { formatARS } from "@/lib/formato";
import type { DatosOferta } from "@/lib/oferta";

// Oferta de la Planilla Mi Sueldo debajo del resultado de /sueldo-neto. La calculadora ya le dio
// a la persona su neto; lo que no le dijo es si ese sueldo le gana a la inflación. Una sola
// pregunta (desde qué mes cobra este bruto) alcanza para mostrarle, con el IPC oficial, cuánto
// poder de compra perdió y qué aumento lo recupera: es la primera hoja de la planilla que compra,
// con sus números, y el mes elegido viaja con la compra (prefill) para que el archivo diga lo mismo.

// Otras calculadoras del empleado (aguinaldo, descuentos, salario mínimo, asignaciones) montan
// esta misma oferta con su propio título y bajada: la herramienta de inflación y la previa no cambian.
//
// `datos` NULL ES UN ESTADO, NO UNA AUSENCIA (15/11/2026). Hasta hoy las cinco calculadoras la
// montaban sólo con los datos ya cargados (`{oferta && datosCompra && <OfertaMiSueldo …>}`), y eso
// tiene dos costos que no fallan nunca: quien no completa el formulario —la mayoría— no se entera
// de que hay algo a la venta, y el marcador `data-oferta` no está en el HTML del server, que es lo
// único que el smoke de post-deploy puede mirar y lo único que el IntersectionObserver de
// `lib/rastreo.ts` llega a observar (barre `[data-oferta]` al cargar y a los 2,5 s, nunca después:
// una oferta que monta recién con el resultado no mide una sola `vista_oferta`, y entonces la
// página figura en el panel como que «no vende nada»). Por eso ahora se pinta siempre: sin datos
// va la versión corta —sin previa ni herramienta de inflación, porque no hay números de la persona
// que mostrar— y pasa sola a la completa cuando carga su sueldo.
export function OfertaMiSueldo({
  producto,
  datos,
  onUltimoAumento,
  desde = "sueldo-neto",
  insignia = "Tu sueldo frente al IPC del INDEC",
  titulo = "¿Tu sueldo le gana a la inflación?",
  bajada,
}: {
  producto: DatosOferta;
  /** null mientras la persona no cargó su sueldo: la oferta se pinta igual, en versión corta. */
  datos: Datos | null;
  onUltimoAumento: (p: string | null) => void;
  /** Marca `?desde=` del link a la landing: de ahí sale qué calculadora vende. */
  desde?: string;
  insignia?: string;
  titulo?: string;
  /** Sólo se usa con `datos`: sin ellos no hay cifra de la persona que poner en la bajada. */
  bajada?: ReactNode;
}) {
  const idTitulo = `oferta-${producto.slug}`;
  // El <section> con el marcador es el MISMO elemento en los dos estados: si se remontara al
  // aparecer el resultado, el observador de ofertas (que ya lo tiene agarrado) se quedaría
  // mirando un nodo huérfano.
  return (
    <section
      data-oferta={producto.slug}
      aria-labelledby={idTitulo}
      className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/[0.06]"
    >
      {datos === null ? (
        <OfertaCorta producto={producto} desde={desde} idTitulo={idTitulo} insignia={insignia} titulo={titulo} />
      ) : (
        <OfertaCompleta
          producto={producto}
          datos={datos}
          onUltimoAumento={onUltimoAumento}
          desde={desde}
          idTitulo={idTitulo}
          insignia={insignia}
          titulo={titulo}
          bajada={bajada}
        />
      )}
    </section>
  );
}

// La versión corta: mismo estuche, sin previa ni herramienta de inflación. Nada de lo que dice
// depende de un dato de la persona, así que no hay nada que inventarle.
function OfertaCorta({
  producto,
  desde,
  idTitulo,
  insignia,
  titulo,
}: {
  producto: DatosOferta;
  desde: string;
  idTitulo: string;
  insignia: string;
  titulo: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[1.375rem] bg-white p-4 shadow-[var(--shadow-apoyo)] sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-x-8">
      <header className="md:col-span-2">
        <Insignia texto={insignia} />
        <h3 id={idTitulo} className="mt-3 text-[1.375rem] font-bold leading-tight tracking-tight text-zinc-900 sm:text-2xl">
          {titulo}
        </h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-zinc-600">
          La planilla Mi Sueldo revisa cada recibo línea por línea, proyecta tu aguinaldo de los dos semestres y te
          dice si tu sueldo le gana a la inflación. Cargá tu sueldo acá arriba y la previa se arma con tus números.
        </p>
      </header>

      {/* Sin `PrecioArriba`: ése existe para el estado completo, donde la vista previa empuja el
          precio más de una pantalla abajo en celular. Acá el bloque de compra ya queda a la vista
          y el precio dos veces en la misma tarjeta sobra. */}
      <div className="md:col-start-1">
        <Beneficios className="mt-1" />
      </div>

      {/* El bloque de compra se separa del listado: con una línea al costado en escritorio y una
          arriba en celular, donde la grilla lo deja pegado al último punto. */}
      <div className="border-t border-zinc-100 pt-5 md:col-start-2 md:border-t-0 md:border-l md:pt-0 md:pl-8">
        <BloqueCompra producto={producto} desde={desde} />
      </div>
    </div>
  );
}

function OfertaCompleta({
  producto,
  datos,
  onUltimoAumento,
  desde,
  idTitulo,
  insignia,
  titulo,
  bajada,
}: {
  producto: DatosOferta;
  datos: Datos;
  onUltimoAumento: (p: string | null) => void;
  desde: string;
  idTitulo: string;
  insignia: string;
  titulo: string;
  bajada?: ReactNode;
}) {
  const idSelect = useId();
  const { hoja, resumen } = hojaMiSueldo(producto.archivo, datos);
  const inf = resumen.inflacion;
  const meses = Array.from({ length: PLANILLA_MS.meses }, (_, i) => sumarMeses(datos.periodo, -i));
  const elegido = datos.ultimoAumento !== null;

  return (
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[1.375rem] bg-white p-4 shadow-[var(--shadow-apoyo)] sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-x-8">
        <header className="md:col-span-2">
          <Insignia texto={insignia} />
          <h3 id={idTitulo} className="mt-3 text-[1.375rem] font-bold leading-tight tracking-tight text-zinc-900 sm:text-2xl">
            {titulo}
          </h3>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-zinc-600">
            {bajada ?? (
              <>
                Ya sabés cuánto cobrás en mano. Ahora fijate cuánto vale: elegí desde qué mes cobrás{" "}
                <strong className="font-semibold text-zinc-800">{formatARS(datos.bruto, 0)}</strong> brutos y te
                mostramos, con el IPC oficial, cuánto poder de compra perdiste y qué aumento lo recupera.
              </>
            )}
          </p>
          <PrecioArriba slug={producto.slug} precio={producto.precio} boton="Quiero mi planilla" />
        </header>

        <div className="md:col-start-1">
          <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-900/[0.06] sm:p-5">
            <label htmlFor={idSelect} className="block text-sm font-semibold text-zinc-800">
              ¿Desde qué mes cobrás este sueldo?
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">El mes de tu último aumento.</p>
            <div className="relative mt-2">
              <select
                id={idSelect}
                value={datos.ultimoAumento ?? ""}
                onChange={(e) => onUltimoAumento(e.target.value || null)}
                className="w-full appearance-none rounded-xl border border-zinc-300 bg-white py-2.5 pl-3 pr-9 text-[15px] font-medium text-zinc-900 outline-none transition-[border-color,box-shadow] duration-200 ease-[var(--ease-snappy)] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">Elegí el mes</option>
                {meses.map((p) => (
                  <option key={p} value={p}>
                    {nombrePeriodo(p)}
                  </option>
                ))}
              </select>
              <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute inset-y-0 right-3 my-auto size-4 text-zinc-400">
                <path d="m6 8 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div aria-live="polite" className="mt-4">
              {!elegido ? (
                <p className="text-sm leading-relaxed text-zinc-600">
                  Con ese dato te decimos cuánto subieron los precios desde entonces y qué sueldo necesitás hoy para
                  comprar lo mismo.
                </p>
              ) : inf ? (
                <Termometro
                  bruto={datos.bruto}
                  equivalente={inf.equivalente}
                  poder={inf.poder}
                  necesitas={inf.necesitas}
                  inflacion={inf.inflacion}
                  desde={nombrePeriodo(inf.desde)}
                  hasta={nombrePeriodo(inf.hasta)}
                />
              ) : (
                <p className="text-sm leading-relaxed text-zinc-600">
                  El INDEC todavía no publicó la inflación de {nombrePeriodo(resumen.desde)}: sale {IPC_DIA_PUBLICACION} del
                  mes siguiente. Tu sueldo está al día; la planilla suma ese mes sola cuando salga.
                </p>
              )}
            </div>
          </div>

          <Beneficios />
        </div>

        <div className="md:col-start-2 md:row-span-2 md:row-start-2">
          <HojaCalculo hoja={hoja} />
          <p className="mt-2.5 text-xs leading-relaxed text-zinc-500">
            Es la hoja «{PLANILLA_MS.hojas.resumen}» de tu planilla, con tus números. Te llega con tu sueldo ya cargado;
            sumás tus recibos anteriores y todo se recalcula.
          </p>

          <div className="mt-6 border-t border-zinc-100 pt-5">
            <BloqueCompra producto={producto} desde={desde} />
          </div>
        </div>
      </div>
  );
}

function Insignia({ texto }: { texto: string }) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800 ring-1 ring-emerald-700/10">
      <svg aria-hidden viewBox="0 0 16 16" className="size-3">
        <path d="M2 12.5 6 8l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {texto}
    </p>
  );
}

const BENEFICIOS = [
  {
    t: "Controlá cada recibo",
    d: "Cargás lo que dice tu recibo y al lado te marca si la jubilación, la Ley 19.032, la obra social y la cuota sindical están bien descontadas.",
  },
  {
    t: "Una hoja para pedir aumento",
    d: "Cuánto perdiste desde tu último aumento y cuánto pedir para recuperarlo, con la fuente del INDEC. Lista para imprimir o mandar en PDF.",
  },
  {
    t: "Aguinaldo y aviso de Ganancias",
    d: "Proyecta tu aguinaldo con tus recibos y te avisa si te acercás al piso de Ganancias. El IPC se actualiza solo cada mes.",
  },
] as const;

function Beneficios({ className = "mt-5" }: { className?: string }) {
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {BENEFICIOS.map((p) => (
        <li key={p.t} className="flex gap-3">
          <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-3">
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <p className="text-sm leading-snug text-zinc-600">
            <strong className="block font-semibold text-zinc-900">{p.t}</strong>
            {p.d}
          </p>
        </li>
      ))}
    </ul>
  );
}

// Precio, botón de compra y link a la landing. Igual en los dos estados de la oferta: el precio
// sale del catálogo (`DatosOferta`) y nunca se escribe a mano.
function BloqueCompra({ producto, desde }: { producto: DatosOferta; desde: string }) {
  const { enviando, onClick } = useComprar(producto.slug, producto.precio);
  return (
    <>
      <p className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">
          ${producto.precio.toLocaleString("es-AR")}
        </span>
        <span className="text-sm text-zinc-500">pago único, sin suscripción</span>
      </p>
      <a
        href={`/planillas/comprar?p=${producto.slug}`}
        rel="nofollow"
        data-evento="cta_compra"
        data-producto={producto.slug}
        data-ubicacion="calculadora"
        aria-busy={enviando || undefined}
        onClick={onClick}
        className="group mt-4 flex min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-emerald-600 py-1.5 pr-1.5 pl-5 text-base font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.35)] active:scale-[0.99]"
      >
        {enviando ? "Te llevamos a MercadoPago…" : "Quiero mi planilla"}
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-lg bg-white/15 transition-transform duration-200 ease-[var(--ease-snappy)] group-hover:translate-x-0.5"
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        Excel y Google Sheets. Pagás con MercadoPago y te llega al mail al instante. Si no te sirve, tenés 7 días para
        pedir la devolución.
      </p>
      <a
        href={`${producto.rutaLanding}?desde=${desde}`}
        data-evento="cta_compra"
        data-producto={producto.slug}
        data-ubicacion="calculadora-landing"
        className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition-colors hover:text-emerald-900"
      >
        Ver todo lo que trae la planilla
      </a>
    </>
  );
}

// Dos barras con la misma escala: lo que cobrás y lo que tendrías que cobrar para comprar lo mismo
// que en el mes del aumento. La diferencia se ve antes de leer el número.
function Termometro({
  bruto,
  equivalente,
  poder,
  necesitas,
  inflacion,
  desde,
  hasta,
}: {
  bruto: number;
  equivalente: number;
  poder: number;
  necesitas: number;
  inflacion: number;
  desde: string;
  hasta: string;
}) {
  const perdio = necesitas > 0;
  const max = Math.max(bruto, equivalente);
  return (
    <div>
      <p className={`text-[2rem] font-bold leading-none tracking-tight tabular-nums ${perdio ? "text-zinc-900" : "text-emerald-700"}`}>
        {pct(poder, true)}
      </p>
      <p className="mt-1.5 text-sm text-zinc-600">
        {perdio ? "de poder de compra desde " : "de poder de compra a tu favor desde "}
        {desde}. La inflación fue {pct(inflacion)}.
      </p>

      <div className="mt-4 space-y-2.5" aria-hidden>
        <Barra etiqueta="Cobrás" monto={bruto} fraccion={bruto / max} tono="bg-zinc-400" />
        <Barra etiqueta={perdio ? "Para comprar lo mismo" : "Lo que equivale"} monto={equivalente} fraccion={equivalente / max} tono="bg-emerald-600" />
      </div>

      <p className="mt-4 rounded-xl bg-white px-3.5 py-3 text-sm leading-snug text-zinc-700 ring-1 ring-zinc-900/[0.06]">
        {perdio ? (
          <>
            Para recuperarlo necesitás un aumento de{" "}
            <strong className="font-semibold text-zinc-900">{pct(necesitas)}</strong>: un bruto de{" "}
            <strong className="font-semibold text-zinc-900 tabular-nums">{formatARS(equivalente, 0)}</strong>.
          </>
        ) : (
          <>Tu sueldo le ganó a la inflación de ese período. La planilla te avisa el mes en que eso cambie.</>
        )}
      </p>
      <p className="mt-2 text-[11px] text-zinc-500">IPC del INDEC hasta {hasta}. Referencia de cálculo, no asesoramiento.</p>
    </div>
  );
}

function Barra({ etiqueta, monto, fraccion, tono }: { etiqueta: string; monto: number; fraccion: number; tono: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="text-zinc-600">{etiqueta}</span>
        <span className="font-semibold text-zinc-800 tabular-nums">{formatARS(monto, 0)}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-200/70">
        <div
          className={`h-full origin-left rounded-full ${tono} transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`}
          style={{ transform: `scaleX(${Math.max(0.02, Math.min(1, fraccion))})` }}
        />
      </div>
    </div>
  );
}
