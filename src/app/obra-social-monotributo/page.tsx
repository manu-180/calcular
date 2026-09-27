import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraObraSocialMonotributo } from "@/components/CalculadoraObraSocialMonotributo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ESCALONES,
  MESES_PARA_CAMBIAR,
  MONO_OS_FUENTES,
  MONO_OS_TEXTOS,
  REGLAS,
  REPARTO_MONOTRIBUTO,
  VIGENCIA_MONO_OS,
} from "@/data/obra-social-monotributo";
import { PlanillaCTA } from "@/components/PlanillaCTA";

export const metadata: Metadata = {
  title: "Obra social del monotributo: desde cuándo te cubre (y qué te pueden negar)",
  description:
    "La cobertura no arranca completa el día uno. El Decreto 1/2010 la parte en tres escalones: ambulatorio desde el alta, internación recién a los 3 meses y las prestaciones de alto costo y discapacidad a los 6. Calculá tus tres fechas exactas.",
  alternates: { canonical: "/obra-social-monotributo" },
  openGraph: {
    title: "Obra social del monotributo: desde cuándo te cubre de verdad",
    description:
      "Ambulatorio desde el alta, internación a los 3 meses, alto costo y discapacidad a los 6. Las tres fechas, calculadas.",
    url: "https://calcular.ar/obra-social-monotributo",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Obra social del monotributo")}&s=${encodeURIComponent("Los tres escalones del Decreto 1/2010")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Me di de alta en el monotributo: ¿desde cuándo me cubre la obra social?",
    a: "Desde el primer día, pero sólo el nivel ambulatorio: consultas, especialidades, estudios ambulatorios, odontología del PMOE y medicamentos al 40%. La internación no está incluida todavía. El Anexo del Decreto 1/2010 llama a esto «acceso progresivo a la cobertura de salud» y lo divide en tres escalones: el ambulatorio desde el alta, la internación a los 3 meses y las prestaciones de alto costo e Integración a los 6.",
  },
  {
    q: "¿Cuánto tengo que esperar para tener internación cubierta?",
    a: "Tres meses desde la adhesión. Recién ahí entra el nivel internación al 100% y sin límite de tiempo, con los medicamentos oncológicos, la hemodiálisis, los cuidados paliativos y las prótesis de colocación interna. Antes de esa fecha, la obra social no está obligada a cubrirte una internación por el aporte del monotributo.",
  },
  {
    q: "¿Y si necesito prestaciones por discapacidad?",
    a: "Ese es el tercer escalón y llega a los 6 meses. El inciso c) del Anexo —sustituido por el Decreto 955/2024— incorpora las prestaciones subsidiadas por el SURGE (Res. SSS 731/2023) y las del mecanismo de «Integración» del Decreto 904/2016, que es el de discapacidad, además de las gestionables por el Fondo Solidario de Redistribución.",
  },
  {
    q: "¿La obra social puede rechazarme por ser categoría A?",
    a: "Sí, y desde octubre de 2024 tiene una norma que se lo permite. El Decreto 955/2024 incorporó el art. 69 bis al Decreto 1/2010: creó en la Superintendencia de Servicios de Salud un registro de agentes que aceptan monotributistas, y las inscriptas quedan «facultadas para distinguir las categorías cuyo ingreso permitan». No es una práctica al margen de la norma: es una facultad que le dio el decreto.",
  },
  {
    q: "Si cambio de obra social, ¿empiezo la carencia de nuevo?",
    a: `No. El art. 74 inc. c) le prohíbe expresamente al agente receptor aplicar el acceso progresivo de los arts. 70 y 71 en las opciones de cambio: rige el régimen de compensaciones del art. 12 del Decreto 504/98. Lo que sí exige es permanecer ${MESES_PARA_CAMBIAR} meses en la obra social elegida antes de poder cambiar.`,
  },
  {
    q: "Me di de baja del monotributo y volví. ¿Se me reinicia?",
    a: "Sí, y es la asimetría que más sorprende. El art. 73 manda aplicar el acceso progresivo del art. 70 «en cualquier caso de reincorporación al Régimen Simplificado». Cambiar de obra social no reinicia el reloj; salir del régimen y volver, sí.",
  },
  {
    q: "¿Qué pasa si me atraso con una cuota?",
    a: "La ley condiciona el acceso a las prestaciones a estar al día con los aportes del régimen simplificado, y el art. 76 del Decreto 1/2010 faculta a los agentes del seguro de salud a pedirte los comprobantes de pago —los tuyos y los de tu grupo familiar— como condición para prestarte el servicio.",
  },
  {
    q: "¿Puedo pagar un extra para no esperar?",
    a: "La ley lo prevé: el art. 42 inc. c) habilita a la obra social a ofrecer «la plena cobertura, durante el período de carencia que fije la reglamentación, mediante el cobro del pertinente coseguro». O sea que si te ofrecen adelantar la internación pagando un adicional, eso está contemplado en la norma. No es obligatorio para la entidad ofrecerlo ni para vos aceptarlo.",
  },
  {
    q: "¿Cuánto de mi cuota va a la obra social?",
    a: `El componente de obra social del monotributo es un importe fijo por categoría —igual para prestación de servicios y para venta de cosas muebles— y desde la categoría D sube en cada tramo. De ese aporte, el ${REPARTO_MONOTRIBUTO.fondo * 100}% va al Fondo Solidario de Redistribución del art. 22 de la Ley 23.661 y el ${REPARTO_MONOTRIBUTO.entidad * 100}% le llega a la entidad que elegiste. Es un reparto distinto del 85/15 que rige para el trabajador en relación de dependencia desde el Decreto 600/2024.`,
  },
  {
    q: "Estoy en el monotributo desde hace años. ¿También tengo carencia?",
    a: "No, si adheriste antes de que entraran en vigencia las modificaciones de la Ley 26.565. El art. 72 del Decreto 1/2010 los deja expresamente fuera del acceso progresivo. Sí se aplica a la incorporación de tu grupo familiar posterior a esa fecha.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de carencia de la obra social del monotributo",
        url: "https://calcular.ar/obra-social-monotributo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Obra social del monotributo: desde cuándo te cubre",
        descripcion:
          "Los tres escalones del acceso progresivo del Decreto 1/2010: ambulatorio desde el alta, internación a los tres meses y prestaciones de alto costo, SURGE e Integración a los seis.",
        url: "/obra-social-monotributo",
        modificado: MONO_OS_FUENTES.consultadoEl,
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
          Obra social del monotributo: desde cuándo te cubre de verdad
        </h1>
        <p className="text-zinc-600">
          «El monotributo incluye obra social» es cierto y es la mitad de la respuesta. La
          cobertura <strong>no arranca completa el día uno</strong>: el reglamento la parte en{" "}
          <strong>tres escalones</strong>. Lo ambulatorio va desde el alta; la{" "}
          <strong>internación recién a los tres meses</strong>; y las prestaciones de alto costo,
          SURGE e <strong>Integración —el mecanismo de discapacidad— a los seis</strong>. Acá
          están tus tres fechas.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={MONO_OS_FUENTES.consultadoEl}
        norma="Decreto 1/2010, Anexo · Ley 24.977, Anexo, arts. 39, 40 y 42"
        fuente={MONO_OS_FUENTES.principal}
      />

      <RespuestaPrimero actualizado={MONO_OS_FUENTES.consultadoEl}>
        <p>
          <strong>
            Ambulatorio desde el alta · internación a los 3 meses · alto costo, SURGE e
            Integración a los 6 meses
          </strong>{" "}
          (Anexo del Decreto 1/2010, «Acceso progresivo a la cobertura de salud»). El reloj corre
          desde tu adhesión al régimen simplificado y{" "}
          <strong>se reinicia si te das de baja y volvés</strong> (art. 73), pero{" "}
          <strong>no</strong> se reinicia si cambiás de obra social (art. 74 inc. c). Para poder
          cambiar hay que quedarse {MESES_PARA_CAMBIAR} meses en la que elegiste.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tus tres fechas</h2>
        <p className="text-sm text-zinc-600">
          Cargá la fecha de alta —la del reingreso, si volviste— y la categoría. Sale qué tenés
          cubierto hoy, qué te falta, desde cuándo podés cambiar de obra social y cuánto de tu
          aporte le llega realmente a la entidad.
        </p>
        <CalculadoraObraSocialMonotributo />
      </section>

      <PlanillaCTA producto="planilla-monotributo" desde="obra-social-monotributo" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los tres escalones, prestación por prestación</h2>
        <p className="text-zinc-600">
          La ley no fija los plazos: los delega. El art. 42 inc. c) del Anexo de la Ley 24.977 dice
          que el Poder Ejecutivo «dispondrá un número determinado de meses de los aportes… que
          deberán haberse ingresado durante un período anterior a la fecha en que corresponda
          otorgar la cobertura». Ese número está en el Anexo del Decreto 1/2010, y son tres
          escalones, no uno.
        </p>
        <div className="space-y-4">
          {ESCALONES.map((e) => (
            <div key={e.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-zinc-900">{e.titulo}</h3>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                  {e.meses === 0 ? "desde el alta" : `a los ${e.meses} meses`}
                </span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                {e.prestaciones.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-zinc-500">{e.norma}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que la ley delegó, con sus palabras
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Ley 24.977, Anexo, art. 42 inc. c)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{MONO_OS_TEXTOS.art42}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Dos cosas quedan escritas ahí y casi no se publican. La primera: la carencia existe por
          mandato de la ley, no por una decisión de la obra social. La segunda: la entidad{" "}
          <strong>puede venderte la cobertura completa durante ese período</strong> cobrando un
          coseguro. Y el artículo cierra con la condición que decide los casos reales:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="mt-0 text-sm text-zinc-700">«{MONO_OS_TEXTOS.art42Cierre}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que cambió el {VIGENCIA_MONO_OS.reformaReciente}
        </h2>
        <p className="text-zinc-600">
          Es la reforma que explica algo que se cuenta como abuso y está en el texto vigente. El
          decreto incorporó el art. 69 bis y creó un registro en la Superintendencia de Servicios
          de Salud:
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Decreto 1/2010, art. 69 bis (incorporado por el Decreto 955/2024)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{MONO_OS_TEXTOS.art69bis}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Que una obra social acepte monotributistas de categoría F y rechace los de categoría A
          no es, desde octubre de 2024, una irregularidad: es una facultad expresa. El mismo
          decreto reescribió el art. 74 —el de la opción de cambio— y el escalón de los seis
          meses.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las reglas que deciden un caso real</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="divide-y divide-zinc-100">
            {REGLAS.map((r) => (
              <div key={r.id} className="px-4 py-3">
                <h3 className="font-semibold text-zinc-900">{r.titulo}</h3>
                <p className="mt-1 text-sm text-zinc-600">{r.texto}</p>
                <p className="mt-1 text-xs text-zinc-500">{r.norma}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Tu aporte no llega entero: el 10% se va al Fondo
        </h2>
        <p className="text-zinc-600">
          El art. 39 inc. b) del Anexo manda un{" "}
          <strong>{REPARTO_MONOTRIBUTO.fondo * 100}%</strong> del aporte de obra social al Fondo
          Solidario de Redistribución del art. 22 de la Ley 23.661. A la entidad que elegiste le
          llega el {REPARTO_MONOTRIBUTO.entidad * 100}%. Es un reparto{" "}
          <strong>distinto</strong> del que rige para el trabajador en relación de dependencia,
          que desde el Decreto 600/2024 es 85/15 —lo explicamos en{" "}
          <Link href="/derivar-aportes-a-prepaga" className="text-emerald-700 hover:underline">
            derivar aportes a una prepaga
          </Link>
          —. Y desde la reforma del art. 92 de la Ley 27.743, el componente de obra social{" "}
          <strong>ya no es igual en todas las categorías</strong>: sube en cada tramo desde la D.
          El detalle de toda la cuota está en la{" "}
          <Link href="/monotributo" className="text-emerald-700 hover:underline">
            calculadora de monotributo
          </Link>
          .
        </p>
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
          {MONO_OS_FUENTES.lista.map((f) => (
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
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG; no
          reemplaza la consulta con tu obra social, que es quien administra las prestaciones. Si
          venís de un empleo en relación de dependencia, la cobertura anterior tiene su propio
          plazo:{" "}
          <Link href="/hasta-cuando-tengo-obra-social" className="text-emerald-700 hover:underline">
            hasta cuándo tenés obra social después del trabajo
          </Link>
          . Consultada el {MONO_OS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
