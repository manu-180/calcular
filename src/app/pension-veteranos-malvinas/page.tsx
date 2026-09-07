import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraVeteranos } from "@/components/CalculadoraVeteranos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
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
  title: `Pensión de Veteranos de Malvinas ${MES}: ${formatARS(MONTO, 0)}`,
  description: `La Pensión Honorífica de Veteranos de la Guerra del Atlántico Sur es ${formatARS(MONTO, 0)} en ${MES}: tres veces el haber mínimo, por el artículo 2º del Decreto 1357/2004. ANSES no publica ese monto —se calcula—. Se cobra ADEMÁS de cualquier jubilación o retiro, y la pensión derivada es el 100% del beneficio, no el 70%.`,
  alternates: { canonical: "/pension-veteranos-malvinas" },
  openGraph: {
    title: `Pensión de Veteranos de Malvinas: ${formatARS(MONTO, 0)} en ${MES}`,
    description: `Tres veces el haber mínimo (Dec. 1357/2004). Compatible con cualquier jubilación o retiro, y la pensión derivada es el 100% del beneficio del causante.`,
    url: "https://calcular.ar/pension-veteranos-malvinas",
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Pensión de Veteranos de Malvinas · ${MES}`)}&s=${encodeURIComponent(`${formatARS(MONTO, 0)} — tres haberes mínimos`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto cobra un veterano de Malvinas en ${MES}?`,
    a: `${formatARS(MONTO, 0)} por mes. No es un número que ANSES publique: el artículo 2º del Decreto 1357/2004 fija la pensión en tres veces el haber mínimo del Régimen Previsional Público, y el haber mínimo de ${MES} es ${formatARS(MINIMO, 0)}. Por eso la resolución mensual de ANSES —la que fija el haber mínimo, el máximo, las bases imponibles, la PBU y la PUAM— ni siquiera nombra a esta pensión: su importe no se publica, se calcula. Además de la pensión, el titular cobra las asignaciones familiares que le correspondan, con los mismos requisitos y derechos que los demás beneficiarios del régimen.`,
  },
  {
    q: "¿Se puede cobrar junto con una jubilación?",
    a: "Sí, completas las dos, y no hay que optar. El artículo 3º del Decreto 1357/2004 —en el texto que le dio el artículo 2º del Decreto 886/2005— dice que el cobro es compatible con cualquier otro beneficio de carácter previsional permanente o de retiro otorgado en jurisdicción nacional, provincial o municipal, con la percepción de otro ingreso, con el subsidio extraordinario de la Ley 22.674 y con las pensiones graciables vitalicias de las Leyes 23.598 y 24.310. Conviene notar el cambio: la redacción original de 2004 excluía las prestaciones y subsidios no contributivos nacionales, y el decreto de 2005 sacó esa excepción.",
  },
  {
    q: "¿Puedo seguir trabajando?",
    a: "Sí. La compatibilidad con «la percepción de otro ingreso» está escrita en la misma norma y no tiene tope ni condiciones. Es una diferencia importante con otras prestaciones no contributivas, donde los ingresos por trabajo sí están limitados.",
  },
  {
    q: "Si el veterano falleció, ¿cuánto cobran los familiares?",
    a: `El 100% del beneficio del causante — no el 70% del régimen general. El artículo 7º del Decreto 1357/2004 es textual: las pensiones de los derechohabientes «serán fijadas en el CIEN POR CIEN (100%) del beneficio del causante». O sea, el grupo familiar sigue cobrando los ${formatARS(MONTO, 0)} enteros y se los reparte: 100% para la viuda, viudo o conviviente cuando no hay hijos con derecho; 50% para ella o él y 50% entre los hijos cuando los hay; y 100% entre los hijos por partes iguales si no hay viuda, viudo ni conviviente. Si después se extingue el derecho de alguno de los copartícipes, el beneficio de los demás se recalcula con exclusión de ese.`,
  },
  {
    q: "¿Quiénes son los derechohabientes?",
    a: "Los enumerados en el artículo 53 de la Ley 24.241. A falta de ellos, tienen derecho los padres incapacitados para el trabajo y a cargo del causante a la fecha del deceso, siempre que no gocen de jubilación, pensión, retiro o prestación no contributiva —salvo que opten por esta pensión—. Y hay una excepción que casi no se publica: los padres de los veteranos muertos en combate acceden al beneficio con la sola acreditación del vínculo, sin tener que probar incapacidad ni estar a cargo.",
  },
  {
    q: "¿Alcanza sólo a los ex soldados conscriptos?",
    a: "No. Además de los ex soldados conscriptos destinados en el Teatro de Operaciones Malvinas o que entraron efectivamente en combate en el Teatro de Operaciones del Atlántico Sur, y de los civiles que cumplían funciones de servicio o apoyo ahí, el artículo 3º del Decreto 886/2005 sustituyó el artículo 1º de la Ley 24.892 para extender el beneficio al personal de oficiales y suboficiales de las Fuerzas Armadas y de Seguridad en situación de retiro o baja, voluntaria u obligatoria.",
  },
  {
    q: "¿Qué tiene que resignar el personal retirado de las Fuerzas Armadas?",
    a: "El complemento del Decreto 1244/98. El artículo 7º del Decreto 886/2005 lo dice sin vueltas: para percibir la pensión honorífica, el personal de las Fuerzas Armadas y de Seguridad en situación de retiro «deberá desistir de las acciones y del eventual derecho que tuvieren a percibir el complemento instituido por el Decreto Nº 1244/98». En el trámite eso se acredita con la constancia del desistimiento ante el organismo o el juzgado donde se hubiera iniciado el reclamo.",
  },
  {
    q: "¿Se puede perder la pensión?",
    a: "Sí. El artículo 6º del Decreto 1357/2004 excluye del beneficio a los veteranos de guerra que hubieran sido condenados, o resultaren condenados, por violación de los derechos humanos, por delitos de traición a la Patria, o por delitos contra el orden constitucional y la vida democrática, entre otros tipificados en el Código Penal. Es una condición escrita en la norma que crea el beneficio.",
  },
  {
    q: "¿Le corresponde el suplemento del 82% del salario mínimo?",
    a: `La reglamentación se lo reconoce, pero hoy no le suma un peso. El inciso h) del artículo 2º de la Resolución SSS 25-E/2017 le asigna a esta pensión un nivel garantizado del 82% de TRES salarios mínimos; como la pensión ya vale tres haberes mínimos, ambos lados están multiplicados por el mismo número y el suplemento —que es la diferencia «hasta alcanzar» ese nivel— da cero, igual que en el caso general. El detalle está en la página del 82% móvil.`,
  },
  {
    q: "¿El monto sube todos los meses?",
    a: `Sí, solo: como es tres veces el haber mínimo, se mueve con la misma movilidad. El Decreto 274/2024 actualiza los haberes cada mes según la variación del IPC de dos meses antes, así que cuando el INDEC publica un IPC ya queda determinado el monto de esta pensión de dos meses después, antes incluso de que salga la resolución de ANSES. En ${MES} la movilidad fue del ${PRESTACIONES_VIGENTES.movilidad}%.`,
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
          "Monto mensual de la Pensión Honorífica de Veteranos de Guerra del Atlántico Sur, derivado del haber mínimo garantizado del SIPA por el artículo 2º del Decreto 1357/2004 (tres haberes mínimos). Incluye el reparto de la pensión derivada entre los derechohabientes según el artículo 7º del mismo decreto.",
        url: "/pension-veteranos-malvinas",
        modificado: VETERANOS_FUENTES.consultadoEl,
        fuenteNombre: VETERANOS_FUENTES.lista[0].nombre,
        fuenteUrl: VETERANOS_FUENTES.lista[0].url,
      }),
      articleSchema({
        titulo: "Pensión de Veteranos de Malvinas: cuánto es, con qué se puede cobrar y qué pasa con la familia",
        descripcion:
          "El monto no lo publica ANSES: son tres veces el haber mínimo, por el Decreto 1357/2004. Es compatible con cualquier jubilación o retiro y con el trabajo, la pensión derivada es el 100% del beneficio del causante, y hay causales de pérdida del derecho escritas en la norma.",
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
          la cuenta, el reparto cuando la cobra la familia —que tiene su propia tabla y no es la del
          régimen general— y las compatibilidades, que son mucho más amplias de lo que se suele
          contar.
        </p>
      </header>

      <RespuestaPrimero actualizado={VETERANOS_FUENTES.consultadoEl}>
        <p>
          <strong>
            En {MES} la Pensión Honorífica de Veteranos de Guerra del Atlántico Sur es{" "}
            {formatARS(MONTO, 0)} por mes.
          </strong>{" "}
          Son {HABERES_MINIMOS_TITULAR} veces el haber mínimo de {formatARS(MINIMO, 0)}, por el
          artículo 2º del Decreto 1357/2004 — más las asignaciones familiares que correspondan. Se
          cobra <strong>además</strong> de cualquier jubilación o retiro, nacional, provincial o
          municipal, y también junto con un ingreso por trabajo: no hay que optar por ninguno. Si el
          titular falleció, la familia cobra el <strong>100% del beneficio</strong>, no el 70% del
          régimen general.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto cobra cada uno</h2>
        <p className="text-sm text-zinc-600">
          Elegí el mes y quién cobra. Si el titular falleció, cargá los derechohabientes y la
          calculadora aplica el reparto del artículo 7º del decreto.
        </p>
        <CalculadoraVeteranos />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El monto, mes a mes</h2>
        <p className="text-zinc-600">
          El multiplicador no se mueve; lo que se mueve es el haber mínimo, con la movilidad mensual
          del Decreto 274/2024 (la variación del IPC de dos meses antes). Consecuencia práctica:
          cuando el INDEC publica un IPC, el monto de esta pensión de dos meses después{" "}
          <em>ya está determinado</em>, antes de que salga la resolución de ANSES.
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
          Esta es la parte que más se malinterpreta, y la que puede cambiarle la decisión a alguien.
          El artículo 3º del Decreto 1357/2004 —en el texto que le dio el Decreto 886/2005— es
          expreso, y su lista es cerrada hacia arriba: no hay que elegir entre la pensión y lo demás.
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
          El cambio importa: la redacción original de 2004 exceptuaba «otras prestaciones y/o
          subsidios no contributivos de carácter nacional», y el Decreto 886/2005 sustituyó el
          artículo entero sin esa excepción. Una nota escrita sobre el texto viejo dice lo contrario
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
          Los <strong>derechohabientes</strong> son los del artículo 53 de la Ley 24.241; a falta de
          ellos, los padres incapacitados para el trabajo y a cargo del causante, salvo que gocen de
          otro beneficio —ahí pueden optar—. Y los <strong>padres de los caídos en combate</strong>{" "}
          acceden con la sola acreditación del vínculo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 2º — el monto
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decMonto}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 3º (texto del art. 2º del Decreto 886/2005) — la compatibilidad
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decCompatibilidad}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 7º — la pensión derivada
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decDerivada}»</p>
            <p className="mt-2 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decPadres}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 886/2005, art. 7º — el desistimiento del complemento del Dec. 1244/98
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decDesistimiento}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 1357/2004, art. 6º — las causales de pérdida del derecho
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{VETERANOS_TEXTOS.decPerdida}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.848, art. 1º (texto según la Ley 24.652) — a quiénes alcanza
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG; el
          otorgamiento, la liquidación y el pago están a cargo de ANSES. Para ver el haber mínimo y
          el bono del mes, está la{" "}
          <Link href="/jubilacion" className="text-emerald-700 hover:underline">
            calculadora de jubilación
          </Link>
          ; para el suplemento del 82% y por qué no suma acá, la{" "}
          <Link href="/82-por-ciento-movil" className="text-emerald-700 hover:underline">
            página del 82% móvil
          </Link>
          . Consultada el {VETERANOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
