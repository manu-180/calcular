import type { Metadata } from "next";
import { PlanillaLanding, type FilaPreview } from "../_producto";
import { CATEGORIAS, VIGENCIA, ventanaRecategorizacion } from "@/data/monotributo";
import { categoriaPorParametros, cuotaMensual } from "@/lib/monotributo";
import { formatARS } from "@/lib/formato";
import { PRODUCTOS } from "@/lib/mp";
import { openGraphDe } from "@/lib/seo";

const PRODUCTO = PRODUCTOS["planilla-monotributo"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");

export const metadata: Metadata = {
  title: "Planilla de monotributo 2026 en Excel: facturación",
  description:
    "Cargá lo que facturás mes a mes y la planilla te dice tu categoría, cuánto margen te queda y la cuota que vas a pagar, con la tabla de ARCA. Pago único.",
  alternates: { canonical: "/planillas/monotributo" },
  openGraph: openGraphDe({
    ruta: "/planillas/monotributo",
    titulo: "Planilla de Monotributo 2026",
    bajada: "Categoría, margen y cuota · tabla oficial de ARCA",
  }),
};

function datosDelMes() {
  // Caso de la vista previa: servicios, hoy en C, con una facturación que ya la pasó. Es la
  // situación que la planilla existe para anticipar. Números del mismo motor que /monotributo.
  const ACTUAL = CATEGORIAS.find((c) => c.cat === "C")!;
  const INGRESOS = Math.round((ACTUAL.ingresosBrutosMax * 1.08) / 1000) * 1000;
  const DEMO = categoriaPorParametros({ ingresos: INGRESOS });
  const NUEVA = DEMO.tipo === "ok" ? DEMO.categoria : CATEGORIAS[CATEGORIAS.length - 1];
  const CUOTA_NUEVA = cuotaMensual(NUEVA, "servicios", false).total;
  const CUOTA_ACTUAL = cuotaMensual(ACTUAL, "servicios", false).total;
  const VENTANA = ventanaRecategorizacion();

  const preview: FilaPreview[] = [
    { etiqueta: "Actividad", valor: "Servicios", tono: "input" },
    { etiqueta: "Tu categoría actual", valor: ACTUAL.cat, tono: "input" },
    { etiqueta: "Facturación de los últimos 12 meses", valor: INGRESOS, tono: "input" },
    { etiqueta: "Categoría que te corresponde", valor: NUEVA.cat, tono: "total" },
    { etiqueta: "Qué la define", valor: "La facturación" },
    { etiqueta: `Tope de la categoría ${NUEVA.cat}`, valor: NUEVA.ingresosBrutosMax },
    { etiqueta: "Margen para seguir facturando", valor: NUEVA.ingresosBrutosMax - INGRESOS },
    { etiqueta: "Cuota mensual nueva", valor: formatARS(CUOTA_NUEVA, 2), tono: "total" },
    { etiqueta: `Cuota actual (${ACTUAL.cat})`, valor: formatARS(CUOTA_ACTUAL, 2) },
    { etiqueta: "En la recategorización", valor: "Subís de categoría" },
  ];
  return { ACTUAL, INGRESOS, DEMO, NUEVA, CUOTA_NUEVA, CUOTA_ACTUAL, VENTANA, preview };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

export default function PlanillaMonotributoPage() {
  const { ACTUAL, VENTANA, preview } = datosDelMes();
  return (
    <PlanillaLanding
      producto={PRODUCTO}
      etiquetaConvenio="Monotributo · ARCA"
      h1={
        <>
          Sabé cuánto más podés facturar
          <br />
          <span className="text-emerald-600">antes de saltar de categoría</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para monotributistas. Cargás lo que facturaste cada mes y te dice qué categoría te toca, qué la define, cuánto margen te queda y cuánto vas a pagar por mes."
      respuestaPrimero={
        <p>
          La planilla de monotributo es una hoja de <strong>Excel y Google Sheets</strong> con la{" "}
          <strong>tabla oficial de ARCA vigente desde el {VIGENCIA.desde}</strong>. Cargás lo que facturaste en los
          últimos 12 meses y, si tenés local, la superficie, la energía y los alquileres. Te dice la{" "}
          <strong>categoría que te toca según el más alto de esos datos</strong> (como pide el art. 9 de la Ley
          24.977), el <strong>margen que te queda</strong> antes de la categoría siguiente y la cuota mensual, con o
          sin relación de dependencia. Pago único de <strong>${PRECIO}</strong>, con las actualizaciones de febrero y
          agosto incluidas y 7 días para pedir la devolución si no te sirve.
        </p>
      }
      previewTitulo={`Servicios · hoy en ${ACTUAL.cat} · recategorización de ${VENTANA.textoMes}`}
      previewSubtitulo="Cargás la facturación de cada mes y la categoría, el margen y la cuota se recalculan solos."
      previewHoja="Mi monotributo"
      preview={preview}
      calculadoraGratis={{ href: "/monotributo/recategorizacion", texto: "Probar la calculadora gratis de recategorización" }}
      hojas={[
        {
          titulo: "Mi monotributo",
          descripcion:
            "Los 12 meses de facturación que evalúa la próxima recategorización, ya rotulados. Te da la categoría por cada parámetro, cuál manda, el tope, el margen, la cuota nueva contra la actual y si subís, bajás o te mantenés.",
        },
        {
          titulo: "Parámetros físicos",
          descripcion:
            "Superficie, energía y alquileres: si tenés local, pueden subirte de categoría aunque factures poco. En venta de cosas, además, te avisa si el precio unitario supera el máximo de ARCA.",
        },
        {
          titulo: `Categorías ${CATEGORIAS[0].cat} a ${CATEGORIAS[CATEGORIAS.length - 1].cat}`,
          descripcion: `La tabla oficial completa de ARCA: topes de facturación, superficie, energía, alquileres, precio unitario, impuesto integrado, jubilación y obra social de las ${CATEGORIAS.length} categorías.`,
        },
        {
          titulo: "Instrucciones y fuentes",
          descripcion:
            "Cómo usarla en tres minutos, las reglas que más confunden y el link a la tabla de ARCA y al texto de la Ley 24.977, con la fecha en que se verificó.",
        },
      ]}
      fuente={{ nombre: "ARCA: categorías del monotributo", url: VIGENCIA.fuenteUrl, verificadoEl: VIGENCIA.consultadoEl }}
      tituloActualizacion="Qué pasa cuando ARCA actualiza las categorías"
      actualizacion={`ARCA actualiza los montos dos veces por año según la inflación. La próxima actualización es en ${VIGENCIA.proximaActualizacion}. Cuando sale la tabla nueva la cargamos, regeneramos la planilla y te llega la versión nueva por mail, sin costo.`}
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Es inmediato. Guardá ese mail: el enlace es permanente y siempre te baja la última versión, así que también es por ahí que te llegan las tablas nuevas de febrero y agosto.",
        },
        {
          q: "¿Por qué me pide superficie, energía y alquileres?",
          a: "Porque la facturación no es lo único que cuenta. La Ley 24.977 (art. 9 del Anexo) dice que estás bien categorizado cuando estás en la categoría que te da el MAYOR de tus datos. Si trabajás sin local, dejalos en cero y la planilla se guía solo por la facturación.",
        },
        {
          q: "¿Me sirve para la recategorización de febrero o agosto?",
          a: `Sí, es para eso. La tabla viene rotulada con los 12 meses que se evalúan en la próxima recategorización (${VENTANA.textoMes}), y te dice antes de hacer el trámite si subís, bajás o te mantenés, y cuánto cambia la cuota.`,
        },
        {
          q: "¿Y si además trabajo en relación de dependencia?",
          a: "Lo marcás y la cuota se calcula solo con el impuesto integrado: tu empleo ya aporta jubilación y obra social.",
        },
        {
          q: "¿Hace la recategorización en ARCA por mí?",
          a: "No. El trámite se hace en ARCA con tu clave fiscal. La planilla te dice qué vas a tener que declarar y cuánto margen te queda, para que llegues al trámite sabiendo el resultado.",
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: "Sí. La tabla es la misma que usa la calculadora de calcular.ar/monotributo. Antes de publicar cada versión, una verificación automática recalcula el archivo en 1.800 casos (cada categoría, sus topes exactos y un peso más) y lo compara con la calculadora.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedir la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
      ]}
      relacionadas={[
        { href: "/monotributo", texto: "Calculadora de monotributo" },
        { href: "/monotributo/recategorizacion", texto: "Recategorización" },
        { href: "/monotributo/categorias", texto: "Categorías 2026" },
        { href: "/obra-social-monotributo", texto: "Obra social del monotributo" },
      ]}
    />
  );
}
