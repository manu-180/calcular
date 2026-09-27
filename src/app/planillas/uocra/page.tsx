import type { Metadata } from "next";
import { PlanillaLanding, type FilaPreview } from "../_producto";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_FUENTES,
  UOCRA_HORAS_MES_PROMEDIO,
  UOCRA_PROXIMA_PARITARIA,
  ZONAS_UOCRA,
} from "@/data/convenios/uocra";
import { calcularUocra, textoProximaParitaria } from "@/lib/convenios";
import { PRODUCTOS } from "@/lib/mp";

export const metadata: Metadata = {
  title: "Planilla de sueldos UOCRA 2026 en Excel (CCT 76/75)",
  description:
    "Planilla de liquidación de sueldos de la construcción en Excel y Google Sheets: jornales oficiales UOCRA por categoría y zona, asistencia perfecta del 20%, suma no remunerativa y neto estimado. Da los mismos números que la calculadora gratis. $14.900 pago único.",
  alternates: { canonical: "/planillas/uocra" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Planilla de sueldos UOCRA 2026")}&s=${encodeURIComponent("CCT 76/75 · jornales por categoría y zona")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Caso de la vista previa: Oficial en Zona A (la categoría y la zona más frecuentes), mes
// completo, con asistencia perfecta. Se calcula EN EL SERVER con calcularUocra, el mismo motor
// de /convenios/uocra: la previa no puede mostrar un número que la planilla no dé.
const MES = MESES_UOCRA.at(-1)!;
const CATEGORIA = CATEGORIAS_UOCRA.find((c) => c.id === "oficial")!;
const ZONA = ZONAS_UOCRA.find((z) => z.id === "a")!;
const HORAS = UOCRA_HORAS_MES_PROMEDIO;
const DEMO = calcularUocra({
  mesId: MES.id,
  categoriaId: CATEGORIA.id,
  zonaId: ZONA.id,
  horasMes: HORAS,
  conAsistencia: true,
  conAporteSindical: true,
})!;

const preview: FilaPreview[] = [
  { etiqueta: "Categoría", valor: CATEGORIA.nombre, tono: "input" },
  { etiqueta: "Zona", valor: ZONA.nombre, tono: "input" },
  { etiqueta: "Mes a liquidar", valor: MES.etiqueta, tono: "input" },
  { etiqueta: "Horas trabajadas", valor: HORAS.toFixed(2).replace(".", ","), tono: "input", nota: "mes completo" },
  { etiqueta: "¿Asistencia perfecta?", valor: "Sí", tono: "input" },
  { etiqueta: "Jornal por hora", valor: DEMO.jornal ?? 0 },
  { etiqueta: "Básico del mes", valor: DEMO.basicoMensual },
  { etiqueta: "Asistencia perfecta", valor: DEMO.asistenciaPerfecta, nota: "20% · art. 52" },
  // Un $0 sin explicación en una vista previa de venta parece un error del producto. En agosto
  // de 2026 el cero es el dato correcto (la SNR se absorbió al jornal) y decirlo es prueba de
  // que la planilla sigue los tramos de verdad, no una tabla copiada.
  {
    etiqueta: "Suma no remunerativa",
    valor: DEMO.snr,
    nota: DEMO.snr === 0 ? "absorbida al jornal en este tramo" : undefined,
  },
  { etiqueta: "Total bruto", valor: DEMO.bruto, tono: "total" },
  { etiqueta: "Aportes del trabajador", valor: -DEMO.descuentos },
  { etiqueta: "Neto estimado", valor: DEMO.neto, tono: "total" },
];

export default function PlanillaUocraPage() {
  return (
    <PlanillaLanding
      producto={PRODUCTOS["planilla-uocra"]}
      etiquetaConvenio="CCT 76/75 — Construcción (UOCRA)"
      h1={
        <>
          Liquidá sueldos de UOCRA con los jornales oficiales
          <br />
          <span className="text-emerald-600">de las cuatro zonas, ya cargados</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para la construcción: elegís categoría, zona, mes y horas, y te da el básico, la asistencia perfecta del 20%, la suma no remunerativa y el neto. Los jornales salen de los acuerdos UOCRA-CAMARCO firmados, no de un resumen."
      respuestaPrimero={
        <p>
          La planilla de sueldos de UOCRA (CCT 76/75) es una hoja de{" "}
          <strong>Excel y Google Sheets</strong> con los jornales oficiales de las{" "}
          <strong>
            {CATEGORIAS_UOCRA.length} categorías y las {ZONAS_UOCRA.length} zonas
          </strong>{" "}
          ya cargados: elegís categoría, zona, mes y horas trabajadas, y te da el{" "}
          <strong>bruto desglosado y el neto estimado</strong>, con la asistencia perfecta del 20%
          (art. 52) y la suma no remunerativa que corresponde a ese mes. Los valores están
          verificados el {UOCRA_FUENTES.consultadoEl} contra los acuerdos paritarios firmados por
          UOCRA y CAMARCO. Pago único de <strong>$14.900</strong>, con las actualizaciones del año
          incluidas y devolución dentro de los 7 días si no te sirve.
        </p>
      }
      previewTitulo={`${CATEGORIA.nombre} · ${ZONA.nombre} · ${MES.etiqueta} · mes completo`}
      previewSubtitulo="Cambiás la categoría, la zona, el mes o las horas y todo lo demás se recalcula solo."
      preview={preview}
      calculadoraGratis={{
        href: "/convenios/uocra",
        texto: "Probar la calculadora gratis de UOCRA",
      }}
      hojas={[
        {
          titulo: "Liquidador",
          descripcion:
            "Elegís categoría, zona, mes y horas. Te desglosa jornal, básico del mes, asistencia perfecta, suma no remunerativa, aportes y neto. Incluye el fondo de cese laboral como referencia del costo del empleador.",
        },
        {
          titulo: "Escala 2026",
          descripcion: `Los jornales por hora de las ${CATEGORIAS_UOCRA.length} categorías en las ${ZONAS_UOCRA.length} zonas, mes por mes, más el sueldo mensual del sereno y la suma no remunerativa de cada combinación. ${CATEGORIAS_UOCRA.length * ZONAS_UOCRA.length * MESES_UOCRA.length * 2} valores oficiales.`,
        },
        {
          titulo: "Fuentes",
          descripcion:
            "El link a cada acuerdo paritario firmado, el texto del CCT 76/75, la Ley 22.250 y las disposiciones de homologación, con la fecha en que se verificó cada uno.",
        },
        {
          titulo: "Instrucciones",
          descripcion:
            "Cómo usarla en tres minutos, más las trampas del convenio: por qué en la construcción no hay antigüedad, qué es el fondo de cese y por qué agosto de 2026 no tiene suma no remunerativa.",
        },
      ]}
      fuente={{
        nombre: UOCRA_FUENTES.anexoTramo2.nombre,
        url: UOCRA_FUENTES.anexoTramo2.url,
        verificadoEl: UOCRA_FUENTES.consultadoEl,
      }}
      actualizacion={`En la construcción las escalas se renegocian por tramos, así que la tabla cambia varias veces al año. ${textoProximaParitaria(UOCRA_PROXIMA_PARITARIA, new Date().toISOString().slice(0, 10))} Cuando se firme y se publique el anexo con las tablas, las cargamos, regeneramos la planilla y te llega la versión nueva por mail, sin costo.`}
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Es inmediato. Guardá ese mail: el enlace es permanente y siempre te baja la última versión, así que también es por ahí que te llegan las actualizaciones.",
        },
        {
          q: "¿Trae las cuatro zonas o solo la mía?",
          a: `Las cuatro: Zona A, Zona B, Zona C y Zona C Austral, con el adicional por zona desfavorable ya incluido en cada jornal. Si liquidás obras en más de una provincia, cambiás el desplegable y listo.`,
        },
        {
          q: "¿Incluye al sereno?",
          a: "Sí. El sereno es la única categoría con sueldo mensual fijo (art. 12 del CCT, jornada de vigilancia de 12 horas): la planilla lo detecta sola y no le multiplica las horas. Su suma no remunerativa es la misma que la del ayudante.",
        },
        {
          q: "¿Por qué agosto de 2026 aparece sin suma no remunerativa?",
          a: "Porque el acuerdo del 19/5/2026 la absorbió al jornal en ese tramo: el jornal salta alrededor de 9,1% de una vez y todo pasa a ser remunerativo. El cero es el dato correcto, no un faltante, y tiene impacto real en aportes, aguinaldo, vacaciones y fondo de cese.",
        },
        {
          q: "¿Calcula la antigüedad?",
          a: "No, porque el CCT 76/75 no la tiene: el régimen de la construcción (Ley 22.250) la reemplaza por el fondo de cese laboral, que sí aparece en la planilla como referencia del costo del empleador (12% el primer año, 8% después). La antigüedad en la construcción mejora las vacaciones, no el sueldo mensual.",
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis del sitio?",
          a: "Sí. La planilla se genera desde los mismos datos que alimentan la calculadora de calcular.ar/convenios/uocra, y hay una verificación automática que compara las dos en 800 casos —todas las categorías, zonas, meses y combinaciones de asistencia y aporte solidario— antes de publicar. Si alguna vez no coinciden, escribinos: es un error nuestro.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: "Tenés 7 días para pedirnos la devolución. Respondés el mail de la entrega y te devolvemos los $14.900 por MercadoPago. No hace falta que expliques nada.",
        },
        {
          q: "¿Reemplaza a un contador o al IERIC?",
          a: "No. Es una herramienta de cálculo y de control: te dice qué debería dar la liquidación con los jornales oficiales. Los recibos, las cargas sociales y el registro en el IERIC siguen siendo trabajo del contador o del estudio.",
        },
      ]}
      relacionadas={[
        { href: "/convenios/uocra", texto: "Calculadora de sueldo UOCRA" },
        { href: "/aguinaldo", texto: "Calculadora de aguinaldo" },
        { href: "/horas-extras", texto: "Calculadora de horas extras" },
        { href: "/vacaciones", texto: "Calculadora de vacaciones" },
      ]}
    />
  );
}
