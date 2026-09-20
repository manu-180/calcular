import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { FuentesOficiales, SelloVerificado } from "@/components/SelloVerificado";
import { COMERCIO_FUENTES, MESES_COMERCIO } from "@/data/convenios/comercio";
import {
  CAMIONEROS_BASE_MAYO,
  MESES_CAMIONEROS,
  basicoCamioneros,
} from "@/data/convenios/camioneros";
import { MESES_UOCRA, UOCRA_FUENTES } from "@/data/convenios/uocra";
import { formatARS } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Convenios colectivos 2026: escalas salariales y calculadoras por gremio",
  description:
    "Cuánto se cobra por convenio en 2026: Empleados de Comercio (CCT 130/75) y UOCRA (CCT 76/75) con calculadora, escala del mes y paritarias al día. Verificado contra las circulares oficiales.",
  alternates: { canonical: "/convenios" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Convenios colectivos 2026")}&s=${encodeURIComponent("Escalas salariales verificadas contra la circular oficial")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Qué es un convenio colectivo de trabajo (CCT)?",
    a: "Es un acuerdo entre el sindicato de una actividad y las cámaras empresarias, homologado por la Secretaría de Trabajo, que fija las condiciones mínimas de ese sector: categorías, sueldos básicos, adicionales, jornada y licencias. Aplica a todos los trabajadores de la actividad, estén o no afiliados al sindicato.",
  },
  {
    q: "¿Cómo sé qué convenio me corresponde?",
    a: "Depende de la actividad principal de tu empleador, no de tu tarea puntual: un administrativo de un supermercado está en Comercio (CCT 130/75) y un administrativo de una constructora, en UOCRA o en el convenio de empleados de la construcción según su rol. El convenio y tu categoría figuran en el recibo de sueldo; si no aparecen, podés pedirlos en tu empleo o consultar al sindicato de la actividad.",
  },
  {
    q: "¿Me pueden pagar menos que la escala del convenio?",
    a: "No. La escala salarial del convenio es un piso de orden público laboral: ningún acuerdo individual puede estar por debajo. Sí te pueden pagar más — muchos empleadores pagan por encima del básico — y ese excedente suele figurar como «a cuenta de futuros aumentos» o como adicional voluntario.",
  },
  {
    q: "¿Qué es una paritaria?",
    a: "Es la negociación periódica entre sindicato y cámaras para actualizar las escalas del convenio. En 2026 la mayoría de los gremios negocia aumentos en tramos mensuales cortos (1,5% a 2% por mes) y los complementa con sumas no remunerativas que después se incorporan al básico.",
  },
  {
    q: "¿Qué diferencia hay entre el básico y una suma no remunerativa?",
    a: "El básico es remunerativo: paga aportes (jubilación, PAMI, obra social) y computa para todo. Las sumas no remunerativas, en cambio, no pagan la mayoría de los aportes — por eso «rinden» más en mano — pero son transitorias: los acuerdos las suelen incorporar al básico después de unos meses. En Comercio, por ejemplo, los $120.000 no remunerativos que se cobran desde 2025 se incorporan al básico recién entre diciembre de 2026 y mayo de 2027, de a $20.000 por mes.",
  },
  {
    q: "¿Cada cuánto se actualizan las escalas de esta página?",
    a: "Cada vez que el gremio publica una circular o se firma un acuerdo nuevo: nuestro pipeline verifica las escalas contra el documento oficial (FAECYS, UOCRA-CAMARCO) antes de publicarlas, y cada página muestra la fecha de la última verificación. Si una escala todavía no tiene circular oficial, no la publicamos.",
  },
  {
    q: "¿Por qué acá hay menos gremios que en otros sitios?",
    a: "Porque solo publicamos escalas conciliadas contra la circular oficial del gremio o el acuerdo firmado — nunca contra blogs o terceros, que suelen contradecirse. Estamos sumando gremios (Camioneros, UOM, Plástico) a medida que verificamos sus escalas.",
  },
  {
    q: "¿El convenio define también mi aguinaldo y mis vacaciones?",
    a: "El aguinaldo (SAC) y las vacaciones tienen un piso legal para todos los trabajadores (Ley 23.041 y LCT); los convenios pueden mejorarlos o sumar adicionales propios. Tu sueldo de convenio sí impacta directo: el aguinaldo es el 50% del mejor sueldo del semestre, y las vacaciones se pagan sobre tu sueldo habitual.",
  },
];

