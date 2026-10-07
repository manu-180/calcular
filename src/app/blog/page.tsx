import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZACION } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Guías de sueldo, impuestos y ANSES con datos oficiales",
  description:
    "Guías sobre aguinaldo, indemnización, monotributo, Ganancias y asignaciones, con la cuenta paso a paso y la fuente oficial de cada dato.",
  alternates: { canonical: "/blog" },
};

// Índice de guías. Cada entrada nueva se suma acá y al sitemap.
const POSTS = [
  {
    slug: "estatutos-laborales-derogados-2027",
    titulo: "Los estatutos laborales que se derogan el 1 de enero de 2027",
    bajada:
      "El Título XXVI de la Ley 27.802 no cambia artículos: deroga leyes enteras. Seis regímenes completos caen el 1/1/2027 (periodistas, viajantes de comercio, teletrabajo, peluqueros, choferes y el fondo de garantía de créditos laborales), y otras nueve derogaciones ya rigen desde marzo de 2026, incluidos nueve artículos de la Ley de Contrato de Trabajo. La lista completa, con el título oficial de cada norma.",
    fechaISO: "2026-08-23",
    fecha: "23 de agosto de 2026",
  },
  {
    slug: "tope-de-ingresos-asignaciones-familiares",
    titulo:
      "El tope de las asignaciones familiares: por qué un solo sueldo puede dejar afuera a toda la familia",
    bajada:
      "Los topes son dos, y el que decide casi nunca es el que se publica: uno individual deja afuera a todo el grupo aunque la suma esté por debajo del límite. También los escalones que hacen que un aumento chico te haga cobrar menos, con un caso resuelto peso por peso.",
    fechaISO: "2026-08-04",
    fecha: "4 de agosto de 2026",
  },
  {
    slug: "cuanto-cuesta-criar-un-hijo-argentina",
    titulo: "Cuánto cuesta criar un hijo en Argentina 2026: el dato oficial del INDEC",
    bajada:
      "La canasta de crianza tramo por tramo: qué parte es plata que sale del bolsillo y qué parte es el valor del tiempo de cuidado. Con la serie completa desde 2020 comparada con el IPC, y por qué un chico de 4 años «cuesta» menos que uno de 2.",
    fechaISO: "2026-08-01",
    fecha: "1 de agosto de 2026",
  },
  {
    slug: "aumento-comercio-agosto-2026",
    titulo: "Aumento de comercio agosto 2026: escala, bono de $50.000 y cuánto cobrás",
    bajada:
      "El acuerdo del 22/7/2026 da 5,7% para el trimestre en tres tramos que NO se acumulan, más un bono de $50.000 en dos cuotas. La escala oficial de agosto por categoría y por qué los $120.000 no se incorporaron al básico en julio.",
    fechaISO: "2026-07-30",
    fecha: "30 de julio de 2026",
  },
  {
    slug: "cuanto-se-cobra-de-vacaciones-plus-vacacional-2026",
    titulo: "Cuánto se cobra de vacaciones en 2026: el plus vacacional explicado",
    bajada:
      "Las vacaciones se pagan más que un mes normal porque cada día se cobra el sueldo ÷ 25, no ÷ 30. Por qué pasa, cuánto es el plus según tu antigüedad (con la escala de 14 a 35 días) y la calculadora que lo resuelve.",
    fechaISO: "2026-06-25",
    fecha: "25 de junio de 2026",
  },
  {
    slug: "como-se-calcula-la-indemnizacion-por-despido-2026",
    titulo: "Cómo se calcula la indemnización por despido en 2026 (paso a paso)",
    bajada:
      "Los cuatro conceptos que se suman (antigüedad, preaviso, integración del mes y liquidación final), con un ejemplo real peso por peso y la reforma de la Ley 27.802 ya incluida (el piso del 67% del fallo Vizzoti, que ahora está en la ley).",
    fechaISO: "2026-06-25",
    fecha: "25 de junio de 2026",
  },
  {
    slug: "aguinaldo-monotributista",
    titulo: "¿El monotributista cobra aguinaldo? Qué dice la ley en 2026",
    bajada:
      "No: el SAC es solo para trabajadores en relación de dependencia. La excepción del pluriempleo, por qué la ley deja afuera al monotributista y cómo armarte tu propio aguinaldo apartando una parte de lo que facturás.",
    fechaISO: "2026-06-24",
    fecha: "24 de junio de 2026",
  },
  {
    slug: "aguinaldo-proporcional-como-se-calcula",
    titulo: "Aguinaldo proporcional 2026: cómo se calcula si no trabajaste todo el semestre",
    bajada:
      "Si entraste o saliste del trabajo a mitad de año, el aguinaldo es proporcional a los días trabajados, no a los meses redondeados. La fórmula correcta de la LCT, ejemplos con números reales y la calculadora que hace la cuenta.",
    fechaISO: "2026-06-23",
    fecha: "23 de junio de 2026",
  },
  {
    slug: "que-incluye-la-cuota-del-monotributo",
    titulo: "Qué incluye la cuota del monotributo 2026 (con el desglose por categoría)",
    bajada:
      "No es solo un impuesto: la cuota incluye impuesto integrado (reemplaza IVA y Ganancias), aporte jubilatorio (SIPA) y obra social. Cuánto va a cada componente, categoría por categoría, con valores oficiales de ARCA.",
    fechaISO: "2026-06-22",
    fecha: "22 de junio de 2026",
  },
  {
    slug: "que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo",
    titulo: "Qué pasa si me paso del límite de facturación del monotributo (2026)",
    bajada:
      "Dos caminos: recategorizarte (si seguís bajo el máximo) o quedar excluido y pasar al Régimen General. Los topes oficiales de ARCA por categoría y cómo controlarlo para no quedar afuera.",
    fechaISO: "2026-06-22",
    fecha: "22 de junio de 2026",
  },
  {
    slug: "como-calcular-aguinaldo-empleado-de-comercio",
    titulo: "Cómo calcular el aguinaldo de un empleado de comercio 2026 (paso a paso)",
    bajada:
      "El aguinaldo es el 50% del mejor sueldo del semestre, y en Comercio ese sueldo incluye los $120.000 no remunerativos. Fórmula, ejemplo real de junio 2026, el neto correcto y los errores que te hacen cobrar de menos.",
    fechaISO: "2026-06-15",
    fecha: "15 de junio de 2026",
  },
  {
    slug: "nuevo-recibo-de-sueldo-2026",
    titulo: "Nuevo recibo de sueldo 2026: qué cambió y cómo leerlo (Decreto 407/2026)",
    bajada:
      "Desde junio de 2026 el recibo tiene formato nuevo: 4 secciones y el costo laboral del empleador a la vista. Qué cambió, qué NO te cambia (tu neto sigue igual) y cómo leerlo, con la fuente oficial.",
    fechaISO: "2026-06-15",
    fecha: "15 de junio de 2026",
  },
  {
    slug: "modelo-recibo-de-sueldo-empleado-de-comercio",
    titulo: "Modelo de recibo de sueldo de Empleado de Comercio 2026 (nuevo formato)",
    bajada:
      "Cómo queda el recibo de Comercio (CCT 130/75) con el nuevo modelo del Decreto 407/2026: las 4 secciones, el resumen del costo laboral y un recibo de ejemplo con números reales de junio 2026.",
    fechaISO: "2026-06-15",
    fecha: "15 de junio de 2026",
  },
  {
    slug: "como-liquidar-sueldo-empleado-de-comercio",
    titulo: "Cómo liquidar el sueldo de un empleado de comercio en 2026 (paso a paso)",
    bajada:
      "El método completo del CCT 130/75: básico, los $120.000 no remunerativos, antigüedad, presentismo y descuentos, con un ejemplo real de junio 2026 y la escala oficial de FAECYS.",
    fechaISO: "2026-06-15",
    fecha: "15 de junio de 2026",
  },
  {
    slug: "que-hacer-con-el-aguinaldo-2026",
    titulo: "Qué hacer con el aguinaldo 2026: las opciones, con la cuenta a la vista",
    bajada:
      "Pagar deudas, plazo fijo tradicional o UVA, dólares o consumo: qué conviene según los números, con la tasa del BCRA y el IPC de mayo a la vista.",
    fechaISO: "2026-06-12",
    fecha: "12 de junio de 2026",
  },
  {
    slug: "aguinaldo-paga-ganancias",
    titulo: "¿El aguinaldo paga impuesto a las Ganancias en 2026?",
    bajada:
      "Solo si tu sueldo es alto, y no se retiene todo junto. Cómo se reparte el aguinaldo mes a mes y desde qué sueldo te alcanza.",
    fechaISO: "2026-06-12",
    fecha: "12 de junio de 2026",
  },
] as const;

