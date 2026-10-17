import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPnc } from "@/components/CalculadoraPnc";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import { INCAPACIDAD_MINIMA_INVALIDEZ_LABORAL, pncFuentes } from "@/data/pnc";
import { bonoVigente, prestacionesVigentes } from "@/data/prestaciones";
import { smvmVigente } from "@/lib/desempleo";
import { montosVigentes, prestacionPorClave, montoDe, totalMinimaConBono } from "@/lib/pnc";
import { formatARS, formatPct } from "@/lib/formato";

function datosDelMes() {
  const V = prestacionesVigentes();
  const MES = V.vigencia;
  const MES_CORTO = MES.replace(" de ", " ");
  const MONTOS = montosVigentes();
  const DISCAPACIDAD = montoDe(prestacionPorClave("discapacidad"));
  const MADRE7 = montoDe(prestacionPorClave("madre7hijos"));
  const SMVM = smvmVigente().mes;
  const TOPE_INGRESOS = Math.round(SMVM.mensual * 2 * 100) / 100;
  const MINIMA_CON_BONO = totalMinimaConBono();
  const LETRA_CHICA = prestacionPorClave("madre7hijos").letraChica ?? [];
  return { V, MES, MES_CORTO, MONTOS, DISCAPACIDAD, MADRE7, SMVM, TOPE_INGRESOS, MINIMA_CON_BONO, LETRA_CHICA };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ MES, MES_CORTO }: DatosDelMes): Metadata => ({
  title: `Pensión no contributiva ${MES_CORTO}: monto y requisitos`,
  description: `Cuánto pagan en ${MES_CORTO} la pensión por discapacidad, la de vejez y la de madre de 7 hijos, y hasta cuánto podés trabajar sin perderla.`,
  alternates: { canonical: "/pension-no-contributiva" },
  openGraph: openGraphDe({
    ruta: "/pension-no-contributiva",
    titulo: `Pensiones no contributivas · ${MES}`,
    bajada: "Cuánto paga cada una y hasta cuánto podés trabajar",
  }),
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ V, MES, DISCAPACIDAD, MADRE7, SMVM, TOPE_INGRESOS }: DatosDelMes) => [
  {
    q: `¿Cuánto cobra una pensión no contributiva en ${MES}?`,
    a: `Depende de cuál. La Pensión no Contributiva por Discapacidad para Protección Social y la pensión a la vejez pagan el 70% del haber mínimo: ${formatARS(DISCAPACIDAD.haber, 2)}. Con el bono extraordinario de ${formatARS(bonoVigente().monto, 0)} llegan a ${formatARS(DISCAPACIDAD.total, 2)}. La pensión vitalicia para madres de 7 hijos o más es el 100% del haber mínimo: ${formatARS(MADRE7.haber, 2)}, y ${formatARS(MADRE7.total, 2)} con el bono. La PUAM es el 80%.`,
  },
  {
    q: "¿Por qué el monto cambia todos los meses sin que salga una resolución de pensiones?",
    a: `Porque ninguno de estos montos existe por sí solo. Los cuatro son un porcentaje del haber mínimo del SIPA, que sube todos los meses por la movilidad del Decreto 274/2024. Cuando ANSES saca la resolución del haber mínimo (en ${MES}, la ${V.resolucion}), las pensiones no contributivas se mueven solas, en el mismo porcentaje. Por eso una nota que dice «la pensión es $X» queda vieja a los treinta días, y una página que explica la regla no.`,
  },
  {
    q: "¿Puedo trabajar y seguir cobrando la pensión por discapacidad?",
    a: `Sí, y es el cambio más grande de los últimos años. El artículo 7 de la Ley 27.793 dice que seguís cobrando mientras lo que ganás por tu trabajo o por el monotributo no pase dos salarios mínimos. En ${MES}, con un salario mínimo de ${formatARS(SMVM.mensual, 0)}, ese tope es ${formatARS(TOPE_INGRESOS, 0)}. Si lo pasás, la pensión se suspende sola mientras dure esa situación. Cuando tus ingresos vuelven a bajar, podés pedir que te la rehabiliten en el momento. Antes de esa ley, cualquier trabajo registrado te daba de baja la pensión.`,
  },
  {
    q: "¿La pensión por invalidez sigue existiendo?",
    a: "Cambió de nombre y de reglas. El artículo 5 de la Ley 27.793 reemplazó el artículo 9 de la Ley 13.478 y creó la Pensión no Contributiva por Discapacidad para Protección Social, que pide el Certificado Único de Discapacidad (CUD). Las pensiones que se dieron antes se pasan solas al régimen nuevo, sin que tengas que pedirlo (art. 9 de la ley y art. 9 del Anexo I del Decreto 84/2026). La pensión no contributiva por invalidez laboral, la que se tramita en la Agencia Nacional de Discapacidad con Certificado Médico Oficial, sigue con el Decreto 432/97.",
  },
  {
    q: "¿Cuánta incapacidad hace falta para la pensión por invalidez laboral?",
    a: `El 66%, no el 76%. El Decreto 843/2024 (B.O. 23/9/2024) cambió las reglas de invalidez laboral del Decreto 432/97 y bajó el umbral: se considera que la incapacidad es total cuando te quita el ${formatPct(INCAPACIDAD_MINIMA_INVALIDEZ_LABORAL * 100, 0)} o más de tu capacidad para trabajar. Muchas páginas siguen diciendo 76%, que era el número anterior. El mismo decreto bajó la residencia que se pide a 10 años para extranjeros y a 3 años para argentinos naturalizados.`,
  },
  {
    q: "¿Se puede cobrar una pensión no contributiva y una jubilación a la vez?",
    a: "No. Las cuatro piden no tener otra jubilación, retiro o pensión, sea contributiva o no. El requisito aparece en todas: artículo 6 inciso f de la Ley 27.793, punto 1 inciso f del Anexo I del Decreto 432/97, artículo 2 inciso a de la Ley 23.746 y artículo 13 de la Ley 27.260 para la PUAM. Si cobrás dos a la vez, perdés la pensión y te pueden reclamar lo que cobraste de más.",
  },
  {
    q: "¿El bono extraordinario alcanza a las pensiones no contributivas?",
    a: `Sí, y lo dice el texto del decreto. El artículo 2 inciso c del ${bonoVigente().norma} nombra a quienes cobran pensiones no contributivas por vejez, invalidez, madres de siete hijos o más y demás pensiones no contributivas, además de la PUAM. Como todas cobran menos que el haber mínimo, les toca el bono completo de ${formatARS(bonoVigente().monto, 0)}. El bono no es fijo: lo pone un decreto cada mes y puede no salir.`,
  },
  {
    q: "¿Quién otorga cada pensión y quién la paga?",
    a: "No es el mismo organismo, y confundirlos hace perder tiempo en ventanillas. La pensión por discapacidad la da la Agencia Nacional de Discapacidad. La de vejez y la de madres de 7 hijos, el Ministerio de Capital Humano. Todas las liquida y las paga ANSES (artículo 5 del Anexo II del Decreto 84/2026). La PUAM es la excepción: la da y la paga ANSES.",
  },
  {
    q: "¿Qué diferencia hay entre la PUAM y la pensión a la vejez?",
    a: "Sobre todo, la edad y el porcentaje. La PUAM se pide a los 65 años y paga el 80% del haber mínimo. La pensión a la vejez se pide a los 70, paga el 70% y te piden demostrar que no tenés bienes, ingresos ni recursos para vivir, con una visita a tu casa. Ojo con un dato viejo que circula: la PUAM tampoco es automática por cumplir la edad. Desde 2018, el último párrafo del artículo 13 (sumado por la Ley 27.467) manda a ANSES a revisar tu situación económica y tus bienes antes de darla, y su artículo 38 la volvió incompatible con trabajar. Para la mayoría de quienes tienen 65 o más y no llegan a 30 años de aportes, la PUAM sigue siendo el camino.",
  },
  {
    q: "¿Se puede pasar de la pensión a la vejez a la PUAM?",
    a: `Sí, y conviene hacer la cuenta. La pensión a la vejez paga el 70% del haber mínimo y la PUAM el 80%: son ${formatARS(V.haberMinimo * 0.1, 2)} más por mes en ${MES}. El bono es igual para las dos, así que la diferencia en lo que te depositan es justo esa. El penúltimo párrafo del artículo 13 de la Ley 27.260 permite el cambio, con una condición: cumplir TODOS los requisitos de la PUAM, que no son los mismos que los de la pensión a la vejez (la residencia es distinta, y la PUAM no te deja trabajar). El detalle está en la página de la PUAM.`,
  },
  {
    q: "¿Puedo viajar o irme del país cobrando la pensión de madre de 7 hijos?",
    a: "Hasta 60 días por año calendario. El artículo 12 inciso d del Decreto 2360/90 hace perder el derecho por «ausencia definitiva del país», y llama así a la que pasa los 60 días, seguidos o no, en cada año calendario. O sea: se suman todas las salidas del año, no cuenta el largo de un solo viaje. La Subsecretaría de Seguridad Social puede autorizar ausencias más largas por resolución, en casos puntuales y con motivos atendibles. Ojo con mezclar prestaciones: en la PUAM el plazo es de 90 días, no de 60.",
  },
  {
    q: "¿La pensión de madre de 7 hijos se cobra retroactiva desde que la pedí?",
    a: "Para la titular, no. El artículo 10 inciso a del Decreto 2360/90 dice que la pensión se paga desde el primer día del mes siguiente al que se dicta la resolución que la otorga. El trámite puede tardar meses, y esos meses no se pagan hacia atrás. Sí hay retroactivo en la pensión que cobran el viudo o los hijos cuando fallece la titular (artículo 3). Se paga desde el día siguiente a la muerte si se pide dentro de los 3 meses. Si se pide después, desde el primer día del mes siguiente al pedido.",
  },
  {
    q: "Si fallece la madre, ¿la pensión de 7 hijos se pierde?",
    a: "No siempre, aunque se la llame «vitalicia». El artículo 3 del Decreto 2360/90 le da pensión al viudo que no puede trabajar y que estaba a cargo de ella, junto con los hijos menores de 18 años (sin límite de edad si no pueden trabajar y estaban a cargo). La mitad va al viudo y la otra mitad se reparte en partes iguales entre los hijos. Si no hay hijos, el viudo cobra todo. No tiene derecho el cónyuge que estaba divorciado o separado (legalmente o de hecho) por su culpa o por culpa de los dos (art. 4).",
  },
  {
    q: "¿Qué residencia piden para la pensión de madre de 7 hijos?",
    a: "Es de los requisitos más buscados, y no está en la Ley 23.746 sino en su reglamento. El artículo 2 del Decreto 2360/90 les pide a las argentinas o naturalizadas 1 año de residencia seguida justo antes del pedido (inciso b). A las extranjeras, 15 años seguidos justo antes del pedido, demostrados con un documento público que muestre ese tiempo (inciso c). Son plazos distintos de los de la pensión a la vejez y de los de la PUAM: cada una tiene el suyo.",
  },
  {
    q: "¿Lo que dice esta página es lo que me va a depositar ANSES?",
    a: "Los montos sí: son los porcentajes de la ley aplicados al haber mínimo vigente, y los comparamos con lo que publica ANSES. Lo que no podemos decirte es si te van a dar el beneficio. Eso depende del Certificado Único de Discapacidad, de la evaluación socioeconómica y de los controles del organismo, que se resuelven caso por caso.",
  },
];

