"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { idVisitante, normalizarRuta, rastrear } from "@/lib/rastreo";
import { leerDatosCompra, suscribirDatosCompra } from "@/lib/prefill/cliente";

export type DatosCompra = {
  slug: string;
  tituloCorto: string;
  precio: number;
  /** Sin esto se deduce del slug: los informes empiezan con «informe-». */
  entrega?: "xlsx" | "informe";
};

const esInforme = (p: DatosCompra) => (p.entrega ?? (p.slug.startsWith("informe-") ? "informe" : "xlsx")) === "informe";

// Mismo tope que el servidor (DATOS_MAX en prefill/servidor.ts): más grande se descarta allá igual,
// y así no viaja un formulario pesado para nada.
const DATOS_MAX = 2048;

function datosGuardados(slug: string): string {
  const datos = leerDatosCompra(slug);
  if (datos === null || datos === undefined) return "";
  try {
    const texto = JSON.stringify(datos);
    return texto.length <= DATOS_MAX ? texto : "";
  } catch {
    return "";
  }
}

/** Si la calculadora dejó datos para este producto. En el servidor (y al hidratar) da false. */
function useHayDatos(slug: string): boolean {
  return useSyncExternalStore(
    suscribirDatosCompra,
    () => datosGuardados(slug) !== "",
    () => false,
  );
}

const selector = (slug: string) => `dialog[data-compra="${slug}"]`;

/** Abre el diálogo de compra del producto si la página lo tiene montado. Devuelve false si no,
 *  para que el botón siga su href (la página /planillas/comprar hace lo mismo sin JS). */
export function abrirCompra(slug: string): boolean {
  const d = document.querySelector<HTMLDialogElement>(selector(slug));
  if (!d || typeof d.showModal !== "function") return false;
  if (!d.open) {
    d.showModal();
    rastrear("dialogo_compra", { producto: slug });
  }
  return true;
}

// De dónde vino el comprador. Los CTA internos lo marcan con `?desde=<pagina>`; si no, vale el
// host del referrer externo (google, chatgpt…). Con navegación SPA el referrer no cambia, así
// que la marca del CTA es la única señal confiable de qué calculadora mandó la venta.
function origen(): string {
  const marcado = new URLSearchParams(location.search).get("desde");
  if (marcado && /^[a-z0-9-]{1,40}$/i.test(marcado)) return marcado;
  try {
    if (document.referrer) {
      const r = new URL(document.referrer);
      if (r.host !== location.host) return r.hostname.replace(/^www\./, "");
      return r.pathname;
    }
  } catch {
    // referrer ilegible: se cae a "directo"
  }
  return "directo";
}

// `desde` es la marca que viaja en la referencia de MP (la lee tools/embudo-planillas.ts); `ruta`,
// la página donde se abrió la compra, que es lo que va a ca_checkouts.
// `datos`, lo que la persona cargó en la calculadora: viaja con el pago y vuelve en la entrega.
// Sólo si vio la casilla y la dejó tildada; sin casilla a la vista no viaja nada.
function ocultos(slug: string, usarDatos: boolean): Record<string, string> {
  return {
    desde: `${origen()}_${location.pathname}`,
    ruta: normalizarRuta(location.pathname),
    vid: idVisitante(),
    datos: usarDatos ? datosGuardados(slug) : "",
  };
}

