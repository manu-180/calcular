"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTextos } from "@/components/cuenta/SitioCuenta";

export function Enviado({
  titulo,
  email,
  children,
  onOtro,
}: {
  titulo: string;
  email?: string;
  children?: ReactNode;
  onOtro?: () => void;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const t = useTextos().enviado;
  useEffect(() => ref.current?.focus(), []);
  return (
    <div className="animate-[ca-col_0.4s_var(--ease-fluid)_backwards] text-center" role="status">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10">
        <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
          <path d="m3.8 7 8.2 6 8.2-6" />
        </svg>
      </div>
      <h2 ref={ref} tabIndex={-1} className="mt-5 text-xl font-semibold tracking-tight text-zinc-900 focus:outline-none focus-visible:shadow-none">
        {titulo}
      </h2>
      {email ? (
        <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
          {t.loMandamos} <strong className="break-all font-semibold text-zinc-900">{email}</strong>.
        </p>
      ) : null}
      {children ? <div className="mt-3 text-[15px] leading-relaxed text-zinc-600">{children}</div> : null}
      <p className="mt-5 rounded-2xl bg-zinc-50 px-4 py-3 text-[13px] leading-relaxed text-zinc-500">
        {t.noLlega}
      </p>
      {onOtro ? (
        <button
          type="button"
          onClick={onOtro}
          className="mt-4 cursor-pointer text-sm font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 transition-colors hover:decoration-emerald-700"
        >
          {t.otroMail}
        </button>
      ) : null}
    </div>
  );
}

// Tras un error, el foco va al primer campo marcado: el lector de pantalla lo anuncia con su
// mensaje y en mobile el teclado queda donde hay que corregir.
export function useFocoEnError(estado: unknown) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [estado]);
  return ref;
}
