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

function datosDelMes() {
  const { mes: SMVM } = smvmVigente();
  const MES = etiquetaMes(SMVM.periodo);
  const MES_CORTO = MES.replace(" de ", " ");
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
  return { SMVM, MES, MES_CORTO, PISO, TECHO, EJEMPLO, I_VIGENTE, ESCALA_VISIBLE, SMVM_FIN, MES_FIN };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ MES, MES_CORTO }: DatosDelMes): Metadata => ({
  title: `Seguro de desempleo ${MES_CORTO}: monto y duración`,
  description: "La prestación por desempleo es el 75% de tu mejor sueldo neto con piso y techo, y baja desde el quinto mes. Mirá las 12 cuotas una por una.",
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
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ MES, PISO, TECHO }: DatosDelMes) => [
  {
    q: `¿Cuánto se cobra de desempleo en ${MES}?`,
    a: `Depende de tu sueldo. La prestación es el 75% del neto de tu mejor sueldo mensual, normal y habitual, de los seis meses antes del despido. En ${MES} nunca puede ser menos de ${formatARS(PISO, 0)} ni más de ${formatARS(TECHO, 0)}, porque la Resolución 4/2026 del Consejo del Salario fija el piso en el 50% del salario mínimo vital y móvil y el techo en el 100%. Como el salario mínimo sube casi todos los meses, esos dos números se mueven con él.`,
  },
  {
    q: "¿Se calcula sobre el sueldo bruto o sobre el neto?",
    a: "Sobre el neto. Es el error que más se repite en las notas: el artículo 2 de la Resolución 4/2026 dice textual «un SETENTA Y CINCO POR CIENTO (75%) del importe neto de la mejor remuneración mensual, normal y habitual del trabajador en los seis (6) meses anteriores al cese». Si lo calculás sobre el bruto, el resultado te da cerca de un 17% más alto, que es lo que se descuenta por aportes.",
  },
  {
    q: "¿Cobro siempre lo mismo todos los meses?",
    a: "No, y es lo que casi nunca se explica. El artículo 118 de la Ley 24.013 baja la prestación por tramos: los primeros 4 meses cobrás el 100%, del mes 5 al 8 el 85% y del 9 al 12 el 70%. Hay una excepción en la práctica: el piso se aplica a cada cuota, así que si tu prestación ya está en el mínimo, no baja. La cuota se queda en el piso.",
  },
  {
    q: "¿Cuántas cuotas me corresponden?",
    a: "Depende de los meses con aportes que tengas en los tres años antes del despido (art. 117 de la Ley 24.013). De 6 a 11 meses: 2 cuotas. De 12 a 23 meses: 4 cuotas. De 24 a 35 meses: 8 cuotas. Con 36 meses o más: 12 cuotas. Con menos de 6 meses de aportes no te corresponde.",
  },
  {
    q: "Tengo más de 45 años, ¿cambia algo?",
    a: `Sí. El artículo 4 del Decreto 267/2006 alarga el seguro ${R.extension45.cuotasExtra} meses más, por el 70% de la prestación original. O sea que si llegás a las 12 cuotas, podés cobrar hasta 18. La edad que cuenta es la que tenés cuando se liquida la última cuota.`,
  },
  {
    q: "¿Qué pasa si la pido tarde?",
    a: `Perdés plata. El artículo 115 de la Ley 24.013 te da ${R.diasParaSolicitar} días desde que terminó el trabajo para pedirla. Los días que te pases se descuentan del total. No te la niegan: te la acortan. La calculadora de arriba tiene un campo para ver cuánto te cuesta la demora.`,
  },
  {
    q: "¿Quiénes pueden cobrar la prestación por desempleo?",
    a: `Empleados registrados en relación de dependencia que hayan aportado al Fondo Nacional de Empleo al menos ${R.mesesMinimosCotizados} meses en los ${R.aniosVentanaCotizacion} años antes de quedarse sin trabajo. Además, la salida tiene que estar entre los nueve casos de "situación legal de desempleo" del artículo 114 de la Ley 24.013: despido sin justa causa, despido por fuerza mayor o falta de trabajo, despido indirecto, despido colectivo, quiebra o concurso, fin del plazo o de la obra contratada, muerte o jubilación del empleador, que no te vuelvan a llamar en un trabajo de temporada y (desde el ${VIGENCIA_MUTUO_ACUERDO}) el mutuo acuerdo. Quedan afuera el régimen agrario, los empleados públicos alcanzados por medidas de racionalización y quien ya cobra una jubilación o pensión. Si renunciaste sin más, no corresponde.`,
  },
  {
    q: "Me fui por mutuo acuerdo, ¿cobro el desempleo?",
    a: `Desde el ${VIGENCIA_MUTUO_ACUERDO}, sí. Y es el dato que casi toda la web sigue publicando al revés. El artículo 99 de la Ley 27.802 sumó un inciso i) al artículo 114 de la Ley 24.013: "Extinción por mutuo acuerdo de las partes en los términos del artículo 241 de la ley 20.744". Hasta esa fecha el mutuo acuerdo no estaba en la lista, así que quien firmaba un acuerdo de desvinculación se quedaba sin prestación. Ahora está, con nombre y artículo. Ojo con la diferencia: sigue sin corresponder si renunciaste sin más (artículo 240), que es otra cosa y no está en la lista. Y el resto de los requisitos no cambió: necesitás los ${R.mesesMinimosCotizados} meses de aportes al Fondo Nacional de Empleo y pedirla dentro de los ${R.diasParaSolicitar} días.`,
  },
  {
    q: "Mientras cobro el desempleo, ¿tengo obra social y asignaciones familiares?",
    a: "Sí. El artículo 119 de la Ley 24.013 incluye la cobertura médica, el pago de las asignaciones familiares que te correspondan y que ese tiempo cuente para la jubilación. O sea que los meses que cobrás el seguro suman para jubilarte.",
  },
  {
    q: "¿Lo que dice esta calculadora es lo que me va a depositar ANSES?",
    a: "Es la cuenta de las normas vigentes con el dato que cargaste, no una liquidación. ANSES arma los meses con aportes desde lo que tiene registrado (que puede no coincidir con lo que uno recuerda) y toma el mejor sueldo de tu historia laboral en blanco. Para tu caso puntual, la palabra final es de ANSES.",
  },
];

