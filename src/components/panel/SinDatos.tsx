import type { Rango } from "@/lib/panel/tipos";
import { IcoBolsa, IcoBrujula, IcoCalculadora, IcoLupa, IcoPersonas } from "./iconos";
import { Bandeja, TARJETA } from "./ui";

const LO_QUE_VIENE = [
  { Icono: IcoPersonas, texto: "Cuántas personas entran, desde el celular o la compu, y de qué país." },
  { Icono: IcoBrujula, texto: "Por dónde llegan: Google, WhatsApp, ChatGPT o directo." },
  { Icono: IcoCalculadora, texto: "Qué calculadoras usan de verdad y cuánto tiempo se quedan." },
  { Icono: IcoBolsa, texto: "Cuántos quieren comprar una planilla, cuántos van a pagar y cuántos pagan." },
  { Icono: IcoLupa, texto: "Qué buscan en el sitio y no encuentran." },
];

export function SinDatos({ rango }: { rango: Rango }) {
  return (
    <section aria-labelledby="sin-datos-titulo" className="panel-aparece" style={{ ["--i" as string]: 1 }}>
      <Bandeja>
        <div className={`${TARJETA} px-6 py-8 sm:px-10 sm:py-10`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-700/15">
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" aria-hidden />
            La medición ya está andando
          </span>
          <h2 id="sin-datos-titulo" className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-zinc-900 [text-wrap:balance]">
            Todavía no hay números para mostrar
          </h2>
          <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-zinc-600">
            Recién empezamos a medir y en este período no llegó ninguna visita con la medición nueva. Apenas entre
            alguien, esta pantalla se llena sola. Esto es lo que vas a ver:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {LO_QUE_VIENE.map(({ Icono, texto }) => (
              <li key={texto} className="flex items-start gap-3 rounded-2xl bg-zinc-50/80 p-4 ring-1 ring-inset ring-zinc-900/[0.05]">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-zinc-700 ring-1 ring-zinc-900/[0.07]">
                  <Icono className="size-4" />
                </span>
                <span className="pt-1 text-sm leading-relaxed text-zinc-700">{texto}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-600">
            No hace falta que hagas nada.{rango === "hoy" ? " Si querés, mirá los últimos 7 días." : ""}
          </p>
        </div>
      </Bandeja>
    </section>
  );
}
