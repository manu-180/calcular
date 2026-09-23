import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDesempleo } from "@/components/CalculadoraDesempleo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import {
  DESEMPLEO_FUENTES,
  DESEMPLEO_FUENTES_LISTA,
  DESEMPLEO_TEXTOS,
  REGLAS_DESEMPLEO as R,
  SITUACION_LEGAL_DESEMPLEO,
  SMVM_SERIE,
  VIGENCIA_MUTUO_ACUERDO,
} from "@/data/desempleo";
import { calcularDesempleo, etiquetaMes, smvmVigente } from "@/lib/desempleo";
import { formatARS } from "@/lib/formato";

const { mes: SMVM } = smvmVigente();
const MES = etiquetaMes(SMVM.periodo);
const PISO = Math.round(SMVM.mensual * R.pisoSobreSmvm * 100) / 100;
const TECHO = Math.round(SMVM.mensual * R.techoSobreSmvm * 100) / 100;

// Ejemplo testigo de la página: un sueldo neto que queda por encima del techo, que es el caso
// más frecuente y el que hace visible el escalonamiento en las 12 cuotas.
const EJEMPLO = calcularDesempleo({
  mejorRemuneracionNeta: 800_000,
  mesesCotizados: 40,
  edad: 35,
});

// La escala que se muestra: los dos meses previos al vigente (por si el cese fue antes) y TODOS
// los meses que ya tienen norma hacia adelante. La Res. 4/2026 fijó ocho meses de una vez, así que
// "los últimos 6" escondía justo el mes en curso: la tabla ancla en el mes vigente, no en el final.
const I_VIGENTE = SMVM_SERIE.findIndex((m) => m.periodo === SMVM.periodo);
const ESCALA_VISIBLE = SMVM_SERIE.slice(Math.max(0, I_VIGENTE - 2));
const SMVM_FIN = SMVM_SERIE[SMVM_SERIE.length - 1];
const MES_FIN = etiquetaMes(SMVM_FIN.periodo);

