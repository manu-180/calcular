"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { useTextos } from "@/components/cuenta/SitioCuenta";

const INPUT =
  "block w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-3 text-base text-zinc-900 placeholder:text-zinc-400 transition-[border-color] duration-200 ease-[var(--ease-snappy)] hover:border-zinc-400 focus:border-emerald-500 focus:outline-none aria-[invalid=true]:border-red-400";

type BaseCampo = {
  etiqueta: string;
  error?: string;
  ayuda?: ReactNode;
  extra?: ReactNode;
};

export function Campo({
  etiqueta,
  error,
  ayuda,
  extra,
  ...input
}: BaseCampo & InputHTMLAttributes<HTMLInputElement> & { name: string }) {
  const id = useId();
  const idAyuda = `${id}-ayuda`;
  const idError = `${id}-error`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-sm font-medium text-zinc-800">
          {etiqueta}
        </label>
        {extra}
      </div>
      <input
        id={id}
        {...input}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? idError : null, ayuda ? idAyuda : null].filter(Boolean).join(" ") || undefined}
        className={`mt-1.5 ${INPUT}`}
      />
      {error ? <MensajeCampo id={idError}>{error}</MensajeCampo> : null}
      {ayuda && !error ? (
        <p id={idAyuda} className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

export function CampoClave({
  etiqueta,
  error,
  ayuda,
  extra,
  ...input
}: BaseCampo & Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { name: string }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const t = useTextos().clave;
  const idAyuda = `${id}-ayuda`;
  const idError = `${id}-error`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-sm font-medium text-zinc-800">
          {etiqueta}
        </label>
        {extra}
      </div>
      <div className="relative mt-1.5">
        <input
          id={id}
          {...input}
          type={visible ? "text" : "password"}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? idError : null, ayuda ? idAyuda : null].filter(Boolean).join(" ") || undefined}
          className={`${INPUT} pr-14`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-controls={id}
          aria-label={visible ? t.ocultar : t.mostrar}
          className="absolute inset-y-0 right-0 grid w-12 cursor-pointer place-items-center rounded-r-xl text-zinc-500 transition-colors duration-200 hover:text-zinc-800"
        >
          <OjoIcono tachado={visible} />
        </button>
      </div>
      {error ? <MensajeCampo id={idError}>{error}</MensajeCampo> : null}
      {ayuda && !error ? (
        <p id={idAyuda} className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

function MensajeCampo({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium leading-snug text-red-700">
      <svg className="mt-px size-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12a.9.9 0 0 1 .9.9v3.6a.9.9 0 1 1-1.8 0V6.9A.9.9 0 0 1 10 6Zm0 8.4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        />
      </svg>
      <span>{children}</span>
    </p>
  );
}

function OjoIcono({ tachado }: { tachado: boolean }) {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
      {tachado ? <path d="M4 20 20 4" /> : null}
    </svg>
  );
}

export function Casilla({
  name,
  value = "si",
  defaultChecked,
  error,
  children,
}: {
  name: string;
  value?: string;
  defaultChecked?: boolean;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-700">
        <input
          id={id}
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-zinc-300 bg-white text-white transition-[background-color,border-color] duration-200 ease-[var(--ease-snappy)] group-hover:border-zinc-400 peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-focus-visible:shadow-[var(--ca-ring)] peer-aria-[invalid=true]:border-red-400 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
        >
          <svg className="size-3.5 transition-opacity duration-150" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 10.5 3.2 3L15 7" />
          </svg>
        </span>
        <span>{children}</span>
      </label>
      {error ? <MensajeCampo id={`${id}-error`}>{error}</MensajeCampo> : null}
    </div>
  );
}

export function BotonEnviar({
  children,
  pendiente,
  variante = "primario",
  optimista = false,
}: {
  children: ReactNode;
  pendiente: string;
  variante?: "primario" | "secundario";
  optimista?: boolean;
}) {
  const { pending: enCurso } = useFormStatus();
  const pending = enCurso && !optimista;
  if (variante === "secundario") {
    return (
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-[border-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:border-zinc-400 hover:shadow-[0_6px_14px_-8px_rgba(0,0,0,0.2)] active:translate-y-0 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {pending ? <Giro className="border-zinc-300 border-t-zinc-700" /> : null}
        <span aria-live="polite">{pending ? pendiente : children}</span>
      </button>
    );
  }
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex h-12 w-full cursor-pointer items-center gap-3 rounded-full bg-emerald-600 pl-6 pr-1.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-emerald-700 hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.28)] active:translate-y-0 active:scale-[0.99] disabled:cursor-wait disabled:bg-emerald-700 disabled:hover:translate-y-0"
    >
      <span className="flex-1 text-center" aria-live="polite">
        {pending ? pendiente : children}
      </span>
      <span className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:translate-x-0.5 group-disabled:translate-x-0">
        {pending ? (
          <Giro className="border-white/40 border-t-white" />
        ) : (
          <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
          </svg>
        )}
      </span>
    </button>
  );
}

function Giro({ className }: { className: string }) {
  return <span aria-hidden className={`size-4 animate-spin rounded-full border-2 ${className}`} />;
}

export function Aviso({
  tono,
  titulo,
  children,
}: {
  tono: "error" | "info" | "ok";
  titulo?: string;
  children?: ReactNode;
}) {
  const estilos = {
    error: "border-red-200 bg-red-50/80 text-red-900",
    info: "border-zinc-200 bg-zinc-50 text-zinc-800",
    ok: "border-emerald-200 bg-emerald-50/80 text-emerald-900",
  }[tono];
  return (
    <div
      role={tono === "error" ? "alert" : "status"}
      className={`animate-[ca-col_0.3s_var(--ease-fluid)_backwards] rounded-2xl border px-4 py-3 text-sm leading-relaxed ${estilos}`}
    >
      {titulo ? <p className="font-semibold">{titulo}</p> : null}
      {children ? <div className={titulo ? "mt-0.5" : ""}>{children}</div> : null}
    </div>
  );
}
