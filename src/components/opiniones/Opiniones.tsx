"use client";

import { useActionState, useEffect, useId, useOptimistic, useRef, useState, type FormEvent } from "react";
import { enviarOpinion } from "@/app/(ar)/cuenta/opiniones/acciones";
import { Aviso, BotonEnviar } from "@/components/cuenta/Campos";
import { Seccion } from "@/components/cuenta/Seccion";
import { fechaYHora } from "@/lib/panel/formato";
import {
  ENVIO_INICIAL,
  MAX_MENSAJE,
  NOMBRE_TIPO,
  TIPOS_OPINION,
  esTipo,
  largoMensaje,
  limpiarMensaje,
  validarOpinion,
  type EstadoEnvio,
  type Opinion,
  type TipoOpinion,
} from "@/lib/opiniones";
import { ChipTipo, EstadoMarca, IconoTipo } from "./piezas";
import { useTextos } from "@/components/cuenta/SitioCuenta";

type Estado = EstadoEnvio & { vuelta: number };
type Item = Opinion & { enviando?: boolean };

const AYUDA_TIPO: Record<TipoOpinion, string> = {
  idea: "Algo nuevo o mejor",
  error: "Un dato, un cálculo o la página",
  otra: "Lo que sea",
};

async function enviarConVuelta(prev: Estado, fd: FormData): Promise<Estado> {
  const r = await enviarOpinion(prev, fd);
  return { ...r, vuelta: prev.vuelta + 1 };
}

