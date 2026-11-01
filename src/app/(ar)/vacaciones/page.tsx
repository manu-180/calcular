import type { Metadata } from "next";
import { hreflangHeadAR } from "@/lib/hreflang-ar";
import Link from "next/link";
import { CalculadoraVacaciones } from "@/components/CalculadoraVacaciones";
import { datosOferta } from "@/lib/oferta";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { ESCALA_VACACIONES, VACACIONES_FUENTES } from "@/data/vacaciones";
import { OtrosPaises } from "@/components/OtrosPaises";

// Función y no constante: el clúster hreflang se evalúa con la fecha del día (check_mes_en_render).
export function generateMetadata(): Metadata {
  return {
    title: "Calculadora de vacaciones 2026: días y cuánto cobrás",
    description:
      "Calculá tus días de vacaciones por antigüedad (art. 150 LCT) y cuánto cobrás con el plus vacacional de sueldo dividido 25, con la Ley 27.802.",
    alternates: { canonical: "/vacaciones", languages: hreflangHeadAR("/vacaciones") },
  };
}

const faqs = [
  {
    q: "¿Cuántos días de vacaciones me corresponden?",
    a: "Depende de tu antigüedad al 31 de diciembre del año: hasta 5 años, 14 días corridos; más de 5 y hasta 10, 21 días; más de 10 y hasta 20, 28 días; y más de 20 años, 35 días (art. 150 LCT). Son días corridos: incluyen fines de semana y feriados. Si entraste durante el año y no llegás a medio año trabajado, te corresponde 1 día por cada 20 de trabajo efectivo.",
  },
  {
    q: "¿Cómo se pagan las vacaciones?",
    a: "Si cobrás por mes, cada día de vacaciones vale tu sueldo dividido 25 (art. 155 LCT). Como un día trabajado «vale» el sueldo dividido 30, los días de vacaciones se pagan más: esa diferencia es el plus vacacional. Y te las tienen que pagar antes de que empieces las vacaciones.",
  },
  {
    q: "¿Qué es el plus vacacional?",
    a: "No es un premio aparte: sale de la fórmula de la ley. Cada día de vacaciones se paga sueldo ÷ 25 en vez de sueldo ÷ 30, así que cobrás más por esos días. Por ejemplo, con un sueldo de $1.500.000 y 14 días, el plus es de $140.000.",
  },
  {
    q: "¿Cuándo me las pueden dar?",
    a: "La regla general es entre el 1 de octubre y el 30 de abril del año siguiente, aunque las partes pueden acordar otra fecha (art. 154 LCT, texto según Ley 27.802). El empleador tiene que avisarte por escrito con al menos 30 días de anticipación. Y si en tu trabajo las vacaciones no son simultáneas para todos, te tienen que tocar en verano al menos una vez cada tres años.",
  },
  {
    q: "¿Me pueden fraccionar las vacaciones?",
    a: "Sí. Desde la Ley 27.802 (marzo de 2026), vos y tu empleador pueden acordar partir las vacaciones en tramos, siempre que ninguno sea de menos de 7 días. Es opcional: tiene que ser de común acuerdo, no te lo pueden imponer.",
  },
  {
    q: "Entré hace poco, ¿tengo vacaciones igual?",
    a: "Sí: no se exige antigüedad mínima (art. 151 LCT). Si al 31 de diciembre no llegás a haber trabajado la mitad de los días hábiles del año, te corresponde un período proporcional: 1 día de descanso por cada 20 días de trabajo efectivo (art. 153 LCT).",
  },
  {
    q: "¿Puedo cobrar las vacaciones en plata sin tomármelas?",
    a: "No: la ley lo prohíbe (art. 162 LCT). La única excepción es cuando termina el contrato de trabajo: ahí te pagan una indemnización por las vacaciones proporcionales que no te tomaste (art. 156 LCT), dentro de la liquidación final.",
  },
  {
    q: "¿Qué pasa si mi empleador no me da las vacaciones?",
    a: "Si venció el plazo para avisarte y no te las dio, te las podés tomar vos. Tenés que avisarle de forma fehaciente (por ejemplo, con carta documento) y organizarlas para que terminen antes del 31 de mayo (art. 157 LCT).",
  },
  {
    q: "¿Las vacaciones tienen descuentos?",
    a: "Sí: lo que cobrás por vacaciones es remunerativo, así que lleva los mismos aportes que el sueldo (jubilación, PAMI y obra social, un 17% en total) y, si te toca, Ganancias y cuota sindical.",
  },
  {
    q: "¿Puedo acumular vacaciones de un año para otro?",
    a: "Solo en parte: podés acordar con tu empleador sumar a tus vacaciones hasta un tercio de las del año anterior que no te tomaste (art. 164 LCT). El resto no se acumula ni se paga, así que conviene tomarlas a tiempo.",
  },
];