export default function DesempleoPage() {
  const datos = datosDelMes();
  const { SMVM, MES, PISO, TECHO, EJEMPLO, ESCALA_VISIBLE, MES_FIN } = datos;
  const faqs = crearFaqs(datos);
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
        nombre: `Topes de la prestación por desempleo y escala del SMVM, ${MES}`,
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
          resultado. El 75% sale de tu sueldo <strong>neto</strong>, no del bruto. Y la cuota{" "}
          <strong>baja</strong> desde el quinto mes. Poné tu sueldo y mirá las cuotas una por una,
          con los topes oficiales de {MES}.
        </p>
      </header>

      <RespuestaPrimero actualizado={DESEMPLEO_FUENTES.consultadoEl}>
        <p>
          La prestación por desempleo es el <strong>75% del neto</strong> de tu mejor sueldo
          mensual, normal y habitual, de los seis meses antes de quedarte sin trabajo. En {MES}{" "}
          nunca puede ser menos de <strong>{formatARS(PISO, 0)}</strong> ni más de{" "}
          <strong>{formatARS(TECHO, 0)}</strong>, porque el piso es el 50% y el techo el 100% del
          salario mínimo vital y móvil ({formatARS(SMVM.mensual, 0)}). Cobrás entre 2 y 12 cuotas
          según los meses con aportes de los últimos 3 años, y el monto{" "}
          <strong>va bajando</strong>: 100% los primeros 4 meses, 85% del 5 al 8 y 70% del 9 al 12.
          Con 45 años o más se suman {R.extension45.cuotasExtra} cuotas al 70%. Y tenés{" "}
          {R.diasParaSolicitar} días para pedirla: pasado ese plazo, cada día de demora se descuenta
          del total.
        </p>
      </RespuestaPrimero>

      <CalculadoraDesempleo />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los nueve casos que dan derecho a cobrarla (uno es nuevo)
        </h2>
        <p className="text-zinc-600">
          No alcanza con haber dejado de trabajar: la salida tiene que estar entre los casos del
          artículo 114 de la Ley 24.013. Eran ocho desde 1991. El{" "}
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
            {DESEMPLEO_TEXTOS.notaVigenciaIncisoI}. Hasta el 5 de marzo de 2026, terminar el
            contrato por mutuo acuerdo te dejaba sin prestación: ese caso no estaba en la lista. La{" "}
            <strong>renuncia</strong> del artículo 240, en cambio, sigue afuera: no es lo mismo
            firmar un acuerdo de desvinculación que renunciar.
          </p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El número que sale en las noticias dura cuatro meses
        </h2>
        <p className="text-zinc-600">
          Este es el recorrido completo de alguien con {formatARS(800_000, 0)} de sueldo neto y 3
          años de aportes, en {MES}. La prestación arranca en el tope de {formatARS(TECHO, 0)} (el
          techo del mes) y desde el quinto mes empieza a bajar:
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
          Si tu prestación quedó en el piso de {formatARS(PISO, 0)}, la baja no te afecta. La
          resolución dice que <em>en ningún caso</em> la prestación mensual puede ser menor al
          mínimo, así que la cuota se queda ahí los doce meses.
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
          Esta es la escala vigente, que fijó la Resolución 4/2026 del Consejo del Salario.
        </p>
        <p className="text-zinc-600">
          Hay un detalle que casi no se cuenta. El 28 de agosto de 2026 el Consejo del Salario se
          reunió y <strong>no hubo acuerdo</strong>, así que la escala la decidió la presidencia
          alterna (un <strong>laudo</strong>, artículo 137 de la Ley 24.013). Ese laudo no fija un
          solo mes: la Resolución 4/2026 dejó escrito el salario mínimo{" "}
          <strong>mes a mes hasta {MES_FIN}</strong>. O sea que el piso y el techo de tu prestación
          hasta {MES_FIN} ya están publicados en el Boletín Oficial y no dependen de ninguna
          negociación futura. La misma resolución confirmó la fórmula de la prestación (75% del
          neto, con piso del 50% y techo del 100% del salario mínimo), que venía de la Resolución
          15/2023. La escala completa, el valor por hora y lo proporcional para jornada reducida
          están en la{" "}
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
          </Link>
          . Es un pago aparte y lo cobrás además del seguro de desempleo. Mientras cobrás la
          prestación te siguen correspondiendo las{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            asignaciones familiares
          </Link>
          . Y si te preguntás qué pasa con tu cobertura médica, mirá{" "}
          <Link
            href="/hasta-cuando-tengo-obra-social"
            className="font-medium text-emerald-700 hover:underline"
          >
            hasta cuándo tenés obra social después del despido
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
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG. No
          es una liquidación ni reemplaza a ANSES: el monto y la cantidad de cuotas dependen de tu
          historia laboral registrada. Consultada el {DESEMPLEO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
