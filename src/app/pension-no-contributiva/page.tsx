import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPnc } from "@/components/CalculadoraPnc";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { INCAPACIDAD_MINIMA_INVALIDEZ_LABORAL, PNC_FUENTES } from "@/data/pnc";
import { BONO_VIGENTE, PRESTACIONES_VIGENTES as V } from "@/data/prestaciones";
import { smvmVigente } from "@/lib/desempleo";
import { montosVigentes, prestacionPorClave, montoDe, totalMinimaConBono } from "@/lib/pnc";
import { formatARS, formatPct } from "@/lib/formato";

const MES = V.vigencia;
const MONTOS = montosVigentes();
const DISCAPACIDAD = montoDe(prestacionPorClave("discapacidad"));
const MADRE7 = montoDe(prestacionPorClave("madre7hijos"));
const SMVM = smvmVigente().mes;
const TOPE_INGRESOS = Math.round(SMVM.mensual * 2 * 100) / 100;
const MINIMA_CON_BONO = totalMinimaConBono();
const LETRA_CHICA = prestacionPorClave("madre7hijos").letraChica ?? [];

export const metadata: Metadata = {
  title: `Pensión no contributiva ${MES}: cuánto se cobra y quién puede pedirla`,
  description: `En ${MES} la pensión por discapacidad y la pensión a la vejez pagan ${formatARS(DISCAPACIDAD.total, 0)} con el bono, y la de madres de 7 hijos ${formatARS(MADRE7.total, 0)}. Ninguno es un monto propio: son el 70% y el 100% del haber mínimo. Además, desde la Ley 27.793 se puede trabajar cobrando la pensión hasta ${formatARS(TOPE_INGRESOS, 0)} de ingresos.`,
  alternates: { canonical: "/pension-no-contributiva" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Pensiones no contributivas · ${MES}`)}&s=${encodeURIComponent("Cuánto paga cada una y hasta cuánto podés trabajar")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto cobra una pensión no contributiva en ${MES}?`,
    a: `Depende de cuál sea. La Pensión no Contributiva por Discapacidad para Protección Social y la pensión a la vejez pagan el 70% del haber mínimo, o sea ${formatARS(DISCAPACIDAD.haber, 2)}, y con el bono extraordinario de ${formatARS(BONO_VIGENTE.monto, 0)} llegan a ${formatARS(DISCAPACIDAD.total, 2)}. La pensión vitalicia para madres de 7 hijos o más equivale al 100% del haber mínimo: ${formatARS(MADRE7.haber, 2)}, y ${formatARS(MADRE7.total, 2)} con el bono. La PUAM es el 80%.`,
  },
  {
    q: "¿Por qué el monto cambia todos los meses sin que salga una resolución de pensiones?",
    a: `Porque ninguno de estos importes existe como número propio: los cuatro son una proporción del haber mínimo garantizado del SIPA, que sube todos los meses por la movilidad del Decreto 274/2024. Cuando ANSES dicta la resolución del haber mínimo —en ${MES}, la ${V.resolucion}— las pensiones no contributivas se mueven solas, en el mismo porcentaje. Por eso una nota que publica «la pensión es $X» queda vieja a los treinta días, y una página que publica la regla no.`,
  },
  {
    q: "¿Puedo trabajar y seguir cobrando la pensión por discapacidad?",
    a: `Sí, y es el cambio más grande de los últimos años. El artículo 7 de la Ley 27.793 dispone que se mantiene el cobro mientras los ingresos por el vínculo laboral o por el monotributo no superen los dos salarios mínimos vitales y móviles. En ${MES}, con un SMVM de ${formatARS(SMVM.mensual, 0)}, ese tope es ${formatARS(TOPE_INGRESOS, 0)}. Si se supera, la pensión se suspende automáticamente mientras dure esa situación; cuando los ingresos vuelven a estar por debajo, se puede pedir la rehabilitación inmediata. Antes de esa ley, cualquier trabajo registrado daba de baja el beneficio.`,
  },
  {
    q: "¿La pensión por invalidez sigue existiendo?",
    a: "Cambió de nombre y de encuadre. El artículo 5 de la Ley 27.793 sustituyó el artículo 9 de la Ley 13.478 y creó la Pensión no Contributiva por Discapacidad para Protección Social, que exige el Certificado Único de Discapacidad (CUD). Las pensiones otorgadas antes se convierten de oficio, sin que el titular tenga que pedirlo (art. 9 de la ley y art. 9 del Anexo I del Decreto 84/2026). La pensión no contributiva por invalidez laboral, la que se tramita ante la Agencia Nacional de Discapacidad con Certificado Médico Oficial, sigue rigiéndose por el Decreto 432/97.",
  },
  {
    q: "¿Cuánta incapacidad hace falta para la pensión por invalidez laboral?",
    a: `El 66%, no el 76%. El Decreto 843/2024 (B.O. 23/9/2024) sustituyó las normas de invalidez laboral del Decreto 432/97 y bajó el umbral: se presume que la incapacidad es total cuando produce una disminución del ${formatPct(INCAPACIDAD_MINIMA_INVALIDEZ_LABORAL * 100, 0)} o más en la capacidad laborativa. Buena parte de las páginas que circulan sigue publicando el 76%, que era el número anterior. El mismo decreto bajó la residencia exigida a extranjeros a 10 años y a 3 años para argentinos naturalizados.`,
  },
  {
    q: "¿Se puede cobrar una pensión no contributiva y una jubilación a la vez?",
    a: "No. Las cuatro prestaciones exigen no estar amparado por un régimen de previsión, retiro o pensión, sea contributivo o no contributivo. Es el requisito que aparece en todas: artículo 6 inciso f de la Ley 27.793, punto 1 inciso f del Anexo I del Decreto 432/97, artículo 2 inciso a de la Ley 23.746 y artículo 13 de la Ley 27.260 para la PUAM. Percibir dos al mismo tiempo hace caducar la pensión y da lugar al reclamo de lo cobrado de más.",
  },
  {
    q: "¿El bono extraordinario alcanza a las pensiones no contributivas?",
    a: `Sí, y en el texto del decreto, no por interpretación: el artículo 2 inciso c del ${BONO_VIGENTE.norma} incluye expresamente a las personas beneficiarias de pensiones no contributivas por vejez, invalidez, madres de siete hijos o más y demás pensiones no contributivas, además de la PUAM. Como todas cobran por debajo del haber mínimo, les corresponde el bono completo de ${formatARS(BONO_VIGENTE.monto, 0)}. El bono es discrecional: lo fija un decreto mes a mes y puede no existir.`,
  },
  {
    q: "¿Quién otorga cada pensión y quién la paga?",
    a: "No son el mismo organismo, y esa confusión hace perder tiempo en ventanillas. La pensión por discapacidad la otorga la Agencia Nacional de Discapacidad; la pensión a la vejez y la de madres de 7 hijos, el Ministerio de Capital Humano. La liquidación y el pago de todas están a cargo de ANSES (artículo 5 del Anexo II del Decreto 84/2026). La PUAM es la excepción: la otorga y la paga ANSES.",
  },
  {
    q: "¿Qué diferencia hay entre la PUAM y la pensión a la vejez?",
    a: "La edad y el porcentaje, sobre todo. La PUAM se pide a los 65 años y paga el 80% del haber mínimo; la pensión no contributiva a la vejez se pide a los 70 y paga el 70%, y exige acreditar que no se poseen bienes, ingresos ni recursos que permitan la subsistencia, con encuesta socioeconómica en el domicilio. Ojo con un dato que circula desactualizado: la PUAM tampoco es automática por la edad. Desde 2018, el último párrafo del artículo 13 —incorporado por la Ley 27.467— manda a ANSES a hacer evaluaciones socioeconómicas y patrimoniales antes de otorgarla, y su artículo 38 la volvió incompatible con trabajar. Para la mayoría de quienes tienen 65 o más y no llegan a los 30 años de aportes, la PUAM sigue siendo el camino.",
  },
  {
    q: "¿Se puede pasar de la pensión a la vejez a la PUAM?",
    a: `Sí, y conviene mirarlo con números: la pensión a la vejez paga el 70% del haber mínimo y la PUAM el 80%, o sea ${formatARS(V.haberMinimo * 0.1, 2)} más por mes en ${MES} (el bono es el mismo para las dos, así que la diferencia del depósito es exactamente la del haber). El penúltimo párrafo del artículo 13 de la Ley 27.260 permite esa opción de forma expresa, con una condición: cumplir la TOTALIDAD de los requisitos de la PUAM, que no son los de la pensión a la vejez —la residencia exigida es distinta y la PUAM es incompatible con trabajar—. El detalle completo está en la página de la PUAM.`,
  },
  {
    q: "¿Puedo viajar o irme del país cobrando la pensión de madre de 7 hijos?",
    a: "Hasta 60 días por año calendario. El artículo 12 inciso d del Decreto 2360/90 extingue el derecho por «ausencia definitiva del país», y define ausencia definitiva como la que excede los 60 días continuos o discontinuos en cada año calendario: se suman todas las salidas del año, no es el largo de un viaje. La Subsecretaría de Seguridad Social puede autorizar o justificar ausencias mayores por resolución fundada, en casos particulares y con motivos atendibles. Ojo con mezclar prestaciones: en la PUAM el plazo equivalente es de 90 días, no de 60.",
  },
  {
    q: "¿La pensión de madre de 7 hijos se cobra retroactiva desde que la pedí?",
    a: "Para la titular, no: el artículo 10 inciso a del Decreto 2360/90 dice que la pensión se abona a partir del primer día del mes siguiente al que se dicte el acto que la otorga. El trámite puede demorar meses y esos meses no se pagan hacia atrás. Sí hay retroactivo en la pensión derivada del artículo 3 —la que cobran el viudo o los hijos cuando fallece la beneficiaria—: se paga desde el día siguiente a la muerte si se solicita dentro de los 3 meses; pasado ese plazo, desde el primer día del mes siguiente a la solicitud.",
  },
  {
    q: "Si fallece la madre, ¿la pensión de 7 hijos se pierde?",
    a: "No necesariamente, aunque se la llame «vitalicia». El artículo 3 del Decreto 2360/90 le da derecho a pensión al viudo incapacitado para el trabajo y que estaba a cargo de la causante, en concurrencia con los hijos menores de 18 años —sin límite de edad si están incapacitados para el trabajo y a cargo—. La mitad del haber va al viudo y la otra mitad se reparte en partes iguales entre los hijos; si no hay hijos, el viudo cobra el total. No tiene derecho el cónyuge que estaba divorciado o separado, legalmente o de hecho, por su culpa o culpa de ambos (art. 4).",
  },
  {
    q: "¿Qué residencia piden para la pensión de madre de 7 hijos?",
    a: "Es de los requisitos más buscados y no está en la Ley 23.746 sino en su reglamento. El artículo 2 del Decreto 2360/90 pide, a las argentinas o naturalizadas, 1 año de residencia continuada inmediatamente anterior al pedido de la pensión (inciso b), y a las extranjeras, 15 años continuados inmediatamente anteriores, acreditados con documento público que muestre un período cierto de permanencia (inciso c). Son plazos distintos de los de la pensión a la vejez y de los de la PUAM: cada prestación tiene el suyo.",
  },
  {
    q: "¿Lo que dice esta página es lo que me va a depositar ANSES?",
    a: "Los montos sí: son la aplicación directa de los porcentajes legales al haber mínimo vigente, y se cruzan contra lo que publica ANSES. Lo que esta página no puede decirte es si te van a otorgar el beneficio: eso depende del Certificado Único de Discapacidad, de la evaluación socioeconómica y de las auditorías del organismo, que se resuelven caso por caso.",
  },
];