export default function VacacionesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Vacaciones 2026",
        url: "https://calcular.ar/vacaciones",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Calculadora de Vacaciones 2026: cuántos días te corresponden y cuánto cobrás",
        descripcion:
          "Días de vacaciones por antigüedad (art. 150 LCT) y plus vacacional (sueldo ÷ 25), con la reforma del art. 154 por la Ley 27.802.",
        url: "/vacaciones",
        modificado: "2026-06-13",
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
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Calculadora de Vacaciones 2026
        </h1>
        <p className="text-zinc-600">
          Cargá tu sueldo y tu fecha de ingreso y vas a ver{" "}
          <strong>cuántos días de vacaciones te tocan</strong> por antigüedad y{" "}
          <strong>cuánto cobrás</strong>, con el plus vacacional incluido. Ya tiene la reforma del
          art. 154 (Ley 27.802, marzo de 2026).
        </p>
      </header>

      <RespuestaPrimero actualizado="13 de junio de 2026">
        <p>
          Los días de vacaciones dependen de tu antigüedad al 31 de diciembre:{" "}
          <strong>hasta 5 años, 14 días corridos</strong>; hasta 10, <strong>21 días</strong>; hasta
          20, <strong>28 días</strong>; y más de 20 años, <strong>35 días</strong> (art. 150 LCT).
          Se pagan a <strong>sueldo ÷ 25 por día</strong>, más que un día normal (÷30). Esa
          diferencia es el plus vacacional. Si entraste hace poco, te toca 1 día por cada 20
          trabajados. Desde la Ley 27.802 las podés partir en tramos de 7 días o más, de común
          acuerdo.
        </p>
      </RespuestaPrimero>

      <CalculadoraVacaciones oferta={datosOferta("planilla-vacaciones")} />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuántos días de vacaciones corresponden
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El art. 150 de la Ley de Contrato de Trabajo fija una escala de{" "}
            <strong>días corridos</strong> según la antigüedad que tengas{" "}
            <strong>al 31 de diciembre</strong> del año al que corresponden las vacaciones:
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-left text-zinc-700">
                <th className="px-4 py-2.5 font-semibold">Antigüedad al 31/12</th>
                <th className="px-4 py-2.5 font-semibold">Días de vacaciones</th>
              </tr>
            </thead>
            <tbody>
              {ESCALA_VACACIONES.map((tramo) => (
                <tr key={tramo.dias} className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">{tramo.etiqueta}</td>
                  <td className="px-4 py-2.5 font-semibold text-zinc-900">
                    {tramo.dias} días corridos
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3 text-zinc-600">
          <p>
            «Días corridos» quiere decir que <strong>cuentan los fines de semana y feriados</strong>{" "}
            que caen en el medio. Para compensarlo, las vacaciones siempre empiezan un{" "}
            <strong>lunes</strong> (o el día hábil siguiente, si ese lunes es feriado, art. 151).
          </p>
          <p>
            No hace falta antigüedad mínima: si entraste durante el año y al 31 de diciembre no
            llegás a haber trabajado la mitad de los días hábiles, te corresponde{" "}
            <strong>1 día de descanso por cada 20 días de trabajo efectivo</strong> (art. 153).
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo se pagan: la cuenta del plus vacacional
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Si cobrás por mes, cada día de vacaciones se paga{" "}
            <strong>el sueldo dividido 25</strong> (art. 155 inc. a). Como un día común de un mes
            de 30 «vale» el sueldo dividido 30, los días de vacaciones se pagan más. Esa diferencia
            es lo que todos conocemos como <strong>plus vacacional</strong>.
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Retribución vacacional = (sueldo ÷ 25) × días de vacaciones
          </p>
          <p>
            Por ejemplo: con un sueldo bruto de $1.500.000 y 14 días de vacaciones, cada día vale
            $60.000 y cobrás <strong>$840.000 brutos</strong> por las vacaciones. Si esos 14 días
            los hubieras trabajado, valdrían $700.000: el plus vacacional son{" "}
            <strong>$140.000</strong>. Además, la ley exige que esta retribución se pague{" "}
            <strong>antes de que empieces las vacaciones</strong>.
          </p>
          <p>
            Si tu sueldo es variable (comisiones, destajo, porcentajes), se usa el promedio de lo
            que ganaste en el año o, si preferís, el de los últimos 6 meses (art. 155 inc. c). Y el
            sueldo base incluye todo lo que cobrás siempre: antigüedad, horas extras y demás
            adicionales (art. 155 inc. d).
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que cambió en 2026 con la Ley 27.802
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            En marzo de 2026 se reformó el art. 154 de la LCT (Ley 27.802, B.O. 6/3/2026). Los
            cambios principales:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Aviso con 30 días:</strong> el empleador tiene que notificarte por escrito
              la fecha de inicio con al menos 30 días de anticipación (antes eran 45). Los
              convenios colectivos pueden fijar sistemas distintos.
            </li>
            <li>
              <strong>Fraccionamiento:</strong> ahora se puede acordar partir las vacaciones en
              tramos, siempre que cada uno tenga <strong>al menos 7 días</strong>.
            </li>
            <li>
              <strong>Verano garantizado:</strong> si las vacaciones se otorgan por turnos, a
              cada trabajador le tienen que tocar en temporada de verano al menos{" "}
              <strong>una vez cada 3 años</strong>.
            </li>
            <li>
              <strong>Enfermedad durante las vacaciones:</strong> si te enfermás y avisás a tiempo,
              los días que no pudiste disfrutar se pasan para otra fecha.
            </li>
          </ul>
          <p>
            La temporada general no cambió: entre el{" "}
            <strong>1 de octubre y el 30 de abril</strong> del año siguiente, salvo que acuerden
            otra fecha. Para los días por casamiento, nacimiento, fallecimiento o examen, que no son
            vacaciones, está la{" "}
            <Link href="/licencias-especiales" className="text-emerald-700 underline">
              calculadora de licencias especiales
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Si sos empleador: cómo organizar la temporada</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Por cada persona del equipo hay tres pasos: calcular los días que le tocan, elegir una fecha
            de inicio que caiga en lunes y darle el aviso por escrito con 30 días de anticipación. Las
            vacaciones se pagan al empezar, así que conviene saber de antemano cuánto sale cada mes, de
            octubre a abril.
          </p>
          <p>
            Si tenés varias personas a cargo, la{" "}
            <Link
              href="/planillas/vacaciones?desde=vacaciones-guia"
              className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
            >
              planilla de vacaciones 2026
            </Link>{" "}
            hace esta cuenta para todo el equipo, te avisa cuando una fecha o un plazo no cierra y arma
            la nota de vacaciones lista para firmar.
          </p>
        </div>
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
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href={VACACIONES_FUENTES.lct.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {VACACIONES_FUENTES.lct.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={VACACIONES_FUENTES.ley27802.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {VACACIONES_FUENTES.ley27802.nombre}
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {VACACIONES_FUENTES.consultadoEl}. Mirá también la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>
          , la{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            calculadora de indemnización por despido
          </Link>{" "}
          y la{" "}
          <Link href="/monotributo" className="text-emerald-700 underline">
            calculadora de monotributo
          </Link>
          . ¿Por qué las vacaciones se pagan más que un mes normal? Leé el{" "}
          <Link
            href="/blog/cuanto-se-cobra-de-vacaciones-plus-vacacional-2026"
            className="text-emerald-700 underline"
          >
            plus vacacional explicado
          </Link>
          .
        </p>
      </section>
      <OtrosPaises concepto="vacaciones" />
    </article>
  );
}
