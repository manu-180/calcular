"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Rango } from "@/lib/panel/tipos";
import { MAX_DIAS, armarRango, cantidadDias, diasEntre, esPreset, extremos, hoyAR, type Dia } from "@/lib/panel/fechas";
import { nombreRango, periodo } from "@/lib/panel/formato";
import { IcoCalendario, IcoChevron } from "./iconos";

const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const SEMANA = ["L", "M", "M", "J", "V", "S", "D"];

type Mes = { anio: number; mes: number };

function mesDe(d: Dia): Mes {
  return { anio: Number(d.slice(0, 4)), mes: Number(d.slice(5, 7)) - 1 };
}

function moverMes(m: Mes, n: number): Mes {
  const total = m.anio * 12 + m.mes + n;
  return { anio: Math.floor(total / 12), mes: total % 12 };
}

function diaDe(m: Mes, dia: number): Dia {
  return `${m.anio}-${String(m.mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

function celdas(m: Mes): (Dia | null)[] {
  const largo = new Date(Date.UTC(m.anio, m.mes + 1, 0)).getUTCDate();
  const corrimiento = (new Date(Date.UTC(m.anio, m.mes, 1)).getUTCDay() + 6) % 7;
  return [...Array<null>(corrimiento).fill(null), ...Array.from({ length: largo }, (_, i) => diaDe(m, i + 1))];
}

export function SelectorFechas({ rango, pendiente, onRango }: { rango: Rango; pendiente: boolean; onRango: (r: Rango) => void }) {
  const [abierto, setAbierto] = useState(false);
  const [hoy, setHoy] = useState(() => hoyAR());
  const [mes, setMes] = useState<Mes>(() => mesDe(hoyAR()));
  // El primer toque marca un día y queda esperando el segundo, que cierra el tramo. El tercero arranca de nuevo.
  const [ancla, setAncla] = useState<Dia | null>(null);
  const [encima, setEncima] = useState<Dia | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const id = useId();
  const elegido = !esPreset(rango);

  useEffect(() => {
    if (!abierto) return;
    const afuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("pointerdown", afuera);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", afuera);
      document.removeEventListener("keydown", esc);
    };
  }, [abierto]);

  const abrir = () => {
    if (abierto) return setAbierto(false);
    const h = hoyAR();
    setHoy(h);
    setMes(mesDe(elegido ? extremos(rango, h).fin : h));
    setAncla(null);
    setEncima(null);
    setAbierto(true);
  };

  const tocar = (d: Dia) => {
    if (ancla) {
      onRango(armarRango(ancla, d, hoy));
      setAncla(null);
    } else {
      onRango(armarRango(d, d, hoy));
      setAncla(d);
    }
  };

  const marcado = ancla
    ? encima
      ? { inicio: ancla < encima ? ancla : encima, fin: ancla < encima ? encima : ancla, tentativo: true }
      : { inicio: ancla, fin: ancla, tentativo: false }
    : { ...extremos(rango, hoy), tentativo: false };
  const esteMes = mesDe(hoy);
  const enElUltimo = mes.anio === esteMes.anio && mes.mes === esteMes.mes;
  const dias = cantidadDias(rango, hoy);

  return (
    // Sin `relative` a propósito: el calendario se ancla al contenedor del Encabezado, que no se
    // mueve cuando el botón cambia de ancho al elegir fechas (si no, el mes salta entre un toque y otro).
    <div ref={caja} className="shrink-0">
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        aria-label={elegido ? `Fechas elegidas: ${nombreRango(rango)}. Cambiar` : "Elegir fechas en el calendario"}
        onClick={abrir}
        className={`inline-flex h-12 items-center gap-2 rounded-full text-sm font-medium transition-[color,background-color,box-shadow,transform] duration-200 ease-fluid active:scale-[0.96] ${
          elegido
            ? "bg-white pl-3.5 pr-4 text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.16)] ring-1 ring-zinc-900/[0.07]"
            : "w-12 justify-center bg-zinc-900/[0.05] text-zinc-600 ring-1 ring-inset ring-zinc-900/[0.06] hover:text-zinc-900"
        }`}
      >
        <IcoCalendario className="size-[18px]" />
        {elegido ? <span className="whitespace-nowrap tabular-nums">{nombreRango(rango)}</span> : null}
        {elegido && pendiente ? <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden /> : null}
      </button>

      {abierto ? (
        <div
          id={id}
          role="dialog"
          aria-label="Elegir fechas"
          className="panel-entra absolute right-0 top-14 z-30 w-[min(20rem,calc(100vw-2rem))] origin-top-right sm:left-0 sm:right-auto sm:origin-top-left rounded-3xl bg-white p-3 shadow-[0_2px_6px_rgba(0,0,0,0.06),0_24px_48px_-16px_rgba(0,0,0,0.28)] ring-1 ring-zinc-900/[0.07]"
        >
          <div className="flex items-center justify-between px-1 pb-2">
            <button
              type="button"
              aria-label="Mes anterior"
              onClick={() => setMes((m) => moverMes(m, -1))}
              className="inline-flex size-9 items-center justify-center rounded-full text-zinc-600 transition-[background-color,transform] duration-150 hover:bg-zinc-900/[0.05] hover:text-zinc-900 active:scale-[0.92]"
            >
              <IcoChevron className="size-4 rotate-90" />
            </button>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-zinc-900" aria-live="polite">
              {MESES[mes.mes]} <span className="font-normal text-zinc-500">{mes.anio}</span>
            </p>
            <button
              type="button"
              aria-label="Mes siguiente"
              disabled={enElUltimo}
              onClick={() => setMes((m) => moverMes(m, 1))}
              className="inline-flex size-9 items-center justify-center rounded-full text-zinc-600 transition-[background-color,transform] duration-150 hover:bg-zinc-900/[0.05] hover:text-zinc-900 active:scale-[0.92] disabled:pointer-events-none disabled:opacity-30"
            >
              <IcoChevron className="size-4 -rotate-90" />
            </button>
          </div>

          <div className="grid grid-cols-7 pb-1 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400" aria-hidden>
            {SEMANA.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1" onPointerLeave={() => setEncima(null)}>
            {celdas(mes).map((d, i) => {
              if (!d) return <span key={`v${i}`} />;
              const futuro = d > hoy;
              const lejos = ancla !== null && Math.abs(diasEntre(ancla, d)) + 1 > MAX_DIAS;
              const dentro = d >= marcado.inicio && d <= marcado.fin;
              const tramo = marcado.inicio !== marcado.fin;
              const extremo = d === marcado.inicio || d === marcado.fin;
              const col = i % 7;
              const banda = dentro && tramo;
              return (
                <div key={d} className="relative h-10">
                  {banda ? (
                    <span
                      aria-hidden
                      className={`absolute inset-y-0.5 ${d === marcado.inicio ? "left-1/2" : "left-0"} ${d === marcado.fin ? "right-1/2" : "right-0"} ${
                        col === 0 && d !== marcado.inicio ? "rounded-l-full" : ""
                      } ${col === 6 && d !== marcado.fin ? "rounded-r-full" : ""} ${marcado.tentativo ? "bg-emerald-500/[0.14]" : "bg-zinc-900/[0.06]"}`}
                    />
                  ) : null}
                  <button
                    type="button"
                    disabled={futuro || lejos}
                    aria-pressed={dentro}
                    aria-label={`${Number(d.slice(8))} de ${MESES[mes.mes].toLowerCase()}${d === hoy ? ", hoy" : ""}`}
                    onClick={() => tocar(d)}
                    onPointerEnter={() => ancla && setEncima(d)}
                    onFocus={() => ancla && setEncima(d)}
                    className={`relative mx-auto flex size-10 items-center justify-center rounded-full text-sm tabular-nums transition-[background-color,color,transform] duration-150 active:scale-[0.9] disabled:pointer-events-none disabled:text-zinc-300 ${
                      extremo && !marcado.tentativo
                        ? "bg-zinc-900 font-semibold text-white"
                        : extremo
                          ? "bg-emerald-600 font-semibold text-white"
                          : dentro
                            ? "text-zinc-900 hover:bg-zinc-900/[0.08]"
                            : "text-zinc-700 hover:bg-zinc-900/[0.05]"
                    }`}
                  >
                    {Number(d.slice(8))}
                    {d === hoy && !extremo ? <span className="absolute bottom-1.5 size-1 rounded-full bg-emerald-500" aria-hidden /> : null}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-zinc-900/[0.06] px-1 pt-3">
            <p className="min-w-0 text-[13px] leading-snug text-zinc-600" aria-live="polite">
              {ancla ? (
                <>
                  <span className="font-medium text-zinc-900">{periodo(armarRango(ancla, ancla, hoy)).replace(/^el /, "")}</span>
                  <br />
                  Tocá otro día para medir el tramo.
                </>
              ) : (
                <>
                  <span className="font-medium text-zinc-900">{dias === 1 ? "1 día" : `${dias} días`}</span>
                  <br />
                  Tocá un día, o dos para un tramo.
                </>
              )}
            </p>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              className="h-9 shrink-0 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-transform duration-150 active:scale-[0.96]"
            >
              Listo
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