export function FormularioCompra({
  producto,
  errorEmail = false,
  autoFocus = false,
  enPagina = false,
}: {
  producto: DatosCompra;
  errorEmail?: boolean;
  autoFocus?: boolean;
  /** En /planillas/comprar el formulario ES el paso «abrió la compra» del embudo. */
  enPagina?: boolean;
}) {
  const [enviando, setEnviando] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const usarDatosRef = useRef<HTMLInputElement>(null);
  const precio = `$${producto.precio.toLocaleString("es-AR")}`;
  const informe = esInforme(producto);
  const hayDatos = useHayDatos(producto.slug);

  useEffect(() => {
    if (enPagina) rastrear("dialogo_compra", { producto: producto.slug, props: { ubicacion: "pagina" } });
  }, [enPagina, producto.slug]);

  // Los ocultos se escriben al armar el POST y no en onSubmit: el re-render de setEnviando corre
  // antes de que el navegador junte los campos, y con un defaultValue React los volvía a vaciar.
  useEffect(() => {
    const f = formRef.current;
    if (!f) return;
    const completar = (e: FormDataEvent) => {
      for (const [k, v] of Object.entries(ocultos(producto.slug, usarDatosRef.current?.checked === true))) e.formData.set(k, v);
    };
    f.addEventListener("formdata", completar);
    return () => f.removeEventListener("formdata", completar);
  }, [producto.slug]);

  // Volver con el botón «atrás» desde MercadoPago restaura la página del bfcache con el botón
  // todavía en «Te llevamos…»: sin esto el comprador arrepentido no puede reintentar.
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => e.persisted && setEnviando(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/mp/checkout"
      onSubmit={(e) => {
        const campos = e.currentTarget.elements;
        for (const [k, v] of Object.entries(ocultos(producto.slug, usarDatosRef.current?.checked === true))) {
          const input = campos.namedItem(k);
          if (input instanceof HTMLInputElement) input.value = v;
        }
        setEnviando(true);
        rastrear("checkout", { producto: producto.slug, valor: producto.precio });
      }}
      className="space-y-4"
    >
      <input type="hidden" name="p" value={producto.slug} />
      <input type="hidden" name="desde" />
      <input type="hidden" name="ruta" />
      <input type="hidden" name="vid" />
      <input type="hidden" name="datos" />
      {/* Campo trampa (ver POST de /api/mp/checkout): invisible para personas y lectores de pantalla. */}
      <input type="text" name="sitio" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" defaultValue="" />

      <div>
        <label htmlFor={`email-${producto.slug}`} className="block text-sm font-semibold text-zinc-900">
          {informe ? "¿A qué mail te lo mandamos?" : "¿A qué mail te la mandamos?"}
        </label>
        <input
          id={`email-${producto.slug}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          autoFocus={autoFocus}
          placeholder="tu@email.com"
          aria-describedby={`email-ayuda-${producto.slug}`}
          aria-invalid={errorEmail || undefined}
          className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none aria-[invalid=true]:border-red-400"
        />
        {errorEmail ? (
          <p className="mt-1.5 text-sm font-medium text-red-700">Revisá el mail: parece que le falta algo.</p>
        ) : null}
        <p id={`email-ayuda-${producto.slug}`} className="mt-1.5 text-xs leading-relaxed text-zinc-500">
          {informe
            ? "Ahí te llega el enlace a tu informe apenas se acredita el pago, para abrirlo cuando lo necesites."
            : "Ahí te llega el enlace de descarga apenas se acredita el pago, y las actualizaciones del año."}{" "}
          Si no terminás de pagar, te escribimos una sola vez para recordártelo.
        </p>
      </div>

      {hayDatos ? (
        <label
          htmlFor={`usar-datos-${producto.slug}`}
          className="flex cursor-pointer items-start gap-2.5 rounded-lg bg-emerald-50/80 px-3 py-2.5 text-[13px] leading-snug text-emerald-900 ring-1 ring-emerald-600/10"
        >
          {/* Sin `name`: no viaja en el form; decide si `datos` va lleno o vacío (ver ocultos). */}
          <input
            ref={usarDatosRef}
            id={`usar-datos-${producto.slug}`}
            type="checkbox"
            defaultChecked
            className="mt-0.5 size-4 shrink-0 accent-emerald-600"
          />
          <span>
            <span className="font-semibold">Usar los datos que cargué en la calculadora</span>
            <span className="mt-0.5 block text-emerald-900/75">
              {informe ? "Así el informe te llega armado con tu caso." : "Así la planilla te llega con tus valores ya cargados."}{" "}
              Viajan con el pago a MercadoPago, sin nombres.{" "}
              <Link href="/privacidad#compras" target="_blank" className="underline decoration-emerald-600/40 underline-offset-2 hover:decoration-emerald-600">
                Qué datos son
              </Link>
            </span>
          </span>
        </label>
      ) : null}

      <button
        type="submit"
        disabled={enviando}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3.5 text-base font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.22)] active:translate-y-px disabled:cursor-wait disabled:bg-emerald-700"
      >
        {enviando ? (
          <>
            <span
              aria-hidden
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            Te llevamos a MercadoPago…
          </>
        ) : (
          <>Continuar al pago · {precio}</>
        )}
      </button>

      <ul className="grid gap-1.5 text-xs text-zinc-600 sm:grid-cols-2">
        <li className="flex items-center gap-1.5">
          <Tilde /> Tarjeta, débito o dinero en cuenta
        </li>
        <li className="flex items-center gap-1.5">
          <Tilde /> No vemos ni guardamos tu tarjeta
        </li>
        <li className="flex items-center gap-1.5">
          <Tilde /> Pago único, sin suscripción
        </li>
        <li className="flex items-center gap-1.5">
          <Tilde /> 7 días para pedir la devolución
        </li>
      </ul>
    </form>
  );
}

function Tilde() {
  return (
    <svg className="size-3.5 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Un diálogo por producto y por página. `<dialog>` nativo: showModal() ya atrapa el foco,
 *  cierra con Esc y vuelve el foco al botón que lo abrió. */
export function CompraDialogo({ producto }: { producto: DatosCompra }) {
  const ref = useRef<HTMLDialogElement>(null);
  const precio = `$${producto.precio.toLocaleString("es-AR")}`;

  // El mail de recordatorio linkea a la landing con #comprar: un toque y está de nuevo en el
  // formulario, sin tener que buscar el botón.
  useEffect(() => {
    if (location.hash === "#comprar") abrirCompra(producto.slug);
  }, [producto.slug]);

  return (
    <dialog
      ref={ref}
      data-compra={producto.slug}
      aria-labelledby={`compra-titulo-${producto.slug}`}
      onClick={(e) => {
        // Click en el velo (fuera de la tarjeta) cierra: el target es el propio <dialog>.
        if (e.target === ref.current) ref.current?.close();
      }}
      className="ca-compra m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-2xl border border-zinc-200 bg-white p-0 text-zinc-800 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)] sm:m-auto sm:max-w-md sm:rounded-2xl sm:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-6">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200 sm:hidden" aria-hidden />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Estás comprando</p>
            <h2 id={`compra-titulo-${producto.slug}`} className="mt-0.5 text-lg font-bold text-zinc-900">
              {producto.tituloCorto}
            </h2>
            <p className="text-sm text-zinc-600">
              <span className="font-semibold text-zinc-900">{precio}</span> · pago único ·{" "}
              {esInforme(producto) ? "lo ves apenas pagás" : "Excel y Google Sheets"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Cerrar"
            className="-mr-1.5 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <FormularioCompra producto={producto} />
      </div>
    </dialog>
  );
}
