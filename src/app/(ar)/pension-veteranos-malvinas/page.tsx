import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraVeteranos } from "@/components/CalculadoraVeteranos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import {
  COMPATIBILIDADES,
  HABERES_MINIMOS_TITULAR,
  TITULARES,
  VETERANOS_FUENTES,
  VETERANOS_TEXTOS,
} from "@/data/veteranos-malvinas";
import { PRESTACIONES_VIGENTES } from "@/data/prestaciones";
import { etiquetaPeriodo } from "@/lib/jubilacion";
import { montoTitular, serieMontos } from "@/lib/veteranos-malvinas";
import { formatARS } from "@/lib/formato";

const PERIODO = PRESTACIONES_VIGENTES.periodo;
const MES = etiquetaPeriodo(PERIODO);
const MINIMO = PRESTACIONES_VIGENTES.haberMinimo;
const MONTO = montoTitular(PERIODO);

const SERIE = serieMontos();
const ULTIMOS = SERIE.slice(-7).reverse();

export const metadata: Metadata = {
  title: `Pensión veteranos de Malvinas ${MES}: ${formatARS(MONTO, 0)}`,
  description:
    "La pensión honorífica de veteranos de Malvinas equivale a tres haberes mínimos (Decreto 1357/2004) y se cobra además de cualquier jubilación.",
  alternates: { canonical: "/pension-veteranos-malvinas" },
  openGraph: {
    ...openGraphDe({
      ruta: "/pension-veteranos-malvinas",
      titulo: `Pensión de Veteranos de Malvinas · ${MES}`,
      bajada: `${formatARS(MONTO, 0)}: tres haberes mínimos`,
    }),
    title: `Pensión de Veteranos de Malvinas: ${formatARS(MONTO, 0)} en ${MES}`,
    description: `Tres veces el haber mínimo (Dec. 1357/2004). Se cobra junto con cualquier jubilación o retiro, y la pensión de la familia es el 100% del beneficio del veterano.`,
  },
};

const faqs = [
  {
    q: `¿Cuánto cobra un veterano de Malvinas en ${MES}?`,
    a: `${formatARS(MONTO, 0)} por mes. ANSES no publica ese número. El artículo 2º del Decreto 1357/2004 fija la pensión en tres veces el haber mínimo jubilatorio, y el haber mínimo de ${MES} es ${formatARS(MINIMO, 0)}. Por eso la resolución mensual de ANSES (la del haber mínimo, el máximo, las bases imponibles, la PBU y la PUAM) ni nombra a esta pensión: el monto no se publica, se calcula. Además, el titular cobra las asignaciones familiares que le toquen, con los mismos requisitos y derechos que cualquier jubilado.`,
  },
  {
    q: "¿Se puede cobrar junto con una jubilación?",
    a: "Sí, las dos completas, y no hay que elegir. El artículo 3º del Decreto 1357/2004 (con el texto que le dio el artículo 2º del Decreto 886/2005) dice que se puede cobrar junto con cualquier jubilación, pensión o retiro nacional, provincial o municipal, con otro ingreso, con el subsidio extraordinario de la Ley 22.674 y con las pensiones graciables vitalicias de las Leyes 23.598 y 24.310. Ojo con el cambio: el texto original de 2004 dejaba afuera las prestaciones y subsidios no contributivos nacionales, y el decreto de 2005 sacó esa excepción.",
  },
  {
    q: "¿Puedo seguir trabajando?",
    a: "Sí. La misma norma dice que es compatible con «la percepción de otro ingreso», sin tope ni condiciones. Es una diferencia grande con otras pensiones no contributivas, donde lo que ganás trabajando sí tiene límite.",
  },
  {
    q: "Si el veterano falleció, ¿cuánto cobran los familiares?",
    a: `El 100% del beneficio del veterano, no el 70% del régimen general. El artículo 7º del Decreto 1357/2004 lo dice tal cual: las pensiones de la familia «serán fijadas en el CIEN POR CIEN (100%) del beneficio del causante». O sea, la familia sigue cobrando los ${formatARS(MONTO, 0)} enteros y se los reparte. Si no hay hijos con derecho, 100% para la viuda, el viudo o la pareja conviviente. Si hay hijos, 50% para la pareja y 50% entre los hijos. Si no hay pareja, 100% entre los hijos en partes iguales. Si después alguno pierde el derecho, se recalcula lo de los demás sin esa persona.`,
  },
  {
    q: "¿Quiénes son los derechohabientes?",
    a: "Los que nombra el artículo 53 de la Ley 24.241. Si no hay ninguno, tienen derecho los padres que no pueden trabajar y estaban a cargo del veterano cuando murió, siempre que no cobren otra jubilación, pensión, retiro o prestación no contributiva (salvo que elijan esta pensión). Y hay una excepción que casi nadie publica: los padres de los veteranos muertos en combate cobran con solo demostrar el vínculo, sin probar que no pueden trabajar ni que estaban a cargo.",
  },
  {
    q: "¿Alcanza sólo a los ex soldados conscriptos?",
    a: "No. Alcanza a los ex soldados conscriptos que estuvieron en el Teatro de Operaciones Malvinas o que combatieron en el Teatro de Operaciones del Atlántico Sur, y a los civiles que cumplían tareas de servicio o apoyo ahí. Además, el artículo 3º del Decreto 886/2005 cambió el artículo 1º de la Ley 24.892 y sumó a los oficiales y suboficiales de las Fuerzas Armadas y de Seguridad retirados o dados de baja, por decisión propia u obligados.",
  },
  {
    q: "¿Qué tiene que resignar el personal retirado de las Fuerzas Armadas?",
    a: "El complemento del Decreto 1244/98. El artículo 7º del Decreto 886/2005 lo dice sin vueltas: para cobrar la pensión honorífica, el personal retirado de las Fuerzas Armadas y de Seguridad «deberá desistir de las acciones y del eventual derecho que tuvieren a percibir el complemento instituido por el Decreto Nº 1244/98». En el trámite se presenta la constancia de que desististe ante el organismo o el juzgado donde habías iniciado el reclamo.",
  },
  {
    q: "¿Se puede perder la pensión?",
    a: "Sí. El artículo 6º del Decreto 1357/2004 deja afuera a los veteranos que hayan sido o sean condenados por violar derechos humanos, por traición a la Patria o por delitos contra el orden constitucional y la vida democrática, entre otros delitos del Código Penal. Es una condición escrita en la misma norma que crea la pensión.",
  },
  {
    q: "¿Le corresponde el suplemento del 82% del salario mínimo?",
    a: `La reglamentación se lo reconoce, pero hoy no suma nada. El inciso h) del artículo 2º de la Resolución SSS 25-E/2017 le da a esta pensión un piso del 82% de TRES salarios mínimos. Como la pensión ya vale tres haberes mínimos, los dos lados están multiplicados por el mismo número. Y el suplemento (que es lo que falta «hasta alcanzar» ese piso) da cero, igual que en el caso general. El detalle está en la página del 82% móvil.`,
  },
  {
    q: "¿El monto sube todos los meses?",
    a: `Sí, solo. Como es tres veces el haber mínimo, se mueve con la misma movilidad. El Decreto 274/2024 actualiza los haberes cada mes según la inflación (IPC) de dos meses antes. Así que cuando el INDEC publica un IPC, ya se sabe cuánto va a ser esta pensión dos meses después, antes incluso de que salga la resolución de ANSES. En ${MES} la movilidad fue del ${PRESTACIONES_VIGENTES.movilidad}%.`,
  },
];

