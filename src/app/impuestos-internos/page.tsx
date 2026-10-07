import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraImpuestosInternos } from "@/components/CalculadoraImpuestosInternos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  BO_LEY_27802,
  IMPUESTOS_INTERNOS_FUENTES,
  IMPUESTOS_INTERNOS_TEXTOS,
  MESES_ACTUALIZACION_MONTOS,
  RUBROS,
  VIGENCIA_ELIMINACION,
} from "@/data/impuestos-internos";

const pct = (t: number) =>
  `${(t * 100).toLocaleString("es-AR", { maximumFractionDigits: 2 })}%`;

const efectiva = (t: number) => t / (1 - t);

export const metadata: Metadata = {
  title: "Impuestos internos eliminados en 2026: qué dejó de pagarse",
  description:
    "La Ley 27.802 eliminó desde el 1/4/2026 los internos a seguros, celulares, autos, embarcaciones y suntuarios. Calculá cuánto del precio era impuesto.",
  alternates: { canonical: "/impuestos-internos" },
  openGraph: {
    title: "Impuestos internos: el 20% de la ley era un 25% en el mostrador",
    description:
      "El art. 195 de la Ley 27.802 los eliminó desde el 1/4/2026. Las alícuotas del art. 27 (ART: 2,5%), del art. 30 (celular: 5%), del art. 35 (suntuarios: 20% en cada etapa) y del art. 39 (vehículos y aeronaves), con la tasa efectiva de cada una.",
    url: "https://calcular.ar/impuestos-internos",
    images: [
      {
        url: "/og?t=Impuestos%20internos&s=Que%20dejo%20de%20pagarse%20el%201%20de%20abril%20de%202026",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Desde cuándo dejaron de pagarse estos impuestos internos?",
    a: `Desde el ${VIGENCIA_ELIMINACION}. La Ley 27.802 se publicó el ${BO_LEY_27802} y rige desde ese día (art. 217). Pero el art. 195 no eliminó el impuesto ese mismo día: lo dejó sin efecto «a partir del primer día del mes inmediato siguiente al de la entrada en vigencia de esta ley». O sea que durante todo marzo de 2026 se siguió pagando. Esa es la diferencia entre la fecha de los titulares y la que importa para una factura.`,
  },
  {
    q: "¿Qué rubros alcanza el artículo 195?",
    a: "Cinco, y los nombra uno por uno: los seguros, la telefonía celular y satelital, los objetos suntuarios, y los autos y motores, las embarcaciones de recreo o deporte y las aeronaves. No toca los demás capítulos de la Ley de Impuestos Internos: tabaco, bebidas alcohólicas, cervezas y bebidas sin alcohol siguen pagando.",
  },
  {
    q: "¿Por qué el 20% nominal era en realidad un 25%?",
    a: "Porque el impuesto forma parte de su propia base. El art. 4° de la Ley 24.674 manda calcularlo sobre el precio neto de la factura y prohíbe descontar de esa base «valor alguno en concepto del impuesto de esta ley». Si el vendedor quiere quedarse con 100 después de pagar el impuesto, tiene que facturar 125. Y el 20% de 125 son 25. La tasa real es alícuota ÷ (1 − alícuota). El 35% de los autos era 53,85% y el 5% del celular, 5,26%.",
  },
  {
    q: "¿Cuánto pagaba un seguro?",
    a: "Depende de cuál: hay tres alícuotas en el mismo artículo. El art. 27 fija el 1‰ general sobre las primas de las aseguradoras del país, «excepto en el caso de seguros de accidente de trabajo que pagarán el dos con cinco por ciento (2,5%)». Esa es la cuota de ART, y paga veinticinco veces la alícuota general. Y fija el 23% para los seguros contratados con aseguradoras de fuera del país. Varios seguros ya estaban exentos de antes: los agrícolas, los de vida, los de accidentes personales y los colectivos de internación, cirugía o maternidad.",
  },
  {
    q: "¿El impuesto interno a la ART lo pagaba el empleador?",
    a: "Lo depositaba la aseguradora, pero el 2,5% se calculaba sobre la prima, así que venía dentro de la cuota que el empleador paga por cada trabajador. Es el único de los cinco rubros del art. 195 que es un costo laboral directo, y casi ninguna nota sobre la reforma lo menciona.",
  },
  {
    q: "¿Los objetos suntuarios pagaban una vez o varias?",
    a: "Varias, y son el único caso. El art. 2° dice que los impuestos de la ley se cobran «en una sola de las etapas de su circulación, excepto en el caso de los bienes comprendidos en el Capítulo VIII», que es el de los objetos suntuarios. Y el art. 35 lo confirma: el 20% se pagaba «en cada una de las etapas de su comercialización». El art. 37 suavizaba la cascada: fabricantes, talleristas y revendedores podían descontar el impuesto ya pagado por los productos gravados que usaban.",
  },
  {
    q: "¿Qué era un objeto suntuario?",
    a: "Los enumera el art. 36: piedras preciosas o semipreciosas, piedras duras talladas y perlas; objetos hechos con platino, paladio, oro, plata, cristal, jade, marfil, ámbar, carey, coral, espuma de mar o cristal de roca; monedas de oro o plata con agregados ajenos a su cuño; prendas de piel de peletería; y alfombras y tapices de punto anudado o enrollado. Y tenía exenciones curiosas y muy concretas, como los anillos de alianza matrimonial.",
  },
  {
    q: "¿Los autos bajaron un 35%?",
    a: "No, y es lo que la mayoría de las notas se saltea. El 35% figura en el art. 39, pero el Decreto 50/2025 (B.O. 31/1/2025) ya lo había bajado al 18%. También bajó el 30% de las motos al 15% y dejó sin efecto el 20%, para los bienes de los incisos a) a e) del art. 38, hasta el 30 de junio de 2027. O sea que en 2026 se estaba pagando el 18%, no el 35%. Lo que de verdad cambia con la ley es que el alivio ya no depende de un decreto con fecha de vencimiento: pasa a estar en la ley.",
  },
  {
    q: "¿Hay algún rubro donde la eliminación sí baje algo que se pagaba?",
    a: "Sí: las aeronaves. El Decreto 50/2025 nombra los incisos a), b), c), d) y e) del art. 38 y deja afuera el f): aeronaves, aviones, hidroaviones, planeadores y helicópteros de recreo o deporte. Su 20% siguió vigente hasta el 1 de abril de 2026. Y es el único inciso sin monto exento. El art. 39 dice de forma expresa «sin aplicarse monto exento para el inciso f)», así que el impuesto corría desde el primer peso.",
  },
  {
    q: "¿Por qué esta página no publica los montos exentos de los autos?",
    a: `Porque no se pueden verificar con la ley. El art. 39 escribió los montos en 2019 ($1.300.000 para autos y motores, $390.000 para motos, $1.700.000 para embarcaciones). Y en el mismo artículo mandó actualizarlos cada ${MESES_ACTUALIZACION_MONTOS} meses por el Índice de Precios Internos al por Mayor del INDEC. El valor vigente no está en la ley ni se puede sacar de ella. Publicar el número de 2019 como si fuera el de hoy sería inventar un dato: acá te explicamos cómo funciona y te mandamos a la fuente.`,
  },
  {
    q: "¿La Ley 27.802 eliminó todos los impuestos internos?",
    a: "No. El art. 195 nombra cinco rubros y deja intactos los demás capítulos de la Ley 24.674: tabaco (Capítulo I), bebidas alcohólicas (II), cervezas (III) y bebidas sin alcohol, jarabes, extractos y concentrados (IV). El Título XXV también tiene un art. 196 que toca la Ley de Fomento de la Actividad Cinematográfica, pero eso es otra cosa: no es un impuesto al consumo.",
  },
];

export default function ImpuestosInternosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de impuestos internos eliminados por la Ley 27.802",
        url: "https://calcular.ar/impuestos-internos",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Impuestos internos eliminados por la Ley 27.802: los cinco rubros del art. 195",
        descripcion:
          "Las alícuotas de la Ley 24.674 rubro por rubro, la tasa efectiva que sale del art. 4°, la fecha real de la eliminación (1/4/2026) y qué ya estaba suspendido por el Decreto 50/2025.",
        url: "/impuestos-internos",
        modificado: IMPUESTOS_INTERNOS_FUENTES.consultadoEl,
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
          Impuestos internos: qué se eliminó, cuándo y cuánto era en serio
        </h1>
        <p className="text-zinc-600">
          El art. 195 de la Ley 27.802 dejó sin efecto los impuestos internos a{" "}
          <strong>seguros, telefonía celular, objetos suntuarios, autos, embarcaciones y
          aeronaves</strong>. Hay dos cosas que casi nadie publica: no rige desde la ley sino desde el{" "}
          <strong>{VIGENCIA_ELIMINACION}</strong>, y la alícuota que dice el texto{" "}
          <strong>no es lo que encarecía el precio</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={IMPUESTOS_INTERNOS_FUENTES.consultadoEl}>
        <p>
          Los cinco rubros del art. 195 dejaron de pagar impuestos internos el{" "}
          <strong>{VIGENCIA_ELIMINACION}</strong>. La Ley 27.802 se publicó el {BO_LEY_27802} y rige
          desde ese día, pero el artículo dice «a partir del primer día del mes inmediato siguiente».
          Las alícuotas que se fueron: <strong>1‰</strong> el seguro general y{" "}
          <strong>2,5% el de accidentes de trabajo</strong> (art. 27), <strong>23%</strong> la
          aseguradora del exterior, <strong>5%</strong> la telefonía celular y satelital (art. 30, con
          las recargas incluidas por el 31), <strong>20% en cada etapa</strong> los objetos suntuarios
          (art. 35) y la escala del art. 39 para autos, embarcaciones y aeronaves. Y como el impuesto
          formaba parte de su propia base (art. 4°), <strong>el 20% nominal era un 25%</strong> sobre
          un precio limpio, y el 35%, un 53,85%.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá cuánto era impuesto</h2>
        <p className="text-sm text-zinc-600">
          Elegí el rubro y cargá el importe con impuesto. La calculadora te dice lo que se puede
          saber con la ley: cuánto de ese importe era impuesto interno y cuánto encarecía un precio
          sin él. No cuánto va a bajar en el mostrador: eso lo decide el vendedor.
        </p>
        <CalculadoraImpuestosInternos />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La oración que elimina el impuesto</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 27.802, art. 195 (Título XXV, Capítulo I)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{IMPUESTOS_INTERNOS_TEXTOS.art195}»
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Un solo artículo elimina cinco impuestos, sin tocar ni un artículo de la ley que los crea.
          La Ley 24.674 sigue con sus capítulos completos y sus alícuotas escritas: lo que cambia es
          que dejan de aplicarse a esos rubros. Por eso conviene leer las dos normas juntas. La ley
          vieja sigue siendo la que dice cuánto era. Otro cambio impositivo de la misma ley es{" "}
          <Link href="/venta-de-inmuebles" className="font-medium text-emerald-700 hover:underline">
            la venta de inmuebles sin impuesto
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La alícuota de la ley no es la que se pagaba en el precio
        </h2>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 24.674, art. 4°</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{IMPUESTOS_INTERNOS_TEXTOS.art4}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          En criollo: el impuesto <strong>no se descuenta de su propia base</strong>. Se calcula sobre
          el importe facturado, que ya lo incluye. Si el vendedor quiere quedarse con $100 después de
          pagarlo, tiene que facturar $125. Y el 20% de $125 son los $25 del impuesto. Lo que encarece
          de verdad un precio limpio es alícuota ÷ (1 − alícuota).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Rubro</th>
                <th className="py-2 px-3 font-medium text-zinc-600">Artículo</th>
                <th className="py-2 px-3 text-right font-medium text-zinc-600">Alícuota</th>
                <th className="py-2 pl-3 text-right font-medium text-zinc-600">Tasa efectiva</th>
              </tr>
            </thead>
            <tbody>
              {RUBROS.map((r) => (
                <tr key={r.id} className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 text-zinc-800">
                    {r.etiqueta}
                    {r.todasLasEtapas && (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                        en cada etapa
                      </span>
                    )}
                    {r.yaSuspendidoPorDecreto && (
                      <span className="ml-2 rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-semibold text-zinc-700">
                        ya suspendida en 2026
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-xs text-zinc-500">{r.articulo}</td>
                  <td className="py-2 px-3 text-right font-semibold text-zinc-900">
                    {r.alicuotaTexto}
                  </td>
                  <td className="py-2 pl-3 text-right font-bold text-emerald-800">
                    {pct(efectiva(r.alicuota))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los autos: el ahorro real no se mide contra el 35%
        </h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Decreto 50/2025, art. 1° (B.O. 31/1/2025)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{IMPUESTOS_INTERNOS_TEXTOS.decreto50}»
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El decreto dejó sin efecto el 20% y, en sus artículos 2° y 3°, bajó el 35% al{" "}
          <strong>18%</strong> y el 30% de las motos al <strong>15%</strong>, hasta el 30 de junio de
          2027. O sea que en 2026, antes de la ley, por un auto de gama alta se pagaba el 18%. El
          titular y la realidad no coinciden. Lo que la Ley 27.802 cambia de verdad es otra cosa:{" "}
          <strong>el alivio ya no depende de un decreto</strong> con fecha de vencimiento.
        </p>
        <p className="text-sm text-zinc-600">
          Y hay un detalle en la lista del decreto que decide un rubro entero. Nombra los incisos{" "}
          <strong>a), b), c), d) y e)</strong> del art. 38 y <strong>no nombra el f)</strong>: las
          aeronaves, aviones, hidroaviones, planeadores y helicópteros de recreo. Su 20% nunca se
          suspendió. Además, el art. 39 dice «sin aplicarse monto exento para el inciso f)», así que
          corría desde el primer peso. Es el único rubro del Capítulo IX donde la eliminación baja
          algo que de verdad se estaba pagando.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Objetos suntuarios: el único que pagaba en cada etapa
        </h2>
        <div className="space-y-3">
          {[
            {
              art: "Art. 2°: la regla de la etapa única, y su excepción",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art2,
              porQue:
                "Todos los impuestos internos se cobran una sola vez en la cadena. Todos menos el Capítulo VIII, el de los objetos suntuarios. La excepción está escrita en la regla general, no en el capítulo.",
            },
            {
              art: "Art. 35: el 20% en cada etapa de venta",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art35,
              porQue:
                "Fabricante, mayorista y joyería: cada venta pagaba. Por eso lo que encarecía el precio final de una joya no era el 20% ni el 25%, sino lo que diera la cadena concreta.",
            },
            {
              art: "Art. 37: el pago a cuenta que frena la cascada",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art37,
              porQue:
                "Fabricantes, talleristas y revendedores podían descontar de su propio impuesto el que ya se había pagado por los productos gravados que usaban. Sin este artículo, el 20% se apilaría en cascada. Con él, el efecto depende de cuánto de la cadena esté alcanzado.",
            },
            {
              art: "Art. 36: qué era un objeto suntuario",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art36,
              porQue:
                "La lista es más amplia de lo que sugiere la palabra «suntuario»: entra el cristal, entran las alfombras de punto anudado y entra cualquier objeto que use plata «en cualquier forma o proporción».",
            },
            {
              art: "Art. 36: las exenciones, incluida la alianza matrimonial",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art36Exenciones,
              porQue:
                "Los anillos de alianza matrimonial estaban exentos con nombre propio, igual que el instrumental científico, los objetos de culto y las condecoraciones oficiales. También los artículos a los que el material precioso se agrega «bajo la forma de baño, fileteado, virola, guarda, esquinero, monograma».",
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
        <h2 className="text-xl font-bold text-zinc-900">
          Seguros: tres alícuotas en un solo artículo, y una es laboral
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 24.674, art. 27, primer párrafo</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{IMPUESTOS_INTERNOS_TEXTOS.art27}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          La excepción está al final de la oración y es <strong>veinticinco veces</strong> la alícuota
          general: el <strong>2,5% sobre la prima de los seguros de accidente de trabajo</strong>. O
          sea, sobre la cuota de ART que paga el empleador por cada trabajador. Es el único de los
          cinco rubros del art. 195 que es un costo laboral directo, y casi ninguna nota sobre la
          reforma lo separa del 1‰ general.
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Artículo sin número a continuación del art. 29: lo que ya estaba exento
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{IMPUESTOS_INTERNOS_TEXTOS.segurosExentos}»
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Para esos seguros el art. 195 no cambia nada, porque ya no pagaban. Importa distinguirlos:
          es la diferencia entre «me baja la póliza» y «no me cambia nada».
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Telefonía celular: el abono y la recarga</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Art. 30</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{IMPUESTOS_INTERNOS_TEXTOS.art30}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Art. 31</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{IMPUESTOS_INTERNOS_TEXTOS.art31}»</p>
          </blockquote>
        </div>
        <p className="text-sm text-zinc-600">
          El 5% se calculaba sobre el <strong>importe facturado al usuario</strong>, y el art. 31 lo
          extendía a las tarjetas prepagas y recargables. La recarga de un prepago pagaba lo mismo
          que el abono de una línea con factura. Mirando el art. 4°, lo que encarecía un precio sin
          impuesto era el {pct(efectiva(0.05))}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué acá no están los montos exentos de los autos
        </h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 24.674, art. 39</p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{IMPUESTOS_INTERNOS_TEXTOS.actualizacionMontos}»
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El art. 39 escribió los montos en 2019 y, en el mismo párrafo, mandó actualizarlos cada{" "}
          {MESES_ACTUALIZACION_MONTOS} meses por el Índice de Precios Internos al por Mayor. El valor
          vigente no está en la ley ni se puede sacar de ella. Publicar el número de 2019 como si
          fuera el de hoy sería inventar un dato. Es el mismo error que hace que medio internet siga
          citando «$1.300.000» siete años después. Si necesitás el monto exento de una operación
          concreta, buscalo en la resolución de ARCA del trimestre, no en la ley.
        </p>
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
          Otros regímenes impositivos que creó o tocó la misma ley:{" "}
          <Link href="/rimi-inversiones" className="font-medium text-emerald-700 hover:underline">
            el RIMI
          </Link>
          ,{" "}
          <Link href="/plazo-fijo" className="font-medium text-emerald-700 hover:underline">
            la exención de Ganancias a los plazos fijos
          </Link>{" "}
          y{" "}
          <Link href="/monotributo" className="font-medium text-emerald-700 hover:underline">
            las escalas del monotributo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {IMPUESTOS_INTERNOS_FUENTES.lista.map((f) => (
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
          Esta página cita los textos oficiales de la Ley 27.802 y de la Ley 24.674 publicados en
          InfoLEG, no un resumen de prensa. Es informativa: no reemplaza el consejo de un
          profesional ni una liquidación impositiva. Consultada el{" "}
          {IMPUESTOS_INTERNOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
