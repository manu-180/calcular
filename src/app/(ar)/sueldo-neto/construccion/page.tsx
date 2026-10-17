import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { datosOferta } from "@/lib/oferta";
import { CalculadoraUocra } from "@/components/CalculadoraUocra";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_FUENTES,
  UOCRA_HORAS_MES_PROMEDIO,
  ZONAS_UOCRA,
} from "@/data/convenios/uocra";
import { calcularUocra } from "@/lib/convenios";
import { formatARS } from "@/lib/formato";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";
import { periodoDeMes, vigenteEn } from "@/lib/hoy";

function datosDelMes() {
  const ACTUALIZADO_EL = UOCRA_FUENTES.consultadoEl;
  const MES = vigenteEn(MESES_UOCRA, periodoDeMes);
  const MES_ID = MES.id;
  const MES_TXT = MES.etiqueta.toLowerCase();
  const ZONA_REF = "a"; // Zona A: la más poblada (CABA, Buenos Aires, Córdoba, Santa Fe, etc.)
  const HORAS_REF = Math.round(UOCRA_HORAS_MES_PROMEDIO);
  const OFICIAL_REF = calcularUocra({
    mesId: MES_ID,
    categoriaId: "oficial",
    zonaId: ZONA_REF,
    horasMes: HORAS_REF,
    conAsistencia: true,
    conAporteSindical: false,
  })!;
  const redondeo = (n: number) => Math.round(n / 10_000) * 10_000;
  return { ACTUALIZADO_EL, MES, MES_ID, MES_TXT, ZONA_REF, HORAS_REF, OFICIAL_REF, redondeo };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const crearFaqs = ({ MES_TXT, HORAS_REF, OFICIAL_REF, redondeo }: DatosDelMes) => [
  {
    q: "¿Cuánto cobra un obrero de la construcción en mano en 2026?",
    a: `Depende de la categoría, la zona y las horas trabajadas. Un Oficial de Zona A, con jornada completa (≈${HORAS_REF} horas/mes) y asistencia perfecta, tiene en ${MES_TXT} un bruto cercano a ${formatARS(redondeo(OFICIAL_REF.bruto), 0)} y le quedan en mano alrededor de ${formatARS(redondeo(OFICIAL_REF.neto), 0)}. El jornal es por hora, así que el sueldo final cambia según las horas que trabajaste en el mes.`,
  },
  {
    q: "¿Por qué el neto de la construcción puede ser más del 83% del bruto?",
    a: "Solo en los meses con Suma No Remunerativa (SNR): la SNR aporta el 3% de obra social y no el 17% completo, y eso deja el neto un poco arriba del 83%. En 2026 la hubo de abril a julio. Desde agosto pasó al básico y el tramo de septiembre a noviembre no la trae, así que el neto vuelve al 83% de lo remunerativo. La asistencia perfecta (20% del básico) siempre es remunerativa y descuenta el 17%.",
  },
  {
    q: "¿Qué es la asistencia perfecta?",
    a: "Es un adicional del 20% del básico que fija el art. 52 del CCT 76/75 para quien no falta en toda la quincena. No se pierde por vacaciones, licencias, feriados ni suspensiones por clima. Es remunerativa: lleva los aportes completos.",
  },
  {
    q: "¿Las zonas cambian el sueldo?",
    a: "Sí. El CCT 76/75 tiene jornales distintos por zona (A, B, C y C Austral), más altos en el sur por el costo de vida. La tabla de esta página muestra la Zona A (la más poblada). Usá la calculadora de arriba para elegir tu zona y ver el valor exacto.",
  },
  {
    q: "¿Qué descuentos incluye el neto estimado?",
    a: "Los aportes de ley: 11% jubilación + 3% PAMI + 3% obra social (17%) sobre lo remunerativo (básico + asistencia perfecta), y solo 3% de obra social sobre la SNR. No incluye el aporte solidario del 2% ni la cuota sindical (los podés sumar en la calculadora), ni Ganancias.",
  },
];

export const metadata: Metadata = {
  title: "Sueldo neto UOCRA 2026: cuánto cobra en mano",
  description:
    "Cuánto cobra en mano un obrero de la construcción según el CCT 76/75 por categoría y zona: oficial, medio oficial, ayudante y sereno.",
  alternates: { canonical: "/sueldo-neto/construccion" },
};

export default function SueldoNetoConstruccionPage() {
  const datos = datosDelMes();
  const { ACTUALIZADO_EL, MES, MES_ID, MES_TXT, ZONA_REF, HORAS_REF } = datos;
  const faqs = crearFaqs(datos);
  const mesEtiqueta = MES.etiqueta;
  const zonaRef = ZONAS_UOCRA.find((z) => z.id === ZONA_REF);

  const horasMes = HORAS_REF;

  const filas = CATEGORIAS_UOCRA.map((cat) => ({
    cat,
    r: calcularUocra({
      mesId: MES_ID,
      categoriaId: cat.id,
      zonaId: ZONA_REF,
      horasMes,
      conAsistencia: true,
      conAporteSindical: false,
    }),
  }));

  const oficial = filas.find((x) => x.cat.id === "oficial")?.r;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Sueldo Neto Construcción (UOCRA) 2026",
        descripcion:
          `Cuánto queda en mano según la escala CCT 76/75 por categoría y zona. Bruto, aportes y neto estimado, ${MES_TXT}.`,
        url: "/sueldo-neto/construccion",
        modificado: "2026-09-28",
      }),
      datasetSchema({
        nombre: `Tabla neto por categoría: Construcción UOCRA CCT 76/75 ${MES_TXT} (Zona A)`,
        descripcion:
          "Bruto, descuentos y neto estimado para las categorías del CCT 76/75 en Zona A, jornada completa con asistencia perfecta.",
        url: "/sueldo-neto/construccion",
        modificado: "2026-09-28",
        fuenteNombre: UOCRA_FUENTES.acuerdoTramo3.nombre,
        fuenteUrl: UOCRA_FUENTES.acuerdoTramo3.url,
      }),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <nav className="text-sm text-zinc-500">
          <Link href="/sueldo-neto" className="hover:text-emerald-600">
            Sueldo Neto
          </Link>{" "}
          →{" "}
          <Link href="/convenios/uocra" className="hover:text-emerald-600">
            Construcción (UOCRA)
          </Link>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldo Neto Construcción (UOCRA) 2026
        </h1>
        <p className="text-zinc-600">
          Cuánto te queda en mano según la escala oficial del{" "}
          <strong>CCT 76/75</strong>. Por categoría y zona, con la asistencia perfecta y la suma
          no remunerativa bien calculadas. Si querés la escala completa y los meses que vienen,
          está la{" "}
          <Link href="/convenios/uocra" className="text-emerald-700 hover:underline">
            escala de la UOCRA por categoría y zona
          </Link>
          .
        </p>
      </header>

      {oficial && (
        <RespuestaPrimero actualizado={ACTUALIZADO_EL}>
          <p>
            Un <strong>Oficial</strong> de <strong>Zona A</strong> con jornada completa (≈
            {horasMes} horas) y asistencia perfecta tiene{" "}
            <strong>{formatARS(oficial.bruto, 0)}</strong> de bruto en {MES_TXT} y le quedan en
            mano <strong>{formatARS(oficial.neto, 0)}</strong>.{" "}
            {oficial.snr > 0 ? (
              <>
                Es un poco más del 83% porque la <strong>suma no remunerativa</strong> solo
                descuenta el 3% de obra social.
              </>
            ) : (
              <>
                Es el 83% del bruto: {MES_TXT} no tiene suma no remunerativa, así que todo el sueldo
                descuenta los aportes completos.
              </>
            )}{" "}
            El sueldo de la construcción es <strong>por hora</strong>, así que el monto final cambia
            con las horas del mes.
          </p>
        </RespuestaPrimero>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu sueldo en mano</h2>
        <p className="text-sm text-zinc-600">
          Elegí tu categoría, la zona, el mes y las horas trabajadas para ver el detalle exacto de
          bruto, aportes y neto.
        </p>
        <CalculadoraUocra oferta={datosOferta("planilla-uocra")} />
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-zinc-900">
          Neto por categoría: {mesEtiqueta} ({zonaRef?.nombre ?? "Zona A"})
        </h2>
        <p className="text-sm text-zinc-500">
          Jornada completa (≈{horasMes} hs) · con asistencia perfecta · sin aporte solidario ni
          Ganancias.
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Categoría</th>
                <th className="px-4 py-2.5 text-right font-medium">Bruto</th>
                <th className="px-4 py-2.5 text-right font-medium">Descuentos</th>
                <th className="px-4 py-2.5 text-right font-medium text-emerald-700">En mano</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filas.map(({ cat, r }) =>
                r ? (
                  <tr key={cat.id} className="bg-white hover:bg-zinc-50">
                    <td className="px-4 py-2.5 text-zinc-800">
                      {cat.nombre}
                      {cat.mensual ? (
                        <span className="ml-1 text-xs text-zinc-400">(mensual)</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-700">
                      {formatARS(r.bruto, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-rose-600">
                      −{formatARS(r.descuentos, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-emerald-700">
                      {formatARS(r.neto, 0)}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-zinc-400">
          Zona A ({zonaRef?.provincias}). Las zonas B, C y C Austral tienen jornales más altos:
          elegí la tuya en la calculadora. Descuentos: 17% sobre lo remunerativo (básico +
          asistencia perfecta) y 3% sobre la suma no remunerativa. El sereno cobra sueldo mensual.
        </p>
      </section>

      <section className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-bold text-amber-900">El sueldo de la construcción es por hora</h2>
        <p className="text-sm text-amber-800">
          A diferencia de la mayoría de los convenios, en la UOCRA el básico es un{" "}
          <strong>jornal por hora</strong>: el sueldo del mes es el jornal × las horas trabajadas.
          La tabla usa un mes típico de jornada completa (≈{horasMes} horas). Si trabajaste más o
          menos, cargá tus horas reales en la calculadora.
        </p>
        {oficial && oficial.snr > 0 && (
          <p className="text-sm text-amber-800">
            Ejemplo Oficial Zona A {MES_TXT}: sobre lo remunerativo (
            {formatARS(oficial.totalRemunerativo, 0)}) se descuenta el 17%, y sobre la suma no
            remunerativa ({formatARS(oficial.snr, 0)}) solo el 3%. Por eso el neto queda un poco
            arriba del 83%.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-zinc-900">{f.q}</dt>
              <dd className="mt-1 text-zinc-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <EmailCapture
        source="sueldo-neto-construccion"
        headline="Avisame cuando se actualice la escala de la UOCRA"
        subtext="Cuando se publique el nuevo básico del convenio de construcción o cambien los aportes, te aviso. Sin spam."
      />

      <footer className="space-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
        <p>
          Fuente:{" "}
          <a
            href={UOCRA_FUENTES.acuerdoTramo2.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600"
          >
            {UOCRA_FUENTES.acuerdoTramo2.nombre}
          </a>
          . Consultado el {UOCRA_FUENTES.consultadoEl}.
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/convenios/uocra" className="underline hover:text-emerald-600">
            Calculadora completa UOCRA
          </Link>
          <Link href="/sueldo-neto" className="underline hover:text-emerald-600">
            Calculadora sueldo neto
          </Link>
          <Link href="/sueldo-neto/comercio" className="underline hover:text-emerald-600">
            Neto Comercio
          </Link>
          <Link href="/aguinaldo" className="underline hover:text-emerald-600">
            Aguinaldo
          </Link>
        </nav>
      </footer>
    </article>
  );
}
