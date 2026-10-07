import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPeriodista } from "@/components/CalculadoraPeriodista";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ART43_VIGENTE_DESDE,
  DEROGACION_TEXTO,
  DIAS_PERIODO_PRUEBA,
  ESCALA_VACACIONES_HABILES,
  HORAS_EXTRAS_MAXIMAS_MENSUALES,
  HORAS_SEMANALES,
  MESES_ESPECIAL,
  PERIODISTAS_FUENTES,
  QUE_SE_PIERDE,
  REFORMA_PUBLICADA,
  TEXTOS,
  ULTIMO_DIA_VIGENTE_TEXTO,
} from "@/data/periodistas";

export const metadata: Metadata = {
  title: "Indemnización de periodistas: el estatuto hasta 2027",
  description:
    "El Estatuto del Periodista suma indemnizaciones que la LCT no tiene, y la Ley 27.802 lo deroga el 1/1/2027. Calculá cuánto es hoy y cuánto desde 2027.",
  alternates: { canonical: "/indemnizacion-periodista" },
  openGraph: {
    title: "Indemnización del periodista: los seis meses que se terminan el 1/1/2027",
    description:
      "Los tres rubros del art. 43 de la Ley 12.908, la comparación en pesos contra la LCT y la fecha exacta en que el estatuto deja de existir.",
    url: "https://calcular.ar/indemnizacion-periodista",
    images: [
      {
        url: "/og?t=Indemnizaci%C3%B3n%20del%20periodista&s=El%20art.%2043%20del%20estatuto%20y%20el%20corte%20del%201%2F1%2F2027",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function IndemnizacionPeriodistaPage() {
  const faqs = [
    {
      q: "¿Cuánto cobra un periodista despedido sin causa?",
      a: `Mientras rija el estatuto, tres rubros que se suman (art. 43 de la Ley 12.908). La indemnización por antigüedad del inc. c): un mes de sueldo por año o fracción de más de tres meses, «en ningún caso inferior a dos meses». La que reemplaza al preaviso, del inc. b): dos meses hasta los tres años de antigüedad, cuatro si son más. Y la indemnización especial del inc. d), de ${MESES_ESPECIAL} meses de sueldo. Un periodista con diez años y un sueldo promedio de $1.000.000 cobra 20 sueldos: 10 + 4 + 6.`,
    },
    {
      q: "¿Qué es la indemnización especial de seis meses?",
      a: "Es el inc. d) del art. 43, y no existe en la Ley de Contrato de Trabajo: «Sin perjuicio del pago de las indemnizaciones establecidas en los incisos b) y c) que anteceden, el empleador abonará además a su dependiente, en los casos de despido injustificado, haya o no mediado preaviso, una indemnización especial equivalente a seis meses de sueldo». Se paga aunque el empleador haya avisado bien.",
    },
    {
      q: "¿Hasta cuándo rige el Estatuto del Periodista?",
      a: `Hasta el ${ULTIMO_DIA_VIGENTE_TEXTO} inclusive. El art. 197 de la Ley 27.802 dice, completo: «Derógase la ley 12.908 y sus modificatorias, a partir del 1º de enero de 2027». La ley está aprobada y publicada desde el ${REFORMA_PUBLICADA}: no es un proyecto. Desde el 1/1/2027, un periodista despedido cobra lo mismo que cualquier trabajador de la LCT.`,
    },
    {
      q: "¿Cuánta plata es la diferencia?",
      a: "Depende de la antigüedad, y la diferencia es mayor cuanto menos tiempo llevás en el puesto. Con diez años, el estatuto paga 20 sueldos contra 12,17 de la LCT (10 de antigüedad más 2 de preaviso con su aguinaldo). Con cuatro meses, la diferencia es total. La LCT no paga nada porque estás en el período de prueba de seis meses del art. 92 bis, y el estatuto paga 10 sueldos (2 de piso, 2 por el preaviso y 6 de la especial). La calculadora de arriba hace las dos cuentas con tus fechas.",
    },
    {
      q: "¿Sobre qué sueldo se calcula?",
      a: "Sobre un promedio, no sobre el mejor sueldo. El inc. e) manda tomar «el promedio que resulte de lo percibido por el dependiente en los últimos seis meses, o durante todo el tiempo de prestación de servicios, si éste fuera inferior». Entran las horas extra, las comisiones, los viáticos (salvo lo gastado de verdad y con comprobante), las gratificaciones y todo pago en especie que sea parte fija del sueldo. La LCT, en cambio, usa el mejor sueldo mensual, normal y habitual del último año.",
    },
    {
      q: "El preaviso del estatuto, ¿es un mes o dos?",
      a: "El plazo del aviso (inc. a) es de uno o dos meses, según tengas menos o más de tres años de antigüedad. Lo que se paga si no te avisan (inc. b) es el doble: dos o cuatro meses. No es un error de lectura: son dos incisos distintos con números distintos.",
    },
    {
      q: "¿Quién es «periodista profesional» para el estatuto?",
      a: "El art. 2 enumera los cargos: director, codirector, subdirector, jefe de redacción, secretario general, secretario y prosecretario de redacción, jefe de noticias, editorialista, corresponsal, redactor, cronista, reportero, dibujante, traductor, corrector de pruebas, reportero gráfico, archivero y colaborador permanente. Y aclara que incluye a «las empresas radiotelefónicas, cinematográficas o de televisión que propalen, exhiban o televisen informativos o noticias de carácter periodístico, y únicamente con respecto al personal ocupado en estas tareas». La condición de fondo es hacerlo «en forma regular, mediante retribución pecuniaria».",
    },
    {
      q: "¿Qué otras cosas se pierden además de la indemnización?",
      a: `Cuatro que casi no se publican. El período de prueba del estatuto es de ${DIAS_PERIODO_PRUEBA} días (art. 25), contra los seis meses del art. 92 bis de la LCT. La jornada es de ${HORAS_SEMANALES} horas semanales, con las extras al 100% y un tope de ${HORAS_EXTRAS_MAXIMAS_MENSUALES} por mes (art. 34), contra 48 horas y recargo del 50% en días comunes. Las vacaciones se cuentan en días hábiles (${ESCALA_VACACIONES_HABILES.map((e) => e.dias).join(", ")} según antigüedad, art. 35), y la LCT las cuenta en días corridos. Y ninguna suspensión sin sueldo puede pasar de 30 días (art. 41).`,
    },
    {
      q: "¿Desde cuándo está escrito así el art. 43?",
      a: `Desde el ${ART43_VIGENTE_DESDE}, cuando el art. 1° de la Ley 16.792 le dio su texto actual. Son sesenta años con el mismo texto. Por eso hay tanto escrito sobre él, y por eso casi nada de eso menciona que tiene fecha de vencimiento.`,
    },
    {
      q: "¿Y los convenios colectivos de prensa?",
      a: "El art. 197 deroga la ley y sus modificatorias. Los convenios colectivos son otra fuente de derechos y esta página no los analiza. Lo que se termina el 1/1/2027 es el piso legal del estatuto. Desde esa fecha, lo que diga tu convenio pasa a importar mucho más.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de indemnización del periodista (Ley 12.908, art. 43)",
        url: "https://calcular.ar/indemnizacion-periodista",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Indemnización del periodista: los tres rubros del art. 43 y la derogación del 1/1/2027",
        descripcion:
          "El art. 43 de la Ley 12.908 paga antigüedad con piso de dos meses, una sustitutiva del preaviso de dos o cuatro meses y una indemnización especial de seis meses de sueldo. El art. 197 de la Ley 27.802 deroga el estatuto entero a partir del 1° de enero de 2027.",
        url: "/indemnizacion-periodista",
        modificado: PERIODISTAS_FUENTES.consultadoEl,
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
          Indemnización de un periodista: cuánto es hoy y cuánto desde 2027
        </h1>
        <p className="text-zinc-600">
          El artículo 43 del Estatuto del Periodista Profesional está escrito igual desde{" "}
          {ART43_VIGENTE_DESDE} y paga <strong>tres indemnizaciones</strong>. Una de ellas, la
          especial de {MESES_ESPECIAL} meses de sueldo, no existe en la Ley de Contrato de Trabajo.
          El {REFORMA_PUBLICADA}, la Ley 27.802 le puso fecha de vencimiento:{" "}
          <strong>{DEROGACION_TEXTO}</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={PERIODISTAS_FUENTES.consultadoEnTexto}>
        <p>
          Un periodista despedido sin causa cobra hoy, por el art. 43 de la Ley 12.908,{" "}
          <strong>tres rubros que se suman</strong>: la <strong>antigüedad</strong> (un mes por año
          o fracción de más de tres meses, nunca menos de dos meses), el{" "}
          <strong>pago por falta de preaviso</strong> (dos meses hasta los tres años de antigüedad,
          cuatro si son más) y una <strong>indemnización especial de {MESES_ESPECIAL} meses</strong>{" "}
          que se paga «haya o no mediado preaviso». Con diez años de antigüedad son{" "}
          <strong>veinte sueldos</strong>, contra 12,17 de la LCT. El art. 197 de la Ley 27.802{" "}
          <strong>deroga el estatuto entero a partir del {DEROGACION_TEXTO}</strong>. Los despidos
          hasta el {ULTIMO_DIA_VIGENTE_TEXTO} inclusive se liquidan con él. Los posteriores, con la
          Ley de Contrato de Trabajo.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La cuenta, y la diferencia</h2>
        <p className="text-sm text-zinc-600">
          La columna de la Ley de Contrato de Trabajo sale de la misma cuenta que{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de despido sin causa
          </Link>
          . Así, dos páginas de calcular.ar nunca te dan dos montos distintos para el mismo caso.
        </p>
        <CalculadoraPeriodista />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente el art. 43</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 12.908, art. 43: texto vigente (Ley 16.792, B.O. {ART43_VIGENTE_DESDE})
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art43}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El inciso a) fija el <strong>plazo</strong> del preaviso (uno o dos meses) y el b), lo que
          se paga <strong>si no te lo dan</strong> (dos o cuatro meses). Son números distintos y no
          es un error de lectura. El c) tiene un piso de <strong>dos</strong> meses (el art. 245 de
          la LCT tiene piso de uno) y no tiene el tope del convenio. Y el d) se paga siempre, aunque
          te hayan avisado bien.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Estatuto contra Ley de Contrato de Trabajo, artículo por artículo
        </h2>
        <p className="text-sm text-zinc-600">
          El Título XXVI de la Ley 27.802 no reescribe artículos: deroga leyes enteras. Su art. 197
          dice, completo: «{TEXTOS.art197Ley27802}». Esto es lo que el estatuto da hoy y lo que
          queda en su lugar. Las otras leyes que se van el mismo día están en{" "}
          <Link
            href="/blog/estatutos-laborales-derogados-2027"
            className="font-medium text-emerald-700 hover:underline"
          >
            los estatutos laborales que se derogan en 2027
          </Link>
          .
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-3">Artículo</th>
                <th className="py-2 pr-3">Qué es</th>
                <th className="py-2 pr-3">Estatuto (hasta el 31/12/2026)</th>
                <th className="py-2">LCT (desde el 1/1/2027)</th>
              </tr>
            </thead>
            <tbody>
              {QUE_SE_PIERDE.map((f) => (
                <tr key={f.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-semibold text-zinc-800">{f.articulo}</td>
                  <td className="py-3 pr-3 font-medium text-zinc-700">{f.titulo}</td>
                  <td className="py-3 pr-3 text-emerald-800">{f.estatuto}</td>
                  <td className="py-3 text-zinc-600">{f.lct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los otros artículos que se van con él</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 34: {HORAS_SEMANALES} horas semanales y las extras al 100%
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art34}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 35: vacaciones contadas en días hábiles
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art35}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La LCT cuenta días corridos (art. 150): 14 hasta cinco años, 21 hasta diez, 28 hasta
              veinte y 35 si son más. Quince días hábiles y catorce corridos no son lo mismo, ni
              parecido.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 25: período de prueba de {DIAS_PERIODO_PRUEBA} días
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art25}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El art. 92 bis de la LCT fija seis meses. Por eso, con pocos meses de antigüedad, el
              estatuto paga todo y el régimen general no paga nada. Es lo que muestra la calculadora
              de arriba.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 2: quién es periodista profesional
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art2}»</p>
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
          El mismo Título XXVI de la Ley 27.802 deroga el Estatuto del viajante de comercio:{" "}
          <Link
            href="/indemnizacion-por-clientela"
            className="font-medium text-emerald-700 hover:underline"
          >
            la indemnización por clientela y su fecha de vencimiento
          </Link>
          . De la misma liquidación:{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            despido sin causa
          </Link>
          ,{" "}
          <Link href="/vacaciones" className="font-medium text-emerald-700 hover:underline">
            vacaciones
          </Link>{" "}
          y{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            horas extras
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PERIODISTAS_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
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
          Los textos citados salen del <strong>texto actualizado</strong> de InfoLEG, no de
          resúmenes ni de notas. Esta página es informativa: no reemplaza el consejo de un abogado
          laboralista. Consultada el{" "}
          {PERIODISTAS_FUENTES.consultadoEnTexto}.
        </p>
      </section>
    </article>
  );
}
