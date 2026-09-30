import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraServiciosEsenciales } from "@/components/CalculadoraServiciosEsenciales";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ACTIVIDADES,
  ETIQUETAS_CATEGORIA,
  FUENTES,
  HISTORIA,
  PISOS,
  PLAZOS,
  TEXTOS,
  VIGENCIA,
} from "@/data/servicios-esenciales";

const entraron = ACTIVIDADES.filter(
  (a) => a.categoriaAntes === "no-listada" && a.categoria !== "no-listada",
);
const salieron = ACTIVIDADES.filter(
  (a) => a.categoria === "no-listada" && a.categoriaAntes !== "no-listada",
);

export const metadata: Metadata = {
  title: "Servicios esenciales y guardias mínimas en una huelga: la lista vigente",
  description: `Desde el ${VIGENCIA} la lista del artículo 24 de la Ley 25.877 es otra: ${entraron.length} actividades entraron, la aduana bajó de 75% a 50% y ${salieron.length} salieron de la enumeración. Calculá el piso de cobertura de tu actividad y el cronograma de plazos.`,
  alternates: { canonical: "/servicios-esenciales-huelga" },
  openGraph: {
    title: "La lista de servicios esenciales cambió, y ahora es ley (no decreto)",
    description:
      "El art. 101 de la Ley 27.802 reescribió el art. 24 de la Ley 25.877: recolección de residuos, transporte de caudales y seguridad privada entraron como esenciales; minería, correos, logística y agro salieron de la enumeración.",
    url: "https://calcular.ar/servicios-esenciales-huelga",
    images: [
      {
        url: "/og?t=Servicios%20esenciales&s=La%20lista%20vigente%2C%20las%20guardias%20minimas%20y%20los%20plazos",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Qué porcentaje del servicio hay que cubrir durante una huelga?",
    a: `El artículo 24 de la Ley 25.877 fija dos pisos: ${PISOS.esencial}% de la prestación normal en los servicios esenciales en sentido estricto y ${PISOS.trascendental}% en las actividades de importancia trascendental. Son pisos, no metas: el texto dice que «en ningún caso se podrá negociar o imponer a las partes una cobertura menor». Y agrega un tercero que antes no existía: las fuerzas de seguridad no pueden brindar una cobertura menor al ${PISOS.seguridad}%.`,
  },
  {
    q: "¿Cuál es la lista de servicios esenciales vigente?",
    a: `Desde el ${VIGENCIA} son ocho: cuidado de menores y educación hasta el secundario más la especial; servicios sanitarios, hospitalarios y farmacéuticos; agua potable, gas, petróleo, otros combustibles y energía eléctrica; telecomunicaciones e internet; recolección de residuos; aeronáutica comercial, control de tráfico aéreo y portuario y todos los servicios portuarios; transporte de caudales; y servicios privados de seguridad y custodia.`,
  },
  {
    q: "¿Qué cambió el 6 de marzo de 2026?",
    a: `Los porcentajes no: el ${PISOS.esencial}% y el ${PISOS.trascendental}% ya venían del Decreto 70/2023. Lo que cambió es la lista. Entraron como esenciales ${entraron
      .filter((a) => a.categoria === "esencial")
      .map((a) => a.etiqueta.toLowerCase())
      .join(", ")}. Los servicios aduaneros y migratorios bajaron de esencial a trascendental, o sea de ${PISOS.esencial}% a ${PISOS.trascendental}%. Los servicios portuarios subieron en sentido inverso. Y desapareció un inciso entero de la categoría trascendental, con el que salieron de la enumeración ${salieron.length} actividades: minería, correos, logística, frigoríficos, actividad agropecuaria, distribución de alimentos y bebidas, materiales de la construcción, reparación de aeronaves y buques y servicios aeroportuarios.`,
  },
  {
    q: "¿Por qué casi todas las notas publican una lista distinta?",
    a: "Porque copian la del Decreto 70/2023, que es la que circula desde diciembre de 2023 y la que efectivamente rigió hasta el 5 de marzo de 2026 (su vigencia había sido suspendida judicialmente y la restituyó el Decreto 628/2025). El artículo 24 fue reescrito cuatro veces en veintisiete meses, y una de esas versiones —la del Decreto 340/2025— fue rechazada por las dos cámaras del Congreso. La lista vigente es la del artículo 101 de la Ley 27.802.",
  },
  {
    q: "¿Es un decreto o una ley?",
    a: "Es una ley. Ésa es la diferencia práctica más grande: los textos anteriores del artículo 24 venían de decretos de necesidad y urgencia, y por eso podían ser suspendidos judicialmente o rechazados por el Congreso —las dos cosas pasaron—. El texto vigente lo sancionó el Congreso en la Ley 27.802 y rige desde su publicación en el Boletín Oficial por el artículo 217, sin fecha diferida ni prórroga.",
  },
  {
    q: "¿Con cuánta anticipación hay que avisar una medida de fuerza?",
    a: `Con ${PLAZOS.preavisoDias} días, y recién después de agotar la conciliación obligatoria. El apartado 24.1 exige preavisar «a la otra parte y a la Autoridad de Aplicación en forma fehaciente» una vez cumplida la obligación del artículo 2° de la Ley 14.786 y vencido el plazo de ${PLAZOS.conciliacionDias} días de su artículo 11. Además, ${PLAZOS.avisoUsuariosHoras} horas antes del inicio hay que informar a los usuarios por medios de difusión masiva cómo va a funcionar el servicio (apartado 24.4).`,
  },
  {
    q: "¿Esos quince días son hábiles o corridos?",
    a: `La ley no lo dice: el artículo 11 de la Ley 14.786 escribe «quince días», a secas. Que el legislador sabía distinguir lo prueba el artículo 6 de esa misma ley, que dice «10 días hábiles» cuando quiere decir hábiles. La lectura literal es días corridos; la práctica administrativa suele contarlos hábiles, lo que mueve la fecha alrededor de una semana. Por eso la calculadora muestra las dos cuentas en vez de elegir una.`,
  },
  {
    q: "¿Y si mi actividad no está en ninguna de las dos listas?",
    a: "La ley no le fija un piso de cobertura, pero eso no la deja fuera del sistema para siempre: la Autoridad de Aplicación, a propuesta de la Comisión de Garantías, puede calificarla como esencial o de importancia trascendental por resolución fundada. Las cuatro circunstancias están escritas en el artículo: peligro para la vida, la salud o la seguridad de la comunidad; servicio público de importancia trascendental o de utilidad pública; crisis nacional aguda; o riesgo para el abastecimiento de productos críticos.",
  },
  {
    q: "¿Quién califica una actividad como esencial?",
    a: "Cambió quién decide. El texto anterior le daba la facultad a la Comisión de Garantías directamente. El vigente dice que califica «la Autoridad de Aplicación a propuesta de» esa comisión, que sigue siendo de cinco miembros y sigue dependiendo de una reglamentación para integrarse. También se cayó una de las circunstancias que habilitaban la calificación: el texto anterior incluía el riesgo de «afectar metas de recaudación asociadas a las políticas de equilibrio fiscal», y el vigente no lo reproduce.",
  },
  {
    q: "¿Un paro nacional queda afuera de estas reglas?",
    a: "No. El apartado 24.5 lo dice expresamente: si la medida consiste en un paro nacional de actividades o en cualquier otra ejercida por centrales sindicales u organizaciones empresariales con representatividad sectorial múltiple, se aplican las mismas disposiciones del artículo 24.",
  },
  {
    q: "¿Qué pasa si no se cumple el procedimiento?",
    a: "El apartado 24.6 remite a las sanciones de las leyes 14.786, 23.551 y 25.212 para quien incumpla los procedimientos conciliatorios, las resoluciones de la Autoridad de Aplicación o los pronunciamientos de la Comisión de Garantías. Y para quien estando obligado a la guardia mínima no trabaje, remite a las responsabilidades «previstas en las disposiciones legales, estatutarias o convencionales que les resultaren aplicables».",
  },
  {
    q: "¿La calculadora dice cuántas personas tengo que poner de guardia?",
    a: "Da una referencia, no la respuesta definitiva, y conviene entender por qué. El porcentaje del artículo 24 es sobre «la prestación normal del servicio», no sobre la dotación, y en muchas actividades esas dos cosas no son proporcionales. Lo que la ley manda es acordar los servicios mínimos ante la Autoridad de Aplicación «señalando concreta y detalladamente» personal, pautas horarias, funciones y equipos (apartado 24.2). Si no hay acuerdo o lo acordado es insuficiente, los fija la autoridad en consulta con la Comisión de Garantías.",
  },
];

export default function ServiciosEsencialesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de guardias mínimas en servicios esenciales",
        url: "https://calcular.ar/servicios-esenciales-huelga",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Servicios esenciales, guardias mínimas y plazos: el art. 24 de la Ley 25.877 vigente",
        descripcion:
          "La lista de actividades que rige desde el 6 de marzo de 2026 por el art. 101 de la Ley 27.802, contrastada con la que rigió hasta el 5 de marzo, y el procedimiento completo que incorporaron los apartados 24.1 a 24.6.",
        url: "/servicios-esenciales-huelga",
        modificado: FUENTES.consultadoEl,
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
          Servicios esenciales y guardias mínimas en una huelga
        </h1>
        <p className="text-zinc-600">
          El {PISOS.esencial}% y el {PISOS.trascendental}% siguen igual —y por eso casi nadie miró
          el resto—. <strong>Lo que cambió el {VIGENCIA} es la lista de actividades</strong>: tres
          entraron, la aduana bajó de categoría, los puertos subieron y {salieron.length} salieron
          de la enumeración.
        </p>
      </header>

      <RespuestaPrimero actualizado={FUENTES.consultadoEl}>
        <p>
          Desde el <strong>{VIGENCIA}</strong> rige el artículo 24 de la Ley 25.877 en la redacción
          del <strong>artículo 101 de la Ley 27.802</strong>, con los apartados 24.1 a 24.6 que
          incorporó su artículo 102. Los pisos de cobertura son{" "}
          <strong>{PISOS.esencial}%</strong> para los servicios esenciales en sentido estricto,{" "}
          <strong>{PISOS.trascendental}%</strong> para las actividades de importancia trascendental
          y <strong>{PISOS.seguridad}%</strong> para las fuerzas de seguridad. Antes de la medida
          hay que agotar la conciliación obligatoria de la Ley 14.786 ({PLAZOS.conciliacionDias}{" "}
          días, prorrogables por {PLAZOS.prorrogaDias}), preavisar con {PLAZOS.preavisoDias} días,
          acordar los servicios mínimos al día siguiente del preaviso y avisar a los usuarios{" "}
          {PLAZOS.avisoUsuariosHoras} horas antes.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Elegí la actividad y la fecha en que la autoridad tomó conocimiento del conflicto. La
          calculadora devuelve el piso de cobertura, cuántos quedan de guardia sobre la dotación
          afectada, el cronograma completo de plazos y —el dato que no publica nadie— qué cambió
          para esa actividad puntual el {VIGENCIA}.
        </p>
        <CalculadoraServiciosEsenciales />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El artículo se reescribió cuatro veces en veintisiete meses
        </h2>
        <p className="text-sm text-zinc-600">
          Es la razón por la que hay tantas listas distintas dando vueltas, y por la que conviene
          mirar la fecha de cualquier nota antes de creerle. Tres de las cuatro versiones fueron
          decretos; una fue suspendida judicialmente y otra, rechazada por las dos cámaras.
        </p>
        <ol className="space-y-3">
          {HISTORIA.map((h) => (
            <li
              key={h.fecha}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-zinc-800">
                {h.fecha} — {h.norma}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{h.que}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las dos listas vigentes, actividad por actividad</h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 24, segundo párrafo</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.pisos}»</p>
        </blockquote>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[38rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Actividad</th>
                <th className="py-2 px-3 font-medium text-zinc-600">Hoy</th>
                <th className="py-2 pl-3 font-medium text-zinc-600">Hasta el 5/3/2026</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVIDADES.map((a) => (
                <tr key={a.id} className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 text-zinc-800">
                    {a.etiqueta}
                    {a.inciso && (
                      <span className="block text-xs text-zinc-500">inciso {a.inciso})</span>
                    )}
                  </td>
                  <td className="py-2 px-3 font-semibold text-zinc-900">
                    {PISOS[a.categoria]}%
                    <span className="block text-xs font-normal text-zinc-500">
                      {ETIQUETAS_CATEGORIA[a.categoria]}
                    </span>
                  </td>
                  <td
                    className={`py-2 pl-3 ${
                      a.categoria !== a.categoriaAntes
                        ? "font-semibold text-rose-700"
                        : "text-zinc-500"
                    }`}
                  >
                    {PISOS[a.categoriaAntes]}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500">
          En rojo, las actividades cuyo piso cambió. Las {salieron.length} últimas filas son las que
          el texto anterior enumeraba entre las de importancia trascendental y el vigente ya no
          nombra: su inciso desapareció entero.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las tres que entraron y las {salieron.length} que salieron
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Entraron como servicios esenciales ({PISOS.esencial}%)
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {entraron
                .filter((a) => a.categoria === "esencial")
                .map((a) => (
                  <li key={a.id}>· {a.etiqueta}</li>
                ))}
            </ul>
            <p className="mt-2 text-xs text-emerald-900">
              Ninguna figuraba en las listas del texto anterior: pasaron de no tener piso legal a
              tener el más alto.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Salieron de la enumeración (sin piso legal)
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {salieron.map((a) => (
                <li key={a.id}>· {a.etiqueta}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-zinc-600">
              Todas venían del mismo inciso de la categoría trascendental, que el texto vigente no
              reprodujo. Que no estén enumeradas no las vuelve intocables: la Autoridad de
              Aplicación puede calificarlas por resolución fundada.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-sm font-semibold text-amber-900">
            El único movimiento hacia abajo: la aduana
          </p>
          <p className="mt-1 text-sm text-zinc-700">
            Los servicios aduaneros y migratorios y los demás vinculados al comercio exterior eran
            un <strong>servicio esencial</strong> con piso del {PISOS.esencial}% y pasaron a ser una
            actividad de <strong>importancia trascendental</strong> con piso del{" "}
            {PISOS.trascendental}%. Es el sentido inverso al de los servicios portuarios, que
            subieron.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El procedimiento que antes no existía (apartados 24.1 a 24.6)
        </h2>
        <p className="text-sm text-zinc-600">
          InfoLEG los marca como «Apartado incorporado por art. 102», no como sustituido: antes del{" "}
          {VIGENCIA} el artículo 24 no traía ningún procedimiento propio. Todo esto se suma a la
          conciliación obligatoria de la Ley 14.786, que ya existía y sigue.
        </p>
        <div className="space-y-3">
          {[
            { art: "Apartado 24.1 — preaviso", texto: TEXTOS.preaviso },
            { art: "Apartado 24.2 — acuerdo de servicios mínimos", texto: TEXTOS.acuerdoDeMinimos },
            { art: "Apartado 24.3 — si no acuerdan", texto: TEXTOS.siNoAcuerdan },
            { art: "Apartado 24.4 — aviso a los usuarios", texto: TEXTOS.avisoUsuarios },
            { art: "Apartado 24.5 — paro nacional", texto: TEXTOS.paroNacional },
            { art: "Apartado 24.6 — sanciones", texto: TEXTOS.sanciones },
          ].map((a) => (
            <details key={a.art} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Quién califica una actividad que no está en la lista
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 24 — Comisión de Garantías</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.comisionDeGarantias}…»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Dos cambios finos en este párrafo. El primero: hoy califica{" "}
          <strong>la Autoridad de Aplicación «a propuesta de»</strong> la comisión; en el texto
          anterior la comisión calificaba directamente. El segundo: de las circunstancias que
          habilitan la calificación desapareció la que hablaba de «afectar metas de recaudación
          asociadas a las políticas de equilibrio fiscal». Quedaron las cuatro que miran a la
          población: peligro para la vida, la salud o la seguridad; servicio público de importancia
          trascendental o de utilidad pública; crisis nacional aguda; y riesgo para el
          abastecimiento de productos críticos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          «Quince días»: la palabra que la ley no escribió
        </h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-400 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 11 de la Ley 14.786</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.conciliacionArt11}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El artículo dice «quince días» y no aclara si son hábiles o corridos. No es un descuido
          que se pueda resolver leyendo más: en la <em>misma</em> ley, el artículo 6 dice «10 días
          hábiles» para la sentencia arbitral. Cuando el legislador quiso decir hábiles, lo dijo. La
          lectura literal, entonces, es días corridos — pero la práctica administrativa suele
          contarlos hábiles, y eso corre la fecha de la medida alrededor de una semana. Por eso esta
          página muestra las dos cuentas en vez de publicar una sola y hacerla pasar por la única.
        </p>
        <p className="text-sm text-zinc-600">
          Mientras ese plazo corre no se puede hacer nada: el artículo 8 dice que «antes de que se
          someta un diferendo a la instancia de conciliación y mientras no se cumplen los términos
          que fija el artículo 11, las partes no podrán adoptar medidas de acción directa».
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
        <p className="text-sm text-zinc-500">
          Otras páginas sobre lo que la misma reforma cambió en el derecho colectivo:{" "}
          <Link
            href="/despido-de-delegado-gremial"
            className="font-medium text-emerald-700 hover:underline"
          >
            la tutela sindical
          </Link>
          ,{" "}
          <Link
            href="/practicas-desleales-sindicales"
            className="font-medium text-emerald-700 hover:underline"
          >
            las prácticas desleales
          </Link>{" "}
          y{" "}
          <Link href="/descuentos-del-sueldo" className="font-medium text-emerald-700 hover:underline">
            el tope del 2% a la cuota solidaria
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial publicado en InfoLEG — no un resumen de prensa — y
          contrasta la versión vigente contra la que rigió hasta el 5 de marzo de 2026. Es
          informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          resolución de la Autoridad de Aplicación. Consultada el {FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
