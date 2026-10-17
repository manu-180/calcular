import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraEdadAvanzada } from "@/components/CalculadoraEdadAvanzada";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { PEA, PEA_CARACTERES, peaFuentes, PEA_REQUISITOS } from "@/data/edad-avanzada";
import { bonoVigente, prestacionesVigentes } from "@/data/prestaciones";
import { haberPea, pensionDerivada, promedioParaSuperarElMinimo } from "@/lib/edad-avanzada";
import { formatARS, formatPct } from "@/lib/formato";

function datosDelMes() {
  const V = prestacionesVigentes();
  const MES = V.vigencia;
  const MES_CORTO = MES.replace(" de ", " ");

  /** El caso típico: 10 años de aportes, todos posteriores al SIJP, sin promedio declarado. */
  const BASE = haberPea(0, PEA.aniosServiciosConAportes, 0);
  /** El umbral derivado con esos mismos 10 años: el sueldo desde el que la fórmula le gana al piso. */
  const UMBRAL = promedioParaSuperarElMinimo(PEA.aniosServiciosConAportes, 0);
  const BRECHA = Math.round((V.haberMinimo - BASE.componentePbu) * 100) / 100;
  return { V, MES, MES_CORTO, BASE, UMBRAL, BRECHA };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ MES, MES_CORTO }: DatosDelMes): Metadata => ({
  title: `Pensión por edad avanzada ${MES_CORTO}: cuánto se cobra`,
  description: "Requisitos a los 70 años con 10 de aportes y cuánto se cobra de verdad: el art. 125 garantiza el haber mínimo, no el 70% de la PBU que repiten todos.",
  alternates: { canonical: "/edad-avanzada" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Edad avanzada · ${MES}`)}&s=${encodeURIComponent("El 70% de la PBU no es lo que se cobra")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ V, MES, BASE, UMBRAL, BRECHA }: DatosDelMes) => [
  {
    q: `¿Cuánto se cobra por la prestación por edad avanzada en ${MES}?`,
    a: `Casi siempre, el haber mínimo garantizado: ${formatARS(V.haberMinimo, 2)}, más el bono de ${formatARS(bonoVigente().monto, 0)} del ${bonoVigente().norma}. O sea, ${formatARS(BASE.total, 2)} depositados. El número que repiten las notas (el 70% de la PBU, ${formatARS(BASE.componentePbu, 2)} en ${MES}) es una cita correcta del artículo 34 bis apartado 3, pero no es lo que se cobra: queda ${formatARS(BRECHA, 2)} por debajo del mínimo. Y el artículo 125 de la Ley 24.241 garantiza el haber mínimo del artículo 17 a quienes cobran del régimen público, y esta prestación está en el inciso f) de ese artículo.`,
  },
  {
    q: "¿Cuántos años de aportes hacen falta y cómo tienen que estar distribuidos?",
    a: `Diez años de trabajo con aportes que cuenten, en una o más cajas que se reconozcan entre sí. Pero hay una segunda condición que casi nunca se dice y que deja afuera más solicitudes que la primera: de esos diez, al menos ${PEA.aniosDentroDeLaVentana} tienen que estar dentro de los ${PEA.ventanaAniosAnteriores} años justo antes de dejar de trabajar. Tener los años sueltos no alcanza: tienen que estar cerca del final. Si sos autónomo, además tenés que tener al menos ${PEA.antiguedadAfiliacionAutonomoAnios} años de inscripción, que no es lo mismo que tener los aportes pagos.`,
  },
  {
    q: "¿Se puede seguir trabajando cobrando la prestación por edad avanzada?",
    a: "La ley no lo prohíbe. El apartado 4 del artículo 34 bis dice que no se puede cobrar junto con otra jubilación, pensión o retiro civil o militar, nacional, provincial o municipal (podés elegir cuál te quedás). Pero no dice nada sobre trabajar. Es la gran diferencia con la PUAM: ahí el artículo 16 de la Ley 27.260, reemplazado en 2018, sí prohíbe trabajar en relación de dependencia o por cuenta propia.",
  },
  {
    q: "¿Sirven los años trabajados en casas particulares?",
    a: "Acá hay un requisito que no está en la Ley 24.241, y por eso no aparece en ninguna nota que copie solo la ley. La cartilla oficial de ANSES para esta prestación pide «no acreditar tareas en calidad de servicio doméstico». Si tus años son de casas particulares, te pueden rechazar el trámite por eso, así que conviene consultar en ANSES antes de iniciarlo. Es letra chica que solo aparece leyendo el material de ANSES, no la ley.",
  },
  {
    q: "¿A partir de qué sueldo conviene seguir aportando en vez de quedarse con el mínimo?",
    a: UMBRAL
      ? `Es la única pregunta que cambia una decisión, y tiene una cuenta. El haber es 70% de la PBU más 1,5% por cada año de aportes sobre el promedio de los sueldos actualizados de los últimos ${PEA.aniosDelPromedio} años (artículo 24 para la compensatoria, artículo 30 inciso b para la adicional por permanencia). Con ${PEA.aniosServiciosConAportes} años de aportes y los valores de ${MES}, la fórmula recién le gana al haber mínimo con un sueldo promedio actualizado de ${formatARS(UMBRAL, 0)} por mes. O sea: con diez años de aportes, casi nadie supera el piso. Cada año de aportes de más baja ese número, porque suma otro 1,5%.`
      : "Con los valores vigentes, la parte fija ya supera el mínimo, así que manda la fórmula desde el primer peso.",
  },
  {
    q: "¿Llega la garantía del 82% del salario mínimo?",
    a: `No, y se confunde seguido con el mínimo garantizado. El artículo 125 bis deja esa garantía para quienes tengan ${PEA.aniosQueExigeEl82} años o más de aportes efectivos y cobren la prestación básica universal. Quien entra por edad avanzada lo hace con ${PEA.aniosServiciosConAportes}, así que queda afuera. Lo que sí lo cubre es el artículo 125: el haber mínimo garantizado, que es otra cosa.`,
  },
  {
    q: "¿Deja pensión para el cónyuge?",
    a: `Sí, y es una de sus ventajas frente a la PUAM. El apartado 5 del artículo 34 bis dice que la pensión para la familia se calcula con las reglas de los artículos 28 y 98 y es el ${formatPct(PEA.proporcionPensionDerivada * 100, 0)} de lo que le hubiera tocado al titular. Sobre el haber mínimo de ${MES}, ${formatARS(pensionDerivada(V.haberMinimo), 2)}. La PUAM, en cambio, es solo para la persona y no deja pensión (artículo 15 inciso a de la Ley 27.260).`,
  },
  {
    q: "Si mis diez años son todos posteriores a 1994, ¿cambia el cálculo?",
    a: "Sí, y bastante. La prestación compensatoria solo cuenta los años con aportes de antes de que empezara a regir el Libro I de la Ley 24.241 (o sea, antes del SIJP), según los artículos 23 inciso b y 24. Si hoy llegás a los 70 con diez años de aportes, todos posteriores, no tenés compensatoria. Te queda el 70% de la PBU más la prestación adicional por permanencia, que paga 1,5% por año sobre el mismo promedio. Es una razón más por la que termina mandando el piso garantizado.",
  },
  {
    q: "¿Qué diferencia hay entre la prestación por edad avanzada y la PUAM?",
    a: `Cuatro cosas. La edad: 70 acá, 65 la PUAM. Los aportes: ${PEA.aniosServiciosConAportes} años acá, ninguno en la PUAM. El monto: acá el piso es el haber mínimo completo (${formatARS(V.haberMinimo, 2)}); la PUAM paga el 80% de ese mínimo. Y la letra chica, que va para los dos lados: esta prestación deja pensión y te deja trabajar; la PUAM no deja pensión y desde 2018 no te deja trabajar. Si tenés los diez años de aportes y podés esperar a los 70, cobrás más y dejás más.`,
  },
  {
    q: "¿Por qué cambia el monto todos los meses sin que se anuncie un aumento?",
    a: `Porque no tiene monto propio: depende de la PBU y del haber mínimo, y los dos se actualizan todos los meses por la movilidad del Decreto 274/2024, que es el IPC de dos meses antes. En ${MES} esa movilidad fue del ${formatPct(V.movilidad, 2)} y los valores los fijó la ${V.resolucion}. No hay una resolución que aumente la prestación por edad avanzada: cuando sube la mínima, sube esto.`,
  },
];

export default function EdadAvanzadaPage() {
  const datos = datosDelMes();
  const { V, MES, BASE, UMBRAL, BRECHA } = datos;
  const faqs = crearFaqs(datos);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de la Prestación por Edad Avanzada",
        url: "https://calcular.ar/edad-avanzada",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `Prestación por edad avanzada: haber y requisitos vigentes en ${MES}`,
        descripcion: `Haber de la prestación por edad avanzada (art. 34 bis de la Ley 24.241) en ${MES}: el 70% de la PBU son ${formatARS(BASE.componentePbu, 2)}, pero el art. 125 garantiza el haber mínimo de ${formatARS(V.haberMinimo, 2)} (${V.resolucion}), que con el bono de ${formatARS(bonoVigente().monto, 0)} del ${bonoVigente().norma} da ${formatARS(BASE.total, 2)}. Incluye los requisitos del art. 34 bis ap. 2, el requisito de servicio doméstico que agrega la cartilla de ANSES y el umbral de sueldo derivado a partir del cual la fórmula supera el piso.`,
        url: "/edad-avanzada",
        modificado: `${V.periodo}-01`,
        fuenteNombre: V.resolucion,
        fuenteUrl: V.resolucionUrl,
      }),
      articleSchema({
        titulo: `Prestación por edad avanzada ${MES}: cuánto se cobra de verdad`,
        descripcion:
          "Por qué el 70% de la PBU que publica toda la web no es lo que se cobra, cuál es el piso garantizado, el requisito de los 5 años dentro de los últimos 8 y el que ANSES agrega fuera de la ley.",
        url: "/edad-avanzada",
        modificado: peaFuentes().consultadoEl,
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

  const aFavor = PEA_CARACTERES.filter((c) => c.signo === "a favor");
  const enContra = PEA_CARACTERES.filter((c) => c.signo === "en contra");

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Prestación por edad avanzada: cuánto se cobra de verdad a los 70 con 10 años de aportes
        </h1>
        <p className="text-zinc-600">
          Es la puerta para quien llega a los {PEA.edadMinima} sin los 30 años de aportes, pero con
          algunos. Toda la web publica el mismo dato («el 70% de la PBU») y ahí termina. Ese número
          cita bien la ley, pero no responde lo que importa: no es lo que se cobra. Acá tenés el piso
          que sí manda, la regla de cuándo tienen que estar los años (que voltea la mitad de las
          solicitudes) y el requisito que ANSES pide aunque no esté en la ley.
        </p>
      </header>

      <RespuestaPrimero actualizado={peaFuentes().consultadoEl}>
        <p>
          En {MES} el 70% de la PBU son <strong>{formatARS(BASE.componentePbu, 2)}</strong>:{" "}
          {formatARS(BRECHA, 2)} <strong>menos</strong> que el haber mínimo garantizado de{" "}
          {formatARS(V.haberMinimo, 2)}. Como el art. 125 garantiza ese mínimo a quienes cobran del
          régimen público, y esta prestación está en el art. 17 inc. f), lo que se cobra es{" "}
          <strong>{formatARS(BASE.haber, 2)}</strong>. Con el bono de{" "}
          {formatARS(bonoVigente().monto, 0)} se depositan <strong>{formatARS(BASE.total, 2)}</strong>
          . Se pide a los {PEA.edadMinima} años con {PEA.aniosServiciosConAportes} de aportes, y{" "}
          <strong>{PEA.aniosDentroDeLaVentana} de ellos tienen que caer en los últimos{" "}
          {PEA.ventanaAniosAnteriores}</strong> antes de dejar de trabajar. <strong>Te deja seguir
          trabajando</strong> y <strong>deja pensión</strong>: dos cosas que la PUAM no tiene.
        </p>
      </RespuestaPrimero>

      <CalculadoraEdadAvanzada />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El 70% de la PBU contra lo que realmente se deposita
        </h2>
        <p className="text-zinc-600">
          Las filas de abajo salen del mismo mes y de la misma resolución. La del 70% es la que
          aparece en los buscadores; la última es la que llega al banco. Esa diferencia es el motivo
          por el que existe esta página.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">En {MES}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Monto</th>
                  <th className="px-4 py-2.5 text-left font-semibold">De dónde sale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">PBU del mes</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(V.pbu, 2)}</td>
                  <td className="px-4 py-2.5 text-zinc-500">{V.resolucion}, art. 4</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    70% de la PBU (el número que publica toda la web)
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(BASE.componentePbu, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">Ley 24.241, art. 34 bis ap. 3</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Haber mínimo garantizado</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(V.haberMinimo, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">Ley 24.241, art. 125</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Bono extraordinario</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(BASE.bono, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">{bonoVigente().norma}, arts. 3 y 4</td>
                </tr>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">Lo que se deposita</td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(BASE.total, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    piso garantizado + bono, no la fórmula
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          El bono es discrecional: lo fija un decreto mes a mes y puede no salir. El mes que no haya
          decreto, lo que se cobra es el haber mínimo seco.
        </p>
      </section>

      {UMBRAL !== null && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">
            Con 10 años de aportes, la fórmula recién le gana al piso desde{" "}
            {formatARS(UMBRAL, 0)} de sueldo promedio
          </h2>
          <p className="text-zinc-600">
            El haber del art. 34 bis es <strong>70% de la PBU</strong> más{" "}
            <strong>{formatPct(PEA.porcentajePorAnio * 100, 1)} por cada año de aportes</strong>{" "}
            sobre el promedio de las remuneraciones actualizadas de los últimos{" "}
            {PEA.aniosDelPromedio} años: 1,5% por los años anteriores al SIJP como prestación
            compensatoria (art. 24) y el mismo 1,5% por los posteriores como adicional por
            permanencia (art. 30 inc. b). Si igualás esa cuenta al haber mínimo y despejás el
            promedio, sale el único número que cambia una decisión:
          </p>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-700 shadow-sm">
            <p>
              {formatARS(BASE.componentePbu, 2)} +{" "}
              {formatPct(PEA.porcentajePorAnio * 100, 1)} × {PEA.aniosServiciosConAportes} años ×
              promedio = {formatARS(V.haberMinimo, 2)}
            </p>
            <p className="mt-1 font-bold text-zinc-900">
              promedio = {formatARS(UMBRAL, 2)} por mes
            </p>
          </div>
          <p className="text-sm text-zinc-500">
            O sea: con el mínimo de años que pide la ley, casi nadie supera el piso. Haría falta un
            sueldo promedio actualizado de {formatARS(UMBRAL, 0)} durante diez años. Cada año de
            aportes de más baja ese número, porque suma otro{" "}
            {formatPct(PEA.porcentajePorAnio * 100, 1)}. Es la cuenta que conviene hacer antes de
            decidir si seguir aportando o iniciar el trámite ya. Probá tu caso en la calculadora de
            arriba con tu promedio real.
          </p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué se pide, exactamente</h2>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <ul className="space-y-3 text-sm text-zinc-600">
            {PEA_REQUISITOS.map((r) => (
              <li key={r.norma + r.texto.slice(0, 24)} className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                <span>
                  {r.texto} <span className="text-zinc-400">({r.norma})</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-zinc-500">
          ANSES tiene además dos variantes con requisitos propios que no hay que confundir con esta:
          la prestación por edad avanzada para <strong>trabajadores rurales</strong> y la{" "}
          <strong>por invalidez</strong>, que es para quien queda incapacitado después de los 65
          (art. 34 bis ap. 5).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La letra chica, en las dos direcciones</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
            <h3 className="font-semibold text-emerald-900">Lo que sí garantiza</h3>
            <ul className="mt-3 space-y-3 text-sm text-emerald-900/90">
              {aFavor.map((c) => (
                <li key={c.texto.slice(0, 30)}>
                  {c.texto} <span className="text-emerald-700/70">({c.norma})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <h3 className="font-semibold text-rose-900">Lo que se resigna</h3>
            <ul className="mt-3 space-y-3 text-sm text-rose-900/90">
              {enContra.map((c) => (
                <li key={c.texto.slice(0, 30)}>
                  {c.texto} <span className="text-rose-700/70">({c.norma})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las tres puertas de quien llega a la edad sin los 30 años
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">En {MES}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Edad</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Aportes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Haber</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Letra chica</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">Edad avanzada</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{PEA.edadMinima}</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {PEA.aniosServiciosConAportes} años
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(BASE.haber, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    deja pensión · compatible con trabajar
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    <Link href="/puam" className="font-medium text-emerald-700 hover:underline">
                      PUAM
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">65</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">ninguno</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(V.puam, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    no deja pensión · incompatible con trabajar
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    <Link
                      href="/jubilacion"
                      className="font-medium text-emerald-700 hover:underline"
                    >
                      Jubilación ordinaria
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">65 / 60</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">30 años</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    desde {formatARS(V.haberMinimo, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    única alcanzada por el 82% del SMVM (art. 125 bis)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Si el monto no alcanza para el hogar, la{" "}
          <Link href="/canasta-basica" className="font-medium text-emerald-700 hover:underline">
            canasta básica del INDEC
          </Link>{" "}
          dice cuánto necesita esa casa para no ser pobre. Y si además cobrás una{" "}
          <Link
            href="/pension-no-contributiva"
            className="font-medium text-emerald-700 hover:underline"
          >
            pensión no contributiva
          </Link>
          , mirá primero el ap. 4, que no deja cobrar las dos. Y si el haber te queda alto, revisá{" "}
          <Link href="/descuento-pami" className="font-medium text-emerald-700 hover:underline">
            cuánto te descuenta el PAMI
          </Link>
          .
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

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {peaFuentes().lista.map((f) => (
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
          Esta página es informativa y usa el texto actualizado de la Ley 24.241 publicado en
          InfoLEG, la cartilla oficial de ANSES y las normas del Boletín Oficial que fijan la PBU, el
          haber mínimo y el bono del mes. No otorga ni liquida beneficios: los años que cuentan y el
          haber final los define ANSES con tu certificación de servicios. Texto legal consultado el{" "}
          {peaFuentes().consultadoEl}.
        </p>
      </section>
    </article>
  );
}