export const metadata: Metadata = {
  title: `Prestación por desempleo ${MES}: cuánto cobrás y por cuántos meses`,
  description: `El seguro de desempleo es el 75% de tu mejor sueldo NETO de los últimos 6 meses, con un piso de ${formatARS(PISO, 0)} y un techo de ${formatARS(TECHO, 0)} en ${MES}. Baja al 85% desde el quinto mes y al 70% desde el noveno: acá ves las 12 cuotas una por una y el total. Ley 24.013 y Res. 4/2026 del Consejo del Salario.`,
  alternates: { canonical: "/desempleo" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Prestación por desempleo · ${MES}`)}&s=${encodeURIComponent("Cuánto cobrás mes a mes y cuántas cuotas te tocan")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto se cobra de desempleo en ${MES}?`,
    a: `Depende de tu sueldo: la prestación es el 75% del importe neto de tu mejor remuneración mensual, normal y habitual, de los seis meses anteriores al despido. Ese resultado nunca puede ser menor a ${formatARS(PISO, 0)} ni mayor a ${formatARS(TECHO, 0)} en ${MES}, porque la Resolución 4/2026 del Consejo del Salario fija el piso en el 50% del salario mínimo vital y móvil y el techo en el 100%. Como el salario mínimo sube casi todos los meses, esos dos números se mueven con él.`,
  },
  {
    q: "¿Se calcula sobre el sueldo bruto o sobre el neto?",
    a: "Sobre el NETO. Es el error más repetido en las notas que circulan: el artículo 2 de la Resolución 4/2026 dice textualmente «un SETENTA Y CINCO POR CIENTO (75%) del importe neto de la mejor remuneración mensual, normal y habitual del trabajador en los seis (6) meses anteriores al cese». Calcularlo sobre el bruto infla el resultado alrededor de un 17%, que es lo que se descuenta por aportes.",
  },
  {
    q: "¿Cobro siempre lo mismo todos los meses?",
    a: "No, y es lo que casi nunca se explica. El artículo 118 de la Ley 24.013 escalona la prestación: los primeros 4 meses cobrás el 100%, del mes 5 al 8 el 85%, y del 9 al 12 el 70%. Sí hay una excepción práctica: como el piso mensual se aplica a cada cuota, si tu prestación ya está en el mínimo, el escalonamiento no te baja nada — la cuota se sostiene en el piso.",
  },
  {
    q: "¿Cuántas cuotas me corresponden?",
    a: "Según los meses con aportes que tengas en los tres años anteriores al despido (art. 117 de la Ley 24.013): de 6 a 11 meses son 2 cuotas; de 12 a 23 meses, 4 cuotas; de 24 a 35 meses, 8 cuotas; y con 36 meses o más, 12 cuotas. Con menos de 6 meses cotizados no se accede al beneficio.",
  },
  {
    q: "Tengo más de 45 años, ¿cambia algo?",
    a: `Sí: el artículo 4 del Decreto 267/2006 extiende el seguro por ${R.extension45.cuotasExtra} meses adicionales, con un valor equivalente al 70% de la prestación original. Es decir que quien llega a las 12 cuotas puede cobrar hasta 18. La edad se toma al momento de liquidarse la última cuota.`,
  },
  {
    q: "¿Qué pasa si la pido tarde?",
    a: `Perdés plata. El artículo 115 de la Ley 24.013 da ${R.diasParaSolicitar} días desde el cese para presentar la solicitud, y aclara que los días que excedan ese plazo se descuentan del total del período de la prestación. No es que te la nieguen: te la acortan. La calculadora de arriba tiene un campo para ver exactamente cuánto te cuesta la demora.`,
  },
  {
    q: "¿Quiénes pueden cobrar la prestación por desempleo?",
    a: `Trabajadores en relación de dependencia registrados que hayan cotizado al Fondo Nacional de Empleo al menos ${R.mesesMinimosCotizados} meses en los ${R.aniosVentanaCotizacion} años anteriores al cese, y cuya salida encuadre en alguno de los nueve supuestos de "situación legal de desempleo" del artículo 114 de la Ley 24.013: despido sin justa causa, despido por fuerza mayor o falta de trabajo, despido indirecto, extinción colectiva, quiebra o concurso, fin del plazo o de la obra contratada, muerte o jubilación del empleador, no reinicio del contrato de temporada y —desde el ${VIGENCIA_MUTUO_ACUERDO}— la extinción por mutuo acuerdo. Quedan fuera el régimen agrario, el empleo público alcanzado por medidas de racionalización, y quien ya percibe un beneficio previsional. Si renunciaste lisa y llanamente, no corresponde.`,
  },
  {
    q: "Me fui por mutuo acuerdo, ¿cobro el desempleo?",
    a: `Desde el ${VIGENCIA_MUTUO_ACUERDO}, sí — y es el dato que casi toda la web sigue publicando al revés. El artículo 99 de la Ley 27.802 incorporó un inciso i) al artículo 114 de la Ley 24.013: "Extinción por mutuo acuerdo de las partes en los términos del artículo 241 de la ley 20.744". Hasta esa fecha el mutuo acuerdo no figuraba en la lista de situaciones legales de desempleo, así que quien firmaba un acuerdo de desvinculación quedaba sin prestación. Ahora figura, con nombre y con remisión al artículo. Ojo con la distinción: sigue sin corresponder si lo que hubo fue una renuncia lisa y llana del artículo 240, que es otra cosa y no está en la lista. Y el resto de los requisitos no cambió: hacen falta los ${R.mesesMinimosCotizados} meses de cotización al Fondo Nacional de Empleo y pedirla dentro de los ${R.diasParaSolicitar} días.`,
  },
  {
    q: "Mientras cobro el desempleo, ¿tengo obra social y asignaciones familiares?",
    a: "Sí. El artículo 119 de la Ley 24.013 incluye en la protección la cobertura médico-asistencial, el pago de las asignaciones familiares que correspondan y el cómputo del período a los efectos previsionales. O sea que el tiempo que cobrás el seguro te cuenta para la jubilación.",
  },
  {
    q: "¿Lo que dice esta calculadora es lo que me va a depositar ANSES?",
    a: "Es la aplicación de las normas vigentes al dato que cargaste, no una liquidación. ANSES reconstruye los meses cotizados desde tus aportes registrados —que pueden no coincidir con lo que uno recuerda— y toma la mejor remuneración de tu historia laboral formal. Para tu caso puntual, la fuente es ANSES.",
  },
];

