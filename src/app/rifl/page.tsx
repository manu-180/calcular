import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraRifl } from "@/components/CalculadoraRifl";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ALICUOTAS_GENERALES,
  DETRACCION_ART22,
  DETRACCION_ART22_ESPECIAL,
  DETRACCION_ART23_NOMINA_CHICA,
  DETRACCION_ART23_TOPE_EMPLEADOS,
  EXCLUSIONES_ART160,
  MESES_BENEFICIO,
  PUERTAS_ART157,
  RIFL_FUENTES,
  RIFL_TEXTOS,
} from "@/data/rifl";
import { ventanaRifl } from "@/lib/rifl";
import { formatARS } from "@/lib/formato";

// La página revalida a diario: la ventana del art. 156 es una cuenta regresiva y tiene que
// contar bien sin depender de que alguien redeploye.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "RIFL: cuánto baja el costo de contratar, y hasta cuándo podés entrar",
  description:
    "El Régimen de Incentivo a la Formalización Laboral de la Ley 27.802 lleva las contribuciones patronales de SIPA, Fondo de Empleo, Asignaciones Familiares e INSSJP del 18% o 20,40% a un 5% total, por 48 meses y por cada nueva incorporación. Calculá el ahorro y mirá cuántos días queda abierta la ventana.",
  alternates: { canonical: "/rifl" },
  openGraph: {
    title: "RIFL: el 18% que pasa a 5% por 48 meses",
    description:
      "Los dos relojes que casi nadie separa: la ventana para dar el alta cierra al año, pero el beneficio de cada contratación dura 48 meses. Acá el ahorro en pesos y las cuatro puertas de entrada del art. 157.",
    url: "https://calcular.ar/rifl",
    images: [
      {
        url: "/og?t=RIFL&s=Contribuciones%20patronales%20del%2018%25%20al%205%25%20por%2048%20meses",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RiflPage() {
  const v = ventanaRifl();

  const faqs = [
    {
      q: "¿Qué es el RIFL?",
      a: "Es el Régimen de Incentivo a la Formalización Laboral, creado por el Título XX de la Ley 27.802 (artículos 156 a 164). Para cada nueva incorporación que cumpla alguno de los cuatro requisitos del artículo 157, el empleador paga contribuciones patronales reducidas: 2% total para SIPA, Fondo Nacional de Empleo y Asignaciones Familiares, y 3% para el INSSJP, durante los primeros 48 meses de la relación laboral. El régimen general para esos mismos subsistemas es 18% o 20,40% según el inciso del artículo 19 de la Ley 27.541.",
    },
    {
      q: "¿Hasta cuándo puedo entrar al régimen?",
      a: `Hasta el ${v.cierreTexto}. El artículo 156 le da al RIFL «una vigencia de un (1) año contado desde el primer día del segundo mes inmediato siguiente al de la entrada en vigencia de la presente ley». La ley se publicó el 6 de marzo de 2026, así que la ventana abrió el ${v.aperturaTexto} y cierra un año después. Esa fecha es la del alta de la relación laboral, no la del final del beneficio.`,
    },
    {
      q: "Si contrato el último día de la ventana, ¿pierdo el beneficio cuando el régimen se termina?",
      a: `No, y es la confusión más cara de este régimen. Son dos relojes distintos: la ventana para dar el alta cierra el ${v.cierreTexto}, pero los 48 meses del artículo 159 corren «a partir del mes de inicio de la nueva relación laboral». Una contratación hecha el último día de la ventana conserva la alícuota reducida hasta ${v.ultimoMesDelBeneficio}.`,
    },
    {
      q: "¿Qué trabajadores califican?",
      a: "Alcanza con que el trabajador cumpla UNA de las cuatro condiciones del artículo 157, porque la norma las une con «o»: que no haya tenido una relación laboral registrada al 10 de diciembre de 2025; o que haya estado desempleado en los seis meses previos al mes del alta; o que haya estado inscripto en el monotributo; o que su último empleo haya sido en relación de dependencia en el sector público nacional, provincial, municipal o de la Ciudad de Buenos Aires.",
    },
    {
      q: "¿Sirve para reincorporar a alguien que ya trabajó conmigo?",
      a: "No. El artículo 160 lo bloquea expresamente: el beneficio no se puede usar respecto de trabajadores que hayan sido declarados en el Régimen General de la Seguridad Social y que, después del distracto —«cualquiera fuese su causa»—, sean reincorporados por el mismo empleador dentro de los doce meses de la desvinculación.",
    },
    {
      q: "¿Qué pasa si sustituyo personal para aprovechar el beneficio?",
      a: "Quedás excluido en forma automática. El artículo 160 define como uso abusivo «producir sustituciones de personal bajo cualquier figura o el cese como empleador y la constitución de una nueva figura como tal, ya sea a través de las mismas o distintas personas humanas o jurídicas», y aclara que la exclusión «se producirá en forma automática». Y el artículo 161 agrega la consecuencia en plata: hay que ingresar las contribuciones no abonadas por haberse acogido al régimen, «más los intereses y sanciones que pudieran corresponder». Estar en el REPSAL también excluye, mientras dure la publicación.",
    },
    {
      q: "¿Tengo que hacer un trámite para acogerme?",
      a: "El artículo 163 dice que el tratamiento especial «operará de forma automática al momento de darse de alta la nueva relación laboral», en los términos que establezca ARCA. Pero el artículo 162 pone una trampa que conviene conocer: el beneficio es optativo, y «la falta de ejercicio de dicha opción, a partir del inicio de la nueva relación laboral, obstará a que pueda hacer uso retroactivo del beneficio por el o los períodos en que no lo hubiese gozado». Traducido: los meses en los que no lo tomaste no se recuperan después.",
    },
    {
      q: "¿El RIFL también baja la obra social y la ART?",
      a: "No. El artículo 159 adecua las alícuotas de cuatro subsistemas: SIPA, Fondo Nacional de Empleo y Régimen de Asignaciones Familiares (que van juntos al 2%) e INSSJP (al 3%). La contribución a la obra social de la Ley 23.660 y la cuota de la ART de la Ley 24.557 se siguen pagando igual, y también quedan expresamente afuera «las alícuotas adicionales previstas en regímenes previsionales diferenciales y/o especiales de la seguridad social». Por eso la calculadora compara sólo esos cuatro subsistemas: mezclar el resto infla el ahorro.",
    },
    {
      q: "¿La detracción del artículo 22 sigue existiendo?",
      a: `Sí, y no cambia con el RIFL. El artículo 22 de la Ley 27.541 permite detraer de la base imponible ${formatARS(DETRACCION_ART22, 2)} por trabajador y por mes —un importe fijo de 2019 que la ley no actualiza—, y ${formatARS(DETRACCION_ART22_ESPECIAL, 2)} para los empleadores que ese mismo artículo enumera, importe que «no sufrirá actualización alguna». El artículo 23 suma otra detracción de ${formatARS(DETRACCION_ART23_NOMINA_CHICA, 0)} mensuales para nóminas de hasta ${DETRACCION_ART23_TOPE_EMPLEADOS} empleados, pero esa se aplica «sobre la totalidad de la base imponible» y no por trabajador, así que no se puede atribuir a una contratación puntual: por eso la calculadora no la incluye. Como el artículo 159 sólo reemplaza alícuotas y no toca la base, la detracción se aplica igual en los dos escenarios y no altera el ahorro.`,
    },
    {
      q: "Soy empleador nuevo. ¿Puedo usarlo con toda mi nómina?",
      a: "No con toda. El artículo 158 permite a quienes adquirieron el carácter de empleador a partir del 10 de diciembre de 2025 aplicar las condiciones del régimen «hasta el máximo de trabajadores que determine la reglamentación, el que no podrá ser superior al ochenta por ciento (80%) de la nómina de trabajadores». El número exacto lo fija la reglamentación; el techo legal es ese 80%.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora del RIFL (incentivo a la formalización laboral)",
        url: "https://calcular.ar/rifl",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "RIFL: cuánto baja el costo de contratar con la Ley 27.802",
        descripcion:
          "El Título XX de la Ley 27.802 lleva las contribuciones patronales de SIPA, Fondo Nacional de Empleo, Asignaciones Familiares e INSSJP a un 5% total por 48 meses y por cada nueva incorporación. La ventana para dar el alta cierra a un año de abierta; el beneficio de cada alta dura 48 meses.",
        url: "/rifl",
        modificado: RIFL_FUENTES.consultadoEl,
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
          RIFL: cuánto baja el costo de contratar
        </h1>
        <p className="text-zinc-600">
          Es el número más grande de toda la reforma laboral para un empleador, y circula como
          noticia en vez de como cuenta: por cada nueva incorporación que califique, las
          contribuciones patronales de cuatro subsistemas pasan del{" "}
          <strong>18% o 20,40%</strong> a un <strong>5% total</strong>, durante{" "}
          <strong>{MESES_BENEFICIO} meses</strong>. Acá está en pesos, y con los dos relojes
          separados: el que cierra la puerta y el que corre para cada contratación.
        </p>
      </header>

      <div
        className={`rounded-2xl border p-5 ${
          v.abierta ? "border-amber-300 bg-amber-50/70" : "border-zinc-300 bg-zinc-50"
        }`}
      >
        {v.abierta ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
              La ventana está abierta
            </p>
            <p className="mt-1 text-2xl font-bold text-amber-900">
              Quedan {v.diasParaElCierre.toLocaleString("es-AR")} días para dar de alta con RIFL
            </p>
            <p className="mt-1 text-sm text-amber-900/80">
              El régimen admite altas desde el {v.aperturaTexto} y hasta el{" "}
              <strong>{v.cierreTexto}</strong> (art. 156). Una contratación hecha ese último día
              conserva la alícuota reducida hasta {v.ultimoMesDelBeneficio}.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">
              La ventana para dar de alta ya cerró
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              Cerró el {v.cierreTexto} (art. 156)
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Las altas hechas dentro de la ventana conservan la alícuota reducida por sus{" "}
              {MESES_BENEFICIO} meses: el reloj del beneficio es independiente del de la ventana.
            </p>
          </>
        )}
      </div>

      <RespuestaPrimero actualizado={RIFL_FUENTES.consultadoEl}>
        <p>
          Por cada nueva incorporación que cumpla <strong>una</strong> de las cuatro condiciones del
          art. 157, el empleador paga <strong>2%</strong> de contribuciones a SIPA + Fondo Nacional
          de Empleo + Asignaciones Familiares y <strong>3%</strong> al INSSJP —un{" "}
          <strong>5% total</strong>— en lugar del 18% o 20,40% del art. 19 de la Ley 27.541. El
          beneficio dura <strong>{MESES_BENEFICIO} meses</strong> contados desde el mes de inicio de
          la relación. La <strong>ventana para dar el alta cierra el {v.cierreTexto}</strong>, pero
          el beneficio de cada contratación sigue corriendo después de esa fecha. No sirve para
          reincorporar a alguien desvinculado hace menos de 12 meses (art. 160), y{" "}
          <strong>no es retroactivo</strong>: el art. 162 dice que los meses en los que no ejerciste
          la opción no se recuperan. Obra social y ART no cambian.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El ahorro, en pesos</h2>
        <p className="text-sm text-zinc-600">
          Cargá el sueldo bruto del nuevo empleado y la alícuota que pagás hoy. La cuenta compara
          únicamente los cuatro subsistemas que el art. 159 adecua.
        </p>
        <CalculadoraRifl />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las cuatro puertas de entrada: alcanza con una
        </h2>
        <p className="text-sm text-zinc-600">
          El art. 157 las une con «o». No hay que cumplirlas todas, y esa lectura es la diferencia
          entre creer que el régimen es marginal y descubrir que alcanza a casi cualquier
          incorporación que venga del monotributo o del desempleo.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <tbody>
              {PUERTAS_ART157.map((p) => (
                <tr key={p.inciso} className="border-b border-zinc-200 align-top">
                  <td className="w-12 py-3 pr-3 font-mono text-xs text-zinc-500">{p.inciso}</td>
                  <td className="py-3 text-zinc-700">{p.texto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que hace perder el beneficio</h2>
        <ul className="space-y-2">
          {EXCLUSIONES_ART160.map((e) => (
            <li
              key={e}
              className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 text-sm text-zinc-700"
            >
              {e}
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">
          Y el art. 161 pone el precio: el decaimiento obliga a ingresar «las contribuciones con
          destino a la seguridad social no abonadas por haberse acogido al régimen, más los
          intereses y sanciones que pudieran corresponder».
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 27.802, art. 156 — el reloj de la ventana
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RIFL_TEXTOS.art156}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Cuenta: la ley entró en vigencia con su publicación en el Boletín Oficial el 6 de
              marzo de 2026 (art. 217). El mes inmediato siguiente es abril; el segundo, mayo. De
              ahí sale el {v.aperturaTexto} como apertura y el {v.cierreTexto} como cierre.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 27.802, art. 159 — las alícuotas y el reloj de los {MESES_BENEFICIO} meses
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RIFL_TEXTOS.art159}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 27.541, art. 19 — con qué se compara
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RIFL_TEXTOS.ley27541Art19}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Son los mismos cuatro subsistemas que nombra el art. 159. Por eso la comparación es
              legítima y no hace falta sumar obra social ni ART: el RIFL no las toca.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 27.802, art. 162 — optativo, y sin efecto retroactivo
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RIFL_TEXTOS.art162}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Leído junto con el art. 163 —el tratamiento «operará de forma automática al momento de
              darse de alta la nueva relación laboral»— la conclusión práctica es que el momento de
              decidir es el alta, no después.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 27.802, art. 164 — los planes sociales no se cortan
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RIFL_TEXTOS.art164}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La base no cambia: sólo las alícuotas</h2>
        <p className="text-sm text-zinc-600">
          El art. 159 dice que el empleador «deberá ingresar las alícuotas previstas para el régimen
          general de contribuciones patronales, tomando en cuenta las siguientes adecuaciones». Lo
          único que reemplaza son los porcentajes: la base imponible se sigue armando con las reglas
          de siempre, incluidas las detracciones.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Ley 27.541, art. 22</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RIFL_TEXTOS.ley27541Art22}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El mismo artículo fija en {formatARS(DETRACCION_ART22_ESPECIAL, 2)} la detracción de
              los empleadores que enumera, y aclara que «no sufrirá actualización alguna».
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Ley 27.541, art. 23</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RIFL_TEXTOS.ley27541Art23}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Ojo con esta: se aplica sobre la base <em>total</em> de la nómina, no por trabajador.
              Por eso no entra en el cálculo de una contratación puntual — atribuírsela a un solo
              empleado infla el ahorro.
            </p>
          </blockquote>
        </div>
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
          Del otro lado del mismo recibo:{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            cuánto le queda de bolsillo al empleado
          </Link>{" "}
          y{" "}
          <Link
            href="/descuentos-del-sueldo"
            className="font-medium text-emerald-700 hover:underline"
          >
            qué se le puede descontar
          </Link>
          . Si la incorporación viene del monotributo, la{" "}
          <Link
            href="/repartidores-de-apps"
            className="font-medium text-emerald-700 hover:underline"
          >
            página de plataformas
          </Link>{" "}
          explica el régimen del que sale.
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {RIFL_FUENTES.lista.map((f) => (
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
          Las alícuotas del régimen general salen del texto <strong>actualizado</strong> de la Ley
          27.541 en InfoLEG ({ALICUOTAS_GENERALES.map((a) => a.etiqueta).join(" y ")}), y las del
          RIFL del texto oficial de la Ley 27.802. Esta página es informativa y orientativa: no
          reemplaza el asesoramiento de un contador ni una liquidación de cargas sociales.
          Consultada el {RIFL_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
