import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraAsignaciones } from "@/components/CalculadoraAsignaciones";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import {
  ASIGNACIONES_FUENTES,
  ASIGNACIONES_VIGENTES,
  PAGO_UNICO,
  ZONAS,
} from "@/data/asignaciones";
import { desglose8020, etiquetaTramo } from "@/lib/asignaciones";
import { formatARS, formatPct } from "@/lib/formato";

const V = ASIGNACIONES_VIGENTES;
const MES = V.vigencia;

const AUH = desglose8020(V.universales.hijo.general);
const ESCALON_1_2 = V.hijo[0].montos.general - V.hijo[1].montos.general;

export const metadata: Metadata = {
  title: `Asignaciones familiares ${MES}: cuánto cobrás por hijo según tu ingreso`,
  description: `La asignación por hijo de ${MES} va de ${formatARS(V.hijo[3].montos.general, 0)} a ${formatARS(V.hijo[0].montos.general, 0)} según el ingreso del grupo familiar. Poné los sueldos de tu casa y mirá tu tramo, tu zona y a qué distancia estás del escalón que te hace perder plata. Res. ANSES 233/2026.`,
  alternates: { canonical: "/asignaciones-familiares" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Asignaciones familiares · ${MES}`)}&s=${encodeURIComponent("Cuánto cobrás por hijo según el ingreso de tu grupo")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto se cobra por hijo en ${MES} de 2026?`,
    a: `Depende del Ingreso del Grupo Familiar (IGF). En ${MES}, para el valor general: ${formatARS(V.hijo[0].montos.general, 0)} con un IGF de hasta ${formatARS(V.hijo[0].hasta ?? 0, 0)}; ${formatARS(V.hijo[1].montos.general, 0)} hasta ${formatARS(V.hijo[1].hasta ?? 0, 0)}; ${formatARS(V.hijo[2].montos.general, 0)} hasta ${formatARS(V.hijo[2].hasta ?? 0, 0)}; y ${formatARS(V.hijo[3].montos.general, 0)} hasta el tope de ${formatARS(V.topeIgfGrupo, 0)}. En las zonas 1 a 4 los montos son más altos. Los valores salen de la ${V.resolucion}, que fijó un aumento de ${formatPct(V.movilidad)}.`,
  },
  {
    q: "¿Qué es el IGF y qué se suma para calcularlo?",
    a: "El Ingreso del Grupo Familiar es la suma de los ingresos brutos de todos los integrantes del grupo: remuneraciones y sumas no remunerativas declaradas por el empleador en el formulario 931, rentas de referencia de autónomos, monotributistas y personal de casas particulares, jubilaciones y pensiones, prestación por desempleo, planes sociales y cualquier otra prestación contributiva o no contributiva. Lo importante es lo que NO se suma: horas extras, el plus por zona desfavorable y el aguinaldo quedan afuera del cálculo. Por eso el número que hay que mirar casi nunca es el bruto que figura abajo del recibo.",
  },
  {
    q: "Gano poco pero mi pareja gana mucho: ¿cobramos igual?",
    a: `No, y acá está la regla que menos se explica. Además del tope del grupo (${formatARS(V.topeIgfGrupo, 0)}) hay un tope individual de ${formatARS(V.topeIgfIndividual, 0)}: si una sola persona del grupo lo supera, se excluye del cobro a todo el grupo familiar, aunque la suma esté por debajo del tope grupal. Es decir que un grupo puede quedar afuera sin haber llegado nunca al tope general, sólo porque uno de los dos ingresos es alto.`,
  },
  {
    q: "¿Conviene aceptar un aumento si me hace cambiar de tramo?",
    a: `Los tramos son escalones, no una rampa: un peso más de IGF puede bajar la asignación de golpe. En ${MES}, pasar del primer al segundo tramo hace perder ${formatARS(ESCALON_1_2, 0)} por hijo y por mes. Con dos hijos son ${formatARS(ESCALON_1_2 * 2, 0)} mensuales, así que un aumento menor a esa cifra que cruce el límite deja al grupo cobrando menos que antes. La calculadora de esta página muestra a qué distancia estás del próximo escalón y cuánto cuesta cruzarlo con tu grupo familiar.`,
  },
  {
    q: "¿La asignación por hijo con discapacidad tiene tope de ingresos?",
    a: "No. Con la autorización de ANSES vigente, para la asignación por hijo con discapacidad no rigen topes máximos de ingreso, ni individuales ni del grupo familiar. Se cobra aunque el grupo esté excluido del resto de las asignaciones por superar los topes, y corresponde también cuando el hijo es mayor de 18 años. Es la excepción más valiosa del régimen y la que menos aparece en las notas.",
  },
  {
    q: `¿Cuánto es la AUH en ${MES} y por qué me depositan menos?`,
    a: `La AUH por hijo de ${MES} es de ${formatARS(V.universales.hijo.general, 0)} en el valor general, pero ANSES deposita el 80% (${formatARS(AUH.mensual, 0)}) y retiene el 20% (${formatARS(AUH.retenido, 0)}). Ese 20% se acumula y se cobra una vez al año, contra la presentación de la Libreta AUH con los controles de salud y la escolaridad al día. En doce meses son ${formatARS(AUH.retenido * 12, 0)} que se pierden si la libreta no se presenta. Para la Asignación por Embarazo el mecanismo es el mismo, con el formulario y la constancia del Plan Nacer/Sumar.`,
  },
  {
    q: "Soy monotributista, ¿cuánto me corresponde?",
    a: `El monto lo fija la categoría, no el ingreso del grupo familiar: ${formatARS(V.monotributo.hijo.A ?? 0, 0)} por hijo en la categoría A, ${formatARS(V.monotributo.hijo.B ?? 0, 0)} en la B, ${formatARS(V.monotributo.hijo.C ?? 0, 0)} en la C y ${formatARS(V.monotributo.hijo.D_H ?? 0, 0)} de la D a la H. Las categorías I, J y K no perciben asignación por hijo ni prenatal, pero sí la de hijo con discapacidad (${formatARS(V.monotributo.hijoDiscapacidad.I_K, 0)}). Hay que estar al día con los pagos del monotributo. No hay diferencia por zona: siempre se cobra el valor general.`,
  },
  {
    q: "¿Cuándo aumentan las asignaciones familiares?",
    a: "Todos los meses. Desde el Decreto 274/2024 rige la movilidad mensual: los montos y los rangos de ingreso se actualizan por la variación del índice de precios al consumidor del INDEC de dos meses antes. ANSES lo oficializa con una resolución a fin del mes anterior. Como es la misma fórmula que la de las jubilaciones, en cuanto el INDEC publica el IPC (alrededor del día 12) el aumento de dos meses después ya queda determinado.",
  },
  {
    q: "¿La ayuda escolar anual también aumentó?",
    a: `No este mes. Según la cartilla oficial de ${MES}, la ayuda escolar anual mantiene el monto de julio: ${formatARS(V.ayudaEscolar.base.general, 0)} más el refuerzo extraordinario del Decreto 115/26 de ${formatARS(V.ayudaEscolar.refuerzo.general, 0)}, o sea ${formatARS(V.ayudaEscolar.total.general, 0)} en total para el valor general. También conserva su propio tope de IGF, de ${formatARS(V.topeIgfAyudaEscolar, 0)}, que quedó por debajo del tope general. Se cobra una vez por ciclo lectivo, por hijo, contra el certificado de escolaridad.`,
  },
  {
    q: "¿Esto es lo que me va a depositar ANSES?",
    a: "Es lo que sale de aplicar la tabla oficial del mes al ingreso que cargaste, no una liquidación. El importe real puede diferir por la fecha de alta del beneficio, por altas y bajas en el grupo familiar durante el mes, por la zona que declaró el empleador ante ARCA (que no siempre coincide con dónde vivís) y por retenciones. Para tu caso puntual, la fuente es ANSES.",
  },
];

