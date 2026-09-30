"use client";

import { useCallback, useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Pagina } from "@/data/navegacion";
import { rastrear } from "@/lib/rastreo";
import { useAtajo } from "./atajo";
import { EVENTO_BUSCAR, cargarMotor, type DetalleBuscar } from "./control";
import { IconoCruz, IconoLupa, IconoTipo } from "./iconos";
import { leerRecientes } from "./recientes";

type Motor = Awaited<ReturnType<typeof cargarMotor>>;
type Opcion = { id: string; pagina: Pagina };
type Seccion = { id: string; titulo?: string; opciones: Opcion[] };

function cx(...p: Array<string | false | null | undefined>) {
  return p.filter(Boolean).join(" ");
}

// Lo que se mide es el texto de la búsqueda, y la gente a veces pega datos propios: un CUIT,
// un DNI, un mail. Eso no sale del navegador.
function consultaMedible(q: string): string | null {
  const limpia = q.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 60);
  if (!limpia) return null;
  if (limpia.includes("@") || /\d{7,}/.test(limpia.replace(/[\s.\-/]/g, ""))) return null;
  return limpia;
}

function esEditable(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false;
  return t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
}

function plano(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// NFD + sacar los diacríticos deja el texto en español con el mismo largo, así que los
// índices de `plano(titulo)` sirven para cortar el título original.
function resaltar(titulo: string, q: string): ReactNode {
  const base = plano(titulo);
  const marcas: Array<[number, number]> = [];
  for (const t of new Set(plano(q).split(/[^a-z0-9]+/).filter((x) => x.length >= 2))) {
    let i = base.indexOf(t);
    while (i > 0 && /[a-z0-9]/.test(base[i - 1])) i = base.indexOf(t, i + 1);
    if (i >= 0) marcas.push([i, i + t.length]);
  }
  if (!marcas.length) return titulo;
  marcas.sort((a, b) => a[0] - b[0]);
  const out: ReactNode[] = [];
  let cursor = 0;
  for (const [a, b] of marcas) {
    if (a < cursor) continue;
    if (a > cursor) out.push(titulo.slice(cursor, a));
    out.push(<mark key={a}>{titulo.slice(a, b)}</mark>);
    cursor = b;
  }
  out.push(titulo.slice(cursor));
  return out;
}

export function Buscador() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const baseId = useId();

  const [q, setQ] = useState("");
  const [motor, setMotor] = useState<Motor | null>(null);
  const [fallo, setFallo] = useState(false);
  const [activo, setActivo] = useState(0);
  const [recientes, setRecientes] = useState<string[]>([]);

  const qRef = useRef("");
  const resultadosRef = useRef(0);
  const elegidoRef = useRef<string | null>(null);
  const porTeclado = useRef(false);

  const qDiferida = useDeferredValue(q);

  const cargar = useCallback(() => {
    setFallo(false);
    cargarMotor().then(setMotor, () => setFallo(true));
  }, []);

  const abrir = useCallback(
    ({ q: inicial = "", instantaneo = false }: DetalleBuscar = {}) => {
      const d = dialogRef.current;
      if (!d) return;
      if (!d.open) {
        d.toggleAttribute("data-instantaneo", instantaneo);
        d.showModal();
        elegidoRef.current = null;
        setRecientes(leerRecientes());
      }
      inputRef.current?.focus();
      qRef.current = inicial;
      setQ(inicial);
      setActivo(0);
      cargar();
    },
    [cargar],
  );

  const cerrar = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  const alCerrar = () => {
    const medible = consultaMedible(qRef.current);
    if (medible) {
      rastrear("busqueda", {
        props: { q: medible, resultados: resultadosRef.current, elegido: elegidoRef.current },
      });
    }
    qRef.current = "";
    setQ("");
  };

  useEffect(() => {
    const alPedir = (e: Event) => abrir((e as CustomEvent<DetalleBuscar>).detail ?? {});
    const alTeclear = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) cerrar();
        else abrir({ instantaneo: true });
        return;
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !esEditable(e.target)) {
        e.preventDefault();
        abrir({ instantaneo: true });
      }
    };
    window.addEventListener(EVENTO_BUSCAR, alPedir);
    window.addEventListener("keydown", alTeclear);
    return () => {
      window.removeEventListener(EVENTO_BUSCAR, alPedir);
      window.removeEventListener("keydown", alTeclear);
    };
  }, [abrir, cerrar]);

  useEffect(() => {
    cerrar();
  }, [pathname, cerrar]);

  const secciones: Seccion[] = useMemo(() => {
    if (!motor) return [];
    const texto = qDiferida.trim();
    if (texto) {
      const opciones = motor.buscar(texto, 8).map((r, i) => ({ id: `${baseId}r${i}`, pagina: r.pagina }));
      return [{ id: "resultados", opciones }];
    }
    const vistas = motor.paginasDe(recientes.filter((h) => h !== pathname)).slice(0, 4);
    const yaEstan = new Set(vistas.map((p) => p.href));
    const usadas = motor
      .masUsadas()
      .filter((p) => !yaEstan.has(p.href) && p.href !== pathname)
      .slice(0, vistas.length ? 5 : 8);
    return [
      { id: "recientes", titulo: "Seguí donde estabas", opciones: vistas.map((p, i) => ({ id: `${baseId}v${i}`, pagina: p })) },
      { id: "usadas", titulo: "Lo más usado", opciones: usadas.map((p, i) => ({ id: `${baseId}u${i}`, pagina: p })) },
    ].filter((s) => s.opciones.length > 0);
  }, [motor, qDiferida, recientes, pathname, baseId]);

  const opciones = useMemo(() => secciones.flatMap((s) => s.opciones), [secciones]);
  const idx = opciones.length ? Math.min(activo, opciones.length - 1) : -1;
  const actual = idx >= 0 ? opciones[idx] : undefined;
  const buscando = qDiferida.trim().length > 0;

  useEffect(() => {
    resultadosRef.current = buscando ? opciones.length : 0;
  }, [buscando, opciones.length]);

  useEffect(() => {
    if (!actual || !porTeclado.current) return;
    document.getElementById(actual.id)?.scrollIntoView({ block: "nearest" });
  }, [actual]);

  const ir = (p: Pagina) => {
    elegidoRef.current = p.href;
    cerrar();
    router.push(p.href);
  };

  const alClickOpcion = (e: MouseEvent, p: Pagina) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    elegidoRef.current = p.href;
    cerrar();
  };

  const alTeclearInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const n = opciones.length;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!n) return;
      e.preventDefault();
      porTeclado.current = true;
      setActivo((i) => {
        const base = Math.min(i, n - 1);
        return e.key === "ArrowDown" ? (base + 1) % n : (base - 1 + n) % n;
      });
    } else if (e.key === "Enter" && actual) {
      e.preventDefault();
      ir(actual.pagina);
    }
  };

  const listaId = `${baseId}lista`;
  const atajo = useAtajo();

  let cuerpo: ReactNode;
  if (fallo) {
    cuerpo = (
      <div className="px-6 py-12 text-center">
        <p className="font-medium text-zinc-900">No pudimos cargar el buscador</p>
        <p className="mt-1 text-sm text-zinc-500">Revisá la conexión y probá de nuevo.</p>
        <button type="button" onClick={cargar} className="ca-boton-suave mt-4">
          Reintentar
        </button>
      </div>
    );
  } else if (!motor) {
    cuerpo = (
      <div className="space-y-1 p-2" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-3">
            <span className="size-9 shrink-0 rounded-lg bg-zinc-100" />
            <span className="flex-1 space-y-2">
              <span className="block h-3 w-2/5 rounded-full bg-zinc-100" />
              <span className="block h-2.5 w-3/5 rounded-full bg-zinc-100/70" />
            </span>
          </div>
        ))}
      </div>
    );
  } else if (buscando && opciones.length === 0) {
    cuerpo = (
      <div className="px-6 py-12 text-center">
        <p className="font-medium text-zinc-900">No encontramos «{qDiferida.trim()}»</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-pretty text-zinc-500">
          Probá con otra palabra, como «despido», «aguinaldo» o «alquiler».
        </p>
        <Link href="/#todas" onClick={cerrar} className="ca-boton-suave mt-4">
          Ver todas las calculadoras
        </Link>
      </div>
    );
  } else {
    let n = -1;
    cuerpo = (
      <div id={listaId} role="listbox" aria-label="Resultados" className="p-2">
        {secciones.map((s) => (
          <div key={s.id} role="group" aria-labelledby={s.titulo ? `${listaId}-${s.id}` : undefined} className="pb-1">
            {s.titulo && (
              <p id={`${listaId}-${s.id}`} role="presentation" className="px-3 pb-1 pt-2.5 text-xs font-semibold text-zinc-500">
                {s.titulo}
              </p>
            )}
            {s.opciones.map((o) => {
              n += 1;
              const i = n;
              const sel = i === idx;
              const p = o.pagina;
              return (
                <Link
                  key={o.id}
                  id={o.id}
                  href={p.href}
                  prefetch={false}
                  role="option"
                  aria-selected={sel}
                  tabIndex={-1}
                  onClick={(e) => alClickOpcion(e, p)}
                  onMouseMove={() => {
                    porTeclado.current = false;
                    if (i !== idx) setActivo(i);
                  }}
                  className={cx("ca-opcion group/o", sel && "is-activa")}
                >
                  <IconoTipo tipo={p.tipo} className="ca-opcion-icono" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium leading-snug text-zinc-900">
                      {buscando ? resaltar(p.titulo, qDiferida) : p.titulo}
                    </span>
                    <span className="block truncate text-[13px] leading-snug text-zinc-500">
                      {p.descripcion ?? p.grupo}
                    </span>
                  </span>
                  {p.descripcion && (
                    <span className="hidden max-w-[9rem] shrink-0 truncate text-xs text-zinc-400 sm:block">{p.grupo}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      className="ca-paleta ca-bloquea"
      aria-label="Buscar en CalculAR"
      onClose={alCerrar}
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrar();
      }}
    >
      <div className="ca-paleta-caja">
        <div className="flex shrink-0 items-center gap-2 border-b border-zinc-200/80 pl-4 pr-2 sm:pr-3">
          <IconoLupa className="size-5 shrink-0 text-zinc-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              qRef.current = e.target.value;
              setQ(e.target.value);
              setActivo(0);
            }}
            onKeyDown={alTeclearInput}
            role="combobox"
            aria-expanded={opciones.length > 0}
            aria-controls={listaId}
            aria-activedescendant={actual?.id}
            aria-autocomplete="list"
            aria-label="¿Qué querés calcular?"
            placeholder="¿Qué querés calcular?"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="go"
            inputMode="search"
            maxLength={80}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400"
          />
          {q && (
            <button
              type="button"
              aria-label="Borrar la búsqueda"
              onClick={() => {
                qRef.current = "";
                setQ("");
                inputRef.current?.focus();
              }}
              className="grid size-10 shrink-0 place-items-center rounded-full text-zinc-400 transition-[background-color,color,transform] duration-150 hover:bg-zinc-100 hover:text-zinc-600 active:scale-95"
            >
              <IconoCruz className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={cerrar}
            className="h-10 shrink-0 rounded-lg px-3 text-sm font-medium text-emerald-700 transition-[background-color,transform] duration-150 active:scale-[0.97] sm:hidden"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar el buscador"
            className="hidden shrink-0 rounded-md border border-zinc-200 px-1.5 py-0.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-zinc-50 sm:block"
          >
            Esc
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]">{cuerpo}</div>

        <p className="sr-only" aria-live="polite">
          {buscando && motor ? `${opciones.length} ${opciones.length === 1 ? "resultado" : "resultados"}` : ""}
        </p>

        <div className="hidden shrink-0 items-center gap-4 border-t border-zinc-100 px-4 py-2.5 text-xs text-zinc-500 sm:flex">
          <span className="flex items-center gap-1.5">
            <kbd className="ca-tecla">↑</kbd>
            <kbd className="ca-tecla">↓</kbd>
            para moverte
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="ca-tecla">Enter</kbd>
            para abrir
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <kbd className="ca-tecla">{atajo}</kbd>
            desde cualquier página
          </span>
        </div>
      </div>
    </dialog>
  );
}
