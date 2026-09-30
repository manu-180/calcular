import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraViajante } from "@/components/CalculadoraViajante";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_PRESCRIPCION_ESTATUTO,
  DEROGACION_TEXTO,
  DIAS_ACEPTACION_NOTA,
  OTRAS_DEROGACIONES,
  QUE_SE_PIERDE,
  REFORMA_PUBLICADA,
  REQUISITOS_DEPENDENCIA,
  TEXTOS,
  ULTIMO_DIA_VIGENTE_TEXTO,
  VIAJANTES_FUENTES,
} from "@/data/viajantes";

export const metadata: Metadata = {
  title: "Indemnización por clientela del viajante de comercio: cuánto es y hasta cuándo",
  description:
    "El art. 14 de la Ley 14.546 paga el 25% de lo que correspondería por un despido intempestivo e injustificado, cualquiera sea el motivo de la disolución — también si el viajante renuncia. Y el art. 198 de la Ley 27.802 deroga todo el estatuto el 1° de enero de 2027. Calculá el monto con el texto vigente.",
  alternates: { canonical: "/indemnizacion-por-clientela" },
  openGraph: {
    title: "Indemnización por clientela: el 25% que se termina el 1/1/2027",
    description:
      "Cuánto cobra un viajante de comercio por clientela, por qué también se cobra habiendo renunciado, y qué pierde exactamente cuando la Ley 14.546 se deroga.",
    url: "https://calcular.ar/indemnizacion-por-clientela",
    images: [
      {
        url: "/og?t=Indemnizaci%C3%B3n%20por%20clientela&s=El%2025%25%20del%20art.%2014%20y%20la%20fecha%20en%20que%20se%20termina",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function IndemnizacionPorClientelaPage() {
  const faqs = [
    {
      q: "¿Cuánto es la indemnización por clientela de un viajante de comercio?",
      a: "El art. 14 de la Ley 14.546 la fija en «el veinticinco por ciento de lo que le hubiere correspondido en caso de despido intempestivo e injustificado». Es un porcentaje de una INDEMNIZACIÓN, no de las remuneraciones: circula bastante la versión de que sería el 25% de lo cobrado en los últimos cinco años, y el artículo no dice eso. Hace falta más de un año de contrato.",
    },
    {
      q: "¿Se cobra la clientela si renuncié?",
      a: "Sí. Es la parte del artículo que casi no se publica: la indemnización se percibe «cualquiera sea el motivo determinante de la disolución del contrato». Renuncia, mutuo acuerdo, jubilación o despido con causa: el art. 14 no distingue. Lo que cambia según el motivo es el resto de la liquidación, no la clientela.",
    },
    {
      q: "¿Hasta cuándo se puede reclamar la indemnización por clientela?",
      a: `El régimen entero se termina el ${DEROGACION_TEXTO}: el art. 198 de la Ley 27.802 dice, completo, «Derógase la ley 14.546 y sus modificatorias, a partir del 1º de enero de 2027». Las disoluciones ocurridas hasta el ${ULTIMO_DIA_VIGENTE_TEXTO} inclusive pasan con el estatuto vigente; desde el 1/1/2027 el viajante queda bajo la Ley de Contrato de Trabajo, que no tiene un rubro equivalente.`,
    },
    {
      q: "¿La ley ya está sancionada o es un proyecto?",
      a: `Está sancionada y publicada: la Ley 27.802 de Modernización Laboral salió en el Boletín Oficial del ${REFORMA_PUBLICADA}. Muchas de las notas que circulan se escribieron cuando era proyecto o tenía media sanción, y todavía dicen «propone derogar». Su art. 217 aclara que los artículos rigen desde la publicación «salvo disposición en contrario», y el art. 198 justamente trae esa disposición: la derogación empieza el 1/1/2027.`,
    },
    {
      q: "¿El 25% se calcula sobre la indemnización por antigüedad sola o también sobre el preaviso?",
      a: "La ley no lo dice. El art. 14 remite a «lo que le hubiere correspondido en caso de despido intempestivo e injustificado» sin enumerar rubros, y ese despido —intempestivo, o sea sin preaviso— genera indemnización por antigüedad (art. 245) y también la sustitutiva del preaviso (art. 232) con la integración del mes (art. 233). Por eso esta calculadora muestra las dos lecturas, la estricta y la amplia, en vez de elegir una y presentarla como la única.",
    },
    {
      q: "¿Cuánto tiempo hay que haber trabajado para tener derecho?",
      a: "Más de un año: el art. 14 lo condiciona a que la disolución ocurra «una vez transcurrido un año de vigencia» del contrato. Con menos de doce meses no hay clientela, aunque sí se cobra el resto de la liquidación.",
    },
    {
      q: "¿Qué otras cosas pierde un viajante el 1/1/2027?",
      a: `Bastante más que la clientela, y esto casi no se publicó: la comisión indirecta del art. 6 (las ventas hechas a clientes de su zona sin su intervención se pagan igual, «la tasa o por ciento de la comisión indirecta será igual a la directa»); la aceptación tácita de la nota de venta del art. 5 inc. b) a los ${DIAS_ACEPTACION_NOTA.mismaZona} o ${DIAS_ACEPTACION_NOTA.otrasZonas} días; la conformidad expresa para cambiarlo de zona con garantía del mismo volumen de remuneraciones (art. 9); el libro especial del art. 10 con la carga de la prueba en cabeza del empleador (art. 11); y el día y medio de descanso por semana de gira del art. 13.`,
    },
    {
      q: "¿Cómo sé si soy viajante de comercio en relación de dependencia?",
      a: "El art. 2 de la ley resuelve el punto de un modo poco habitual: enumera seis requisitos y aclara que se entenderá que hay relación de dependencia cuando se acredite «alguno o algunos» de ellos. No hacen falta los seis. Vender a nombre del representado, a los precios que él fija, cobrar comisión, desempeñarse habitual y personalmente, tener una zona asignada o que el riesgo de las operaciones sea del empleador: cualquiera de esos hechos empuja la calificación.",
    },
    {
      q: "¿En cuánto tiempo prescribe el reclamo?",
      a: `Acá hay dos normas y esta página no las dirime. El art. 4 de la Ley 14.546 dice que las acciones emergentes del estatuto «prescribirán a los ${ANIOS_PRESCRIPCION_ESTATUTO === 5 ? "cinco" : ANIOS_PRESCRIPCION_ESTATUTO} años»; el art. 256 de la Ley de Contrato de Trabajo, posterior y también de orden público, fija dos años para las acciones relativas a créditos laborales. Cuál se aplica a un reclamo concreto lo resuelven los tribunales, no una calculadora: si el plazo está en juego, es exactamente el caso para consultar a un abogado laboralista antes de que corra.`,
    },
    {
      q: "¿La derogación también alcanza al convenio colectivo de viajantes?",
      a: "El art. 198 deroga la ley y sus modificatorias. Los convenios colectivos son otra fuente de derechos y esta página no los evalúa: lo que se termina el 1/1/2027 es el piso legal del estatuto. Conviene mirar qué dice el convenio aplicable, porque a partir de esa fecha pasa a ser el lugar donde vive lo que la ley dejaba de decir.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de indemnización por clientela del viajante de comercio (Ley 14.546, art. 14)",
        url: "https://calcular.ar/indemnizacion-por-clientela",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Indemnización por clientela del viajante de comercio: el 25% del art. 14 y su fecha de vencimiento",
        descripcion:
          "El art. 14 de la Ley 14.546 paga el 25% de lo que correspondería por un despido intempestivo e injustificado, cualquiera sea el motivo de la disolución del contrato. El art. 198 de la Ley 27.802 deroga el estatuto entero a partir del 1° de enero de 2027.",
        url: "/indemnizacion-por-clientela",
        modificado: VIAJANTES_FUENTES.consultadoEl,
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
          Indemnización por clientela: cuánto es, y hasta cuándo existe
        </h1>
        <p className="text-zinc-600">
          El artículo 14 de la Ley 14.546 —el Estatuto del viajante de comercio— está escrito{" "}
          <strong>igual desde 1958</strong>. Paga el 25% de lo que correspondería por un despido
          intempestivo e injustificado, y lo paga <strong>cualquiera sea el motivo</strong> por el
          que terminó el contrato. El {REFORMA_PUBLICADA} la Ley 27.802 le puso fecha de
          vencimiento: <strong>{DEROGACION_TEXTO}</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={VIAJANTES_FUENTES.consultadoEnTexto}>
        <p>
          Un viajante de comercio con <strong>más de un año</strong> de contrato tiene derecho a una{" "}
          <strong>indemnización por clientela</strong> equivalente al{" "}
          <strong>25% de lo que le hubiere correspondido por un despido intempestivo e
          injustificado</strong> (art. 14, Ley 14.546). Se cobra{" "}
          <strong>cualquiera sea el motivo de la disolución</strong>: también si renunció, si hubo
          mutuo acuerdo o si se jubiló. Pero el art. 198 de la Ley 27.802{" "}
          <strong>deroga toda la ley a partir del {DEROGACION_TEXTO}</strong>: las disoluciones
          hasta el {ULTIMO_DIA_VIGENTE_TEXTO} inclusive todavía la generan; desde el 1/1/2027 queda
          sólo la liquidación de la Ley de Contrato de Trabajo, que no tiene un rubro equivalente.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La cuenta</h2>
        <p className="text-sm text-zinc-600">
          La indemnización de la LCT sale del mismo motor que{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de despido sin causa
          </Link>{" "}
          — dos páginas de calcular.ar no pueden publicar dos importes distintos para el mismo caso.
          Lo que se agrega acá es el 25% del art. 14, y el corte del 1/1/2027.
        </p>
        <CalculadoraViajante />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente el art. 14</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 14.546, art. 14 — texto vigente (original de 1958, sin modificaciones)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art14}»</p>
        </blockquote>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              El porcentaje
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              «El veinticinco por ciento de lo que le hubiere correspondido en caso de despido
              intempestivo e injustificado». Es el 25% de una <strong>indemnización</strong>, no de
              las remuneraciones cobradas.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              La antigüedad
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              «Una vez transcurrido un año de vigencia» del contrato. Con menos de doce meses no hay
              clientela.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">El motivo</p>
            <p className="mt-1 text-sm text-zinc-700">
              «Cualquiera sea el motivo determinante de la disolución del contrato». Incluida la{" "}
              <strong>renuncia</strong>. Y la cobran también los causahabientes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Qué pierde un viajante el {DEROGACION_TEXTO}
        </h2>
        <p className="text-sm text-zinc-600">
          El Título XXVI de la Ley 27.802 no reescribe artículos: deroga leyes enteras. Su art. 198
          dice, completo: «{TEXTOS.art198Ley27802}». No queda un texto nuevo que contradiga al
          viejo — queda un vacío con fecha. Esto es lo que el estatuto da hoy y lo que pasa a
          depender de otra fuente después.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-3">Artículo</th>
                <th className="py-2 pr-3">Qué es</th>
                <th className="py-2 pr-3">Hoy</th>
                <th className="py-2">Desde el 1/1/2027</th>
              </tr>
            </thead>
            <tbody>
              {QUE_SE_PIERDE.map((f) => (
                <tr key={f.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-semibold text-zinc-800">{f.articulo}</td>
                  <td className="py-3 pr-3 font-medium text-zinc-700">{f.titulo}</td>
                  <td className="py-3 pr-3 text-zinc-600">{f.hoy}</td>
                  <td className="py-3 text-amber-800">{f.desde2027}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500">
          El mismo Título XXVI deroga en la misma fecha otras cinco leyes laborales, con su título
          oficial de InfoLEG:{" "}
          {OTRAS_DEROGACIONES.map((d, i) => (
            <span key={d.ley}>
              {i > 0 ? ", " : ""}
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                <strong>{d.ley}</strong>
              </a>{" "}
              ({d.que}, {d.articulo})
            </span>
          ))}
          . La del periodista tiene su propia calculadora:{" "}
          <Link
            href="/indemnizacion-periodista"
            className="font-medium text-emerald-700 hover:underline"
          >
            la indemnización del art. 43 y lo que se pierde
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          ¿Sos viajante de comercio? Los seis requisitos del art. 2
        </h2>
        <p className="text-sm text-zinc-600">
          El artículo resuelve la calificación de un modo poco habitual: enumera seis hechos y
          aclara que hay relación de dependencia cuando se acredite «alguno o algunos» de ellos.{" "}
          <strong>No hacen falta los seis.</strong> Y el nombre no importa: la ley alcanza a
          «viajantes, viajantes de plaza, placistas, corredores (…) o cualquier otra denominación
          que se les diera o pretendiera imponérseles para su calificación».
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {REQUISITOS_DEPENDENCIA.map((r) => (
            <li
              key={r}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
            >
              {r}
            </li>
          ))}
        </ul>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 14.546, art. 2 — texto completo</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art2}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los otros artículos que hoy siguen vigentes
        </h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 6 — la comisión indirecta se paga igual
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art6}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 9 — no te pueden cambiar de zona sin tu conformidad
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art9}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 11 — si se discute cuánto te deben, prueba el empleador
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art11}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 13 — día y medio de descanso por semana de gira
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art13}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 4 — orden público, y el plazo que discute con la LCT
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art4}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El estatuto fija {ANIOS_PRESCRIPCION_ESTATUTO} años; el art. 256 de la Ley de Contrato
              de Trabajo, posterior y también de orden público, fija dos. Cuál se aplica lo resuelven
              los tribunales: esta página deja las dos normas a la vista y no elige por vos.
            </p>
          </blockquote>
        </div>
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
        <p className="text-sm text-zinc-500">
          De la misma liquidación:{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la indemnización por despido sin causa
          </Link>
          ,{" "}
          <Link
            href="/actualizacion-creditos-laborales"
            className="font-medium text-emerald-700 hover:underline"
          >
            cómo se actualiza lo que te deben
          </Link>{" "}
          y{" "}
          <Link
            href="/descuentos-del-sueldo"
            className="font-medium text-emerald-700 hover:underline"
          >
            qué te pueden descontar del sueldo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {VIAJANTES_FUENTES.lista.map((f) => (
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
          Los textos citados salen del <strong>texto actualizado</strong> de InfoLEG, no de
          resúmenes ni de notas. Esta página es informativa y orientativa: no reemplaza el
          asesoramiento de un abogado laboralista. Consultada el{" "}
          {VIAJANTES_FUENTES.consultadoEnTexto}.
        </p>
      </section>
    </article>
  );
}