export default function PensionNoContributivaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de pensiones no contributivas (PNC)",
        url: "https://calcular.ar/pension-no-contributiva",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `Montos de las pensiones no contributivas — ${MES}`,
        descripcion: `Haber y total con bono de las cuatro prestaciones no contributivas en ${MES}, derivados del haber mínimo garantizado del SIPA (${formatARS(V.haberMinimo, 2)}): pensión por discapacidad y pensión a la vejez al 70% (${formatARS(DISCAPACIDAD.total, 2)} con bono), pensión para madres de 7 hijos al 100% (${formatARS(MADRE7.total, 2)}) y PUAM al 80%. Incluye el tope de ingresos compatible con el trabajo, equivalente a dos salarios mínimos (${formatARS(TOPE_INGRESOS, 0)}).`,
        url: "/pension-no-contributiva",
        modificado: `${V.periodo}-01`,
        fuenteNombre: V.resolucion,
        fuenteUrl: V.resolucionUrl,
      }),
      articleSchema({
        titulo: `Pensión no contributiva ${MES}: cuánto se cobra y quién puede pedirla`,
        descripcion:
          "Montos de las pensiones no contributivas derivados del haber mínimo, requisitos vigentes tras la Ley 27.793 y el Decreto 84/2026, y el tope de ingresos compatible con el trabajo.",
        url: "/pension-no-contributiva",
        modificado: PNC_FUENTES.consultadoEl,
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
          Pensiones no contributivas: cuánto se cobra y hasta cuánto podés trabajar
        </h1>
        <p className="text-zinc-600">
          Las notas publican el monto del mes y quedan viejas a los treinta días. Acá está la regla
          que lo genera —cada pensión es un porcentaje del haber mínimo— y el dato que casi nadie
          actualizó: desde la Ley 27.793 se puede trabajar registrado y seguir cobrando la pensión
          por discapacidad, hasta un tope que también se mueve todos los meses.
        </p>
      </header>

      <RespuestaPrimero actualizado={PNC_FUENTES.consultadoEl}>
        <p>
          En {MES}, la <strong>pensión por discapacidad</strong> y la{" "}
          <strong>pensión a la vejez</strong> pagan {formatARS(DISCAPACIDAD.haber, 2)} —el 70% del
          haber mínimo— y con el bono de {formatARS(BONO_VIGENTE.monto, 0)} llegan a{" "}
          <strong>{formatARS(DISCAPACIDAD.total, 2)}</strong>. La pensión para{" "}
          <strong>madres de 7 hijos</strong> equivale al 100% del haber mínimo:{" "}
          <strong>{formatARS(MADRE7.total, 2)}</strong> con el bono. Ninguno de esos importes tiene
          resolución propia: se derivan del haber mínimo de la {V.resolucion} y suben con él todos
          los meses. Y la pensión por discapacidad es <strong>compatible con el trabajo</strong>{" "}
          mientras los ingresos netos no lleguen a dos salarios mínimos, hoy{" "}
          <strong>{formatARS(TOPE_INGRESOS, 0)}</strong> (art. 7 de la Ley 27.793).
        </p>
      </RespuestaPrimero>

      <CalculadoraPnc />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las cuatro prestaciones, en {MES}
        </h2>
        <p className="text-zinc-600">
          Todas salen del mismo número: el haber mínimo garantizado de{" "}
          {formatARS(V.haberMinimo, 2)} que fijó la {V.resolucion}. Cambia la proporción.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Prestación</th>
                  <th className="px-4 py-2.5 text-right font-semibold">% de la mínima</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Haber</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Con bono</th>
                </tr>
              </thead>
              <tbody>
                {MONTOS.map((m) => (
                  <tr key={m.prestacion.clave} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-700">
                      {m.prestacion.nombre}
                      <span className="block text-xs text-zinc-400">{m.prestacion.norma}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {formatPct(m.prestacion.proporcionHaberMinimo * 100, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(m.haber, 2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(m.total, 2)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-zinc-200 bg-zinc-50">
                  <td className="px-4 py-2.5 text-zinc-700" colSpan={2}>
                    Para comparar: un jubilado que cobra la mínima
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(V.haberMinimo, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(MINIMA_CON_BONO, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Detalle que no aparece en ningún lado: el bono <em>no</em> es proporcional. Son los mismos{" "}
          {formatARS(BONO_VIGENTE.monto, 0)} para todos, así que achica la brecha. La pensión del
          70% termina cobrando el{" "}
          {formatPct(DISCAPACIDAD.proporcionSobreMinimaConBono * 100, 1)} de lo que cobra un
          jubilado de la mínima, no el 70%. El mes que no haya decreto de bono, la brecha vuelve a
          abrirse de golpe.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Trabajar sin perder la pensión: el tope se mueve con el salario mínimo
        </h2>
        <p className="text-zinc-600">
          Hasta la Ley 27.793, tener un vínculo laboral formal daba de baja la pensión por
          invalidez. Hoy el artículo 7 dice lo contrario: se mantiene el cobro mientras los ingresos
          no superen dos salarios mínimos vitales y móviles. Como el{" "}
          <Link href="/salario-minimo" className="text-emerald-700 hover:underline">
            SMVM
          </Link>{" "}
          cambia casi todos los meses, el tope también.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Concepto</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                  <th className="px-4 py-2.5 text-right font-semibold">En {MES}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Salario mínimo vital y móvil</td>
                  <td className="px-4 py-2.5 text-zinc-500">Res. CNEPySMVM 4/2026</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(SMVM.mensual, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    Tope de ingresos compatible (2 SMVM)
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">Ley 27.793, art. 7</td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(TOPE_INGRESOS, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Ingreso total posible (tope + pensión con bono)
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">derivado</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(TOPE_INGRESOS + DISCAPACIDAD.total, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Superar el tope <strong>no</strong> es perder la pensión: el artículo 7 habla de{" "}
          <em>suspensión automática</em> mientras dure esa situación, y de rehabilitación inmediata
          cuando los ingresos vuelven a bajar. Sí hay una obligación concreta: comunicar cualquier
          cambio en la situación económica dentro de los 15 días hábiles (art. 3 inc. b del Anexo II
          del Decreto 84/2026); no hacerlo deja al titular respondiendo por lo cobrado de más.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué pide cada una</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {MONTOS.map((m) => (
            <div
              key={m.prestacion.clave}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-zinc-900">{m.prestacion.nombre}</h3>
              <p className="mt-0.5 text-xs text-zinc-500">
                Otorga: {m.prestacion.otorga} · Paga: {m.prestacion.paga}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
                {m.prestacion.requisitos.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Si tenés 65 años o más y no llegás a los 30 años de aportes, la{" "}
          <Link href="/puam" className="font-medium text-emerald-700 hover:underline">
            PUAM tiene su propia página
          </Link>{" "}
          con los requisitos completos y la letra chica (no genera pensión para el cónyuge y es
          incompatible con trabajar). Mirá también cuánto te quedaría de{" "}
          <Link href="/jubilacion" className="font-medium text-emerald-700 hover:underline">
            jubilación y del bono
          </Link>{" "}
          — y si tenés hijos a cargo, las{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            asignaciones familiares
          </Link>{" "}
          que se cobran junto con la pensión.
        </p>
      </section>

      {LETRA_CHICA.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">
            La letra chica de la pensión para madres de 7 hijos
          </h2>
          <p className="text-sm text-zinc-600">
            Todas las notas citan la Ley 23.746, que tiene dos artículos de requisitos y nada más.
            Lo que decide si la pensión se mantiene o se pierde está en su reglamento, el{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/4818/texact.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 hover:underline"
            >
              Decreto 2360/90
            </a>
            , que casi nadie publica.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {LETRA_CHICA.map((l) => (
              <div
                key={l.titulo}
                className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 shadow-sm"
              >
                <h3 className="font-semibold text-zinc-900">{l.titulo}</h3>
                <p className="mt-2 text-sm text-zinc-600">{l.detalle}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PNC_FUENTES.lista.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG. No
          otorga ni liquida beneficios: el alta depende del Certificado Único de Discapacidad, de la
          evaluación socioeconómica y de las auditorías del organismo. Consultada el{" "}
          {PNC_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