export default function ConveniosPage() {
  const mesComercio = MESES_COMERCIO.find((m) => m.id === "agosto-2026")!;
  const junioUocra = MESES_UOCRA.find((m) => m.id === "junio-2026")!;
  const junioCamioneros = MESES_CAMIONEROS.find((m) => m.id === "junio-2026")!;
  const junioChofer1 =
    basicoCamioneros(junioCamioneros.id, "chofer-primera")!;
  const junioAyudante =
    basicoCamioneros(junioCamioneros.id, "ayudante-mayor")!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Convenios colectivos 2026 — escalas salariales por gremio",
        url: "https://calcular.ar/convenios",
        inLanguage: "es-AR",
        hasPart: [
          { "@type": "WebApplication", name: "Calculadora de sueldo Empleados de Comercio", url: "https://calcular.ar/convenios/comercio" },
          { "@type": "WebApplication", name: "Calculadora de sueldo UOCRA", url: "https://calcular.ar/convenios/uocra" },
          { "@type": "WebApplication", name: "Calculadora de sueldo Camioneros", url: "https://calcular.ar/convenios/camioneros" },
        ],
      },
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
          Convenios colectivos 2026: cuánto se cobra por gremio
        </h1>
        <p className="text-zinc-600">
          Escalas salariales <strong>verificadas contra la circular oficial</strong> de cada
          gremio, con calculadora por categoría, antigüedad y zona, y las tablas de cada mes.
          Sin blogs de por medio: si un número no está en el documento oficial, no se publica.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={COMERCIO_FUENTES.consultadoEl}
        fuente={COMERCIO_FUENTES.escalas}
        norma="Comercio, UOCRA y Camioneros"
      />

      <RespuestaPrimero actualizado={COMERCIO_FUENTES.consultadoEl}>
        <p>
          Un <strong>convenio colectivo de trabajo (CCT)</strong> fija el piso salarial
          obligatorio de una actividad: ningún empleador puede pagar menos que su escala, estés o
          no afiliado al sindicato. Acá tenés las escalas <strong>verificadas contra la circular
          o el acuerdo oficial</strong> de cada gremio —Empleados de Comercio (CCT 130/75),
          UOCRA-construcción (CCT 76/75) y Camioneros (CCT 40/89)— con calculadora por categoría,
          antigüedad y zona, y la tabla de cada mes. Si un número no está en el documento oficial,
          no se publica.
        </p>
      </RespuestaPrimero>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/convenios/comercio"
          className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow"
        >
          <h2 className="font-semibold text-zinc-900 group-hover:text-emerald-700">
            Empleados de Comercio (CCT 130/75)
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            Básicos de agosto: {formatARS(mesComercio.basicos["maestranza-a"], 0)} a{" "}
            {formatARS(mesComercio.basicos["vendedor-d"], 0)} +{" "}
            {formatARS(mesComercio.noRemunerativo, 0)} no remunerativos.
            Calculadora con antigüedad, presentismo y jornada parcial.
          </p>
        </Link>
        <Link
          href="/convenios/uocra"
          className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow"
        >
          <h2 className="font-semibold text-zinc-900 group-hover:text-emerald-700">
            UOCRA — construcción (CCT 76/75)
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            Jornales de junio: {formatARS(junioUocra.jornales.ayudante.a, 0)} a{" "}
            {formatARS(junioUocra.jornales["oficial-especializado"]["c-austral"], 0)} la hora
            según categoría y zona. Calculadora de jornal a sueldo mensual, con asistencia
            perfecta y SNR.
          </p>
        </Link>
        <Link
          href="/convenios/camioneros"
          className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow"
        >
          <h2 className="font-semibold text-zinc-900 group-hover:text-emerald-700">
            Camioneros (CCT 40/89)
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            Básicos de junio: {formatARS(junioChofer1, 0)} (Chofer 1ª) a{" "}
            {formatARS(junioAyudante, 0)} (Ayudante). Escala nacional única sin zonas.
            Calculadora con antigüedad.
          </p>
        </Link>
        {["UOM (metalúrgicos)", "Plástico"].map((g) => (
          <div
            key={g}
            className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-5"
          >
            <h2 className="font-semibold text-zinc-400">
              {g}{" "}
              <span className="ml-1 rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                Muy pronto
              </span>
            </h2>
            <p className="mt-1.5 text-sm text-zinc-400">
              Lo publicamos apenas terminemos de verificar la escala contra la circular
              oficial del gremio.
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo verificamos cada escala</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Las escalas de convenio son el terreno donde más se equivocan los sitios de
            sueldos: las fuentes secundarias se contradicen entre sí, mezclan sumas fijas con
            bonos y publican tablas viejas. Acá el método es uno solo:{" "}
            <strong>el documento oficial o nada</strong>.
          </p>
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              Cada tabla sale de la circular del gremio o del acuerdo firmado por las partes
              (FAECYS para Comercio, UOCRA-CAMARCO para construcción), leído completo.
            </li>
            <li>
              Antes de publicar, un script verifica la aritmética del acuerdo sobre la tabla
              (los tramos porcentuales, las incorporaciones al básico, los adicionales de
              zona).
            </li>
            <li>
              Cada página muestra la fuente y la fecha de la última verificación. Cuando un
              gremio firma un acuerdo nuevo, actualizamos la escala desde el documento, no
              desde las noticias.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <FuentesOficiales
        verificadoEl={COMERCIO_FUENTES.consultadoEl}
        fuentes={[
          COMERCIO_FUENTES.escalas,
          COMERCIO_FUENTES.acuerdo,
          UOCRA_FUENTES.acuerdoTramo2,
          UOCRA_FUENTES.acuerdoTramo1,
        ]}
      >
        Con tu sueldo de convenio podés calcular tu{" "}
        <Link href="/aguinaldo" className="text-emerald-700 underline underline-offset-2">
          aguinaldo
        </Link>
        , tus{" "}
        <Link href="/vacaciones" className="text-emerald-700 underline underline-offset-2">
          vacaciones
        </Link>{" "}
        y tu{" "}
        <Link href="/indemnizacion" className="text-emerald-700 underline underline-offset-2">
          indemnización
        </Link>
        , o ver si tu paritaria le gana a la{" "}
        <Link href="/inflacion" className="text-emerald-700 underline underline-offset-2">
          inflación
        </Link>
        .
      </FuentesOficiales>
    </article>
  );
}