export default function DesempleoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de prestación por desempleo (seguro de desempleo)",
        url: "https://calcular.ar/desempleo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `Topes de la prestación por desempleo y escala del SMVM — ${MES}`,
        descripcion: `Piso y techo mensuales de la prestación por desempleo de la Ley 24.013, derivados del salario mínimo vital y móvil: en ${MES} el piso es ${formatARS(PISO, 0)} (50% del SMVM) y el techo ${formatARS(TECHO, 0)} (100% del SMVM de ${formatARS(SMVM.mensual, 0)}). Incluye la escala mensual del SMVM fijada por la Resolución 4/2026 del Consejo Nacional del Empleo, la Productividad y el SMVM, con norma dictada hasta ${MES_FIN}.`,
        url: "/desempleo",
        modificado: `${SMVM.periodo}-01`,
        fuenteNombre: DESEMPLEO_FUENTES.smvm.nombre,
        fuenteUrl: DESEMPLEO_FUENTES.smvm.url,
      }),
      articleSchema({
        titulo: `Prestación por desempleo ${MES}: cuánto cobrás y por cuántos meses`,
        descripcion:
          "Cálculo del seguro de desempleo con la fórmula oficial: 75% del neto, topes atados al salario mínimo, escalonamiento por cuota y extensión para mayores de 45.",
        url: "/desempleo",
        modificado: DESEMPLEO_FUENTES.consultadoEl,
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
          Prestación por desempleo: cuánto cobrás <em>vos</em>, mes por mes
        </h1>
        <p className="text-zinc-600">
          Todas las notas publican el mismo número del mes y ninguna aclara dos cosas que cambian el
          resultado: que el 75% sale de tu sueldo <strong>neto</strong> y no del bruto, y que la
          cuota <strong>baja</strong> a partir del quinto mes. Poné tu sueldo y mirá las cuotas una
          por una, con los topes oficiales de {MES}.
        </p>
      </header>

      <RespuestaPrimero actualizado={DESEMPLEO_FUENTES.consultadoEl}>
        <p>
          La prestación por desempleo es el <strong>75% del importe neto</strong> de tu mejor
          remuneración mensual, normal y habitual, de los seis meses anteriores al cese. En {MES}{" "}
          nunca puede ser menor a <strong>{formatARS(PISO, 0)}</strong> ni mayor a{" "}
          <strong>{formatARS(TECHO, 0)}</strong>, porque el piso es el 50% y el techo el 100% del
          salario mínimo vital y móvil ({formatARS(SMVM.mensual, 0)}). Cobrás entre 2 y 12 cuotas
          según los meses con aportes de los últimos 3 años, y el importe{" "}
          <strong>se degrada</strong>: 100% los primeros 4 meses, 85% del 5 al 8 y 70% del 9 al 12.
          Con 45 años o más se suman {R.extension45.cuotasExtra} cuotas al 70%. Y hay{" "}
          {R.diasParaSolicitar} días para pedirla: pasado ese plazo, cada día de demora se descuenta
          del período.
        </p>
      </RespuestaPrimero>

      <CalculadoraDesempleo />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los nueve casos que dan derecho a cobrarla (uno es nuevo)
        </h2>
        <p className="text-zinc-600">
          No alcanza con haber dejado de trabajar: la salida tiene que encuadrar en alguno de los
          supuestos del artículo 114 de la Ley 24.013. Eran ocho desde 1991. El{" "}
          {VIGENCIA_MUTUO_ACUERDO} pasaron a ser nueve.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[38rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="pb-2 font-semibold">Inc.</th>
                <th className="pb-2 font-semibold">Cómo terminó el contrato</th>
                <th className="pb-2 font-semibold">Norma</th>
              </tr>
            </thead>
            <tbody>
              {SITUACION_LEGAL_DESEMPLEO.map((c) => (
                <tr
                  key={c.inciso}
                  className={`border-b border-zinc-200 align-top ${
                    c.esNuevo ? "bg-emerald-50/60" : ""
                  }`}
                >
                  <td className="py-3 pr-3 font-mono text-xs text-zinc-500">{c.inciso})</td>
                  <td className="py-3 pr-3 font-medium text-zinc-800">
                    {c.supuesto}
                    {c.esNuevo ? (
                      <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        nuevo
                      </span>
                    ) : null}
                  </td>
                  <td className="py-3 text-zinc-600">{c.norma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            El inciso que se agregó el {VIGENCIA_MUTUO_ACUERDO}
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{DESEMPLEO_TEXTOS.art114IncisoI}»</p>
          <p className="mt-2 text-xs text-zinc-500">
            {DESEMPLEO_TEXTOS.notaVigenciaIncisoI} — Hasta el 5 de marzo de 2026, terminar el
            contrato por mutuo acuerdo dejaba al trabajador sin prestación: el supuesto no estaba en
            la lista. La <strong>renuncia</strong> del artículo 240, en cambio, sigue afuera: no es
            lo mismo firmar un acuerdo de desvinculación que renunciar.
          </p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El número que sale en las noticias dura cuatro meses
        </h2>
        <p className="text-zinc-600">
          Este es el recorrido completo de alguien con {formatARS(800_000, 0)} de sueldo neto y 3
          años de aportes, en {MES}. La prestación arranca topeada en {formatARS(TECHO, 0)} —el
          techo del mes— y a partir del quinto mes empieza a caer:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Tramo</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Cuota mensual</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rango: "Meses 1 a 4", pct: "100%", cuota: EJEMPLO.cuotas[0]?.monto },
                  { rango: "Meses 5 a 8", pct: "85%", cuota: EJEMPLO.cuotas[4]?.monto },
                  { rango: "Meses 9 a 12", pct: "70%", cuota: EJEMPLO.cuotas[8]?.monto },
                ].map((f) => (
                  <tr key={f.rango} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">
                      {f.rango}
                      <span className="block text-xs text-zinc-400">
                        {f.pct} de la prestación original
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-500">Ley 24.013, art. 118</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {f.cuota === undefined ? "—" : formatARS(f.cuota, 0)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-zinc-200 bg-zinc-50">
                  <td className="px-4 py-2.5 font-semibold text-zinc-800" colSpan={2}>
                    Total de las 12 cuotas
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(EJEMPLO.total, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Si tu prestación quedó en el piso de {formatARS(PISO, 0)}, el escalonamiento no te afecta:
          el texto de la resolución dice que <em>en ningún caso</em> la prestación mensual puede ser
          inferior al mínimo, así que la cuota se sostiene ahí los doce meses.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuántas cuotas te tocan según tus aportes
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">
                    Meses con aportes (últimos 3 años)
                  </th>
                  <th className="px-4 py-2.5 text-right font-semibold">Cuotas</th>
                </tr>
              </thead>
              <tbody>
                {R.duracion.map((t) => (
                  <tr key={t.desdeMeses} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">
                      {t.hastaMeses === null
                        ? `${t.desdeMeses} meses o más`
                        : `De ${t.desdeMeses} a ${t.hastaMeses} meses`}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {t.cuotas}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-zinc-100 bg-amber-50/50">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Menos de {R.mesesMinimosCotizados} meses
                    <span className="block text-xs text-zinc-400">Ley 24.013, art. 113 inc. b</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-500">no corresponde</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          A eso se le suman {R.extension45.cuotasExtra} cuotas más, al 70%, si tenés 45 años o más
          (Decreto 267/2006, art. 4).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué los topes cambian todos los meses
        </h2>
        <p className="text-zinc-600">
          El piso y el techo de la prestación no son montos propios: son el 50% y el 100% del
          salario mínimo vital y móvil vigente. Cada vez que sube el salario mínimo, suben los dos.
          Esta es la escala vigente, fijada por la Resolución 4/2026 del Consejo del Salario:
        </p>
        <p className="text-zinc-600">
          Con una diferencia que casi no se cuenta: el 28 de agosto de 2026 el Consejo del Salario
          se reunió y <strong>no hubo acuerdo</strong>, así que la escala salió por <strong>laudo</strong>
          de la presidencia alterna (artículo 137 de la Ley 24.013). Un laudo no fija un mes: la
          Resolución 4/2026 dejó escrito el salario mínimo <strong>mes a mes hasta {MES_FIN}</strong>.
          Es decir que el piso y el techo de tu prestación de acá a {MES_FIN} ya están publicados en
          el Boletín Oficial y no dependen de ninguna negociación futura. La misma resolución
          ratificó la fórmula de la prestación —75% del neto, con piso del 50% y techo del 100% del
          salario mínimo—, que es lo que venía de la Resolución 15/2023. Si querés ver la escala
          completa, el valor por hora y lo proporcional para jornada reducida, está en la{" "}
          <Link href="/salario-minimo" className="text-emerald-700 hover:underline">
            página del salario mínimo
          </Link>
          .
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Desde</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Salario mínimo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Piso (50%)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Techo (100%)</th>
                </tr>
              </thead>
              <tbody>
                {ESCALA_VISIBLE.map((m) => (
                  <tr
                    key={m.periodo}
                    className={`border-t border-zinc-100 ${m.periodo === SMVM.periodo ? "bg-emerald-50/60" : ""}`}
                  >
                    <td className="px-4 py-2.5 text-zinc-600">
                      {etiquetaMes(m.periodo)}
                      {m.periodo === SMVM.periodo && (
                        <span className="ml-1.5 rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] font-medium text-emerald-800">
                          vigente
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(m.mensual, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {formatARS(m.mensual * R.pisoSobreSmvm, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {formatARS(m.mensual * R.techoSobreSmvm, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Si te despidieron, mirá también cuánto te corresponde de{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            indemnización por despido
          </Link>{" "}
          — es un pago aparte y compatible con el seguro de desempleo. Y mientras cobrás la
          prestación te siguen correspondiendo las{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            asignaciones familiares
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {DESEMPLEO_FUENTES_LISTA.map((f) => (
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
          es una liquidación ni reemplaza a ANSES: el importe y la cantidad de cuotas dependen de tu
          historia laboral registrada. Consultada el {DESEMPLEO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