export function Opiniones({
  historial,
  errorHistorial,
  desde,
  tituloDesde,
  ahora,
}: {
  historial: Opinion[];
  errorHistorial: boolean;
  desde: string | null;
  tituloDesde: string | null;
  ahora: number;
}) {
  const [real, accion] = useActionState(enviarConVuelta, { ...ENVIO_INICIAL, vuelta: 0 });
  // La opinión aparece en el historial y el «gracias» sale al tocar el botón. Si el servidor dice
  // que no, el estado real (con el error y el texto que se mandó) reemplaza a lo adelantado.
  const [aviso, adelantarAviso] = useOptimistic(real, (_: Estado, e: Estado) => e);
  const [lista, agregar] = useOptimistic<Item[], Item>(historial, (actual, nueva) => [nueva, ...actual]);
  const [erroresLocales, setErroresLocales] = useState<EstadoEnvio["errores"]>({});
  const [conDesde, setConDesde] = useState(!!desde);
  const form = useRef<HTMLFormElement>(null);
  const t = useTextos().opiniones;

  const errores = { ...(aviso.estado === "error" ? aviso.errores : {}), ...erroresLocales };

  function validarAntes(e: FormEvent<HTMLFormElement>) {
    const fd = new FormData(e.currentTarget);
    const v = validarOpinion({ tipo: fd.get("tipo"), mensaje: fd.get("mensaje") }, t);
    if (v.ok) {
      setErroresLocales({});
      return;
    }
    // Se frena acá y no en la acción: una acción que termina sin llamar al servidor igual
    // dispara el reset del formulario de React y borraría lo que la persona escribió.
    e.preventDefault();
    setErroresLocales(v.errores);
    const campo = v.errores?.tipo ? "tipo" : "mensaje";
    e.currentTarget.querySelector<HTMLElement>(`[name="${campo}"]`)?.focus();
  }

  function enviar(fd: FormData) {
    const tipo = fd.get("tipo");
    if (esTipo(tipo)) {
      agregar({
        id: `enviando-${Date.now()}`,
        tipo,
        mensaje: limpiarMensaje(fd.get("mensaje")),
        desde: conDesde ? desde : null,
        estado: "nueva",
        created_at: new Date().toISOString(),
        enviando: true,
      });
    }
    adelantarAviso({ estado: "ok", mensaje: t.gracias, vuelta: real.vuelta });
    form.current?.reset();
    accion(fd);
  }

  return (
    <>
      <Seccion id="escribir" titulo={t.escribir} orden={1}>
        <form ref={form} action={enviar} onSubmit={validarAntes} noValidate className="space-y-6">
          <CamposOpinion
            key={real.vuelta}
            tipoInicial={real.estado === "error" && esTipo(real.valores?.tipo) ? real.valores.tipo : null}
            mensajeInicial={real.estado === "error" ? (real.valores?.mensaje ?? "") : ""}
            errores={errores}
            alCorregir={(campo) => setErroresLocales((e) => ({ ...e, [campo]: undefined }))}
          />

          {desde && conDesde ? (
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
              <input type="hidden" name="desde" value={desde} />
              <span>{t.escribisDesde}</span>
              <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-zinc-100 py-1 pl-3 pr-1 text-[13px] font-medium text-zinc-800 ring-1 ring-inset ring-zinc-900/[0.06]">
                <span className="truncate">{tituloDesde ?? desde}</span>
                <button
                  type="button"
                  onClick={() => setConDesde(false)}
                  aria-label={t.sinDesde}
                  className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full text-zinc-500 transition-colors duration-200 hover:bg-zinc-200 hover:text-zinc-900"
                >
                  <svg className="size-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                    <path d="m6 6 8 8M14 6l-8 8" />
                  </svg>
                </button>
              </span>
            </div>
          ) : null}

          <div className="space-y-3">
            <div className="sm:max-w-xs">
              <BotonEnviar pendiente={t.enviando} optimista>
                {t.mandar}
              </BotonEnviar>
            </div>
            {aviso.estado === "ok" ? (
              <p role="status" className="flex animate-[ca-col_0.3s_var(--ease-fluid)_backwards] items-center gap-2 text-sm font-medium text-emerald-800">
                <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 10.5 3.2 3L15 7" />
                </svg>
                {aviso.mensaje}
              </p>
            ) : null}
            {aviso.estado === "error" && aviso.mensaje ? <Aviso tono="error">{aviso.mensaje}</Aviso> : null}
          </div>
        </form>
      </Seccion>

      <Seccion id="historial" titulo={t.historial} bajada={t.historialBajada} orden={2}>
        {errorHistorial ? (
          <Aviso tono="info">{t.historialError}</Aviso>
        ) : lista.length === 0 ? (
          <p className="text-sm leading-relaxed text-zinc-500">
            {t.historialVacio}
          </p>
        ) : (
          <ol className="divide-y divide-zinc-100">
            {lista.map((o) => (
              <li
                key={o.id}
                className={`py-4 first:pt-0 last:pb-0 ${o.enviando ? "animate-[ca-col_0.35s_var(--ease-fluid)_backwards]" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <ChipTipo tipo={o.tipo} />
                  <EstadoMarca estado={o.enviando ? "enviando" : o.estado} />
                  <span className="ml-auto text-xs tabular-nums text-zinc-500">{fechaYHora(o.created_at, ahora)}</span>
                </div>
                <p className="mt-2.5 whitespace-pre-line break-words text-[15px] leading-relaxed text-zinc-800">{o.mensaje}</p>
                {o.desde ? <p className="mt-1.5 truncate text-xs text-zinc-500">Desde {o.desde}</p> : null}
              </li>
            ))}
          </ol>
        )}
      </Seccion>
    </>
  );
}

function CamposOpinion({
  tipoInicial,
  mensajeInicial,
  errores,
  alCorregir,
}: {
  tipoInicial: TipoOpinion | null;
  mensajeInicial: string;
  errores: EstadoEnvio["errores"];
  alCorregir: (campo: "tipo" | "mensaje") => void;
}) {
  const id = useId();
  const [tipo, setTipo] = useState<TipoOpinion | null>(tipoInicial);
  const [largo, setLargo] = useState(largoMensaje(mensajeInicial));
  const texto = useRef<HTMLTextAreaElement>(null);
  const t = useTextos().opiniones;

  // El evento reset sale ANTES de que el navegador vacíe los campos: se lee el DOM un tick
  // después, así el contador y la pista coinciden con lo que quedó escrito (vacío al enviar,
  // o el texto devuelto si el servidor lo rechazó).
  useEffect(() => {
    const campo = texto.current;
    const f = campo?.form;
    if (!campo || !f) return;
    const releer = () =>
      setTimeout(() => {
        setLargo(largoMensaje(campo.value.trim()));
        const elegido = f.querySelector<HTMLInputElement>('input[name="tipo"]:checked')?.value;
        setTipo(esTipo(elegido) ? elegido : null);
      }, 0);
    f.addEventListener("reset", releer);
    return () => f.removeEventListener("reset", releer);
  }, []);
  const cerca = largo > MAX_MENSAJE * 0.85;
  const idAyuda = `${id}-ayuda`;
  const idError = `${id}-error`;

  return (
    <>
      <fieldset aria-describedby={errores?.tipo ? `${id}-tipo-error` : undefined}>
        <legend className="text-sm font-medium text-zinc-800">¿De qué se trata?</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
          {TIPOS_OPINION.map((t) => (
            <label key={t} className="group cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value={t}
                defaultChecked={tipoInicial === t}
                onChange={() => {
                  setTipo(t);
                  alCorregir("tipo");
                }}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-2 py-3.5 text-center transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-snappy)] group-hover:border-zinc-300 group-active:scale-[0.97] peer-checked:border-emerald-600/40 peer-checked:bg-[color-mix(in_oklab,var(--color-emerald-500)_9%,white)] peer-focus-visible:shadow-[var(--ca-ring)] sm:items-start sm:px-4 sm:text-left">
                <span className="grid size-9 place-items-center rounded-xl bg-zinc-900/[0.04] text-zinc-600 transition-colors duration-200 group-has-[:checked]:bg-white group-has-[:checked]:text-emerald-700">
                  <IconoTipo tipo={t} />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold leading-tight text-zinc-900 sm:text-sm">{NOMBRE_TIPO[t]}</span>
                  <span className="mt-0.5 hidden text-xs leading-snug text-zinc-500 sm:block">{AYUDA_TIPO[t]}</span>
                </span>
              </span>
            </label>
          ))}
        </div>
        {errores?.tipo ? (
          <p id={`${id}-tipo-error`} className="mt-2 text-[13px] font-medium text-red-700">
            {errores.tipo}
          </p>
        ) : null}
      </fieldset>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={id} className="block text-sm font-medium text-zinc-800">
            Tu mensaje
          </label>
          <span aria-hidden className={`text-xs tabular-nums transition-colors duration-200 ${largo > MAX_MENSAJE ? "font-medium text-red-700" : cerca ? "text-amber-700" : "text-zinc-400"}`}>
            {largo} de {MAX_MENSAJE}
          </span>
        </div>
        <textarea
          ref={texto}
          id={id}
          name="mensaje"
          rows={5}
          defaultValue={mensajeInicial}
          placeholder={t.pista[tipo ?? "ninguno"]}
          onInput={(e) => {
            setLargo(largoMensaje(e.currentTarget.value.trim()));
            if (errores?.mensaje) alCorregir("mensaje");
          }}
          aria-invalid={errores?.mensaje ? true : undefined}
          aria-describedby={errores?.mensaje ? idError : idAyuda}
          className="mt-1.5 block min-h-36 w-full resize-y rounded-xl border border-zinc-300 bg-white px-3.5 py-3 text-base leading-relaxed text-zinc-900 placeholder:text-zinc-400 transition-[border-color] duration-200 ease-[var(--ease-snappy)] hover:border-zinc-400 focus:border-emerald-500 focus:outline-none aria-[invalid=true]:border-red-400"
        />
        {errores?.mensaje ? (
          <p id={idError} className="mt-1.5 text-[13px] font-medium leading-snug text-red-700">
            {errores.mensaje}
          </p>
        ) : (
          <p id={idAyuda} className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
            {t.ayudaMensaje}
          </p>
        )}
      </div>
    </>
  );
}