const SITIO = "https://calcular.ar";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZACION,
    {
      "@type": "CollectionPage",
      "@id": `${SITIO}/blog`,
      url: `${SITIO}/blog`,
      name: "Guías de sueldo, impuestos y ANSES con datos oficiales",
      description:
        "Guías sobre aguinaldo, indemnización, monotributo, Ganancias y asignaciones, con la cuenta paso a paso y la fuente oficial de cada dato.",
      inLanguage: "es-AR",
      publisher: { "@id": `${SITIO}/#org` },
      hasPart: POSTS.map((p) => ({
        "@type": "BlogPosting",
        headline: p.titulo,
        url: `${SITIO}/blog/${p.slug}`,
        datePublished: p.fechaISO,
        description: p.bajada,
        inLanguage: "es-AR",
        author: { "@id": `${SITIO}/#org` },
        publisher: { "@id": `${SITIO}/#org` },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO },
        { "@type": "ListItem", position: 2, name: "Guías", item: `${SITIO}/blog` },
      ],
    },
  ],
};

export default function BlogIndexPage() {
  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Guías</h1>
        <p className="text-zinc-600">
          Sueldo, impuestos y ANSES explicados con datos oficiales y la cuenta a la vista. Cada
          número tiene su fuente y su fecha.
        </p>
      </header>

      <div className="space-y-4">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400"
          >
            <p className="text-xs text-zinc-400">{p.fecha}</p>
            <h2 className="mt-1 text-lg font-bold text-zinc-900">{p.titulo}</h2>
            <p className="mt-1.5 text-sm text-zinc-600">{p.bajada}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
