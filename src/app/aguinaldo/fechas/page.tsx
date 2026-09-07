import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";
import {
  ANSES_2026,
  FECHAS_ACTUALIZADO_EL,
  FECHAS_PROVINCIAS_2026,
  PRIVADOS_2026,
  type EstadoFecha,
} from "@/data/aguinaldo-fechas";

export const metadata: Metadata = {
  title: "Cuándo se paga el aguinaldo 2026: fechas por provincia, ANSES y privados",
  description:
    "Fechas de pago del medio aguinaldo de junio 2026: privados (vence 30/6, tope efectivo 6/7), jubilados de ANSES por DNI y el calendario provincia por provincia, con fuentes.",
  alternates: { canonical: "/aguinaldo/fechas" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("¿Cuándo se cobra el aguinaldo?")}&s=${encodeURIComponent("Privados, ANSES y provincia por provincia — con fuente y fecha")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const ESTADO_BADGE: Record<EstadoFecha, { texto: string; clase: string }> = {
  oficial: { texto: "Fuente oficial", clase: "bg-emerald-100 text-emerald-800" },
  anunciada: { texto: "Anunciada", clase: "bg-amber-100 text-amber-800" },
  "sin-anuncio": { texto: "Sin anuncio", clase: "bg-zinc-100 text-zinc-500" },
};

const faqs = [
  {
    q: "¿Cuál es la fecha límite del aguinaldo para empleados privados?",
    a: "El vencimiento legal es el 30 de junio (art. 122 LCT, texto Ley 27.073). Por la tolerancia de 4 días hábiles del art. 128, el pago puede acreditarse sin infracción hasta el lunes 6 de julio de 2026 (1, 2, 3 y 6 de julio son hábiles; el feriado del 9/7 cae después y no corre la fecha). Pasado el 6/7, corresponde intimar el pago.",
  },
  {
    q: "¿Cuándo cobran el aguinaldo los jubilados de ANSES?",
    a: "Junto con el haber de junio, según la terminación del DNI: las jubilaciones mínimas cobran entre el 8 y el 22 de junio, y las superiores a la mínima entre el 23 y el 29 de junio. El medio aguinaldo se acredita automáticamente con la mensualidad: no hay que hacer ningún trámite.",
  },
  {
    q: "¿Los jubilados cobran algún bono junto con el aguinaldo?",
    a: "Sí: en junio 2026 sigue vigente el bono previsional de $70.000 (Decreto 399/2026) para las jubilaciones mínimas del SIPA, la PUAM y las pensiones no contributivas. Una jubilación mínima cobra en total unos $674.977: $403.318 de haber + $201.659 de medio aguinaldo + $70.000 de bono.",
  },
  {
    q: "¿Por qué mi provincia todavía no tiene fecha?",
    a: "Cada gobierno provincial anuncia su propio cronograma, en general durante las dos primeras semanas de junio. Si tu provincia figura 'sin anuncio', el pago suele concretarse igual en la segunda quincena: actualizamos esta página cuando aparece el anuncio oficial.",
  },
  {
    q: "¿Qué hago si pasó la fecha y no me pagaron?",
    a: "Para privados: pasado el 6 de julio, reclamá por escrito (carta documento intimando el pago) y, si no hay respuesta, denunciá ante la Secretaría de Trabajo de tu provincia. El aguinaldo es irrenunciable. Si el empleador entró en mora reiterada, puede configurar injuria laboral: asesorate antes de tomar decisiones.",
  },
];

export default function FechasAguinaldoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Cuándo se paga el aguinaldo 2026: fechas por provincia, ANSES y privados",
        descripcion:
          "Fechas de pago del medio aguinaldo de junio 2026: privados (vence 30/6, tope efectivo 6/7), jubilados de ANSES por DNI y el calendario provincia por provincia, con fuentes.",
        url: "/aguinaldo/fechas",
        modificado: "2026-06-19",
      }),
      datasetSchema({
        nombre: "Fechas de pago del aguinaldo 2026 en Argentina (privados, ANSES y provincias)",
        descripcion:
          "Calendario de pago del medio aguinaldo (SAC) de junio 2026: vencimiento legal y tope con tolerancia para privados, cronograma de ANSES por terminación de DNI y la fecha anunciada por cada provincia, con la fuente oficial de cada una.",
        url: "/aguinaldo/fechas",
        modificado: "2026-06-19",
        fuenteNombre: "Ley de Contrato de Trabajo, arts. 122 y 128 (Infoleg)",
        fuenteUrl:
          "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      }),
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          ¿Cuándo se cobra el aguinaldo? Fechas de junio 2026
        </h1>
        <p className="text-zinc-600">
          <strong>Privados:</strong> vence el <strong>{PRIVADOS_2026.vencimientoLegal}</strong>;
          con la tolerancia legal de 4 días hábiles, el tope efectivo es el{" "}
          <strong>{PRIVADOS_2026.topeConTolerancia}</strong>. <strong>Jubilados de ANSES:</strong>{" "}
          con el haber de junio, por terminación de DNI. <strong>Estatales provinciales:</strong>{" "}
          cada provincia anuncia su fecha — la tabla completa está abajo, con la fuente de cada
          una.
        </p>
        <p className="text-sm text-zinc-500">Actualizado al {FECHAS_ACTUALIZADO_EL}.</p>
      </header>

      <RespuestaPrimero actualizado={FECHAS_ACTUALIZADO_EL}>
        <p>
          Para <strong>empleados privados</strong>, el medio aguinaldo de junio 2026 vence el{" "}
          <strong>{PRIVADOS_2026.vencimientoLegal}</strong> (art. 122 LCT); con la tolerancia de 4
          días hábiles del art. 128, el tope efectivo sin infracción es el{" "}
          <strong>{PRIVADOS_2026.topeConTolerancia}</strong>. Los{" "}
          <strong>jubilados de ANSES</strong> lo cobran junto con el haber de junio, según la
          terminación del DNI (sin trámite). Los <strong>estatales provinciales</strong> dependen
          del cronograma que anuncia cada provincia —la tabla de abajo trae la fecha y la fuente de
          cada jurisdicción. ¿No sabés cuánto te toca? Calculalo en la{" "}
          <Link href="/aguinaldo">calculadora de aguinaldo</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Empleados privados</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-semibold text-emerald-900">Vencimiento legal</h3>
            <p className="mt-1 text-2xl font-bold text-emerald-800">30 de junio</p>
            <p className="mt-2 text-sm text-emerald-900">
              Art. 122 de la LCT (texto según Ley 27.073).
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-amber-900">Tope con tolerancia</h3>
            <p className="mt-1 text-2xl font-bold text-amber-800">lunes 6 de julio</p>
            <p className="mt-2 text-sm text-amber-900">
              4 días hábiles de tolerancia (art. 128 LCT): 1, 2, 3 y 6 de julio son hábiles.
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          ¿No sabés cuánto te corresponde? Usá la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>{" "}
          (bruto y en mano) y mirá la{" "}
          <Link href="/aguinaldo/neto" className="text-emerald-700 underline">
            tabla de cuánto queda en mano
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Jubilados y pensionados de ANSES: calendario por DNI
        </h2>
        <p className="text-zinc-600">
          El medio aguinaldo se acredita <strong>junto con la mensualidad de junio</strong>, sin
          trámite. Una jubilación mínima cobra en total {ANSES_2026.totalMinima}:{" "}
          {ANSES_2026.minimaJunio} de haber + {ANSES_2026.sacMinima} de SAC + bono de{" "}
          {ANSES_2026.bono}.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-700">
              Jubilaciones mínimas
            </p>
            <table className="w-full text-sm">
              <tbody>
                {ANSES_2026.minimas.map(([dni, fecha]) => (
                  <tr key={dni} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-2 text-zinc-600">{dni}</td>
                    <td className="px-4 py-2 font-medium text-zinc-900">{fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-700">
              Superiores a la mínima
            </p>
            <table className="w-full text-sm">
              <tbody>
                {ANSES_2026.superiores.map(([dni, fecha]) => (
                  <tr key={dni} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-2 text-zinc-600">{dni}</td>
                    <td className="px-4 py-2 font-medium text-zinc-900">{fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Estatales: fecha provincia por provincia
        </h2>
        <p className="text-zinc-600">
          Cada fila indica si la fecha viene de una <strong>fuente oficial</strong> del gobierno
          o de un <strong>anuncio reportado</strong> por medios de junio 2026. Las provincias sin
          anuncio se actualizan cuando lo publican.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-3 font-semibold">Jurisdicción</th>
                <th className="px-4 py-3 font-semibold">Fecha de pago del SAC</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {FECHAS_PROVINCIAS_2026.map((f) => {
                const badge = ESTADO_BADGE[f.estado];
                return (
                  <tr key={f.jurisdiccion} className="border-b border-zinc-100 align-top last:border-0">
                    <td className="px-4 py-2.5 font-medium text-zinc-900">{f.jurisdiccion}</td>
                    <td className="px-4 py-2.5 text-zinc-700">
                      {f.fecha}
                      {f.fuenteUrl && (
                        <>
                          {" "}
                          <a
                            href={f.fuenteUrl}
                            rel="nofollow noopener"
                            target="_blank"
                            className="text-xs text-emerald-700 underline"
                          >
                            fuente
                          </a>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.clase}`}
                      >
                        {badge.texto}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Ojo con las búsquedas: varias páginas oficiales que rankean en Google corresponden a
          cronogramas de 2024 o 2025. Esta tabla solo usa anuncios verificados de 2026, cada uno
          con su fuente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes</h2>
        <p className="text-sm text-zinc-600">
          Vencimiento y tolerancia:{" "}
          <a
            href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm"
            rel="nofollow noopener"
            target="_blank"
            className="text-emerald-700 underline"
          >
            arts. 122 y 128 de la LCT (Infoleg, texto actualizado)
          </a>
          . Las fechas provinciales llevan su fuente en cada fila de la tabla (gobiernos
          provinciales y medios de junio 2026). Calendario de ANSES: anuncio oficial replicado
          por medios nacionales el 9/6/2026.
        </p>
        <p className="text-xs text-zinc-400">
          Última verificación: {FECHAS_ACTUALIZADO_EL}. ¿Te pagaron menos de lo que esperabas?
          Revisá la cuenta con la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>{" "}
          y, si terminó tu relación laboral, la{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            calculadora de indemnización
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
