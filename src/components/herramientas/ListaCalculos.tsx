"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";

export type CalculoItem = {
  id: string;
  titulo: string;
  resumen: string;
  pagina: string;
  href: string;
  fecha: string;
};

type Deshacer = { item: CalculoItem; indice: number; timer: number };

const ESPERA_BORRADO = 5000;

async function pedir(url: string, init: RequestInit): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, {
      ...init,
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) return { ok: true };
    const j = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: j?.error };
  } catch {
    return { ok: false, error: "Parece que no hay conexión. Revisá internet y probá de nuevo." };
  }
}

const SUGERIDAS = [
  { href: "/sueldo-neto", texto: "Sueldo neto" },
  { href: "/aguinaldo", texto: "Aguinaldo" },
  { href: "/indemnizacion", texto: "Indemnización por despido" },
  { href: "/monotributo", texto: "Monotributo" },
];

export function ListaCalculos({ inicial }: { inicial: CalculoItem[] | null }) {
  const [items, setItems] = useState<CalculoItem[]>(inicial ?? []);
  const [editando, setEditando] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [deshacer, setDeshacer] = useState<Deshacer | null>(null);
  const [anuncio, setAnuncio] = useState("");
  const pendientes = useRef(new Map<string, Deshacer>());

  const borrarDeVerdad = useCallback(async (d: Deshacer, keepalive = false) => {
    pendientes.current.delete(d.item.id);
    setDeshacer((actual) => (actual?.item.id === d.item.id ? null : actual));
    const r = await pedir(`/api/cuenta/calculos/${d.item.id}`, { method: "DELETE", keepalive });
    if (!r.ok && !keepalive) {
      setItems((lista) => {
        if (lista.some((x) => x.id === d.item.id)) return lista;
        const copia = [...lista];
        copia.splice(Math.min(d.indice, copia.length), 0, d.item);
        return copia;
      });
      setErrores((e) => ({ ...e, [d.item.id]: r.error ?? "No pudimos borrarlo. Probá de nuevo." }));
    }
  }, []);

  // Si la persona se va antes de que venza el «deshacer», el borrado igual se manda.
  useEffect(() => {
    const vaciar = () => {
      for (const d of pendientes.current.values()) {
        window.clearTimeout(d.timer);
        void borrarDeVerdad(d, true);
      }
    };
    window.addEventListener("pagehide", vaciar);
    return () => {
      window.removeEventListener("pagehide", vaciar);
      vaciar();
    };
  }, [borrarDeVerdad]);

  const borrar = (item: CalculoItem) => {
    const indice = items.findIndex((x) => x.id === item.id);
    setItems((lista) => lista.filter((x) => x.id !== item.id));
    const d: Deshacer = { item, indice, timer: 0 };
    d.timer = window.setTimeout(() => void borrarDeVerdad(d), ESPERA_BORRADO);
    pendientes.current.set(item.id, d);
    setDeshacer(d);
    setAnuncio(`Borramos «${item.titulo}». Tenés unos segundos para deshacerlo.`);
  };

  const restaurar = () => {
    const d = deshacer;
    if (!d) return;
    window.clearTimeout(d.timer);
    pendientes.current.delete(d.item.id);
    setItems((lista) => {
      const copia = [...lista];
      copia.splice(Math.min(d.indice, copia.length), 0, d.item);
      return copia;
    });
    setDeshacer(null);
    setAnuncio(`Volvimos a poner «${d.item.titulo}».`);
  };

  const renombrar = async (item: CalculoItem, titulo: string) => {
    setEditando(null);
    if (titulo === item.titulo) return;
    setItems((lista) => lista.map((x) => (x.id === item.id ? { ...x, titulo } : x)));
    setErrores(({ [item.id]: _, ...resto }) => resto);
    const r = await pedir(`/api/cuenta/calculos/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ titulo }),
    });
    if (!r.ok) {
      setItems((lista) => lista.map((x) => (x.id === item.id ? { ...x, titulo: item.titulo } : x)));
      setErrores((e) => ({ ...e, [item.id]: r.error ?? "No pudimos cambiarle el nombre. Probá de nuevo." }));
    }
  };

  if (inicial === null) {
    return (
      <div className="rounded-2xl bg-white p-5 text-sm text-zinc-600 ring-1 ring-zinc-200/80">
        <p className="font-semibold text-zinc-900">No pudimos traer tus cálculos.</p>
        <p className="mt-1">Probá recargar la página en un rato. Lo que guardaste no se perdió.</p>
      </div>
    );
  }

  return (
    <div data-sin-herramientas="">
      {items.length === 0 && !deshacer ? (
        <Vacio />
      ) : (
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item.id}>
              <Fila
                item={item}
                editando={editando === item.id}
                error={errores[item.id]}
                onEditar={() => setEditando(item.id)}
                onCancelar={() => setEditando(null)}
                onRenombrar={(t) => renombrar(item, t)}
                onBorrar={() => borrar(item)}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {deshacer && (
          <div
            key={deshacer.item.id}
            className="pointer-events-auto flex max-w-md items-center gap-4 rounded-full bg-zinc-900 py-2 pl-5 pr-2 text-sm text-zinc-100 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.5)] motion-safe:animate-[ca-col_0.26s_var(--ease-fluid)_backwards]"
          >
            <span className="min-w-0 truncate">
              Borramos <span className="font-semibold text-white">«{deshacer.item.titulo}»</span>
            </span>
            <button
              type="button"
              onClick={restaurar}
              className="min-h-10 shrink-0 rounded-full bg-white/10 px-4 font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-white/20 active:scale-[0.96]"
            >
              Deshacer
            </button>
          </div>
        )}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {anuncio}
      </p>
    </div>
  );
}

function Fila({
  item,
  editando,
  error,
  onEditar,
  onCancelar,
  onRenombrar,
  onBorrar,
}: {
  item: CalculoItem;
  editando: boolean;
  error?: string;
  onEditar: () => void;
  onCancelar: () => void;
  onRenombrar: (titulo: string) => void;
  onBorrar: () => void;
}) {
  const id = useId();
  const [borrador, setBorrador] = useState(item.titulo);
  const campo = useRef<HTMLInputElement>(null);
  const botonEditar = useRef<HTMLButtonElement>(null);
  const [invalido, setInvalido] = useState(false);
  const estabaEditando = useRef(false);

  useEffect(() => {
    if (editando) {
      setBorrador(item.titulo);
      setInvalido(false);
      campo.current?.focus();
      campo.current?.select();
    } else if (estabaEditando.current) {
      botonEditar.current?.focus();
    }
    estabaEditando.current = editando;
  }, [editando, item.titulo]);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const t = borrador.replace(/\s+/g, " ").trim().slice(0, 80);
    if (!t) {
      setInvalido(true);
      campo.current?.focus();
      return;
    }
    onRenombrar(t);
  };

  return (
    <article className="group rounded-2xl bg-white p-4 ring-1 ring-zinc-200/80 transition-[box-shadow] duration-200 hover:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.3)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">{item.pagina}</p>
          {editando ? (
            <form onSubmit={enviar} className="mt-1.5">
              <label htmlFor={`${id}-t`} className="sr-only">
                Nuevo nombre
              </label>
              <input
                ref={campo}
                id={`${id}-t`}
                value={borrador}
                maxLength={80}
                autoComplete="off"
                onChange={(e) => {
                  setBorrador(e.target.value);
                  setInvalido(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    onCancelar();
                  }
                }}
                aria-invalid={invalido || undefined}
                aria-describedby={invalido ? `${id}-err` : undefined}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-base font-semibold text-zinc-900 outline-none transition-colors focus:border-emerald-500"
              />
              {invalido && (
                <p id={`${id}-err`} className="mt-1.5 text-xs text-red-700">
                  Ponele un nombre así lo encontrás después.
                </p>
              )}
              <div className="mt-2.5 flex gap-2">
                <button
                  type="submit"
                  className="min-h-10 rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-black active:scale-[0.97]"
                >
                  Guardar nombre
                </button>
                <button
                  type="button"
                  onClick={onCancelar}
                  className="min-h-10 rounded-full px-4 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <h3 className="mt-1 text-base font-semibold leading-snug text-zinc-900 [overflow-wrap:anywhere]">
              {item.titulo}
            </h3>
          )}
          {item.resumen && !editando && (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500">{item.resumen}</p>
          )}
          <p className="mt-2 text-xs text-zinc-400">Guardado el {item.fecha}</p>
          {error && (
            <p className="mt-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
        </div>

        {!editando && (
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            {/* <a> y no <Link>: la carga completa deja que la calculadora hidrate de cero y los
                valores se restauren por el mismo camino que un link compartido. */}
            <a
              href={item.href}
              className="group/abrir inline-flex min-h-10 items-center gap-2 rounded-full bg-zinc-900 py-1 pl-4 pr-1.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-black active:scale-[0.97]"
            >
              Abrir
              <span className="grid size-7 place-items-center rounded-full bg-white/10 transition-transform duration-200 ease-[var(--ease-fluid)] group-hover/abrir:translate-x-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="sr-only">«{item.titulo}»</span>
            </a>
            <button
              ref={botonEditar}
              type="button"
              onClick={onEditar}
              className="min-h-10 rounded-full px-3.5 text-sm font-medium text-zinc-600 transition-[background-color,color,transform] duration-150 hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.97]"
            >
              Renombrar<span className="sr-only"> «{item.titulo}»</span>
            </button>
            <button
              type="button"
              onClick={onBorrar}
              className="min-h-10 rounded-full px-3.5 text-sm font-medium text-zinc-600 transition-[background-color,color,transform] duration-150 hover:bg-red-50 hover:text-red-700 active:scale-[0.97]"
            >
              Borrar<span className="sr-only"> «{item.titulo}»</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function Vacio() {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/80 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        <div
          aria-hidden="true"
          className="flex w-max shrink-0 items-center gap-0.5 rounded-full bg-zinc-900 p-1 text-[13px] font-medium text-zinc-300 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.5)]"
        >
          <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-4 text-emerald-300">
              <path d="M6.5 3.75h11a.75.75 0 0 1 .75.75v15.2a.4.4 0 0 1-.64.32L12 15.9l-5.61 4.12a.4.4 0 0 1-.64-.32V4.5a.75.75 0 0 1 .75-.75Z" />
            </svg>
            Guardar
          </span>
          <span className="px-3">Compartir</span>
          <span className="px-3">Imprimir</span>
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-zinc-900">Todavía no guardaste ningún cálculo</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600">
            Hacé una cuenta en cualquier calculadora y tocá <strong className="text-zinc-800">Guardar</strong> en
            la barra que aparece abajo. Queda acá con los mismos valores, para abrirlo cuando quieras.
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-100 pt-4">
        {SUGERIDAS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="inline-flex min-h-9 items-center rounded-full bg-zinc-50 px-3.5 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200/80 transition-[background-color,color,transform] duration-150 hover:bg-emerald-50 hover:text-emerald-800 active:scale-[0.97]"
          >
            {s.texto}
          </Link>
        ))}
      </div>
    </div>
  );
}