export default function PensionNoContributivaPage() {
  const datos = datosDelMes();
  const { V, MES, MES_CORTO, MONTOS, DISCAPACIDAD, MADRE7, SMVM, TOPE_INGRESOS, MINIMA_CON_BONO, LETRA_CHICA } = datos;
  const faqs = crearFaqs(datos);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de pensiones no contributivas (PNC)",
        url: "https://calcular.ar/pension-no-contributiva",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `Montos de las pensiones no contributivas, ${MES}`,
        descripcion: `Haber y total con bono de las cuatro prestaciones no contributivas en ${MES}, calculados sobre el haber mínimo del SIPA (${formatARS(V.haberMinimo, 2)}): pensión por discapacidad y pensión a la vejez al 70% (${formatARS(DISCAPACIDAD.total, 2)} con bono), pensión para madres de 7 hijos al 100% (${formatARS(MADRE7.total, 2)}) y PUAM al 80%. Incluye el tope de ingresos para trabajar sin perderla, igual a dos salarios mínimos (${formatARS(TOPE_INGRESOS, 0)}).`,
        url: "/pension-no-contributiva",
        modificado: `${V.periodo}-01`,
        fuenteNombre: V.resolucion,
        fuenteUrl: V.resolucionUrl,
      }),
      articleSchema({
        titulo: `Pensión no contributiva ${MES_CORTO}: monto y requisitos`,
        descripcion:
          "Montos de las pensiones no contributivas según el haber mínimo, requisitos vigentes después de la Ley 27.793 y el Decreto 84/2026, y el tope de ingresos para trabajar sin perderla.",
        url: "/pension-no-contributiva",
        modificado: pncFuentes().consultadoEl,
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
          Pensiones no contributivas: cuánto se cobra y hasta cuánto podés trabajar
        </h1>
        <p className="text-zinc-600">
          Las notas publican el monto del mes y quedan viejas a los treinta días. Acá está la regla
          que lo arma (cada pensión es un porcentaje del haber mínimo). Y el dato que casi nadie
          actualizó: desde la Ley 27.793 podés trabajar registrado y seguir cobrando la pensión por
          discapacidad, hasta un tope que también cambia todos los meses.
        </p>
      </header>

      <RespuestaPrimero actualizado={pncFuentes().consultadoEl}>
        <p>
          En {MES}, la <strong>pensión por discapacidad</strong> y la{" "}
          <strong>pensión a la vejez</strong> pagan {formatARS(DISCAPACIDAD.haber, 2)} (el 70% del
          haber mínimo). Con el bono de {formatARS(bonoVigente().monto, 0)} llegan a{" "}
          <strong>{formatARS(DISCAPACIDAD.total, 2)}</strong>. La pensión para{" "}
          <strong>madres de 7 hijos</strong> es el 100% del haber mínimo:{" "}
          <strong>{formatARS(MADRE7.total, 2)}</strong> con el bono. Ninguno de esos montos tiene
          resolución propia: salen del haber mínimo de la {V.resolucion} y suben con él todos los
          meses. Y la pensión por discapacidad <strong>se puede cobrar trabajando</strong>, mientras
          tus ingresos netos no lleguen a dos salarios mínimos: hoy,{" "}
          <strong>{formatARS(TOPE_INGRESOS, 0)}</strong> (art. 7 de la Ley 27.793).
        </p>
      </RespuestaPrimero>

      <CalculadoraPnc />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las cuatro prestaciones, en {MES}
        </h2>
        <p className="text-zinc-600">
          Todas salen del mismo número: el haber mínimo de {formatARS(V.haberMinimo, 2)} que fijó la{" "}
          {V.resolucion}. Lo que cambia es el porcentaje.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Prestación</th>
                  <th className="px-4 py-2.5 text-right font-semibold">% de la mínima</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Haber</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Con bono</th>
                </tr>
              </thead>
              <tbody>
                {MONTOS.map((m) => (
                  <tr key={m.prestacion.clave} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-700">
                      {m.prestacion.nombre}
                      <span className="block text-xs text-zinc-400">{m.prestacion.norma}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {formatPct(m.prestacion.proporcionHaberMinimo * 100, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {formatARS(m.haber, 2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(m.total, 2)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-zinc-200 bg-zinc-50">
                  <td className="px-4 py-2.5 text-zinc-700" colSpan={2}>
                    Para comparar: un jubilado que cobra la mínima
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(V.haberMinimo, 2)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(MINIMA_CON_BONO, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Un detalle que no vas a ver en otro lado: el bono <em>no</em> es proporcional. Son los
          mismos {formatARS(bonoVigente().monto, 0)} para todos, así que achica la diferencia. La
          pensión del 70% termina cobrando el{" "}
          {formatPct(DISCAPACIDAD.proporcionSobreMinimaConBono * 100, 1)} de lo que cobra un
          jubilado de la mínima, no el 70%. El mes que no salga el decreto del bono, la diferencia
          vuelve a abrirse de golpe.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Trabajar sin perder la pensión: el tope se mueve con el salario mínimo
        </h2>
        <p className="text-zinc-600">
          Hasta la Ley 27.793, tener un trabajo registrado te daba de baja la pensión por invalidez.
          Hoy el artículo 7 dice lo contrario: seguís cobrando mientras tus ingresos no pasen dos
          salarios mínimos. Como el{" "}
          <Link href="/salario-minimo" className="text-emerald-700 hover:underline">
            salario mínimo
          </Link>{" "}
          cambia casi todos los meses, el tope también.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Concepto</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                  <th className="px-4 py-2.5 text-right font-semibold">En {MES}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Salario mínimo vital y móvil</td>
                  <td className="px-4 py-2.5 text-zinc-500">Res. CNEPySMVM 4/2026</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(SMVM.mensual, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    Tope de ingresos para seguir cobrando (2 salarios mínimos)
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">Ley 27.793, art. 7</td>
                  <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                    {formatARS(TOPE_INGRESOS, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Ingreso total posible (tope + pensión con bono)
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">calculado</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(TOPE_INGRESOS + DISCAPACIDAD.total, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Pasar el tope <strong>no</strong> es perder la pensión. El artículo 7 habla de{" "}
          <em>suspensión automática</em> mientras dure esa situación, y de rehabilitación inmediata
          cuando tus ingresos vuelven a bajar. Lo que sí tenés que hacer es avisar cualquier cambio
          en tu situación económica dentro de los 15 días hábiles (art. 3 inc. b del Anexo II del
          Decreto 84/2026). Si no avisás, respondés por lo que cobraste de más.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué pide cada una</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {MONTOS.map((m) => (
            <div
              key={m.prestacion.clave}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-zinc-900">{m.prestacion.nombre}</h3>
              <p className="mt-0.5 text-xs text-zinc-500">
                Otorga: {m.prestacion.otorga} · Paga: {m.prestacion.paga}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
                {m.prestacion.requisitos.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Si tenés 65 años o más y no llegás a 30 años de aportes, la{" "}
          <Link href="/puam" className="font-medium text-emerald-700 hover:underline">
            PUAM tiene su propia página
          </Link>{" "}
          con todos los requisitos y la letra chica (no deja pensión al cónyuge y no te deja
          trabajar). Mirá también cuánto te quedaría de{" "}
          <Link href="/jubilacion" className="font-medium text-emerald-700 hover:underline">
            jubilación y del bono
          </Link>
          . Y si tenés hijos a cargo, las{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            asignaciones familiares
          </Link>{" "}
          que se cobran junto con la pensión.
        </p>
      </section>

      {LETRA_CHICA.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">
            La letra chica de la pensión para madres de 7 hijos
          </h2>
          <p className="text-sm text-zinc-600">
            Todas las notas citan la Ley 23.746, que tiene dos artículos de requisitos y nada más.
            Lo que decide si la pensión sigue o se pierde está en su reglamento, el{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/4818/texact.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 hover:underline"
            >
              Decreto 2360/90
            </a>
            , que casi nadie publica.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {LETRA_CHICA.map((l) => (
              <div
                key={l.titulo}
                className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 shadow-sm"
              >
                <h3 className="font-semibold text-zinc-900">{l.titulo}</h3>
                <p className="mt-2 text-sm text-zinc-600">{l.detalle}</p>
              </div>
            ))}
          </div>
        </section>
      )}

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
          {pncFuentes().lista.map((f) => (
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
          Esta página es informativa y usa normas publicadas en el Boletín Oficial e InfoLEG. No da
          ni liquida beneficios: el alta depende del Certificado Único de Discapacidad, de la
          evaluación socioeconómica y de los controles del organismo. Consultada el{" "}
          {pncFuentes().consultadoEl}.
        </p>
      </section>
    </article>
  );
}
