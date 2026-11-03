"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { rastrear } from "@/lib/rastreo";
import { leerDatosCompra, suscribirDatosCompra } from "@/lib/prefill/cliente";
import { camposCompra } from "@/components/compra/directa";

export type DatosCompra = {
  slug: string;
  tituloCorto: string;
  precio: number;
  /** Sin esto se deduce del slug: los informes empiezan con «informe-». */
  entrega?: "xlsx" | "informe";
};

const esInforme = (p: DatosCompra) => (p.entrega ?? (p.slug.startsWith("informe-") ? "informe" : "xlsx")) === "informe";

/** Si la calculadora dejó datos para este producto. En el servidor (y al hidratar) da false. */
function useHayDatos(slug: string): boolean {
  return useSyncExternalStore(
    suscribirDatosCompra,
    () => leerDatosCompra(slug) != null,
    () => false,
  );
}

// El formulario de /planillas/comprar: adonde va el botón sin JS y adonde vuelve el POST si el mail
// vino mal. Con JS, «Comprar» manda el mismo POST sin pasar por acá (compra/directa.ts).
export function FormularioCompra({
  producto,
  errorEmail = false,
  autoFocus = false,
}: {
  producto: DatosCompra;
  errorEmail?: boolean;
  autoFocus?: boolean;
}) {
  const [enviando, setEnviando] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const usarDatosRef = useRef<HTMLInputElement>(null);
  const precio = `$${producto.precio.toLocaleString("es-AR")}`;
  const informe = esInforme(producto);
  const hayDatos = useHayDatos(producto.slug);

  // Los ocultos se escriben al armar el POST y no en onSubmit: el re-render de setEnviando corre
  // antes de que el navegador junte los campos, y con un defaultValue React los volvía a vaciar.
  useEffect(() => {
    const f = formRef.current;
    if (!f) return;
    const completar = (e: FormDataEvent) => {
      const campos = camposCompra(producto.slug);
      if (usarDatosRef.current && !usarDatosRef.current.checked) campos.datos = "";
      for (const [k, v] of Object.entries(campos)) e.formData.set(k, v);
    };
    f.addEventListener("formdata", completar);
    return () => f.removeEventListener("formdata", completar);
  }, [producto.slug]);

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
      onSubmit={() => {
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
          Tu mail <span className="font-normal text-zinc-500">(opcional)</span>
        </label>
        <input
          id={`email-${producto.slug}`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          autoFocus={autoFocus}
          placeholder="tu@email.com"
          aria-describedby={`email-ayuda-${producto.slug}`}
          aria-invalid={errorEmail || undefined}
          className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none aria-[invalid=true]:border-red-400"
        />
        {errorEmail ? (
          <p className="mt-1.5 text-sm font-medium text-red-700">Revisá el mail: parece que le falta algo. También podés dejarlo vacío.</p>
        ) : null}
        <p id={`email-ayuda-${producto.slug}`} className="mt-1.5 text-xs leading-relaxed text-zinc-500">
          {informe ? "El enlace a tu informe" : "El enlace de descarga"} te llega al mail con el que pagás en MercadoPago.
          Si lo dejás acá, te escribimos una sola vez en caso de que no termines de pagar.
        </p>
      </div>

      {hayDatos ? (
        <label
          htmlFor={`usar-datos-${producto.slug}`}
          className="flex cursor-pointer items-start gap-2.5 rounded-lg bg-emerald-50/80 px-3 py-2.5 text-[13px] leading-snug text-emerald-900 ring-1 ring-emerald-600/10"
        >
          {/* Sin `name`: no viaja en el form; decide si `datos` va lleno o vacío (ver el formdata de arriba). */}
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
            <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
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
