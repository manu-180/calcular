import type { Metadata } from "next";
import { FirmaAutor } from "@/components/FirmaAutor";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { ASIGNACIONES_FUENTES, ASIGNACIONES_VIGENTES } from "@/data/asignaciones";
import { calcularAsignaciones, desglose8020, etiquetaTramo } from "@/lib/asignaciones";
import { formatARS, formatPct } from "@/lib/formato";

const PUBLICADO = "4 de agosto de 2026";
const SLUG = "/blog/tope-de-ingresos-asignaciones-familiares";

const V = ASIGNACIONES_VIGENTES;
const MES = V.vigencia;
const $ = (n: number) => formatARS(n, 0);

// ── Todo lo numérico sale de la tabla oficial y del motor, nunca escrito a mano ──
// (regla 2-2, s41: si un número de prosa depende de un dato vivo, se deriva del dato).

/** Los tres escalones internos de la tabla de hijo, con lo que cuesta cruzar cada uno. */
const ESCALONES = V.hijo.slice(0, -1).map((t, i) => ({
  limite: t.hasta ?? 0,
  antes: t.montos.general,
  despues: V.hijo[i + 1].montos.general,
  perdida: t.montos.general - V.hijo[i + 1].montos.general,
}));

/** El cuarto escalón: cruzar el tope grupal no baja de tramo, saca del régimen. */
const ULTIMO_ESCALON = {
  limite: V.topeIgfGrupo,
  antes: V.hijo[V.hijo.length - 1].montos.general,
  perdida: V.hijo[V.hijo.length - 1].montos.general,
};

/** Cuánto se pierde por año al cruzar el primer escalón con dos hijos. */
const PERDIDA_ANUAL_2_HIJOS = ESCALONES[0].perdida * 2 * 12;

/** Caso trabajado: una pareja justo abajo del primer límite, con dos hijos. */
const CASO_ANTES = calcularAsignaciones({
  ingresos: [700_000, 460_000],
  zona: "general",
  hijos: 2,
  hijosDiscapacidad: 0,
  prenatal: false,
  conyuge: false,
  ayudaEscolar: false,
});
const AUMENTO = 20_000;
const CASO_DESPUES = calcularAsignaciones({
  ingresos: [700_000 + AUMENTO, 460_000],
  zona: "general",
  hijos: 2,
  hijosDiscapacidad: 0,
  prenatal: false,
  conyuge: false,
  ayudaEscolar: false,
});
const NETO_DEL_AUMENTO =
  AUMENTO + CASO_DESPUES.totalMensual - CASO_ANTES.totalMensual;

/** El caso del tope individual: dos sueldos que suman menos que el tope grupal. */
const CASO_INDIVIDUAL = calcularAsignaciones({
  ingresos: [3_200_000, 300_000],
  zona: "general",
  hijos: 1,
  hijosDiscapacidad: 0,
  prenatal: false,
  conyuge: false,
  ayudaEscolar: false,
});
/** El mismo dinero, repartido distinto entre dos personas. */
const CASO_REPARTIDO = calcularAsignaciones({
  ingresos: [1_750_000, 1_750_000],
  zona: "general",
  hijos: 1,
  hijosDiscapacidad: 0,
  prenatal: false,
  conyuge: false,
  ayudaEscolar: false,
});

const AUH = desglose8020(V.universales.hijo.general);

