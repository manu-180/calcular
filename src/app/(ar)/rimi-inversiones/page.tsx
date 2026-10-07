import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraRimi } from "@/components/CalculadoraRimi";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_PERMANENCIA,
  ANIOS_VENTANA,
  BIENES,
  ETIQUETAS_CATEGORIA,
  EXCLUSIONES,
  MONTOS_MINIMOS,
  MULTA_MULTIPLO,
  PERIODOS_IVA,
  RIMI_FUENTES,
  RIMI_TEXTOS,
  VIGENCIA_RIMI,
  type CategoriaPyme,
} from "@/data/rimi";

const usd = (n: number) => `USD ${n.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;

export const metadata: Metadata = {
  title: "RIMI: montos mínimos y qué inversiones califican",
  description: `El régimen para medianas inversiones rige desde el 6/3/2026, con pisos de ${usd(MONTOS_MINIMOS.micro)} a ${usd(MONTOS_MINIMOS.mediana2)} según la categoría MiPyME. Calculá si calificás.`,
  alternates: { canonical: "/rimi-inversiones" },
  openGraph: {
    title: "RIMI: cuatro bienes entran sin monto mínimo (y está en el artículo anterior)",
    description:
      "El art. 181 de la Ley 27.802 fija pisos de USD 150.000 a 9.000.000. El art. 180 deja afuera de ese piso al riego, la alta eficiencia energética, las mallas antigranizo y los semovientes: entran «independientemente del monto».",
    url: "https://calcular.ar/rimi-inversiones",
    images: [
      {
        url: "/og?t=RIMI&s=Los%20montos%20minimos%2C%20y%20los%20cuatro%20bienes%20que%20entran%20sin%20piso",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Qué es el RIMI y desde cuándo rige?",
    a: `Es el Régimen de Incentivo para Medianas Inversiones, que creó el Título XXIII de la Ley 27.802 (arts. 177 a 188). Rige desde el ${VIGENCIA_RIMI}. El art. 217 dice que «salvo disposición en contrario los artículos de la presente ley entrarán en vigencia a partir de su publicación en el Boletín Oficial», y este Título no tiene fecha propia ni prórroga. El Título II (el Fondo de Asistencia Laboral), en cambio, sí la tiene.`,
  },
  {
    q: "¿Cuánto hay que invertir como mínimo?",
    a: `Depende de la categoría MiPyME. El art. 181 fija cuatro pisos en dólares: ${usd(MONTOS_MINIMOS.micro)} para micro empresas, ${usd(MONTOS_MINIMOS.pequena)} para pequeñas, ${usd(MONTOS_MINIMOS.mediana1)} para medianas de Tramo 1 y ${usd(MONTOS_MINIMOS.mediana2)} para medianas de Tramo 2. Pero antes hay que leer el artículo anterior: el art. 180 deja a cuatro tipos de bien afuera del piso.`,
  },
  {
    q: "¿Cuáles son los bienes que entran sin monto mínimo?",
    a: `Riego, alta eficiencia energética, mallas antigranizo para el agro y bienes semovientes (animales). El art. 180 lo dice al final, casi al pasar: esas inversiones «serán susceptibles de promoción, independientemente del monto de la inversión involucrada, en cada caso». Un equipo de riego de USD 20.000 califica aunque el piso de la categoría sea USD 150.000. Esa oración decide si el régimen es para pocas empresas grandes o para cualquier campo. Y está en el artículo anterior al de los montos, justo donde nadie la busca.`,
  },
  {
    q: "¿Qué se considera inversión productiva?",
    a: `La define el art. 180: comprar, elaborar, fabricar o importar bienes muebles nuevos («excepto automóviles») que se amorticen en Ganancias, y hacer obras, todo «a ser afectadas directamente al desarrollo de actividades productivas en el territorio de la República Argentina». También dice qué queda afuera: «las inversiones en activos financieros, de portfolio y bienes de cambio».`,
  },
  {
    q: "¿En cuántas cuotas se amortiza?",
    a: "El art. 182 tiene cinco incisos con tres respuestas. Bienes muebles amortizables: dos cuotas anuales, iguales y seguidas. Obras: «como mínimo» las cuotas que salgan de reducir la vida útil al 60% de la estimada. Y una sola cuota para equipos de riego agrícola y de alta eficiencia energética, bienes semovientes amortizables y mallas antigranizo: los mismos cuatro que no tienen monto mínimo.",
  },
  {
    q: "¿Cuánto adelanto en plata con la amortización acelerada?",
    a: "El beneficio es de tiempo, no de monto: deducís lo mismo, pero antes. Cuánto vale ese adelanto depende de tu alícuota de Ganancias y de tu tasa de descuento, y la ley no fija ninguna de las dos. Por eso esta página calcula el cronograma de cuotas (que es una cuenta que se puede verificar) y no publica un ahorro en pesos que sería inventado.",
  },
  {
    q: "¿Y el IVA?",
    a: `El art. 183 permite pedir la devolución de los créditos fiscales de IVA de las inversiones productivas «luego de transcurridos tres (3) períodos fiscales mensuales contados a partir de aquél en que haya resultado procedente su cómputo». O sea, la devolución se puede pedir desde el cuarto período, no en el mismo mes de la compra.`,
  },
  {
    q: "¿Puedo vender el bien después?",
    a: `No dentro de los ${ANIOS_PERMANENCIA} años fiscales desde que lo empezaste a usar, o perdés los beneficios (art. 186). Hay tres excepciones escritas: reemplazarlo por otro bien que valga igual o más que el precio de venta, que se destruya por caso fortuito o fuerza mayor, o que haya pasado un tercio de su vida útil «en los términos y condiciones que establezca la reglamentación». La Autoridad de Aplicación puede sumar más causales.`,
  },
  {
    q: "¿Se puede combinar con el RIGI?",
    a: `No por la misma inversión. El art. 184 inc. f) excluye a quienes entren al RIGI de la Ley 27.742 «y/o a cualquier otro régimen de incentivos, por las mismas inversiones productivas», y permite que la Autoridad de Aplicación amplíe o cambie esa exclusión. Si perdés el derecho después de haber adherido, perdés todos los beneficios de los arts. 182 y 183.`,
  },
  {
    q: "¿Qué pasa si me revocan los beneficios?",
    a: `El art. 187 obliga a devolverle al Fisco los créditos fiscales de IVA que te devolvieron y el Impuesto a las Ganancias que dejaste de pagar, más intereses resarcitorios. Además hay una multa que «no podrá exceder de ${MULTA_MULTIPLO} veces el monto de la franquicia usufructuada», que gradúa ARCA. Antes hay un sumario administrativo con derecho de defensa.`,
  },
  {
    q: "¿Ya está reglamentado?",
    a: `El art. 188 manda a ARCA dictar «las normas complementarias, aclaratorias y operativas necesarias», y el art. 179 remite a la reglamentación para contar los ${ANIOS_VENTANA} primeros años del régimen. Al ${RIMI_FUENTES.consultadoEl}, el texto de la ley en InfoLEG no trae nota de reglamentación para este Título (en el Título II sí figura la del Decreto 408/2026). Antes de adherir, fijate en ARCA si ya salió la resolución general. Esta página publica lo que dice la ley, que es lo que no va a cambiar.`,
  },
];

export default function RimiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora del RIMI (Régimen de Incentivo para Medianas Inversiones)",
        url: "https://calcular.ar/rimi-inversiones",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "RIMI: el Título XXIII de la Ley 27.802, artículo por artículo",
        descripcion:
          "Los cuatro montos mínimos del art. 181, la excepción del art. 180 que deja entrar sin piso a riego, alta eficiencia energética, mallas antigranizo y semovientes, y la amortización acelerada del art. 182 con sus cinco incisos.",
        url: "/rimi-inversiones",
        modificado: RIMI_FUENTES.consultadoEl,
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
          RIMI: ¿tu inversión califica?
        </h1>
        <p className="text-zinc-600">
          El Régimen de Incentivo para Medianas Inversiones pide montos altos (de{" "}
          {usd(MONTOS_MINIMOS.micro)} a {usd(MONTOS_MINIMOS.mediana2)} según la categoría), y por eso
          casi todos lo descartan de entrada.{" "}
          <strong>Pero cuatro tipos de bien entran sin ningún monto mínimo</strong>, y eso está
          escrito en el artículo anterior al de los pisos.
        </p>
      </header>

      <RespuestaPrimero actualizado={RIMI_FUENTES.consultadoEl}>
        <p>
          El RIMI rige desde el <strong>{VIGENCIA_RIMI}</strong> (Título XXIII de la Ley 27.802,
          arts. 177 a 188). Alcanza a los sujetos del art. 53 de la Ley de Ganancias que califiquen
          como MiPyME hasta Mediana Tramo 2, por las inversiones productivas de los primeros{" "}
          {ANIOS_VENTANA} años del régimen. Da <strong>amortización acelerada</strong> en Ganancias
          y <strong>devolución de créditos fiscales de IVA</strong> después de {PERIODOS_IVA}{" "}
          períodos mensuales. Los pisos del art. 181 van de {usd(MONTOS_MINIMOS.micro)} a{" "}
          {usd(MONTOS_MINIMOS.mediana2)}. Pero el art. 180 deja afuera de esos pisos al{" "}
          <strong>riego, la alta eficiencia energética, las mallas antigranizo y los semovientes</strong>,
          que entran «independientemente del monto de la inversión involucrada». Esos mismos cuatro
          se amortizan en <strong>una sola cuota</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Elegí la categoría y el tipo de bien. La calculadora contesta las dos preguntas que la ley
          permite contestar: si califica y en cuántas cuotas se amortiza. El ahorro en pesos no,
          porque depende de tu alícuota y de tu tasa de descuento, dos números que la ley no fija.
        </p>
        <CalculadoraRimi />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La oración que decide quién entra, y dónde está escondida
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 180, última oración</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{RIMI_TEXTOS.excepcionDelMinimo}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El artículo 180 se llama «Inversiones Productivas. Concepto»: uno lo lee buscando la
          definición y lo deja antes de llegar al final. Los montos mínimos están en el 181, y quien
          empieza por ahí piensa que el régimen no es para él. La excepción está en el artículo de
          las definiciones, en la última oración: dos pasos lejos de donde uno la buscaría.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Categoría (Ley 24.467)</th>
                <th className="py-2 pl-3 text-right font-medium text-zinc-600">
                  Monto mínimo (art. 181)
                </th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(ETIQUETAS_CATEGORIA) as CategoriaPyme[]).map((c) => (
                <tr key={c} className="border-b border-zinc-200">
                  <td className="py-2 pr-3 text-zinc-800">{ETIQUETAS_CATEGORIA[c]}</td>
                  <td className="py-2 pl-3 text-right font-semibold text-zinc-900">
                    {usd(MONTOS_MINIMOS[c])}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 pr-3 font-medium text-emerald-800">
                  Riego, alta eficiencia energética, mallas antigranizo y semovientes
                </td>
                <td className="py-2 pl-3 text-right font-bold text-emerald-800">sin mínimo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo se amortiza cada bien (art. 182, los cinco incisos)
        </h2>
        <div className="space-y-3">
          {BIENES.map((b) => (
            <div key={b.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-zinc-800">
                {b.etiqueta}{" "}
                <span className="font-normal text-zinc-500">({b.inciso})</span>
                {b.exentoDelMinimo && (
                  <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                    sin monto mínimo
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{b.detalle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que queda afuera</h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 180: concepto y exclusiones</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{RIMI_TEXTOS.inversionProductiva}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Antes de armar el proyecto, mirá tres exclusiones: los <strong>automóviles</strong>, los{" "}
          <strong>activos financieros y de portfolio</strong> y los <strong>bienes de cambio</strong>.
          Y una condición que se lee rápido pero pesa: el bien tiene que estar afectado «directamente al
          desarrollo de actividades productivas en el territorio de la República Argentina».
        </p>
        <div className="space-y-3">
          {EXCLUSIONES.map((e) => (
            <details
              key={e.titulo}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{e.titulo}</summary>
              <p className="mt-2 text-sm text-zinc-600">{e.detalle}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La letra chica que decide el proyecto</h2>
        <div className="space-y-3">
          {[
            {
              art: "Art. 185: cuándo cuenta como hecha la inversión",
              texto: RIMI_TEXTOS.momentoDeLaInversion,
              porQue:
                "No cuenta el año de la compra, sino el año en que el bien se pone en marcha y empieza a generar ganancias gravadas. Eso decide en qué año arranca la amortización.",
            },
            {
              art: `Art. 186: permanencia de ${ANIOS_PERMANENCIA} años`,
              texto: RIMI_TEXTOS.caducidad,
              porQue:
                "Si vendés el bien antes, perdés los beneficios, salvo tres excepciones escritas. La del reemplazo exige que el bien nuevo valga igual o más que el precio de venta del anterior.",
            },
            {
              art: "Art. 183: devolución de IVA",
              texto: RIMI_TEXTOS.iva,
              porQue: `Hay que esperar tres períodos fiscales mensuales: la devolución se pide desde el cuarto, no en el mes de la compra.`,
            },
            {
              art: "Art. 184 inc. f): una inversión, un régimen",
              texto: RIMI_TEXTOS.incompatibilidadRigi,
              porQue:
                "No se puede sumar el RIMI al RIGI ni a otro régimen de incentivos por la misma inversión productiva, y la Autoridad de Aplicación puede ampliar la exclusión.",
            },
            {
              art: "Art. 188: quién reglamenta",
              texto: RIMI_TEXTOS.reglamentacion,
              porQue: `Al ${RIMI_FUENTES.consultadoEl}, el texto de la ley en InfoLEG no trae nota de reglamentación para este Título. Fijate en ARCA antes de adherir: la ley ya rige, pero el trámite puede estar pendiente.`,
            },
          ].map((a) => (
            <details
              key={a.art}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
              <p className="mt-2 text-sm text-zinc-700">{a.porQue}</p>
            </details>
          ))}
        </div>
      </section>

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
        <p className="text-sm text-zinc-500">
          Si tu empresa es una sociedad, la amortización acelerada se descuenta de{" "}
          <Link
            href="/ganancias-sociedades"
            className="font-medium text-emerald-700 hover:underline"
          >
            Ganancias de sociedades
          </Link>
          . Otros regímenes que creó la misma ley:{" "}
          <Link
            href="/fondo-de-asistencia-laboral"
            className="font-medium text-emerald-700 hover:underline"
          >
            el Fondo de Asistencia Laboral
          </Link>{" "}
          y{" "}
          <Link href="/rifl" className="font-medium text-emerald-700 hover:underline">
            el RIFL de formalización laboral
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {RIMI_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
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
          Esta página cita el texto oficial de la Ley 27.802 publicado en InfoLEG, no un resumen de
          prensa. Es una guía informativa: no reemplaza el consejo de un profesional ni una
          liquidación impositiva. Consultada el {RIMI_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
