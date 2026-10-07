import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import { SEMESTRES_2026 } from "@/data/aguinaldo";
import {
  ANSES_2026,
  FECHAS_ACTUALIZADO_EL,
  FECHAS_PROVINCIAS_2026,
  PRIVADOS_2026,
  type EstadoFecha,
} from "@/data/aguinaldo-fechas";

export const metadata: Metadata = {
  title: "Cuándo se paga el aguinaldo 2026: fechas de pago",
  description:
    "Cuándo se cobra el aguinaldo de diciembre 2026: privados (vence el 18/12), jubilados de ANSES y estatales por provincia, con la fuente de cada fecha.",
  alternates: { canonical: "/aguinaldo/fechas" },
  openGraph: openGraphDe({
    ruta: "/aguinaldo/fechas",
    titulo: "¿Cuándo se cobra el aguinaldo?",
    bajada: "Privados, ANSES y provincia por provincia, con fuente y fecha",
  }),
};

const DICIEMBRE = SEMESTRES_2026[1];

const ESTADO_BADGE: Record<EstadoFecha, { texto: string; clase: string }> = {
  oficial: { texto: "Fuente oficial", clase: "bg-emerald-100 text-emerald-800" },
  anunciada: { texto: "Anunciada", clase: "bg-amber-100 text-amber-800" },
  "sin-anuncio": { texto: "Sin anuncio", clase: "bg-zinc-100 text-zinc-500" },
};

const faqs = [
  {
    q: "¿Cuándo vence el aguinaldo de diciembre 2026?",
    a: "La segunda cuota (julio a diciembre) vence el 18 de diciembre de 2026 (art. 122 LCT, texto Ley 27.073). Tu empleador te la puede pagar antes, pero no después.",
  },
  {
    q: "¿Cuál fue la fecha límite de la cuota de junio?",
    a: "Venció el 30 de junio. Con la tolerancia de 4 días hábiles del art. 128, se podía pagar sin infracción hasta el lunes 6 de julio de 2026 (1, 2, 3 y 6 de julio son hábiles; el feriado del 9/7 cae después). Pasado el 6/7, correspondía intimar el pago.",
  },
  {
    q: "¿Cuándo cobran el aguinaldo los jubilados de ANSES?",
    a: "Junto con el haber del mes, según la terminación del DNI, y sin hacer ningún trámite. En junio, las mínimas cobraron entre el 8 y el 22, y las superiores a la mínima entre el 23 y el 29. Cuando ANSES publique el calendario de diciembre, lo cargamos acá.",
  },
  {
    q: "¿Los jubilados cobran algún bono junto con el aguinaldo?",
    a: "En junio 2026 sí: siguió el bono previsional de $70.000 (Decreto 399/2026) para las mínimas del SIPA, la PUAM y las pensiones no contributivas. Una jubilación mínima cobró en total unos $674.977 ($403.318 de haber, $201.659 de medio aguinaldo y $70.000 de bono).",
  },
  {
    q: "¿Por qué mi provincia todavía no tiene fecha?",
    a: "Cada provincia anuncia su propio cronograma, en general en las dos primeras semanas del mes de pago. Si la tuya figura «sin anuncio», casi siempre paga igual en la segunda quincena. Actualizamos la página cuando sale el anuncio oficial.",
  },
  {
    q: "¿Qué hago si pasó la fecha y no me pagaron?",
    a: "Si sos privado y ya pasaron el vencimiento y los 4 días hábiles de tolerancia, reclamá por escrito (una carta documento intimando el pago). Si no te responden, denunciá ante la Secretaría de Trabajo de tu provincia. El aguinaldo es irrenunciable. Si el atraso se repite, puede ser injuria laboral: asesorate antes de decidir nada.",
  },
];