export default function AsignacionesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de asignaciones familiares, SUAF y AUH",
        url: "https://calcular.ar/asignaciones-familiares",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `Montos y rangos de asignaciones familiares, AUH y embarazo — ${MES} (ANSES)`,
        descripcion: `Tabla completa de asignaciones familiares de ${MES}: cuatro tramos de Ingreso del Grupo Familiar por las cinco zonas, asignación por hijo con discapacidad sin tope, montos por categoría de monotributo, AUH y Asignación por Embarazo con el desglose 80/20, ayuda escolar anual y topes de ingreso individual y grupal. Fuente: ${V.resolucion}.`,
        url: "/asignaciones-familiares",
        modificado: `${V.periodo}-01`,
        fuenteNombre: ASIGNACIONES_FUENTES.cartilla.nombre,
        fuenteUrl: V.cartillaUrl,
      }),
      articleSchema({
        titulo: `Asignaciones familiares ${MES}: cuánto cobrás por hijo según tu ingreso`,
        descripcion:
          "Tramos de ingreso, zonas, topes individual y grupal, monotributo y AUH, calculados sobre la resolución oficial del mes.",
        url: "/asignaciones-familiares",
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
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Asignaciones familiares de {MES}: cuánto cobrás <em>vos</em>
        </h1>
        <p className="text-zinc-600">
          Las notas del mes publican el monto máximo, el del primer tramo. Pero lo que cobrás depende
          de cuánto suma tu casa, de la zona y de dos topes distintos —uno de ellos deja afuera a
          todo el grupo por el sueldo de una sola persona. Cargá los ingresos reales y mirá tu
          número, con la tabla oficial de ANSES.
        </p>
      </header>

      <RespuestaPrimero actualizado={ASIGNACIONES_FUENTES.consultadoEl}>
        <p>
          En {MES} la asignación por hijo va de{" "}
          <strong>{formatARS(V.hijo[0].montos.general, 0)}</strong> (con un Ingreso del Grupo
          Familiar de hasta {formatARS(V.hijo[0].hasta ?? 0, 0)}) a{" "}
          <strong>{formatARS(V.hijo[3].montos.general, 0)}</strong> en el último tramo, según la{" "}
          {V.resolucion} ({V.resolucionBO}), que aplicó un aumento de{" "}
          <strong>{formatPct(V.movilidad)}</strong>. El tope de ingreso del grupo es{" "}
          <strong>{formatARS(V.topeIgfGrupo, 0)}</strong>, pero además hay un tope{" "}
          <strong>individual</strong> de {formatARS(V.topeIgfIndividual, 0)}: si una sola persona lo
          supera, queda excluido <strong>todo el grupo familiar</strong>. El IGF no incluye horas
          extras, plus por zona ni aguinaldo. La asignación por hijo con discapacidad{" "}
          <strong>no tiene tope de ingresos</strong>. La AUH es de{" "}
          <strong>{formatARS(V.universales.hijo.general, 0)}</strong>, de la que se depositan{" "}
          {formatARS(AUH.mensual, 0)} por mes y se retiene el 20% para la Libreta.
        </p>
      </RespuestaPrimero>

      <CalculadoraAsignaciones />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los dos topes: por qué un grupo puede quedar afuera sin pasarse del límite
        </h2>
        <p className="text-zinc-600">
          Casi todas las notas publican un solo número, el tope del grupo familiar. Pero la cartilla
          oficial fija dos, y el segundo es el que sorprende.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Tope del grupo familiar
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {formatARS(V.topeIgfGrupo, 0)}
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              La suma de los ingresos brutos de todos los integrantes. Si se pasa, el grupo no cobra
              asignaciones.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Tope individual
            </p>
            <p className="mt-1 text-2xl font-bold text-amber-900">
              {formatARS(V.topeIgfIndividual, 0)}
            </p>
            <p className="mt-2 text-sm text-amber-900">
              Si <strong>una sola persona</strong> del grupo lo supera, se excluye a{" "}
              <strong>todo el grupo</strong>, aunque la suma esté muy por debajo del tope grupal.
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Como el tope individual es exactamente la mitad del grupal, en una pareja de dos sueldos es
          imposible pasarse del grupal sin que alguno se pase antes del individual: en la práctica,
          el que decide es casi siempre el tope individual.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Tabla completa de {MES}: asignación por hijo y prenatal
        </h2>
        <p className="text-zinc-600">
          Los mismos montos valen para la asignación prenatal. La zona la fija el lugar de
          explotación que el empleador declara ante ARCA; para jubilados y pensionados, el domicilio.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Ingreso del Grupo Familiar</th>
                  <th className="px-4 py-2.5 text-right font-semibold">General</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 1</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 2</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 3</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 4</th>
                </tr>
              </thead>
              <tbody>
                {V.hijo.map((t, i) => (
                  <tr key={i} className="border-t border-zinc-100">
                    <td className="whitespace-nowrap px-4 py-2.5 text-zinc-600">
                      {etiquetaTramo(t)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(t.montos.general, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona1, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona2, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona3, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona4, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="pt-2 text-lg font-semibold text-zinc-900">
          Asignación por hijo con discapacidad (sin tope de ingresos)
        </h3>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Ingreso del Grupo Familiar</th>
                  <th className="px-4 py-2.5 text-right font-semibold">General</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 1</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 2</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 3</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Zona 4</th>
                </tr>
              </thead>
              <tbody>
                {V.hijoDiscapacidad.map((t, i) => (
                  <tr key={i} className="border-t border-zinc-100">
                    <td className="whitespace-nowrap px-4 py-2.5 text-zinc-600">
                      {etiquetaTramo(t)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(t.montos.general, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona1, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona2, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona3, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(t.montos.zona4, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          El último tramo no tiene techo a propósito: con la autorización de ANSES vigente, para esta
          asignación no rigen topes de ingreso ni individuales ni del grupo familiar.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Pagos por única vez y ayuda escolar</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Concepto</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{MES}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Nacimiento
                    <span className="block text-xs text-zinc-400">
                      pago único, hasta el tope de IGF
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(V.nacimiento, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Adopción</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(V.adopcion, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Matrimonio</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(V.matrimonio, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Ayuda escolar anual (valor general)
                    <span className="block text-xs text-zinc-400">
                      {formatARS(V.ayudaEscolar.base.general, 0)} + refuerzo del Decreto 115/26 de{" "}
                      {formatARS(V.ayudaEscolar.refuerzo.general, 0)} · tope propio de IGF:{" "}
                      {formatARS(V.topeIgfAyudaEscolar, 0)}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(V.ayudaEscolar.total.general, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Asignación por cónyuge
                    <span className="block text-xs text-zinc-400">
                      sólo jubilados y pensionados del SIPA · zona 1:{" "}
                      {formatARS(V.conyuge.zona1, 0)}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(V.conyuge.general, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Apoyo alimentario — Ley 1.000 días
                    <span className="block text-xs text-zinc-400">
                      titulares de AUH y embarazo
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(V.universales.apoyoAlimentarioMilDias, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Nacimiento, adopción y matrimonio: el plazo que no está en la ley
        </h2>
        <p className="text-zinc-600">
          De estos tres pagos todo el mundo publica el monto y nadie publica la condición que los
          hace perder. La Ley 24.714 dice que la asignación se abona «una vez acreditado el hecho
          ante ANSES», sin plazo alguno. El plazo está en las cartillas del organismo:{" "}
          <strong>
            no se puede pedir antes de los {PAGO_UNICO.esperaMeses} meses y se pierde a los{" "}
            {PAGO_UNICO.caducidadAnios} años
          </strong>{" "}
          del nacimiento, de la sentencia de adopción o del casamiento.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {PAGO_UNICO.reglas.map((r) => (
            <li
              key={r.clave}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              <span className="block font-semibold text-zinc-900">{r.titulo}</span>
              <span className="mt-1 block">{r.detalle}</span>
              <span className="mt-1 block text-xs text-zinc-400">{r.fuente}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">AUH: el 20% que no te depositan</h2>
        <p className="text-zinc-600">
          El monto que se publica no es el que llega a la cuenta. ANSES paga el 80% todos los meses y
          acumula el 20%, que se cobra junto una vez al año contra la presentación de la Libreta AUH
          con los controles de salud y la escolaridad al día.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Asignación</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Valor total</th>
                  <th className="px-4 py-2.5 text-right font-semibold">80% mensual</th>
                  <th className="px-4 py-2.5 text-right font-semibold">20% retenido</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "AUH por hijo", v: V.universales.hijo.general },
                  { n: "AUH por hijo — zona 1", v: V.universales.hijo.zona1 },
                  { n: "AUH por hijo con discapacidad", v: V.universales.hijoDiscapacidad.general },
                  {
                    n: "AUH por hijo con discapacidad — zona 1",
                    v: V.universales.hijoDiscapacidad.zona1,
                  },
                  { n: "Asignación por embarazo", v: V.universales.embarazo.general },
                ].map((f) => {
                  const d = desglose8020(f.v);
                  return (
                    <tr key={f.n} className="border-t border-zinc-100">
                      <td className="px-4 py-2.5 text-zinc-600">{f.n}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                        {formatARS(f.v, 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-zinc-900">
                        {formatARS(d.mensual, 2)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-zinc-500">
                        {formatARS(d.retenido, 2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Zona 1 para la AUH son La Pampa, Chubut, Neuquén, Río Negro, Santa Cruz, Tierra del Fuego,
          Antártida e Islas del Atlántico Sur y el partido de Patagones. La ayuda escolar anual de{" "}
          {formatARS(V.universales.ayudaEscolarTotal.general, 0)} se paga completa, sin retención.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué localidades entran en cada zona</h2>
        <div className="space-y-2">
          {ZONAS.filter((z) => z.id !== "general").map((z) => (
            <details key={z.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{z.nombre}</summary>
              <p className="mt-2 text-sm text-zinc-600">{z.detalle}</p>
            </details>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Para trabajadores en relación de dependencia la zona es la del lugar de explotación
          declarado ante ARCA, no la del domicilio. Para jubilados y pensionados hay una sola zona
          diferencial (La Pampa, Chubut, Neuquén, Río Negro, Santa Cruz, Tierra del Fuego y
          Patagones).
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

      <section className="space-y-2 text-sm text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-700">Seguí con</h2>
        <ul className="space-y-1">
          <li>
            <Link href="/jubilacion" className="font-medium text-emerald-700 hover:underline">
              Jubilación de {MES}
            </Link>{" "}
            — el aumento sale de la misma movilidad mensual y de la resolución hermana de ANSES.
          </li>
          <li>
            <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
              Sueldo neto
            </Link>{" "}
            — para saber el bruto exacto que entra en el IGF.
          </li>
          <li>
            <Link href="/canasta-basica" className="font-medium text-emerald-700 hover:underline">
              Canasta básica
            </Link>{" "}
            — cuánto necesita tu hogar para no quedar bajo la línea de pobreza.
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
            </a>{" "}
            — aumento del {formatPct(V.movilidad)} en montos, límites y rangos de las asignaciones
            familiares de {MES} ({V.resolucionBO}).
          </li>
          <li>
            <a
              href={V.cartillaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {ASIGNACIONES_FUENTES.cartilla.nombre}
            </a>{" "}
            — tabla completa por tramo, zona y categoría de monotributo.
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
              href={ASIGNACIONES_FUENTES.cartillaNacimiento.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {ASIGNACIONES_FUENTES.cartillaNacimiento.nombre}
            </a>{" "}
            y{" "}
            <a
              href={ASIGNACIONES_FUENTES.cartillaMatrimonio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {ASIGNACIONES_FUENTES.cartillaMatrimonio.nombre}
            </a>{" "}
            — de ahí sale la ventana de {PAGO_UNICO.esperaMeses} meses a {PAGO_UNICO.caducidadAnios}{" "}
            años para pedir los pagos únicos, que la ley no menciona.
          </li>
          <li>
            <a
              href={ASIGNACIONES_FUENTES.ley.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {ASIGNACIONES_FUENTES.ley.nombre}
            </a>{" "}
            — régimen y beneficiarios. Consultado el {ASIGNACIONES_FUENTES.consultadoEl}.
          </li>
        </ul>
        <p className="pt-2">
          Esta página es informativa y usa los valores oficiales publicados por ANSES. No es una
          liquidación ni reemplaza a ANSES: el importe que se acredita puede variar según la fecha de
          alta del beneficio, la composición del grupo familiar y la zona declarada por el empleador.
        </p>
      </section>
    </article>
  );
}
