import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraObraSocialMonotributo } from "@/components/CalculadoraObraSocialMonotributo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import {
  ESCALONES,
  MESES_PARA_CAMBIAR,
  MONO_OS_FUENTES,
  MONO_OS_TEXTOS,
  REGLAS,
  REPARTO_MONOTRIBUTO,
  VIGENCIA_MONO_OS,
} from "@/data/obra-social-monotributo";
import { OfertaMonotributo } from "@/components/oferta/OfertaMonotributo";
import { datosOferta } from "@/lib/oferta";

export const metadata: Metadata = {
  title: "Obra social del monotributo: desde cuándo te cubre",
  description:
    "La cobertura llega en tres escalones: ambulatorio desde el alta, internación a los 3 meses y alto costo a los 6 (Decreto 1/2010). Calculá tus fechas.",
  alternates: { canonical: "/obra-social-monotributo" },
  openGraph: {
    ...openGraphDe({
      ruta: "/obra-social-monotributo",
      titulo: "Obra social del monotributo",
      bajada: "Los tres escalones del Decreto 1/2010",
    }),
    title: "Obra social del monotributo: desde cuándo te cubre de verdad",
    description:
      "Ambulatorio desde el alta, internación a los 3 meses, alto costo y discapacidad a los 6. Las tres fechas, calculadas.",
  },
};

