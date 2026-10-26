"use client";

import type { BocaDatos, PanelDatos, Rango } from "@/lib/panel/tipos";
import { coeficiente } from "@/lib/panel/boca";
import { deCada100, numero, periodo, plural } from "@/lib/panel/formato";
import { Delta } from "../Delta";
import { IcoPersonas } from "../iconos";
import { Bandeja, Seccion, TARJETA } from "../ui";
import { Cifra, VacioBoca } from "./comun";
import { Extras } from "./Extras";
import { GraficoBoca } from "./GraficoBoca";
import { Puente } from "./Puente";
import { Repartos } from "./Repartos";
import { SeccionNueva } from "./SeccionNueva";
import { TablaPaginas } from "./TablaPaginas";
import { Top } from "./Top";

const unDecimal = new Intl.NumberFormat("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function Resumen({ boca, rango }: { boca: BocaDatos; rango: Rango }) {
  const r = boca.resumen;
  const k = coeficiente(r);
  const yaVenian = r.llegadas - r.nuevas;
  const frase =
    k === null
      ? "Todavía nadie compartió en este período. Cuando alguien lo haga, acá vas a ver cuánta gente trae."
      : r.nuevas === 0
        ? `${plural(r.personas, "persona compartió", "personas compartieron")} y todavía no llegó nadie nuevo por esos links.`
        : `Cada persona que comparte trae ${unDecimal.format(k)} ${k === 1 ? "visita nueva" : "visitas nuevas"}: gente que nunca había entrado.`;
  const notas = [
    r.propias > 0 ? `${plural(r.propias, "persona abrió su propio link", "personas abrieron su propio link")} y no cuentan` : null,
    r.sinCompartido > 0 ? `${plural(r.sinCompartido, "llegada trajo", "llegadas trajeron")} un código que no aparece entre los compartidos` : null,
  ].filter(Boolean);

  return (
    <div className={`${TARJETA} overflow-hidden`}>
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative p-5 sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(16,185,129,0.08),transparent_60%)]"
          />
          <p className="relative text-xs font-medium uppercase tracking-[0.12em] text-zinc-600">Coeficiente de boca en boca</p>
          <p className="relative mt-2 flex items-baseline gap-2">
            <span className="text-[3.25rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-zinc-900 sm:text-6xl">
              {k === null ? "—" : unDecimal.format(k)}
            </span>
            <span className="text-sm text-zinc-600">{k === null ? "" : "nuevas por persona"}</span>
          </p>
          <p className="relative mt-3 max-w-[44ch] text-[15px] leading-relaxed text-zinc-700 [text-wrap:pretty]">{frase}</p>
          <p className="relative mt-2 text-xs leading-relaxed text-zinc-600">
            Llegadas nuevas dividido personas que compartieron, {periodo(rango)}. Arriba de 1, cada persona trae a más de una.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px border-t border-zinc-100 bg-zinc-100 lg:border-l lg:border-t-0">
          <div className="bg-white p-5">
            <dt className="sr-only">Compartidos</dt>
            <dd>
              <Cifra etiqueta="Compartidos" valor={numero(r.compartidos)} nota={<Delta valor={r.compartidos} anterior={r.compartidosAntes} rango={rango} />} />
            </dd>
          </div>
          <div className="bg-white p-5">
            <dt className="sr-only">Personas que compartieron</dt>
            <dd>
              <Cifra etiqueta="Personas que compartieron" valor={numero(r.personas)} nota={r.personas ? `${unDecimal.format(r.compartidos / r.personas)} compartidos cada una` : "—"} />
            </dd>
          </div>
          <div className="bg-white p-5">
            <dt className="sr-only">Llegadas por links compartidos</dt>
            <dd>
              <Cifra
                etiqueta="Llegaron por esos links"
                valor={numero(r.llegadas)}
                nota={r.llegadas ? `${numero(r.nuevas)} nuevas · ${numero(yaVenian)} ya venían` : "Nadie todavía"}
              />
            </dd>
          </div>
          <div className="bg-white p-5">
            <dt className="sr-only">Llegadas que usaron una calculadora</dt>
            <dd>
              <Cifra
                etiqueta="Usaron una calculadora"
                valor={numero(r.usaron)}
                nota={r.llegadas ? `${deCada100(r.usaron / r.llegadas)} que llegaron` : "—"}
              />
            </dd>
          </div>
        </dl>
      </div>
      {notas.length ? (
        <p className="border-t border-zinc-100 px-5 py-3 text-xs leading-relaxed text-zinc-600 sm:px-6">{notas.join(" · ")}.</p>
      ) : null}
    </div>
  );
}

export function Boca({ datos, rango }: { datos: PanelDatos; rango: Rango }) {
  const boca = datos.boca;
  return (
    <Seccion
      id="boca"
      indice={5}
      titulo="Boca en boca"
      bajada="Lo que la gente comparte de calcular.ar y calcularya, y a cuántos trae."
    >
      {!boca ? (
        <Bandeja>
          <div className={`${TARJETA} p-5`}>
            <VacioBoca titulo="Falta un paso en la base" icono={<IcoPersonas className="size-4" />}>
              Los compartidos ya se miden, pero la base todavía no tiene la cuenta del boca en boca (migración ca_panel_boca). Apenas se
              aplique, esta sección se llena sola con lo que ya está guardado.
            </VacioBoca>
          </div>
        </Bandeja>
      ) : (
        <Bandeja>
          <div className="space-y-1.5">
            <Resumen boca={boca} rango={rango} />
            <SeccionNueva boca={boca} />
            <div className={`${TARJETA} p-5`}>
              <h3 className="text-sm font-semibold text-zinc-900">Día por día</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">
                Las columnas son los compartidos; la línea, la gente que entró por esos links (aunque el link sea de antes).
              </p>
              <div className="mt-4">
                <GraficoBoca serie={boca.serie} granularidad={boca.granularidad} />
              </div>
            </div>
            <Repartos boca={boca} mercado={datos.mercado} />
            <TablaPaginas boca={boca} mercado={datos.mercado} />
            <Top boca={boca} mercado={datos.mercado} />
            <Puente boca={boca} />
            <Extras boca={boca} mercado={datos.mercado} />
          </div>
        </Bandeja>
      )}
    </Seccion>
  );
}