export default function VeteranosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de la Pensión Honorífica de Veteranos de Guerra del Atlántico Sur",
        url: "https://calcular.ar/pension-veteranos-malvinas",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: "Pensión Honorífica de Veteranos de la Guerra del Atlántico Sur, mes a mes",
        descripcion:
          "Monto mensual de la Pensión Honorífica de Veteranos de Guerra del Atlántico Sur, calculado sobre el haber mínimo del SIPA según el artículo 2º del Decreto 1357/2004 (tres haberes mínimos). Incluye el reparto de la pensión entre los familiares según el artículo 7º del mismo decreto.",
        url: "/pension-veteranos-malvinas",
        modificado: VETERANOS_FUENTES.consultadoEl,
        fuenteNombre: VETERANOS_FUENTES.lista[0].nombre,
        fuenteUrl: VETERANOS_FUENTES.lista[0].url,
      }),
      articleSchema({
        titulo: "Pensión de Veteranos de Malvinas: cuánto es, con qué se puede cobrar y qué pasa con la familia",
        descripcion:
          "ANSES no publica el monto: son tres veces el haber mínimo, por el Decreto 1357/2004. Se cobra junto con cualquier jubilación o retiro y con un trabajo, la pensión de la familia es el 100% del beneficio del veterano, y la norma dice en qué casos se pierde.",
        url: "/pension-veteranos-malvinas",
        modificado: VETERANOS_FUENTES.consultadoEl,
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
          Pensión de Veteranos de Malvinas: {formatARS(MONTO, 0)} en {MES}
        </h1>
        <p className="text-zinc-600">
          Ese monto no aparece en ninguna resolución: <strong>se calcula</strong>. La Pensión
          Honorífica de Veteranos de la Guerra del Atlántico Sur es{" "}
          <strong>tres veces el haber mínimo</strong>, y por eso sube sola todos los meses. Acá está
          la cuenta, cómo se reparte cuando la cobra la familia (tiene su propia tabla, distinta de
          la del régimen general) y con qué se puede cobrar a la vez, que es mucho más de lo que se
          suele contar.
        </p>
      </header>

      <RespuestaPrimero actualizado={VETERANOS_FUENTES.consultadoEl}>
        <p>
          <strong>
            En {MES} la Pensión Honorífica de Veteranos de Guerra del Atlántico Sur es{" "}
            {formatARS(MONTO, 0)} por mes.
          </strong>{" "}
          Son {HABERES_MINIMOS_TITULAR} veces el haber mínimo de {formatARS(MINIMO, 0)}, por el
          artículo 2º del Decreto 1357/2004, más las asignaciones familiares que correspondan. Se
          cobra <strong>además</strong> de cualquier jubilación o retiro (nacional, provincial o
          municipal) y también junto con un sueldo: no hay que elegir. Si el veterano falleció, la
          familia cobra el <strong>100% del beneficio</strong>, no el 70% del régimen general.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto cobra cada uno</h2>
        <p className="text-sm text-zinc-600">
          Elegí el mes y quién cobra. Si el veterano falleció, cargá a los familiares y la
          calculadora hace el reparto del artículo 7º del decreto.
        </p>
        <CalculadoraVeteranos />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El monto, mes a mes</h2>
        <p className="text-zinc-600">
          El multiplicador no cambia. Lo que cambia es el haber mínimo, con la movilidad mensual del
          Decreto 274/2024 (la inflación de dos meses antes). En la práctica: cuando el INDEC publica
          un IPC, el monto de esta pensión de dos meses después <em>ya se sabe</em>, antes de que
          salga la resolución de ANSES.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Haber mínimo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Pensión honorífica</th>
                </tr>
              </thead>
              <tbody>
                {ULTIMOS.map((m) => (
                  <tr
                    key={m.periodo}
                    className={`border-t border-zinc-100 ${
                      m.periodo === PERIODO ? "bg-emerald-50/60 font-semibold" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 text-zinc-700">
                      {etiquetaPeriodo(m.periodo)}
                      {m.periodo === PERIODO ? (
                        <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          vigente
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-700">
                      {formatARS(m.haberMinimo, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      {formatARS(m.monto, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Con qué se puede cobrar a la vez</h2>
        <p className="text-zinc-600">
          Esta es la parte que más se entiende mal, y la que le puede cambiar la decisión a alguien.
          El artículo 3º del Decreto 1357/2004 (con el texto del Decreto 886/2005) es claro: no hay
          que elegir entre la pensión y lo demás.
        </p>
        <div className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              {COMPATIBILIDADES.map((c) => (
                <tr key={c.que} className="border-t border-zinc-100 first:border-t-0 align-top">
                  <td className="px-4 py-3">
                    <span className="font-medium text-zinc-800">✓ {c.que}</span>
                    <span className="mt-0.5 block text-xs text-zinc-500">{c.detalle}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500">
          El cambio importa. El texto original de 2004 dejaba afuera «otras prestaciones y/o
          subsidios no contributivos de carácter nacional», y el Decreto 886/2005 reemplazó el
          artículo entero sin esa excepción. Una nota escrita con el texto viejo dice lo contrario
          de la norma vigente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">A quiénes alcanza</h2>
        <ul className="space-y-2">
          {TITULARES.map((t) => (
            <li
              key={t}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700 shadow-sm"
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">
          Los <strong>derechohabientes</strong> (los familiares con derecho) son los del artículo 53
          de la Ley 24.241. Si no hay ninguno, cobran los padres que no pueden trabajar y estaban a
          cargo del veterano, salvo que tengan otro beneficio (en ese caso pueden elegir). Y los{" "}
          <strong>padres de los caídos en combate</strong> cobran con solo demostrar el vínculo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 2º: el monto
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decMonto}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 3º (texto del art. 2º del Decreto 886/2005): con qué se puede
              cobrar
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decCompatibilidad}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 7º: la pensión de la familia
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decDerivada}»</p>
            <p className="mt-2 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decPadres}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 886/2005, art. 7º: desistir del complemento del Dec. 1244/98
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decDesistimiento}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 6º: cuándo se pierde el derecho
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decPerdida}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.848, art. 1º (texto según la Ley 24.652): a quiénes alcanza
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.leyAlcance}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-1 text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 text-sm text-zinc-600">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          {VETERANOS_FUENTES.lista.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y usa normas publicadas en el Boletín Oficial e InfoLEG. Quien
          otorga, liquida y paga es ANSES. Para ver el haber mínimo y el bono del mes, usá la{" "}
          <Link href="/jubilacion" className="text-emerald-700 hover:underline">
            calculadora de jubilación
          </Link>
          . Para el suplemento del 82% y por qué acá no suma, mirá la{" "}
          <Link href="/82-por-ciento-movil" className="text-emerald-700 hover:underline">
            página del 82% móvil
          </Link>
          . Consultada el {VETERANOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
