import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPuam } from "@/components/CalculadoraPuam";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { PUAM, PUAM_CARACTERES, PUAM_FUENTES, PUAM_REQUISITOS } from "@/data/puam";
import { BONO_VIGENTE, PRESTACIONES_VIGENTES as V } from "@/data/prestaciones";
import { compararConMinima, compararConVejez, montoPuam, topeEmbargoAlimentos } from "@/lib/puam";
import { formatARS, formatPct } from "@/lib/formato";

const MES = V.vigencia;
const M = montoPuam();
const COMP = compararConMinima();
const VEJEZ = compararConVejez();
const EMBARGO = topeEmbargoAlimentos();

export const metadata: Metadata = {
  title: `PUAM ${MES}: cuánto se cobra, quién puede pedirla y la letra chica`,
  description: `En ${MES} la PUAM paga ${formatARS(M.haber, 0)} de haber y ${formatARS(M.total, 0)} con el bono. No es un monto propio: es el 80% del haber mínimo. Y tres cosas que casi nadie publica: desde 2018 es incompatible con trabajar, no genera pensión para el cónyuge, y ANSES hace evaluación socioeconómica antes de otorgarla.`,
  alternates: { canonical: "/puam" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`PUAM · ${MES}`)}&s=${encodeURIComponent("Cuánto se cobra, quién califica y la letra chica")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto cobra la PUAM en ${MES}?`,
    a: `El haber es ${formatARS(M.haber, 2)} y con el bono extraordinario de ${formatARS(BONO_VIGENTE.monto, 0)} del ${BONO_VIGENTE.norma} se depositan ${formatARS(M.total, 2)}. Ese haber no sale de una resolución propia de la PUAM: el artículo 14 de la Ley 27.260 dice que equivale al 80% del haber mínimo garantizado, que en ${MES} es ${formatARS(V.haberMinimo, 2)} por la ${V.resolucion}. Por eso sube todos los meses junto con las jubilaciones, sin que se anuncie un aumento de la PUAM.`,
  },
  {
    q: "¿Puedo viajar al exterior cobrando la PUAM?",
    a: `Sí, pero hay un plazo y no está en la ley. El artículo 13 inciso 5 de la Ley 27.260 sólo dice «mantener la residencia en el país», que suena a algo sin borde. La cartilla oficial de ANSES le pone el número: se considera que NO se cumple el requisito de residencia cuando la persona se ausenta del territorio argentino por un período superior a ${PUAM.diasAusenciaQuePierdenLaResidencia} días corridos, y cita la Resolución ANSES 918/24. O sea que un viaje de tres meses y pico a visitar a los hijos que emigraron puede costar el beneficio. Es exactamente la clase de requisito que no aparece en ninguna nota que copie sólo el texto de la ley, porque no está ahí: está en el material del organismo.`,
  },
  {
    q: "¿Le queda algo a la familia cuando fallece el titular?",
    a: "La PUAM es personalísima y no genera derecho a pensión: el cónyuge o conviviente no hereda el beneficio, y esa es su diferencia más cara frente a una jubilación. Pero no queda nada en cero: la cartilla oficial de ANSES aclara que el fallecimiento del titular sí da derecho al Subsidio de Contención Familiar, el subsidio de sepelio del organismo. Es poco al lado de una pensión derivada, y conviene saber que existe justamente porque casi nadie lo publica junto con la PUAM.",
  },
  {
    q: "¿Se puede trabajar cobrando la PUAM?",
    a: "No, y es el punto donde más se equivoca lo que circula por internet. El texto ORIGINAL del artículo 16 de la Ley 27.260, en 2016, decía que el goce de la PUAM era compatible con cualquier actividad en relación de dependencia o por cuenta propia. El artículo 38 de la Ley 27.467 (B.O. 4/12/2018) lo sustituyó por el texto contrario: hoy es incompatible. La única excepción que dejó escrita son los monotributistas adheridos al Régimen Simplificado que estén inscriptos en el Registro Nacional de Efectores de Desarrollo Local y Economía Social. Muchas páginas siguen citando el texto de 2016.",
  },
  {
    q: "Si fallece el titular, ¿el cónyuge sigue cobrando la PUAM?",
    a: "No. El artículo 15 inciso a de la Ley 27.260 dice que la prestación es personalísima y no genera derecho a pensión. Es la diferencia más cara con una jubilación: la jubilación deja pensión derivada para el cónyuge o conviviente; la PUAM se extingue con el titular. Conviene tenerlo en cuenta al comparar la PUAM con seguir buscando el camino a una jubilación.",
  },
  {
    q: "¿La PUAM se otorga solo con la edad?",
    a: "Ya no. Hasta 2018 esa era la lectura razonable del artículo 13. El artículo 37 de la Ley 27.467 le incorporó un último párrafo que manda a ANSES a realizar, en forma previa al otorgamiento, evaluaciones socioeconómicas y patrimoniales sobre la base de criterios objetivos, para asegurar el acceso de quienes presenten mayor vulnerabilidad. Los requisitos con número (65 años, residencia, no tener otro beneficio, no trabajar) siguen siendo los del artículo 13, pero no alcanzan por sí solos.",
  },
  {
    q: "¿Qué diferencia hay entre la PUAM y la pensión no contributiva a la vejez?",
    a: `Tres cosas: la edad, el porcentaje y el trámite. La PUAM se pide a los ${PUAM.edadMinima} años y paga el 80% del haber mínimo; la pensión no contributiva a la vejez se pide a los 70 y paga el 70%. En ${MES} esa diferencia son ${formatARS(VEJEZ.diferenciaMensual, 2)} por mes —el bono es el mismo para las dos, así que la brecha es exactamente la del haber—, o sea ${formatARS(VEJEZ.diferenciaAnual, 0)} en un año. El penúltimo párrafo del artículo 13 permite expresamente que quien cobra la pensión a la vejez opte por la PUAM, siempre que cumpla la totalidad de los requisitos de esta última, que no son los mismos.`,
  },
  {
    q: "¿La PUAM da PAMI y asignaciones familiares?",
    a: "Sí, y por la ley, no por un trámite aparte. El artículo 17 de la Ley 27.260 le da a los titulares derecho a las prestaciones del INSSJP (PAMI), y establece que por cada beneficiario el Tesoro ingresa al Instituto lo mismo que aportaría un jubilado de la mínima. El artículo 18 sustituyó el inciso b del artículo 1 de la Ley 24.714 para incluir a la PUAM en el subsistema no contributivo de asignaciones familiares.",
  },
  {
    q: "¿Se puede embargar la PUAM?",
    a: `Casi no. El artículo 15 inciso d la declara inembargable, con una sola excepción: las cuotas por alimentos, y hasta el 20% del haber mensual. Sobre el haber de ${MES}, ese tope son ${formatARS(EMBARGO, 2)}. Tampoco puede enajenarse ni afectarse a terceros por ningún otro derecho (inciso c).`,
  },
  {
    q: "¿Cuántos años de aportes hacen falta para la PUAM?",
    a: `Ninguno. Es una prestación no contributiva: no se pide historia laboral ni moratoria. Ese es su sentido —cubrir a quien llega a los ${PUAM.edadMinima} años sin los 30 años de aportes que exige la jubilación ordinaria—. El costo de esa puerta abierta es el que está en la letra chica: se cobra el 80% en vez del 100% de la mínima, no deja pensión para el cónyuge y no se puede trabajar en blanco.`,
  },
  {
    q: "¿Por qué el monto de la PUAM cambia todos los meses?",
    a: `Porque se mueve con el haber mínimo, y el haber mínimo se actualiza mensualmente por la movilidad del Decreto 274/2024: el IPC de dos meses antes. En ${MES} la movilidad fue del ${formatPct(V.movilidad, 2)}. El artículo 14 de la Ley 27.260 ata la PUAM a ese mismo mecanismo (artículo 32 de la Ley 24.241), así que no existe una "resolución de aumento de la PUAM" separada: cuando aumenta la mínima, aumenta la PUAM en el mismo porcentaje.`,
  },
  {
    q: "¿El bono extraordinario le corresponde a la PUAM?",
    a: `Sí en ${MES}: el ${BONO_VIGENTE.norma} la alcanza y, como el haber está por debajo del mínimo, le toca el bono completo de ${formatARS(BONO_VIGENTE.monto, 0)}. Pero el bono es discrecional: lo fija un decreto mes a mes y puede no salir. El mes que no haya decreto, lo que se cobra es solamente el haber, y la brecha con un jubilado de la mínima se abre de golpe.`,
  },
];

export default function PuamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de la PUAM (Pensión Universal para el Adulto Mayor)",
        url: "https://calcular.ar/puam",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `PUAM — monto y requisitos vigentes en ${MES}`,
        descripcion: `Haber de la Pensión Universal para el Adulto Mayor en ${MES}: ${formatARS(M.haber, 2)}, equivalente al 80% del haber mínimo garantizado (${formatARS(V.haberMinimo, 2)}, ${V.resolucion}), y ${formatARS(M.total, 2)} con el bono de ${formatARS(BONO_VIGENTE.monto, 0)} del ${BONO_VIGENTE.norma}. Incluye los requisitos del art. 13 de la Ley 27.260, la incompatibilidad con el trabajo del art. 16 (sustituido por la Ley 27.467) y la comparación en pesos contra la jubilación mínima y la pensión no contributiva a la vejez.`,
        url: "/puam",
        modificado: `${V.periodo}-01`,
        fuenteNombre: V.resolucion,
        fuenteUrl: V.resolucionUrl,
      }),
      articleSchema({
        titulo: `PUAM ${MES}: cuánto se cobra, quién puede pedirla y la letra chica`,
        descripcion:
          "Monto de la PUAM derivado del haber mínimo, requisitos del art. 13 de la Ley 27.260 y los tres puntos que la mayoría de las publicaciones tiene al revés porque cita el texto de 2016.",
        url: "/puam",
        modificado: PUAM_FUENTES.consultadoEl,
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

  const aFavor = PUAM_CARACTERES.filter((c) => c.signo === "a favor");
  const enContra = PUAM_CARACTERES.filter((c) => c.signo === "en contra");

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          PUAM: cuánto se cobra, quién califica y la letra chica que casi nadie publica
        </h1>
        <p className="text-zinc-600">
          La Pensión Universal para el Adulto Mayor es la puerta de salida para quien llega a los{" "}
          {PUAM.edadMinima} sin los 30 años de aportes. Las notas publican el monto del mes y quedan
          viejas a los treinta días. Acá está la regla que lo genera —el 80% del haber mínimo— y las
          tres condiciones que la mayoría de las páginas tiene al revés, porque siguen citando el
          texto de la ley de 2016 y no el que rige desde 2018.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUAM_FUENTES.consultadoEl}>
        <p>
          En {MES} la PUAM paga un haber de <strong>{formatARS(M.haber, 2)}</strong> —el 80% del
          haber mínimo de {formatARS(V.haberMinimo, 2)} que fijó la {V.resolucion}— y con el bono de{" "}
          {formatARS(BONO_VIGENTE.monto, 0)} se depositan <strong>{formatARS(M.total, 2)}</strong>.
          Se pide desde los {PUAM.edadMinima} años y <strong>no exige ningún año de aportes</strong>
          . A cambio: desde 2018 es <strong>incompatible con trabajar</strong> (art. 16, sustituido
          por la Ley 27.467), <strong>no genera pensión</strong> para el cónyuge (art. 15 inc. a) y
          ANSES hace una <strong>evaluación socioeconómica y patrimonial</strong> antes de otorgarla
          (art. 13, último párrafo).
        </p>
      </RespuestaPrimero>

      <CalculadoraPuam />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El número real: cuánto es la brecha con un jubilado de la mínima
        </h2>
        <p className="text-zinc-600">
          Se repite que la PUAM «es el 80%». Es cierto del haber, y solo del haber. Como el bono
          extraordinario es el <em>mismo</em> monto para todos, sobre lo que efectivamente se
          deposita la proporción es otra.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Concepto</th>
                  <th className="px-4 py-2.5 text-right font-semibold">PUAM</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Jubilación mínima</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Diferencia</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Haber del mes</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(M.haber, 2)}</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(COMP.haberMinima, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-600">
                    {formatARS(COMP.brechaHaber, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Bono ({BONO_VIGENTE.norma})</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(M.bono, 0)}</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(BONO_VIGENTE.monto, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-600">—</td>
                </tr>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">Lo que se deposita</td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(M.total, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(COMP.totalMinima, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-700">
                    {formatARS(COMP.brechaTotal, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Proporción</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatPct(COMP.proporcionTotal * 100, 1)} del total
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-500">100%</td>
                  <td className="px-4 py-2.5 text-right text-zinc-500">
                    no {formatPct(COMP.proporcionHaber * 100, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          El bono achica la brecha, pero es discrecional: lo fija un decreto mes a mes. El mes que no
          salga, la proporción vuelve al {formatPct(COMP.proporcionHaber * 100, 0)} seco y la
          diferencia pasa a ser {formatARS(COMP.brechaHaber, 2)}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Si cobrás la pensión a la vejez, la PUAM paga {formatARS(VEJEZ.diferenciaMensual, 0)} más
          por mes
        </h2>
        <p className="text-zinc-600">
          Es la cuenta que no aparece en ningún lado. La pensión no contributiva a la vejez paga el
          70% del haber mínimo; la PUAM, el 80%. Son diez puntos del mismo número. Y el bono es
          idéntico en las dos, así que la diferencia del depósito es exactamente la del haber.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">En {MES}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Haber</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Con bono</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Pensión no contributiva a la vejez (70%, desde los 70 años)
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(VEJEZ.haberVejez, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(VEJEZ.totalVejez, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    PUAM (80%, desde los {PUAM.edadMinima})
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(M.haber, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(M.total, 2)}
                  </td>
                </tr>
                <tr className="border-t-2 border-zinc-200 bg-zinc-50">
                  <td className="px-4 py-2.5 text-zinc-700">Diferencia por mes · por año</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(VEJEZ.diferenciaMensual, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(VEJEZ.diferenciaAnual, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          El penúltimo párrafo del art. 13 permite esa opción de forma expresa. La condición está en
          la misma frase: hay que cumplir <strong>la totalidad</strong> de los requisitos de la
          PUAM, que no son los de la pensión a la vejez —la residencia exigida es distinta y la
          incompatibilidad con el trabajo también—. Antes de pedir el cambio conviene revisar los
          dos pliegos de requisitos, no solo el monto. Comparalo también con la{" "}
          <Link
            href="/pension-no-contributiva"
            className="font-medium text-emerald-700 hover:underline"
          >
            tabla de las cuatro pensiones no contributivas
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué pide el artículo 13</h2>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <ul className="space-y-3 text-sm text-zinc-600">
            {PUAM_REQUISITOS.map((r) => (
              <li key={r.norma + r.texto.slice(0, 20)} className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                <span>
                  {r.texto} <span className="text-zinc-400">({r.norma})</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La letra chica, en las dos direcciones</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <h3 className="font-semibold text-rose-900">Lo que se pierde</h3>
            <ul className="mt-3 space-y-3 text-sm text-rose-900/90">
              {enContra.map((c) => (
                <li key={c.norma}>
                  {c.texto} <span className="text-rose-700/70">({c.norma})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
            <h3 className="font-semibold text-emerald-900">Lo que sí garantiza</h3>
            <ul className="mt-3 space-y-3 text-sm text-emerald-900/90">
              {aFavor.map((c) => (
                <li key={c.norma}>
                  {c.texto} <span className="text-emerald-700/70">({c.norma})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Si estás decidiendo entre esperar la PUAM o buscar la jubilación, mirá también cuánto te
          quedaría de{" "}
          <Link href="/jubilacion" className="font-medium text-emerald-700 hover:underline">
            jubilación con tu haber y el bono
          </Link>
          . Y si el monto no alcanza para el hogar, la{" "}
          <Link href="/canasta-basica" className="font-medium text-emerald-700 hover:underline">
            canasta básica del INDEC
          </Link>{" "}
          dice cuánto necesita esa casa para no ser pobre.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PUAM_FUENTES.lista.map((f) => (
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
          Esta página es informativa y aplica el texto ACTUALIZADO de la Ley 27.260 publicado en
          InfoLEG, más las normas del Boletín Oficial que fijan el haber mínimo y el bono del mes.
          No otorga ni liquida beneficios: el alta depende de la evaluación socioeconómica y
          patrimonial de ANSES. Texto legal consultado el {PUAM_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