export default function FechasAguinaldoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Cuándo se paga el aguinaldo 2026: fechas de pago",
        descripcion:
          "Cuándo se cobra el aguinaldo de diciembre 2026: privados (vence el 18/12), jubilados de ANSES y estatales por provincia, con la fuente de cada fecha.",
        url: "/aguinaldo/fechas",
        modificado: "2026-06-19",
      }),
      datasetSchema({
        nombre: "Fechas de pago del aguinaldo 2026 en Argentina (privados, ANSES y provincias)",
        descripcion:
          "Calendario de pago del aguinaldo (SAC) 2026: vencimiento de diciembre para privados, la cuota de junio con su tope de tolerancia, el cronograma de ANSES por terminación de DNI y la fecha anunciada por cada provincia, con la fuente oficial de cada una.",
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
          ¿Cuándo se cobra el aguinaldo? Fechas de pago 2026
        </h1>
        <p className="text-zinc-600">
          La segunda cuota del aguinaldo vence el <strong>{DICIEMBRE.fechaPago}</strong>. Si
          trabajás en el sector privado, esa es tu fecha. Si sos jubilado de ANSES, lo cobrás con
          el haber de diciembre, según tu DNI. Si sos estatal, depende de lo que anuncie tu
          provincia.
        </p>
        <p className="text-sm text-zinc-500">
          Calendario de junio verificado al {FECHAS_ACTUALIZADO_EL}.
        </p>
      </header>

      <RespuestaPrimero actualizado={FECHAS_ACTUALIZADO_EL}>
        <p>
          Si sos <strong>empleado privado</strong>, el aguinaldo de diciembre (julio a diciembre)
          vence el <strong>{DICIEMBRE.fechaPago}</strong> (art. 122 LCT). Los{" "}
          <strong>jubilados de ANSES</strong> lo cobran con el haber del mes, según la terminación
          del DNI y sin hacer trámites. Los <strong>estatales</strong> cobran cuando lo anuncia cada
          provincia. Abajo dejamos el calendario completo de junio como referencia, con la fuente de
          cada fecha. ¿No sabés cuánto te toca? Calculalo en la{" "}
          <Link href="/aguinaldo">calculadora de aguinaldo</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Empleados privados</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-semibold text-emerald-900">Cuota de diciembre</h3>
            <p className="mt-1 text-2xl font-bold text-emerald-800">18 de diciembre</p>
            <p className="mt-2 text-sm text-emerald-900">
              Es el vencimiento legal de la segunda cuota (julio a diciembre). Art. 122 de la LCT,
              texto según Ley 27.073.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="font-semibold text-zinc-800">Cuota de junio (ya pagada)</h3>
            <p className="mt-1 text-2xl font-bold text-zinc-700">30 de junio</p>
            <p className="mt-2 text-sm text-zinc-600">
              Con los 4 días hábiles de tolerancia del art. 128 LCT, el tope fue el{" "}
              {PRIVADOS_2026.topeConTolerancia} (1, 2, 3 y 6 de julio eran hábiles).
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
          El medio aguinaldo llega <strong>junto con la mensualidad</strong>, sin trámite. El de
          diciembre se cobra con el haber de diciembre, por terminación de DNI. Cuando ANSES
          publique ese calendario lo cargamos acá. Mientras tanto, este fue el de junio: una
          jubilación mínima cobró en total {ANSES_2026.totalMinima} ({ANSES_2026.minimaJunio} de
          haber, {ANSES_2026.sacMinima} de SAC y un bono de {ANSES_2026.bono}).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-700">
              Jubilaciones mínimas (junio)
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
              Superiores a la mínima (junio)
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
          Esta tabla es la de la cuota de junio 2026. Cada provincia anuncia la de diciembre por su
          cuenta, y la sumamos cuando sale. En cada fila vas a ver si la fecha viene de una{" "}
          <strong>fuente oficial</strong> del gobierno o de un <strong>anuncio</strong> que
          publicaron los medios.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-3 font-semibold">Jurisdicción</th>
                <th className="px-4 py-3 font-semibold">Fecha de pago (junio)</th>
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
          Ojo con lo que encontrás en Google: varias páginas oficiales que aparecen arriba son de
          los cronogramas de 2024 o 2025. Esta tabla solo usa anuncios de 2026 que verificamos, cada
          uno con su fuente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="ca-acordeon group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
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
          . Cada fecha provincial tiene su fuente en la tabla (gobiernos provinciales y medios de
          junio 2026). El calendario de ANSES de junio salió del anuncio oficial que replicaron los
          medios nacionales el 9/6/2026.
        </p>
        <p className="text-xs text-zinc-400">
          Última verificación del calendario de junio: {FECHAS_ACTUALIZADO_EL}. ¿Te pagaron menos
          de lo que esperabas? Revisá la cuenta con la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>
          . Si sos jubilado, mirá cuánto cobrás este mes en la{" "}
          <Link href="/jubilacion" className="text-emerald-700 underline">
            calculadora de jubilación
          </Link>
          . Y si terminó tu relación laboral, la{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            calculadora de indemnización
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
