"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import type { Campos } from "@/lib/formulario";
import { guardarCalculo } from "./api";
import { guardarPendiente } from "./pendiente";
import { IconoCheck, IconoCerrar, IconoFlecha } from "./iconos";

type Cerrar = (devolverFoco: boolean) => void;

function useCerrarAfuera(
  ref: RefObject<HTMLElement | null>,
  onCerrar: Cerrar,
  excluir: () => (HTMLElement | null)[]
) {
  const cb = useRef({ onCerrar, excluir });
  useEffect(() => {
    cb.current = { onCerrar, excluir };
  });
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      cb.current.onCerrar(true);
    };
    const toque = (e: PointerEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t)) return;
      if (cb.current.excluir().some((el) => el?.contains(t))) return;
      cb.current.onCerrar(false);
    };
    document.addEventListener("keydown", tecla);
    document.addEventListener("pointerdown", toque, true);
    return () => {
      document.removeEventListener("keydown", tecla);
      document.removeEventListener("pointerdown", toque, true);
    };
  }, [ref]);
}

function Marco({
  children,
  titulo,
  idTitulo,
  onCerrar,
  refHoja,
}: {
  children: ReactNode;
  titulo: ReactNode;
  idTitulo: string;
  onCerrar: Cerrar;
  refHoja: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={refHoja} role="dialog" aria-modal="false" aria-labelledby={idTitulo} className="ca-herr-hoja">
      <div className="ca-herr-hoja-nucleo">
        <div className="ca-herr-hoja-cabeza">
          <h2 id={idTitulo} className="ca-herr-hoja-titulo">
            {titulo}
          </h2>
          <button type="button" className="ca-herr-cerrar ca-herr-cerrar--claro" aria-label="Cerrar" onClick={() => onCerrar(true)}>
            <IconoCerrar />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function HojaGuardar({
  pathname,
  sesion,
  tituloInicial,
  obtener,
  onCerrar,
  onGuardado,
  excluir,
}: {
  pathname: string;
  sesion: boolean;
  tituloInicial: string;
  obtener: () => { campos: Campos; resumen: string };
  onCerrar: Cerrar;
  onGuardado: () => void;
  excluir: () => (HTMLElement | null)[];
}) {
  const [modo, setModo] = useState<"form" | "cuenta" | "listo">(sesion ? "form" : "cuenta");
  const [titulo, setTitulo] = useState(tituloInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sesionCerrada, setSesionCerrada] = useState(false);
  const [guardado, setGuardado] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLInputElement>(null);
  const primero = useRef<HTMLAnchorElement>(null);
  const id = useId();

  useCerrarAfuera(ref, onCerrar, excluir);

  useEffect(() => {
    if (modo === "form") {
      campo.current?.focus();
      campo.current?.select();
    } else {
      primero.current?.focus();
    }
  }, [modo]);

  const cerrar = useRef(onCerrar);
  useEffect(() => {
    cerrar.current = onCerrar;
  });
  useEffect(() => {
    if (modo !== "listo") return;
    const t = window.setTimeout(() => cerrar.current(false), 6000);
    return () => window.clearTimeout(t);
  }, [modo]);

  const dejarPendiente = () => {
    const { campos, resumen } = obtener();
    guardarPendiente({ path: pathname, titulo: titulo.trim().slice(0, 80) || tituloInicial, resumen, campos });
  };

  const guardar = async (e: FormEvent) => {
    e.preventDefault();
    const t = titulo.replace(/\s+/g, " ").trim();
    if (!t) {
      setError("Ponele un nombre así lo encontrás después.");
      campo.current?.focus();
      return;
    }
    setGuardando(true);
    setError(null);
    const { campos, resumen } = obtener();
    const r = await guardarCalculo({ path: pathname, titulo: t.slice(0, 80), campos, resumen });
    setGuardando(false);
    if (r.ok) {
      setGuardado(t);
      setModo("listo");
      onGuardado();
      return;
    }
    if (r.codigo === "sesion") {
      guardarPendiente({ path: pathname, titulo: t, resumen, campos });
      setSesionCerrada(true);
      setModo("cuenta");
      return;
    }
    setError(r.error);
  };

  const next = encodeURIComponent(pathname);

  if (modo === "listo") {
    return (
      <Marco
        refHoja={ref}
        idTitulo={id}
        onCerrar={onCerrar}
        titulo={
          <span className="ca-herr-hoja-ok">
            <span className="ca-herr-hoja-ok-icono" aria-hidden="true">
              <IconoCheck />
            </span>
            Guardado en tu cuenta
          </span>
        }
      >
        <p className="ca-herr-hoja-texto">
          Lo vas a encontrar como <strong>«{guardado}»</strong>, con estos mismos valores.
        </p>
        <div className="ca-herr-hoja-acciones">
          <a ref={primero} href="/cuenta" className="ca-herr-boton ca-herr-boton--oscuro">
            Ver mis cálculos
            <span className="ca-herr-boton-flecha" aria-hidden="true">
              <IconoFlecha />
            </span>
          </a>
        </div>
      </Marco>
    );
  }

  if (modo === "cuenta") {
    return (
      <Marco
        refHoja={ref}
        idTitulo={id}
        onCerrar={onCerrar}
        titulo={sesionCerrada ? "Tu sesión se cerró" : "Creá tu cuenta gratis y guardá tus cálculos"}
      >
        <p className="ca-herr-hoja-texto">
          {sesionCerrada
            ? "Ingresá de nuevo y lo guardamos. El cálculo te espera tal cual lo dejaste."
            : "Quedan en tu cuenta con estos mismos valores, para abrirlos cuando quieras y desde cualquier dispositivo."}
        </p>
        <div className="ca-herr-hoja-acciones">
          {sesionCerrada ? (
            <a ref={primero} href={`/login?next=${next}`} onClick={dejarPendiente} className="ca-herr-boton ca-herr-boton--oscuro">
              Ingresar
              <span className="ca-herr-boton-flecha" aria-hidden="true">
                <IconoFlecha />
              </span>
            </a>
          ) : (
            <>
              <a
                ref={primero}
                href={`/registro?next=${next}`}
                onClick={dejarPendiente}
                className="ca-herr-boton ca-herr-boton--oscuro"
              >
                Crear cuenta gratis
                <span className="ca-herr-boton-flecha" aria-hidden="true">
                  <IconoFlecha />
                </span>
              </a>
              <a href={`/login?next=${next}`} onClick={dejarPendiente} className="ca-herr-boton ca-herr-boton--suave">
                Ya tengo cuenta
              </a>
            </>
          )}
        </div>
        {!sesionCerrada && (
          <p className="ca-herr-hoja-nota">
            Tu cálculo te espera: cuando vuelvas con tu cuenta, lo guardamos con un toque.
          </p>
        )}
      </Marco>
    );
  }

  return (
    <Marco refHoja={ref} idTitulo={id} onCerrar={onCerrar} titulo="Guardar en tu cuenta">
      <form onSubmit={guardar} noValidate>
        <label htmlFor={`${id}-nombre`} className="ca-herr-hoja-etiqueta">
          Nombre
        </label>
        <input
          ref={campo}
          id={`${id}-nombre`}
          className="ca-herr-hoja-campo"
          value={titulo}
          maxLength={80}
          autoComplete="off"
          enterKeyHint="done"
          onChange={(e) => {
            setTitulo(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={!!error || undefined}
          aria-describedby={`${id}-ayuda`}
          disabled={guardando}
        />
        <p id={`${id}-ayuda`} className="ca-herr-hoja-ayuda" data-error={!!error} aria-live="polite">
          {error ?? "Así lo vas a ver en Mi cuenta. Lo podés cambiar cuando quieras."}
        </p>
        <div className="ca-herr-hoja-acciones">
          <button type="submit" className="ca-herr-boton ca-herr-boton--oscuro" disabled={guardando}>
            {guardando ? "Guardando…" : "Guardar"}
          </button>
          <button type="button" className="ca-herr-boton ca-herr-boton--suave" onClick={() => onCerrar(true)}>
            Cancelar
          </button>
        </div>
      </form>
    </Marco>
  );
}

export function HojaEnlace({
  url,
  onCerrar,
  excluir,
}: {
  url: string;
  onCerrar: Cerrar;
  excluir: () => (HTMLElement | null)[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLInputElement>(null);
  const id = useId();
  useCerrarAfuera(ref, onCerrar, excluir);
  useEffect(() => {
    campo.current?.focus();
    campo.current?.select();
  }, []);

  return (
    <Marco refHoja={ref} idTitulo={id} onCerrar={onCerrar} titulo="Copiá este link">
      <p className="ca-herr-hoja-texto">
        Tu navegador no nos dejó copiarlo solo. Seleccionalo y copialo para pegarlo donde quieras.
      </p>
      <input
        ref={campo}
        readOnly
        value={url}
        aria-label="Link del cálculo con los valores cargados"
        className="ca-herr-hoja-campo ca-herr-hoja-campo--link"
        onFocus={(e) => e.currentTarget.select()}
      />
    </Marco>
  );
}
