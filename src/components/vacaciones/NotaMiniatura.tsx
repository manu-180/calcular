import { formatARS } from "@/lib/formato";
import { ANIO_VACACIONES } from "@/data/vacaciones";
import { fechaLarga } from "./cronograma";

// La hoja «Notificación» del archivo, en chico: el mismo texto que arma la planilla con las fechas de
// la persona. Es lo que más cuesta hacer a mano y lo que se firma, así que se muestra entero.
// Sin hooks: la usan la oferta de la calculadora (cliente) y la landing (server).

export function NotaMiniatura({
  dias,
  saldo,
  inicio,
  fin,
  vuelve,
  pagar,
  className = "",
}: {
  dias: number;
  saldo: number;
  inicio: string;
  fin: string;
  vuelve: string;
  pagar: number;
  className?: string;
}) {
  return (
    <figure
      aria-label="Vista previa de la notificación de vacaciones que trae la planilla"
      className={`relative rounded-lg bg-[#FFFEFB] px-4 pt-3.5 pb-4 text-[11.5px] leading-[1.55] text-zinc-700 shadow-[var(--shadow-alzada)] ring-1 ring-zinc-900/10 ${className}`}
    >
      <p className="flex items-center justify-between border-b border-zinc-200 pb-1.5 text-[9.5px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
        <span>Notificación de vacaciones</span>
        <span className="font-medium tracking-normal normal-case">original y duplicado</span>
      </p>
      <p className="mt-2.5 font-semibold text-zinc-900">Señor/a ______________________</p>
      <p className="mt-1.5 [text-wrap:pretty]">
        Le notificamos que, conforme al art. 154 de la Ley de Contrato de Trabajo, usted gozará de{" "}
        <mark className="rounded-sm bg-amber-100/80 px-0.5 font-semibold text-zinc-900">{dias} días corridos</mark> de su
        licencia anual {ANIO_VACACIONES}, desde el{" "}
        <mark className="rounded-sm bg-amber-100/80 px-0.5 font-semibold text-zinc-900">{fechaLarga(inicio)}</mark> hasta
        el {fechaLarga(fin)} inclusive, y deberá reintegrarse el {fechaLarga(vuelve)}.
        {saldo > 0 ? ` Los ${saldo} días restantes los gozará en la fecha que acordemos.` : ""}
      </p>
      <p className="mt-1.5 flex items-baseline justify-between gap-3 border-t border-dashed border-zinc-200 pt-1.5">
        <span>Importe bruto, al inicio de la licencia</span>
        <span className="font-semibold text-zinc-900 tabular-nums">{formatARS(pagar, 0)}</span>
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 text-center text-[9.5px] text-zinc-500">
        <span className="border-t border-zinc-400 pt-1">Firma del empleador</span>
        <span className="border-t border-zinc-400 pt-1">Recibí la notificación</span>
      </div>
    </figure>
  );
}