export const metadata: Metadata = {
  title: "El tope de las asignaciones familiares: los dos límites",
  description:
    "Hay un tope del grupo familiar y uno individual que deja afuera a toda la familia si una persona lo supera. Los montos del mes y los escalones.",
  alternates: { canonical: SLUG },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("El tope de las asignaciones familiares")}&s=${encodeURIComponent("Son dos topes, y el que decide casi nunca es el que publican")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuál es el tope para cobrar asignaciones familiares en ${MES}?`,
    a: `Hay dos, y tenés que cumplir los dos. El Ingreso del Grupo Familiar no puede pasar de ${$(V.topeIgfGrupo)}, y ninguna persona del grupo, por separado, puede pasar de ${$(V.topeIgfIndividual)}. Si una sola persona supera el tope individual, queda afuera todo el grupo familiar, aunque la suma esté por debajo del tope grupal. Los valores son de ${MES}, según la ${V.resolucion}, y cambian todos los meses.`,
  },
  {
    q: "Me aumentaron el sueldo y ahora cobro menos, ¿es un error?",
    a: `No, así está armada la tabla: los tramos son escalones, no una rampa. Cruzar el primer límite (${$(ESCALONES[0].limite)} de ingreso del grupo) baja la asignación de ${$(ESCALONES[0].antes)} a ${$(ESCALONES[0].despues)} por hijo, o sea ${$(ESCALONES[0].perdida)} menos por mes y por hijo. Con dos hijos son ${$(ESCALONES[0].perdida * 2)} por mes. Cualquier aumento menor a esa cifra que te haga cruzar el límite deja al grupo con menos plata que antes.`,
  },
  {
    q: "¿Qué ingresos se cuentan para el IGF?",
    a: "Se suman los sueldos brutos y las sumas no remunerativas que el empleador declara en el formulario 931, las rentas de referencia de autónomos, monotributistas y personal de casas particulares, las jubilaciones y pensiones, la prestación por desempleo, los planes sociales y cualquier otra prestación, contributiva o no. Quedan afuera, de forma expresa, las horas extras, el plus por zona desfavorable y el aguinaldo.",
  },
  {
    q: "¿A los hijos con discapacidad también les aplica el tope?",
    a: "No. Con la autorización de ANSES vigente, la asignación por hijo con discapacidad no tiene topes de ingreso, ni individuales ni del grupo familiar. Se cobra aunque el grupo quede afuera del resto de las asignaciones, y también cuando el hijo es mayor de 18 años.",
  },
  {
    q: "Nos separamos, ¿sigue contando el ingreso del otro progenitor?",
    a: "El IGF es el del grupo familiar, que no siempre son los dos progenitores. Si el grupo cambió (separación, fallecimiento, un hijo que dejó de estar a cargo), tenés que actualizarlo en Mi ANSES: mientras siga el dato viejo, la cuenta lo sigue usando. Es una de las causas más comunes de que alguien deje de cobrar sin haber cambiado de sueldo.",
  },
  {
    q: "¿Cada cuánto cambian los topes?",
    a: "Todos los meses. Desde el Decreto 274/2024, los montos y los rangos suben según el índice de precios al consumidor del INDEC de dos meses antes, con una resolución de ANSES a fin del mes anterior. Es la misma movilidad que la de las jubilaciones. Así que quedar afuera un mes no es quedar afuera para siempre: los límites suben todos los meses.",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "El tope de las asignaciones familiares: los dos límites",
        descripcion:
          "Los dos topes de ingreso de las asignaciones familiares, qué entra y qué no en el IGF, y los escalones que hacen que un aumento chico te haga cobrar menos.",
        url: SLUG,
        modificado: ASIGNACIONES_FUENTES.consultadoEl,
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
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-sm text-zinc-500">
          <FirmaAutor prefijo="Por" /> · publicado el {PUBLICADO}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          El tope de las asignaciones familiares: por qué un solo sueldo puede dejar afuera a toda la
          familia
        </h1>
        <p className="text-lg text-zinc-600">
          Todos los meses sale la noticia con el monto nuevo por hijo y un número de tope. Pero los
          topes son dos, el que decide casi siempre es el que no se publica, y entre medio hay
          escalones que pueden hacer que un aumento de sueldo te deje con menos plata en la mano.
        </p>
      </header>

      <RespuestaPrimero actualizado={ASIGNACIONES_FUENTES.consultadoEl}>
        <p>
          Para cobrar asignaciones familiares en {MES} hay que cumplir <strong>dos</strong>
          condiciones a la vez: que el Ingreso del Grupo Familiar (IGF) no supere{" "}
          <strong>{$(V.topeIgfGrupo)}</strong> y que <strong>ninguna persona</strong> del grupo,
          por separado, supere <strong>{$(V.topeIgfIndividual)}</strong>. Si una sola se pasa del
          tope individual, queda excluido <strong>todo el grupo familiar</strong>. El IGF no incluye
          horas extras, plus por zona desfavorable ni aguinaldo. Y dentro del régimen hay cuatro
          tramos que funcionan como escalones: cruzar el primero cuesta{" "}
          <strong>{$(ESCALONES[0].perdida)}</strong> por hijo y por mes. La asignación por hijo con
          discapacidad es la excepción: no tiene tope de ingresos.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Son dos topes, no uno</h2>
        <p className="text-zinc-600">
          La cartilla oficial de ANSES pone los dos en la misma página, pero las notas suelen citar
          solo el primero. En la práctica, el segundo es el que decide casi todos los casos.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Tope del grupo familiar
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{$(V.topeIgfGrupo)}</p>
            <p className="mt-2 text-sm text-zinc-600">
              La suma de los ingresos brutos de todos los integrantes del grupo.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Tope individual
            </p>
            <p className="mt-1 text-2xl font-bold text-amber-900">{$(V.topeIgfIndividual)}</p>
            <p className="mt-2 text-sm text-amber-900">
              Si <strong>una sola persona</strong> lo supera, se excluye a{" "}
              <strong>todo el grupo</strong>, aunque la suma esté muy por debajo del tope grupal.
            </p>
          </div>
        </div>
        <p className="text-zinc-600">
          El detalle que hace la diferencia: el tope individual es{" "}
          <strong>exactamente la mitad</strong> del grupal ({$(V.topeIgfIndividual)} × 2 ={" "}
          {$(V.topeIgfIndividual * 2)}). En una pareja de dos sueldos, entonces, es{" "}
          <em>imposible</em> pasarse del tope grupal sin que alguno de los dos se haya pasado antes
          del individual. Dicho al revés: en una familia de dos ingresos, el tope que te deja afuera
          es siempre el individual, y es el que casi nunca aparece en las notas.
        </p>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="font-semibold text-zinc-800">
            El mismo dinero, repartido distinto, cobra distinto
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-rose-50 p-4">
              <p className="text-sm text-rose-900">Una persona gana {$(3_200_000)}, la otra {$(300_000)}</p>
              <p className="mt-1 text-xs text-rose-800">
                IGF {$(CASO_INDIVIDUAL.igf)}, por debajo del tope grupal
              </p>
              <p className="mt-2 text-2xl font-bold text-rose-900">
                {$(CASO_INDIVIDUAL.totalMensual)}
              </p>
              <p className="mt-1 text-sm text-rose-900">
                No cobran nada: quien gana {$(3_200_000)} superó el tope individual y eso excluye al
                grupo entero.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm text-emerald-900">
                Cada una gana {$(1_750_000)}
              </p>
              <p className="mt-1 text-xs text-emerald-800">
                IGF {$(CASO_REPARTIDO.igf)}, el mismo total
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">
                {$(CASO_REPARTIDO.totalMensual)} por mes
              </p>
              <p className="mt-1 text-sm text-emerald-900">
                Con un hijo. Nadie supera el tope individual, así que el grupo cobra según su tramo.
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Las dos familias tienen exactamente el mismo ingreso total ({$(CASO_INDIVIDUAL.igf)}).
            La única diferencia es cómo está repartido.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Qué entra y qué no entra en el ingreso que se mira
        </h2>
        <p className="text-zinc-600">
          El número que hay que comparar contra los topes casi nunca es el bruto que figura abajo del
          recibo. El IGF tiene una definición propia, y lo que deja afuera puede ser justo lo que te
          estaba haciendo pasar el límite.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <p className="font-semibold text-emerald-900">Sí se suma</p>
            <ul className="mt-2 space-y-1 text-sm text-emerald-900">
              <li>Remuneraciones brutas del formulario 931</li>
              <li>Sumas no remunerativas declaradas por el empleador</li>
              <li>Rentas de referencia de autónomos y monotributistas</li>
              <li>Personal de casas particulares</li>
              <li>Jubilaciones y pensiones</li>
              <li>Prestación por desempleo</li>
              <li>Planes sociales y otras prestaciones</li>
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="font-semibold text-zinc-800">No se suma</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              <li>Horas extras</li>
              <li>Plus por zona desfavorable</li>
              <li>Aguinaldo (SAC)</li>
            </ul>
            <p className="mt-3 text-sm text-zinc-500">
              Por eso en junio y en diciembre, los meses del aguinaldo, el ingreso que mira ANSES no
              se duplica: el medio aguinaldo queda afuera del cálculo.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los escalones: cuándo un aumento te deja cobrando menos
        </h2>
        <p className="text-zinc-600">
          Dentro del régimen hay cuatro tramos de ingreso, y el paso de uno a otro no es gradual: es
          un escalón. Un peso más de IGF puede bajar la asignación varias decenas de miles de pesos
          por mes y por hijo. Estos son los cuatro saltos de {MES}, en el valor general:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Al pasar un IGF de…</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Cobrabas</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Pasás a cobrar</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Perdés por hijo</th>
                </tr>
              </thead>
              <tbody>
                {ESCALONES.map((e) => (
                  <tr key={e.limite} className="border-t border-zinc-100">
                    <td className="whitespace-nowrap px-4 py-2.5 text-zinc-600">{$(e.limite)}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">{$(e.antes)}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">{$(e.despues)}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-rose-700">
                      −{$(e.perdida)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-zinc-100 bg-rose-50/50">
                  <td className="whitespace-nowrap px-4 py-2.5 text-zinc-600">
                    {$(ULTIMO_ESCALON.limite)}
                    <span className="block text-xs text-zinc-400">el tope grupal</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {$(ULTIMO_ESCALON.antes)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">$0</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-rose-700">
                    −{$(ULTIMO_ESCALON.perdida)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="pt-2 text-lg font-semibold text-zinc-900">Un caso con números reales</h3>
        <p className="text-zinc-600">
          Una pareja con dos hijos: una persona gana {$(700_000)} y la otra {$(460_000)}. El IGF es{" "}
          {$(CASO_ANTES.igf)}, dentro del primer tramo ({etiquetaTramo(V.hijo[0])}), así que cobran{" "}
          <strong>{$(CASO_ANTES.totalMensual)}</strong> por mes de asignaciones. Están a{" "}
          {$(CASO_ANTES.escalon?.margen ?? 0)} del primer escalón.
        </p>
        <p className="text-zinc-600">
          Le dan un aumento de <strong>{$(AUMENTO)}</strong> a la primera persona. El IGF pasa a{" "}
          {$(CASO_DESPUES.igf)} y cruza el límite: la asignación cae a{" "}
          <strong>{$(CASO_DESPUES.totalMensual)}</strong>. Sumando las dos cosas, el aumento de{" "}
          {$(AUMENTO)} deja a la familia con{" "}
          <strong className="text-rose-700">{$(Math.abs(NETO_DEL_AUMENTO))} menos</strong> por mes.
        </p>
        <div className="rounded-xl bg-amber-50 p-5 text-amber-900">
          <p className="font-semibold">La regla práctica</p>
          <p className="mt-1 text-sm">
            Un aumento que te hace cruzar un escalón solo conviene si es mayor a lo que perdés. En
            el primer escalón, con dos hijos, eso son {$(ESCALONES[0].perdida * 2)} por mes, o{" "}
            {$(PERDIDA_ANUAL_2_HIJOS)} por año. No es para rechazar aumentos: los topes y los tramos
            suben todos los meses con la inflación, así que la caída suele durar poco. Pero conviene
            saber cuándo va a pasar, porque ese mes duele.
          </p>
        </div>
        <p className="text-zinc-600">
          En la{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            calculadora de asignaciones familiares
          </Link>{" "}
          podés cargar los ingresos reales de tu casa y ver a qué distancia estás del próximo
          escalón y cuánto te costaría cruzarlo con tu grupo familiar.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las dos excepciones que conviene conocer</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <p className="font-semibold text-emerald-900">
              La asignación por hijo con discapacidad no tiene tope
            </p>
            <p className="mt-1 text-sm text-emerald-900">
              Con la autorización de ANSES vigente no tiene topes de ingreso, ni individuales ni del
              grupo familiar. Se cobra aunque el grupo quede afuera del resto de las asignaciones, y
              también cuando el hijo es mayor de 18 años. En {MES} va de{" "}
              {$(V.hijoDiscapacidad[2].montos.general)} a {$(V.hijoDiscapacidad[0].montos.general)}{" "}
              por mes en el valor general, según el tramo, pero nunca te deja afuera.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="font-semibold text-zinc-800">
              La ayuda escolar anual tiene su propio tope
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              En {MES} el tope de IGF de la ayuda escolar es {$(V.topeIgfAyudaEscolar)}, distinto del
              tope general de {$(V.topeIgfGrupo)}: la resolución del mes no lo actualizó, igual que
              tampoco movió el monto ({$(V.ayudaEscolar.base.general)} más el refuerzo del Decreto
              115/26 de {$(V.ayudaEscolar.refuerzo.general)}, {$(V.ayudaEscolar.total.general)} en
              total). Es un detalle chico que puede dejar afuera de la ayuda escolar a un grupo que
              sí cobra la asignación por hijo.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Si dejaste de cobrar y tu sueldo no cambió
        </h2>
        <p className="text-zinc-600">
          Antes de dar por perdida la asignación, vale revisar estas cuatro cosas, que son las que
          más veces explican una baja sin aumento de por medio:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-zinc-600">
          <li>
            <strong>La composición del grupo familiar.</strong> Una separación, un fallecimiento o un
            hijo que dejó de estar a cargo cambian el IGF, pero recién cuando se actualizan en Mi
            ANSES. Mientras el dato viejo siga cargado, el cálculo lo sigue usando.
          </li>
          <li>
            <strong>Un ingreso que se sumó sin que lo notaras.</strong> Una jubilación, una pensión,
            un plan o una segunda actividad entran al IGF aunque no vengan de tu empleador.
          </li>
          <li>
            <strong>Las horas extras mal computadas.</strong> No deberían entrar al IGF. Si el
            empleador las declaró como remuneración común en el formulario 931, están inflando tu
            ingreso a los ojos del régimen.
          </li>
          <li>
            <strong>La zona declarada.</strong> Para trabajadores en relación de dependencia la zona
            es la del lugar de explotación declarado ante ARCA, no la de tu domicilio. Cambia el
            monto, no el tope, pero explica diferencias grandes entre dos personas del mismo tramo.
          </li>
        </ol>
        <p className="text-zinc-600">
          Y si cobrás AUH, tené presente que el monto publicado no es el que llega a la cuenta: de
          los {$(V.universales.hijo.general)} de {MES} se depositan {$(AUH.mensual)} por mes y se
          retiene el 20% ({$(AUH.retenido)}), que se cobra junto una vez al año contra la
          presentación de la Libreta AUH. En doce meses son {$(AUH.retenido * 12)} que se pierden si
          la libreta no se presenta.
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
      </section>

      <section className="space-y-2 text-sm text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-700">Seguí con</h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/asignaciones-familiares"
              className="font-medium text-emerald-700 hover:underline"
            >
              Calculadora de asignaciones familiares y AUH
            </Link>
            : tu tramo, tu zona y a qué distancia estás del escalón.
          </li>
          <li>
            <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
              Calculadora de sueldo neto
            </Link>
            : para saber el bruto exacto que entra en el IGF.
          </li>
          <li>
            <Link href="/jubilacion" className="font-medium text-emerald-700 hover:underline">
              Jubilación: aumento y bono
            </Link>
            : la misma movilidad mensual que mueve estos topes.
          </li>
          <li>
            <Link href="/canasta-basica" className="font-medium text-emerald-700 hover:underline">
              Canasta básica
            </Link>
            : cuánto necesita tu hogar para no quedar bajo la línea de pobreza.
          </li>
        </ul>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          <li>
            <a
              href={V.resolucionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {V.resolucion}
            </a>
            : aumento del {formatPct(V.movilidad)} en montos, límites y rangos de {MES} (
            {V.resolucionBO}).
          </li>
          <li>
            <a
              href={V.cartillaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {ASIGNACIONES_FUENTES.cartilla.nombre}
            </a>
            : topes, tramos y montos por zona.
          </li>
          <li>
            <a
              href={ASIGNACIONES_FUENTES.discapacidadSinTope.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {ASIGNACIONES_FUENTES.discapacidadSinTope.nombre}
            </a>
            .
          </li>
          <li>
            <a
              href={ASIGNACIONES_FUENTES.ley.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {ASIGNACIONES_FUENTES.ley.nombre}
            </a>
            : consultada el {ASIGNACIONES_FUENTES.consultadoEl}.
          </li>
        </ul>
        <p className="pt-2">
          Nota informativa sobre valores oficiales de ANSES. No es asesoramiento previsional ni
          reemplaza a ANSES: el importe que se acredita depende de la situación particular de cada
          grupo familiar.
        </p>
      </section>
    </article>
  );
}
