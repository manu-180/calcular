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
  title: `Impuestos internos eliminados: qué dejó de pagarse el ${VIGENCIA_ELIMINACION}`,
  description:
    "El art. 195 de la Ley 27.802 dejó sin efecto los impuestos internos a seguros, telefonía celular, objetos suntuarios, autos, embarcaciones y aeronaves. Desde el 1 de abril de 2026, no desde el 6 de marzo. Calculá cuánto del importe era impuesto — y por qué el 20% nominal era un 25% real.",
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
    a: `Desde el ${VIGENCIA_ELIMINACION}. La Ley 27.802 se publicó el ${BO_LEY_27802} y rige desde ese día (art. 217), pero el art. 195 no eliminó el impuesto desde la vigencia: lo dejó sin efecto «a partir del primer día del mes inmediato siguiente al de la entrada en vigencia de esta ley». O sea que durante todo marzo de 2026 el impuesto se siguió pagando. Es la diferencia entre la fecha del titular y la fecha que importa para una factura.`,
  },
  {
    q: "¿Qué rubros alcanza el artículo 195?",
    a: "Cinco, y los nombra uno por uno: los seguros, los servicios de telefonía celular y satelital, los objetos suntuarios, y los vehículos automóviles y motores, embarcaciones de recreo o deportes y aeronaves. No alcanza a los demás capítulos de la Ley de Impuestos Internos: tabaco, bebidas alcohólicas, cervezas y bebidas analcohólicas siguen gravados.",
  },
  {
    q: "¿Por qué el 20% nominal era en realidad un 25%?",
    a: "Porque el impuesto integra su propia base. El art. 4° de la Ley 24.674 manda liquidar sobre el precio neto de venta que resulta de la factura y prohíbe descontar de esa base «valor alguno en concepto del impuesto de esta ley». Si el vendedor quiere quedarse con 100 después de pagar el impuesto, tiene que facturar 125: sobre 125, el 20% son 25. La tasa efectiva es alícuota ÷ (1 − alícuota). El 35% de los autos era 53,85% y el 5% del celular, 5,26%.",
  },
  {
    q: "¿Cuánto pagaba un seguro?",
    a: "Depende de cuál, y son tres alícuotas distintas dentro del mismo artículo. El art. 27 fija el 1‰ general sobre las primas de las entidades constituidas en el país, «excepto en el caso de seguros de accidente de trabajo que pagarán el dos con cinco por ciento (2,5%)» —o sea la cuota de ART, que es veinticinco veces la alícuota general—, y el 23% para los seguros hechos por aseguradores radicados fuera del país. Varios seguros ya estaban exentos de antes: los agrícolas, los de vida, los de accidentes personales y los colectivos de internación, cirugía o maternidad.",
  },
  {
    q: "¿El impuesto interno a la ART lo pagaba el empleador?",
    a: "El responsable del ingreso era la aseguradora, pero el 2,5% se calculaba sobre la prima, así que venía dentro de la cuota que el empleador paga por cada trabajador. Es el único de los cinco rubros del art. 195 que es un costo laboral directo, y prácticamente ninguna cobertura de la reforma lo menciona.",
  },
  {
    q: "¿Los objetos suntuarios pagaban una vez o varias?",
    a: "Varias, y son el único caso. El art. 2° dice que los impuestos de la ley inciden «en una sola de las etapas de su circulación, excepto en el caso de los bienes comprendidos en el Capítulo VIII», que es el de los objetos suntuarios; y el art. 35 lo confirma: el 20% se abonaba «en cada una de las etapas de su comercialización». El art. 37 amortigua el arrastre, porque fabricantes, talleristas y revendedores podían computar como pago a cuenta el impuesto pagado por los productos gravados que usaran.",
  },
  {
    q: "¿Qué era un objeto suntuario?",
    a: "Lo enumera el art. 36: piedras preciosas o semipreciosas, piedras duras talladas y perlas; los objetos confeccionados con platino, paladio, oro, plata, cristal, jade, marfil, ámbar, carey, coral, espuma de mar o cristal de roca; las monedas de oro o plata con aditamentos extraños a su cuño; las prendas de vestir de piel de peletería; y las alfombras y tapices de punto anudado o enrollado. Y tenía exenciones curiosas y muy concretas: entre ellas, los anillos de alianza matrimonial.",
  },
  {
    q: "¿Los autos bajaron un 35%?",
    a: "No, y ése es el punto que la mayoría de las notas se saltea. El 35% figura en el art. 39, pero el Decreto 50/2025 (B.O. 31/1/2025) ya lo había reducido al 18% —y el 30% de las motos al 15%, y había dejado sin efecto el 20%— para los bienes de los incisos a) a e) del art. 38, con efectos hasta el 30 de junio de 2027. O sea que en 2026 lo que se estaba pagando era el 18%, no el 35%. Lo que realmente cambia con la ley es que el alivio deja de depender de un decreto con fecha de vencimiento y pasa a estar en la ley.",
  },
  {
    q: "¿Hay algún rubro donde la eliminación sí baje algo que se pagaba?",
    a: "Sí: las aeronaves. El Decreto 50/2025 enumera los incisos a), b), c), d) y e) del art. 38 y deja afuera al f), que son las aeronaves, aviones, hidroaviones, planeadores y helicópteros concebidos para recreo o deportes. Su 20% siguió vigente hasta el 1 de abril de 2026. Y es además el único inciso sin monto exento: el art. 39 dice expresamente «sin aplicarse monto exento para el inciso f)», así que el impuesto corría desde el primer peso.",
  },
  {
    q: "¿Por qué esta página no publica los montos exentos de los autos?",
    a: `Porque no se pueden verificar contra la ley. El art. 39 escribió los importes en 2019 —$1.300.000 para autos y motores, $390.000 para motociclos, $1.700.000 para embarcaciones— y en el mismo artículo mandó actualizarlos cada ${MESES_ACTUALIZACION_MONTOS} meses por el Índice de Precios Internos al por Mayor del INDEC. El valor vigente no está en el texto legal y no se deriva de él. Publicar el número de 2019 como si fuera el de hoy sería inventar un dato: acá se explica la mecánica y se manda a la fuente.`,
  },
  {
    q: "¿La Ley 27.802 eliminó todos los impuestos internos?",
    a: "No. El art. 195 nombra cinco rubros y deja intactos los demás capítulos de la Ley 24.674: tabaco (Capítulo I), bebidas alcohólicas (II), cervezas (III) y bebidas analcohólicas, jarabes, extractos y concentrados (IV). El Título XXV también tiene un art. 196 que toca la Ley de Fomento de la Actividad Cinematográfica, pero eso es otra cosa: no es una alícuota al consumo.",
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
          aeronaves</strong>. Dos cosas que casi nadie publica: no rige desde la ley sino desde el{" "}
          <strong>{VIGENCIA_ELIMINACION}</strong>, y la alícuota que dice el texto{" "}
          <strong>no es lo que encarecía el precio</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={IMPUESTOS_INTERNOS_FUENTES.consultadoEl}>
        <p>
          Los cinco rubros del art. 195 dejaron de tributar impuestos internos el{" "}
          <strong>{VIGENCIA_ELIMINACION}</strong>: la Ley 27.802 se publicó el {BO_LEY_27802} y rige
          desde ese día, pero el artículo dice «a partir del primer día del mes inmediato siguiente».
          Las alícuotas que se fueron: <strong>1‰</strong> el seguro general y{" "}
          <strong>2,5% el de accidentes de trabajo</strong> (art. 27), <strong>23%</strong> el
          asegurador del exterior, <strong>5%</strong> la telefonía celular y satelital (art. 30, con
          las recargas incluidas por el 31), <strong>20% en cada etapa</strong> los objetos suntuarios
          (art. 35) y la escala del art. 39 para vehículos, embarcaciones y aeronaves. Y como el
          impuesto integraba su propia base (art. 4°), <strong>el 20% nominal era un 25%</strong>{" "}
          sobre un precio limpio y el 35%, un 53,85%.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá cuánto era impuesto</h2>
        <p className="text-sm text-zinc-600">
          Elegí el rubro y cargá el importe con impuesto. La calculadora contesta lo que se puede
          contestar con la ley: cuánto de ese importe era impuesto interno y cuánto encarecía sobre
          un precio sin él. No cuánto va a bajar la góndola: eso lo decide el vendedor.
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
          Es un artículo entero para eliminar cinco impuestos, y no toca ni un artículo de la ley que
          los crea: la Ley 24.674 sigue con sus capítulos completos, con las alícuotas escritas, y lo
          que cambia es que dejan de aplicarse a esos rubros. Por eso conviene leer las dos normas
          juntas — el texto de la ley vieja sigue siendo el que dice cuánto era.
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
          Traducido: el impuesto <strong>no se descuenta de su propia base</strong>. Se calcula sobre
          el importe facturado, que ya lo contiene. Si el vendedor quiere quedarse con $100 después
          de pagarlo, tiene que facturar $125 — y el 20% de $125 son los $25 del impuesto. El
          sobrecosto real sobre un precio limpio es alícuota ÷ (1 − alícuota).
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
          El decreto dejó sin efecto el 20% y, en sus artículos 2° y 3°, redujo el 35% al{" "}
          <strong>18%</strong> y el 30% de las motos al <strong>15%</strong>, con efectos hasta el 30
          de junio de 2027. O sea que durante 2026, antes de la ley, la alícuota que se pagaba por un
          auto de gama alta era el 18%. Titular y realidad no coinciden — y lo que la Ley 27.802
          cambia de verdad es otra cosa: <strong>el alivio deja de depender de un decreto</strong> con
          fecha de vencimiento.
        </p>
        <p className="text-sm text-zinc-600">
          Y hay un detalle en la enumeración del decreto que decide un rubro entero: nombra los
          incisos <strong>a), b), c), d) y e)</strong> del art. 38 y <strong>no nombra el f)</strong>,
          que son las aeronaves, aviones, hidroaviones, planeadores y helicópteros de recreo. Su 20%
          nunca se suspendió, y encima el art. 39 dice «sin aplicarse monto exento para el inciso
          f)»: corría desde el primer peso. Es el único rubro del Capítulo IX donde la eliminación
          baja algo que efectivamente se estaba pagando.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Objetos suntuarios: el único que pagaba en cada etapa
        </h2>
        <div className="space-y-3">
          {[
            {
              art: "Art. 2° — la regla de la etapa única, y su excepción",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art2,
              porQue:
                "Todos los impuestos internos inciden una sola vez en la cadena. Todos menos el Capítulo VIII, que es el de los objetos suntuarios. La excepción está escrita en la regla general, no en el capítulo.",
            },
            {
              art: "Art. 35 — el 20% en cada etapa de comercialización",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art35,
              porQue:
                "Fabricante, mayorista y joyería: cada venta gravada. Por eso el impacto sobre el precio final de una joya no era el 20% ni el 25%, sino lo que resultara de la cadena concreta.",
            },
            {
              art: "Art. 37 — el pago a cuenta que evita el arrastre completo",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art37,
              porQue:
                "Fabricantes, talleristas y revendedores podían computar contra su propio impuesto el que ya se había pagado sobre los productos gravados que usaran. Sin este artículo, el 20% se apilaría en cascada; con él, el efecto depende de cuánto de la cadena esté alcanzado.",
            },
            {
              art: "Art. 36 — qué era un objeto suntuario",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art36,
              porQue:
                "La lista es más ancha de lo que sugiere la palabra «suntuario»: entra el cristal, entran las alfombras de punto anudado y entra cualquier objeto que use plata «en cualquier forma o proporción».",
            },
            {
              art: "Art. 36 — las exenciones, incluida la alianza matrimonial",
              texto: IMPUESTOS_INTERNOS_TEXTOS.art36Exenciones,
              porQue:
                "Los anillos de alianza matrimonial estaban exentos por nombre propio, igual que el instrumental científico, los objetos del culto y las condecoraciones oficiales. También los artículos a los que el material precioso se agrega «bajo la forma de baño, fileteado, virola, guarda, esquinero, monograma».",
            },
          ].map((a) => (
            <details
              key={a.art}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
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
          La excepción va al final de la oración y es <strong>veinticinco veces</strong> la alícuota
          general: el <strong>2,5% sobre la prima de los seguros de accidente de trabajo</strong>, o
          sea sobre la cuota de ART que paga el empleador por cada trabajador. Es el único de los
          cinco rubros del art. 195 que es un costo laboral directo, y prácticamente ninguna
          cobertura de la reforma lo separa del 1‰ general.
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Artículo sin número a continuación del art. 29 — lo que ya estaba exento
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{IMPUESTOS_INTERNOS_TEXTOS.segurosExentos}»
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Para esos seguros el art. 195 no cambia nada: ya no tributaban. Distinguirlos importa
          porque es la diferencia entre «me baja la póliza» y «no me cambia nada».
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
          El 5% se calculaba sobre el <strong>importe facturado al usuario</strong>, y el art. 31
          estiraba el alcance a las tarjetas prepagas y recargables: la recarga de un prepago pagaba
          lo mismo que el abono de una línea con factura. Con el art. 4° a la vista, el sobrecosto
          sobre un precio sin impuesto era del {pct(efectiva(0.05))}.
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
          El art. 39 escribió los pisos en 2019 y en el mismo párrafo mandó actualizarlos cada{" "}
          {MESES_ACTUALIZACION_MONTOS} meses por el Índice de Precios Internos al por Mayor. El valor
          vigente no está en la ley y no se deriva de ella. Publicar el número de 2019 como si fuera
          el de hoy sería fabricar un dato — el mismo error que hace que medio internet siga citando
          «$1.300.000» siete años después. Si necesitás el monto exento de una operación concreta,
          hay que buscarlo en la resolución de ARCA del trimestre, no en el texto legal.
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página cita los textos oficiales de la Ley 27.802 y de la Ley 24.674 publicados en
          InfoLEG — no un resumen de prensa. Es informativa y orientativa: no reemplaza el
          asesoramiento de un profesional ni una liquidación impositiva. Consultada el{" "}
          {IMPUESTOS_INTERNOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