const faqs = [
  {
    q: "Me di de alta en el monotributo: ¿desde cuándo me cubre la obra social?",
    a: "Desde el primer día, pero solo lo ambulatorio: consultas, especialistas, estudios sin internación, odontología del PMOE y medicamentos al 40%. La internación todavía no entra. El Anexo del Decreto 1/2010 lo llama «acceso progresivo a la cobertura de salud» y lo divide en tres escalones: lo ambulatorio desde el alta, la internación a los 3 meses y las prestaciones de alto costo e Integración a los 6.",
  },
  {
    q: "¿Cuánto tengo que esperar para tener internación cubierta?",
    a: "Tres meses desde que te adheriste. Recién ahí entra la internación al 100% y sin límite de tiempo, junto con los medicamentos oncológicos, la hemodiálisis, los cuidados paliativos y las prótesis que se colocan por dentro. Antes de esa fecha, la obra social no está obligada a cubrirte una internación por el aporte del monotributo.",
  },
  {
    q: "¿Y si necesito prestaciones por discapacidad?",
    a: "Ese es el tercer escalón y llega a los 6 meses. El inciso c) del Anexo (cambiado por el Decreto 955/2024) suma las prestaciones que subsidia el SURGE (Res. SSS 731/2023) y las del mecanismo de «Integración» del Decreto 904/2016, que es el de discapacidad. También suma las que se gestionan por el Fondo Solidario de Redistribución.",
  },
  {
    q: "¿La obra social puede rechazarme por ser categoría A?",
    a: "Sí, y desde octubre de 2024 hay una norma que se lo permite. El Decreto 955/2024 sumó el art. 69 bis al Decreto 1/2010. Creó en la Superintendencia de Servicios de Salud un registro de obras sociales que aceptan monotributistas, y las anotadas quedan «facultadas para distinguir las categorías cuyo ingreso permitan». No es algo por fuera de la norma: es un permiso que les dio el decreto.",
  },
  {
    q: "Si cambio de obra social, ¿empiezo la carencia de nuevo?",
    a: `No. El art. 74 inc. c) le prohíbe a la obra social nueva aplicarte el acceso progresivo de los arts. 70 y 71 cuando te cambiás: rige el sistema de compensaciones del art. 12 del Decreto 504/98. Lo que sí te pide es quedarte ${MESES_PARA_CAMBIAR} meses en la obra social que elegiste antes de poder cambiar.`,
  },
  {
    q: "Me di de baja del monotributo y volví. ¿Se me reinicia?",
    a: "Sí, y es lo que más sorprende. El art. 73 manda aplicar el acceso progresivo del art. 70 «en cualquier caso de reincorporación al Régimen Simplificado». Cambiar de obra social no reinicia el reloj. Salir del régimen y volver, sí.",
  },
  {
    q: "¿Qué pasa si me atraso con una cuota?",
    a: "Para usar las prestaciones tenés que estar al día con los aportes del monotributo. El art. 76 del Decreto 1/2010 deja que la obra social te pida los comprobantes de pago (los tuyos y los de tu grupo familiar) antes de atenderte.",
  },
  {
    q: "¿Puedo pagar un extra para no esperar?",
    a: "La ley lo prevé. El art. 42 inc. c) deja que la obra social ofrezca «la plena cobertura, durante el período de carencia que fije la reglamentación, mediante el cobro del pertinente coseguro». Si te ofrecen adelantar la internación pagando un adicional, eso está permitido. Pero no es obligatorio: ni para la obra social ofrecerlo ni para vos aceptarlo.",
  },
  {
    q: "¿Cuánto de mi cuota va a la obra social?",
    a: `La parte de obra social del monotributo es un monto fijo por categoría (igual para servicios y para venta de cosas muebles), y desde la categoría D sube en cada tramo. De ese aporte, el ${REPARTO_MONOTRIBUTO.fondo * 100}% va al Fondo Solidario de Redistribución del art. 22 de la Ley 23.661 y el ${REPARTO_MONOTRIBUTO.entidad * 100}% le llega a la obra social que elegiste. Es un reparto distinto del 85/15 que rige para quien trabaja en relación de dependencia desde el Decreto 600/2024.`,
  },
  {
    q: "Estoy en el monotributo desde hace años. ¿También tengo carencia?",
    a: "No, si te adheriste antes de que entraran en vigencia los cambios de la Ley 26.565. El art. 72 del Decreto 1/2010 te deja afuera del acceso progresivo. Sí se aplica si sumás a tu grupo familiar después de esa fecha.",
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
          «El monotributo incluye obra social» es cierto, pero es la mitad de la respuesta. La
          cobertura <strong>no arranca completa el primer día</strong>: llega en{" "}
          <strong>tres escalones</strong>. Lo ambulatorio, desde el alta. La{" "}
          <strong>internación, recién a los tres meses</strong>. Y las prestaciones de alto costo,
          SURGE e <strong>Integración (la de discapacidad), a los seis</strong>. Acá calculás tus
          tres fechas.
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
          desde que te adheriste al monotributo. <strong>Se reinicia si te das de baja y
          volvés</strong> (art. 73), pero <strong>no</strong> se reinicia si cambiás de obra social
          (art. 74 inc. c). Para poder cambiar, tenés que quedarte {MESES_PARA_CAMBIAR} meses en la
          que elegiste.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tus tres fechas</h2>
        <p className="text-sm text-zinc-600">
          Poné la fecha de alta (la de cuando volviste, si te diste de baja) y tu categoría. Vas a
          ver qué tenés cubierto hoy, qué te falta, desde cuándo podés cambiar de obra social y
          cuánto de tu aporte le llega de verdad a la obra social.
        </p>
        <CalculadoraObraSocialMonotributo />
      </section>

      <OfertaMonotributo oferta={datosOferta("planilla-monotributo")} desde="obra-social-monotributo" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los tres escalones, prestación por prestación</h2>
        <p className="text-zinc-600">
          La ley no pone los plazos: se los pasa al Poder Ejecutivo. El art. 42 inc. c) del Anexo de
          la Ley 24.977 dice que el Ejecutivo «dispondrá un número determinado de meses de los
          aportes… que deberán haberse ingresado durante un período anterior a la fecha en que
          corresponda otorgar la cobertura». Ese número está en el Anexo del Decreto 1/2010, y son
          tres escalones, no uno.
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
          Ahí hay dos cosas escritas que casi nadie publica. Primero: la espera existe porque lo
          manda la ley, no porque lo decida la obra social. Segundo: la obra social{" "}
          <strong>te puede vender la cobertura completa durante ese tiempo</strong> cobrando un
          coseguro. Y el artículo termina con la condición que decide los casos reales:
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
          Esta reforma explica algo que muchos cuentan como abuso y que está en el texto vigente. El
          decreto sumó el art. 69 bis y creó un registro en la Superintendencia de Servicios de
          Salud:
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Decreto 1/2010, art. 69 bis (incorporado por el Decreto 955/2024)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{MONO_OS_TEXTOS.art69bis}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Desde octubre de 2024, que una obra social acepte monotributistas de categoría F y
          rechace a los de categoría A no es una irregularidad: la norma se lo permite. El mismo
          decreto reescribió el art. 74 (el del cambio de obra social) y el escalón de los seis
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
          El art. 39 inc. b) del Anexo manda el{" "}
          <strong>{REPARTO_MONOTRIBUTO.fondo * 100}%</strong> del aporte de obra social al Fondo
          Solidario de Redistribución del art. 22 de la Ley 23.661. A la obra social que elegiste le
          llega el {REPARTO_MONOTRIBUTO.entidad * 100}%. Es un reparto{" "}
          <strong>distinto</strong> del de quien trabaja en relación de dependencia, que desde el
          Decreto 600/2024 es 85/15 (lo explicamos en{" "}
          <Link href="/derivar-aportes-a-prepaga" className="text-emerald-700 hover:underline">
            derivar aportes a una prepaga
          </Link>
          ). Y desde la reforma del art. 92 de la Ley 27.743, la parte de obra social{" "}
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y usa normas publicadas en el Boletín Oficial e InfoLEG. No
          reemplaza la consulta con tu obra social, que es la que maneja las prestaciones. Si venís
          de un trabajo en relación de dependencia, la cobertura de antes tiene su propio plazo:{" "}
          <Link href="/hasta-cuando-tengo-obra-social" className="text-emerald-700 hover:underline">
            hasta cuándo tenés obra social después del trabajo
          </Link>
          . Consultada el {MONO_OS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
