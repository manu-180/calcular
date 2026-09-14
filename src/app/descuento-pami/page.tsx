import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDescuentoPami } from "@/components/CalculadoraDescuentoPami";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import {
  MESES_VIGENCIA_OPCION,
  PAMI_FUENTES,
  PAMI_TEXTOS,
  REGIMENES,
} from "@/data/descuento-pami";
import { BONO_VIGENTE, PRESTACIONES_VIGENTES } from "@/data/prestaciones";
import { aporteSobre, escalaEfectiva, RANGO_EFECTIVO } from "@/lib/descuento-pami";
import { formatARS } from "@/lib/formato";

const MINIMO = PRESTACIONES_VIGENTES.haberMinimo;
const MES = PRESTACIONES_VIGENTES.vigencia;

const EN_EL_MINIMO = aporteSobre(MINIMO, "dependencia").total;
const ESCALA = escalaEfectiva("dependencia");
const DOBLE = ESCALA.find((f) => f.vecesMinimo === 2)!;
const AUTONOMO_DOBLE = aporteSobre(MINIMO * 2, "autonomos").total;

export const metadata: Metadata = {
  title: `Descuento de PAMI en la jubilación: cuánto te sacan del haber en ${MES}`,
  description: `El aporte de obra social se deduce del haber y no es «3% o 6%»: es 3% hasta el haber mínimo (${formatARS(MINIMO, 0)} en ${MES}) y 6% sobre lo que lo excede. Con un haber del doble del mínimo son ${formatARS(DOBLE.aporte, 0)}, un ${DOBLE.alicuotaEfectiva}% efectivo. Calculá tu caso, y mirá por qué irte del PAMI no te baja el descuento.`,
  alternates: { canonical: "/descuento-pami" },
  openGraph: {
    title: "Descuento de PAMI: cuánto sale de tu haber jubilatorio",
    description: `3% hasta el haber mínimo y 6% sobre el excedente (Ley 19.032, art. 8). El aguinaldo también aporta; el bono no.`,
    url: "https://calcular.ar/descuento-pami",
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Descuento de PAMI · ${MES}`)}&s=${encodeURIComponent(`3% hasta ${formatARS(MINIMO, 0)} y 6% sobre el excedente`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto me descuenta el PAMI de la jubilación en ${MES}?`,
    a: `Depende del haber, y no es un porcentaje fijo. El artículo 8 inciso a) de la Ley 19.032 manda aportar el 3% sobre la parte del haber que no supera el haber mínimo garantizado —${formatARS(MINIMO, 0)} en ${MES}— y el 6% sobre lo que lo excede. Quien cobra exactamente el mínimo aporta ${formatARS(EN_EL_MINIMO, 0)}; quien cobra el doble, ${formatARS(DOBLE.aporte, 0)}, que es un ${DOBLE.alicuotaEfectiva}% efectivo y no un 6%. El descuento lo hace ANSeS y lo transfiere al Instituto en forma directa y automática.`,
  },
  {
    q: "¿Es 3% o es 6%? Leí las dos cosas.",
    a: `Las dos, porque son tramos, no opciones. Funciona como la escala de Ganancias: el 3% corre sobre el primer tramo del haber y el 6% sólo sobre el excedente del haber mínimo. Por eso la alícuota efectiva siempre queda entre el ${RANGO_EFECTIVO.piso}% y el ${RANGO_EFECTIVO.techo}%, sin llegar nunca al 6%: el primer tramo no desaparece por más alto que sea el haber. Leerlo como un salto —6% de todo el haber al pasar el mínimo— infla el descuento justo en los haberes medios, que son la mayoría.`,
  },
  {
    q: "Me jubilé como monotributista o autónomo. ¿Cambia?",
    a: `Sí, y es la diferencia que menos se publica. El inciso b) del mismo artículo pone el 6% sobre TODO el haber, sin escalón, para los beneficiarios de la ex Caja de Jubilaciones para Trabajadores Autónomos y del SIJP ex autónomos, tengan o no grupo familiar. Con un haber del doble del mínimo, el inciso a) descuenta ${formatARS(DOBLE.aporte, 0)} y el inciso b), ${formatARS(AUTONOMO_DOBLE, 0)}.`,
  },
  {
    q: "¿Si me voy del PAMI a otra obra social me descuentan menos?",
    a: "No, ni un peso menos, y es el malentendido más caro del tema. El Decreto 292/95 te da la libertad de elegir entre el PAMI y cualquier otro agente del seguro de salud inscripto en el registro (art. 11), y esos agentes están obligados a recibirte sin condicionar el ingreso por patología ni por ninguna otra causa. Pero lo que cambia es el destino del dinero, no el descuento: el art. 13 dice que ANSeS le transfiere al agente elegido una cápita, y la toma de los recursos que legalmente le corresponden al INSSJP. Lo que sale de tu haber lo sigue fijando el artículo 8 de la Ley 19.032.",
  },
  {
    q: "¿Cuándo puedo cambiar de obra social y desde cuándo rige?",
    a: `Una vez por año, y no desde el mes siguiente. El artículo 12 del Decreto 292/95 dice que la opción se ejerce mediante presentación ante ANSeS y que tiene vigencia efectiva a partir del primer día del ${MESES_VIGENCIA_OPCION}º mes posterior a esa presentación. Es decir que entre el trámite y la cobertura nueva hay dos meses completos en los que seguís con la anterior.`,
  },
  {
    q: "¿Al aguinaldo también le descuentan?",
    a: "Sí. Los dos incisos dicen que el aporte se calcula «sobre los haberes de las prestaciones, incluido el haber complementario», y el haber complementario es el aguinaldo previsional. No está exento: se le aplica la misma escala, liquidado aparte del haber del mes.",
  },
  {
    q: "¿Y al bono extraordinario?",
    a: `No. El ${BONO_VIGENTE.norma}, que fija el bono de ${formatARS(BONO_VIGENTE.monto, 0)}, lo declara no remunerativo y no sujeto a descuentos. Por eso se suma entero al bolsillo y no entra en la base del aporte. Es la asimetría que confunde al mirar el recibo: dos conceptos que se cobran juntos y sólo uno paga obra social.`,
  },
  {
    q: "Cobro una pensión no contributiva. ¿Cuánto me descuentan?",
    a: "Nada por este concepto, y no porque se lo estemos estimando: es que ninguna norma verificada fija una alícuota para las prestaciones no contributivas nacionales. El artículo 20 de la Ley 23.660 las menciona entre las prestaciones de las que se deduce el aporte, pero el Decreto 292/95 resolvió su salud por otra vía: el artículo 17 las transfirió a la Secretaría de Desarrollo Social y los artículos 19 y 20 pusieron su cobertura médica a cargo del Estado, contratada por licitación pública —hoy el Programa Federal «Incluir Salud»—. La única excepción que la norma nombra son los veteranos de la Ley 23.848, que permanecen en el INSSJP.",
  },
  {
    q: "¿Puedo pedir que no me descuenten?",
    a: "No es opcional. El artículo 8 de la Ley 23.660 —con el texto que le dio el artículo 277 del Decreto 70/2023— incluye a los jubilados y pensionados nacionales «obligatoriamente en calidad de beneficiarios» de las entidades, y el artículo 20 ordena deducir el aporte de los haberes. Lo que la ley permite elegir es el agente que te atiende, no si aportás.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora del descuento de obra social sobre el haber jubilatorio",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://calcular.ar/descuento-pami",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
      },
      datasetSchema({
        nombre: "Aporte de obra social sobre el haber jubilatorio por tramo de haber",
        descripcion:
          "Aporte del artículo 8 de la Ley 19.032 sobre las prestaciones previsionales: 3% hasta el haber mínimo garantizado y 6% sobre el excedente para los beneficiarios del inciso a), y 6% sobre el total para los del inciso b). Incluye la alícuota efectiva resultante en cada tramo, calculada sobre el haber mínimo vigente que fija la resolución mensual de ANSES.",
        url: "/descuento-pami",
        modificado: PAMI_FUENTES.consultadoEl,
        fuenteNombre: PAMI_FUENTES.lista[0].nombre,
        fuenteUrl: PAMI_FUENTES.lista[0].url,
      }),
      articleSchema({
        titulo: "Descuento de PAMI sobre la jubilación: la escala del 3% y el 6%, y qué no aporta",
        descripcion:
          "El aporte de obra social se deduce del haber por mandato del art. 20 de la Ley 23.660, pero la alícuota vive en el art. 8 de la Ley 19.032 y es progresiva. Qué base incluye el aguinaldo, por qué el bono queda afuera, por qué cambiar de obra social no baja el descuento, y por qué las pensiones no contributivas no tienen alícuota fijada.",
        url: "/descuento-pami",
        modificado: PAMI_FUENTES.consultadoEl,
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
          Descuento de PAMI: cuánto te sacan del haber, y sobre qué
        </h1>
        <p className="text-zinc-600">
          A los jubilados y pensionados el aporte de obra social no se los cobran aparte: se los{" "}
          <strong>deducen del haber</strong> antes de pagarlo. El mandato está en el artículo 20 de
          la Ley 23.660, pero el número no: vive en el artículo 8 de la Ley 19.032, y es una escala
          de dos tramos que se mueve todos los meses.
        </p>
      </header>

      <RespuestaPrimero actualizado={PAMI_FUENTES.consultadoEl}>
        <p>
          <strong>
            Se descuenta el 3% de la parte del haber que no supera el haber mínimo garantizado —
            {formatARS(MINIMO, 0)} en {MES}— y el 6% de lo que lo excede.
          </strong>{" "}
          Con el haber mínimo justo son {formatARS(EN_EL_MINIMO, 0)}; con el doble,{" "}
          {formatARS(DOBLE.aporte, 0)}, que es un {DOBLE.alicuotaEfectiva}% efectivo y no un 6%:
          como el primer tramo no desaparece, la alícuota real nunca llega al {RANGO_EFECTIVO.techo}
          %. Quien se jubiló como autónomo aporta el 6% sobre todo, sin escalón. El{" "}
          <strong>aguinaldo también paga</strong> —la norma dice «incluido el haber
          complementario»— y el <strong>bono extraordinario no</strong>, porque el decreto que lo
          fija lo declara no remunerativo. Y cambiar de obra social{" "}
          <strong>no baja el descuento</strong>: lo que se mueve es el destino del dinero.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu caso</h2>
        <p className="text-sm text-zinc-600">
          Elegí por dónde aportaste y cargá tu haber bruto. El punto donde la escala cambia de tramo
          es el haber mínimo del mes, que fija la {PRESTACIONES_VIGENTES.resolucion}: acá no se
          estima ningún monto.
        </p>
        <CalculadoraDescuentoPami />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué la alícuota efectiva nunca es 6%
        </h2>
        <p className="text-zinc-600">
          Esta tabla es todo el argumento. La columna de la derecha es lo que realmente sale del
          haber dividido por el haber: arranca en el {RANGO_EFECTIVO.piso}% exacto cuando se cobra
          el mínimo y sube de a poco, pero se acerca al {RANGO_EFECTIVO.techo}% sin tocarlo jamás,
          porque el primer tramo sigue tributando al {RANGO_EFECTIVO.piso}% por más alto que sea el
          resto. Los haberes de la tabla son múltiplos del mínimo vigente, para que la escala se lea
          sin depender de ningún caso inventado.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Haber bruto</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Veces el mínimo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Aporte (inc. a)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Alícuota efectiva</th>
                </tr>
              </thead>
              <tbody>
                {ESCALA.map((f) => (
                  <tr
                    key={f.vecesMinimo}
                    className={`border-t border-zinc-100 ${
                      f.vecesMinimo === 1 ? "bg-emerald-50/60 font-semibold" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 tabular-nums text-zinc-800">
                      {formatARS(f.haber, 0)}
                      {f.vecesMinimo === 1 ? (
                        <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          haber mínimo
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                      ×{f.vecesMinimo.toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      {formatARS(f.aporte, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      {f.alicuotaEfectiva.toLocaleString("es-AR", { maximumFractionDigits: 2 })}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          El escalón se mueve solo: como el punto de corte es el haber mínimo y ANSES lo
          redetermina todos los meses por la movilidad del Decreto 274/2024, una misma persona con
          el mismo haber tiene una alícuota efectiva distinta cada mes. Esta tabla se recalcula con
          el mínimo vigente, no está escrita a mano.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los tres casos que la norma distingue</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {REGIMENES.map((r) => (
            <div key={r.id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-semibold text-zinc-900">
                {r.tramos === null ? "Sin alícuota fijada" : r.id === "dependencia" ? "3% + 6%" : "6% liso"}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{r.quien}</p>
              <p className="mt-2 text-xs text-zinc-500">{r.norma}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 19.032, art. 8 inc. a) — la escala de dos tramos
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PAMI_TEXTOS.ley19032Art8IncA}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Las dos partes que casi nunca se citan juntas: <strong>«incluido el haber
              complementario»</strong> (el aguinaldo aporta) y <strong>«sobre lo que excede dicho
              monto»</strong> (el 6% es sólo del excedente, no de todo).
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-sky-300 bg-sky-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 19.032, art. 8 inc. b) — los que se jubilaron como autónomos
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PAMI_TEXTOS.ley19032Art8IncB}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.660, art. 20 — de dónde sale la plata
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PAMI_TEXTOS.ley23660Art20}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El artículo ordena la deducción pero no fija el monto: el art. 16 inc. c) de la misma
              ley lo remite a otras normas — «{PAMI_TEXTOS.ley23660Art16IncC}» —, y esa otra norma
              es la Ley 19.032.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 19.032, art. 9 — quién lo retiene
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PAMI_TEXTOS.ley19032Art9}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 292/95, art. 13 — por qué cambiarte no te baja el descuento
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PAMI_TEXTOS.decreto292Art13}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La cápita sale «de los recursos que legalmente le corresponda al INSSJP»: el aporte
              que te retienen no cambia de tamaño, cambia de destinatario.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 292/95, art. 12 — cuándo se puede cambiar
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PAMI_TEXTOS.decreto292Art12}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 292/95, art. 19 — las pensiones no contributivas van por otro lado
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PAMI_TEXTOS.decreto292Art19}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Por eso esta página no publica un porcentaje para las PNC: su cobertura no se financia
              con un descuento del haber, sino con contrataciones del Estado. La excepción está
              nombrada en el propio artículo: la Ley 23.848, de veteranos de Malvinas.
            </p>
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
          {PAMI_FUENTES.lista.map((f) => (
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
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG;
          quien liquida es ANSeS. Para ver el haber del mes con la movilidad y el bono, usá la{" "}
          <Link href="/jubilacion" className="text-emerald-700 hover:underline">
            calculadora de jubilación
          </Link>
          ; si todavía estás en actividad, el aporte que te descuentan del sueldo está en{" "}
          <Link href="/descuentos-del-sueldo" className="text-emerald-700 hover:underline">
            descuentos del sueldo
          </Link>
          . Consultada el {PAMI_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
