// Landing de la Planilla de Ganancias para jubilados 2026.
//
// QUIÉN LLEGA ACÁ: un jubilado o pensionado al que SÍ le retienen Ganancias. Con el haber mínimo
// no se paga, así que es gente de un régimen especial o de una caja provincial, o alguien que
// perdió la deducción de los ocho haberes mínimos. Tiene plata en juego todos los meses y una
// sola pregunta: ¿me están reteniendo bien? La calculadora gratis le da un promedio anual, y su
// recibo casi nunca dice ese número, porque su caja liquida con el método acumulado y su haber
// cambia todos los meses. La página responde en ese orden: el promedio contra los doce números reales,
// qué me llevo, qué trae cada hoja, de dónde salen los datos y qué no hace.

import type { Metadata } from "next";
import { PlanillaLanding } from "../_producto";
import { PRODUCTOS } from "@/lib/mp";
import { openGraphDe } from "@/lib/seo";
import { datosOferta } from "@/lib/oferta";
import { ANIO_JUBILADOS, JUBILADOS_FUENTES } from "@/data/ganancias-jubilados";
import { DEDUCCIONES } from "@/data/ganancias";
import { prestacionesVigentes } from "@/data/prestaciones";
import { calcularGananciasJubilados, haberesMinimosProyectados } from "@/lib/ganancias-jubilados";
import { casoDeLanding, previaJubilados } from "@/components/ganancias-jubilados/previa";
import { formatARS } from "@/lib/formato";

const PRODUCTO = PRODUCTOS["planilla-ganancias-jubilados"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");

export const metadata: Metadata = {
  title: `Planilla de Ganancias para jubilados ${ANIO_JUBILADOS} en Excel`,
  description:
    "Excel para controlar la retención de Ganancias de tu haber mes por mes: la deducción de ocho haberes mínimos, el método acumulado y la diferencia contra tus recibos. Pago único.",
  alternates: { canonical: "/planillas/ganancias-jubilados" },
  openGraph: openGraphDe({
    ruta: "/planillas/ganancias-jubilados",
    titulo: `Planilla de Ganancias para jubilados ${ANIO_JUBILADOS}`,
    bajada: "Mes por mes, contra lo que dice tu recibo",
  }),
};

// El caso de la vista previa: un haber que paga Ganancias de verdad, derivado del umbral que
// calcula el propio motor del sitio. check_planilla_ganancias_jubilados.ts exige que el archivo
// dé estos mismos números.
function datosDelCaso() {
  // Cuántos haberes mínimos del año publicó ANSES. Se cuenta acá y no al cargar el módulo: el mes
  // cambia y la página se regenera, pero el módulo puede seguir vivo con el conteo de otro mes
  // (scripts/check_mes_en_render.ts lo frena).
  const MESES_PUBLICADOS = haberesMinimosProyectados().filter((m) => m.publicado).length;
  const ARCHIVO = datosOferta("planilla-ganancias-jubilados").archivo;
  const UMBRAL = calcularGananciasJubilados({ haberBruto: 1 }).umbralHaber;
  const CASO = casoDeLanding(UMBRAL);
  const EJEMPLO = previaJubilados(ARCHIVO, CASO)!;
  const PROMEDIO = calcularGananciasJubilados({ haberBruto: CASO.haberMensual }).retencionMensual;
  const MAS_BAJO = EJEMPLO.resultado.filas.reduce((a, b) => (b.retencionMes < a.retencionMes ? b : a));
  return { ARCHIVO, MESES_PUBLICADOS, UMBRAL, CASO, EJEMPLO, PROMEDIO, MAS_BAJO };
}

export default function PlanillaGananciasJubiladosPage() {
  const { MESES_PUBLICADOS, UMBRAL, CASO, EJEMPLO, PROMEDIO, MAS_BAJO } = datosDelCaso();
  const HABER = formatARS(CASO.haberMensual, 0);

  return (
    <PlanillaLanding
      producto={PRODUCTO}
      etiquetaConvenio={`Art. 30 LIG · Deducción específica`}
      h1={
        <>
          Controlá si te retienen bien
          <br />
          <span className="text-emerald-600">mes por mes, contra tu recibo</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para jubilados y pensionados a los que les retienen Ganancias. Cargás los doce haberes del año y lo que dice cada recibo, y te muestra cuánto correspondía en cada mes y cuánto de más o de menos te retuvieron."
      respuestaPrimero={
        <p>
          Es un archivo de <strong>Excel y Google Sheets</strong> que hace la cuenta que de verdad hace tu caja: el{" "}
          <strong>método acumulado</strong> de la RG 4003, mes por mes, con tus doce haberes reales. Trae la{" "}
          <strong>deducción de ocho haberes mínimos</strong> armada con la serie oficial de ANSES ({MESES_PUBLICADOS}{" "}
          meses publicados de {ANIO_JUBILADOS}), el aporte de obra social del 3% y 6% de la Ley 19.032, las cargas de
          familia y la escala del art. 94. Con un haber de {HABER} el impuesto del año es{" "}
          <strong>{formatARS(EJEMPLO.resultado.impuestoAnual, 0)}</strong>, pero no se reparte en doce partes iguales:
          en enero son {formatARS(EJEMPLO.primerMes, 0)}, en {EJEMPLO.mesMasAlto.nombre}{" "}
          <strong>{formatARS(EJEMPLO.mesMasAlto.monto, 0)}</strong> y en {MAS_BAJO.nombreMes}{" "}
          {formatARS(MAS_BAJO.retencionMes, 0)}. Cargás lo que te retuvieron y ves la diferencia. Pago único de{" "}
          <strong>${PRECIO}</strong>, con las actualizaciones del año y 7 días para pedir la devolución.
        </p>
      }
      previewTitulo={`Haber de ${HABER} por mes · sin cargas de familia · con la deducción específica`}
      previewSubtitulo="Cargás los doce haberes y el impuesto del año, la retención de cada mes y la diferencia se recalculan solos."
      textoPreview="Es la hoja «Mis datos» del archivo, con los números que da hoy para este caso. Los haberes mínimos salen de la serie oficial de ANSES y la escala del PDF de ARCA."
      textoComprobar={`Hacé la misma cuenta gratis en la calculadora de /ganancias-jubilados: si con ${HABER} de haber el impuesto del año no te da alrededor de ${formatARS(EJEMPLO.resultado.impuestoAnual, 0)}, no la compres.`}
      beneficioDatos="Los haberes mínimos de cada mes y la escala, ya cargados"
      hoja={EJEMPLO.hoja}
      calculadoraGratis={{ href: "/ganancias-jubilados", texto: "Probar la calculadora gratis de Ganancias para jubilados" }}
      hojas={[
        {
          titulo: "Mis datos",
          descripcion:
            "Tu régimen, el cónyuge y los hijos a cargo, y las dos preguntas que te pueden hacer perder la deducción de ocho haberes mínimos. Te dice qué deducción te rige y por qué, el impuesto del año, cuánto se lleva de tus haberes y el control contra tus recibos en tres renglones.",
        },
        {
          titulo: "Mi año",
          descripcion:
            "El método acumulado, mes por mes: el haber bruto de cada recibo, el aguinaldo, el bono (que no paga), el aporte de obra social sobre cada liquidación, la deducción acumulada, la ganancia del período, la proyección a todo el año, la retención que corresponde y la diferencia contra lo que te retuvieron.",
        },
        {
          titulo: "Haberes mínimos",
          descripcion: `El haber mínimo garantizado de cada mes de ${ANIO_JUBILADOS} según ANSES, por ocho y acumulado: es la unidad de la deducción específica. Cuando ANSES publique un mes nuevo lo cargás en la celda amarilla y toda la planilla se recalcula.`,
        },
        {
          titulo: "Escala y deducciones",
          descripcion:
            "La escala del art. 94 completa con sus nueve tramos, las deducciones del art. 30 (no imponible, cónyuge, hijo y la deducción especial del apartado 2) y las dos alícuotas de obra social del art. 8 de la Ley 19.032, con la que te toca resuelta.",
        },
        {
          titulo: "Instrucciones y Fuentes",
          descripcion:
            "Cómo usarla en seis pasos, las reglas que más confunden en lenguaje claro, y los links al texto actualizado de la Ley de Ganancias, a la RG 4003, a la Ley 19.032, a la escala de ARCA y a la serie de ANSES, con la fecha en que se verificaron.",
        },
      ]}
      fuente={{
        nombre: JUBILADOS_FUENTES.lista[0].nombre,
        url: JUBILADOS_FUENTES.lista[0].url,
        verificadoEl: JUBILADOS_FUENTES.consultadoEl,
      }}
      tituloActualizacion="Qué pasa cuando ANSES publica el haber mínimo del mes que viene"
      actualizacion={`La deducción específica sube todos los meses, porque es ocho veces la suma de los haberes mínimos y ANSES redetermina el haber mínimo por resolución mensual. Hoy la planilla trae ${MESES_PUBLICADOS} meses publicados de ${ANIO_JUBILADOS} y completa el resto con el último (${formatARS(prestacionesVigentes().haberMinimo, 2)}, ${prestacionesVigentes().resolucion}). Cuando sale el siguiente, o cuando ARCA actualiza la escala y las deducciones, regeneramos la planilla y te llega al mismo enlace, sin pagar de nuevo.`}
      faqs={[
        {
          q: "¿Por qué el promedio que me da la calculadora no coincide con mi recibo?",
          a: `Porque tu caja no estima el año: liquida con el método acumulado. Cada mes suma todo lo que cobraste hasta ahí, resta los aportes y la parte de las deducciones que ya corrió, lleva ese resultado a año completo, le aplica la escala y retiene la diferencia contra lo que ya te había retenido. Con un haber de ${HABER} el promedio da ${formatARS(PROMEDIO, 0)} por mes, pero la retención real arranca en ${formatARS(EJEMPLO.primerMes, 0)}, salta a ${formatARS(EJEMPLO.mesMasAlto.monto, 0)} en ${EJEMPLO.mesMasAlto.nombre} con el aguinaldo y baja a ${formatARS(MAS_BAJO.retencionMes, 0)} después. Esta planilla hace esa cuenta, no el promedio.`,
        },
        {
          q: "¿Qué tiene que no tenga la calculadora gratis?",
          a: "La calculadora resuelve un caso con un haber fijo y te dice si pagás y cuánto en el año. La planilla toma tus doce haberes reales (que cambian todos los meses con la movilidad y son distintos en cada caja), hace el método acumulado mes por mes, te deja cargar lo que dice cada recibo y te muestra la diferencia, y trae la serie de haberes mínimos para que puedas actualizarla vos. Y queda en tu máquina, para guardarla con los recibos del año.",
        },
        {
          q: "¿Desde cuánto se paga Ganancias siendo jubilado?",
          a: `Sin cargas de familia y con la deducción específica, desde un haber bruto de alrededor de ${formatARS(UMBRAL, 0)} por mes. El haber máximo del régimen general de ANSES es ${formatARS(prestacionesVigentes().haberMaximo, 2)}, así que quienes pagan suelen ser jubilados de regímenes especiales o de cajas provinciales, o personas que perdieron la deducción específica. Si no te retienen Ganancias, esta planilla no te sirve y te lo decimos antes de que la compres.`,
        },
        {
          q: "¿Cuándo pierdo la deducción de ocho haberes mínimos?",
          a: `En dos casos que marca la ley: si tenés otros ingresos gravados por más de la ganancia no imponible del año (${formatARS(DEDUCCIONES.mni, 0)}), por ejemplo un alquiler o honorarios, o si estás obligado a pagar Bienes Personales por algo más que tu vivienda única. Ahí volvés al no imponible más la deducción especial y la doceava parte, y el impuesto sube. La planilla tiene las dos preguntas y te muestra las dos cuentas.`,
        },
        {
          q: "¿Las cargas de familia se suman a los ocho haberes mínimos?",
          a: `Sí. La ley dice que la deducción específica reemplaza a los incisos a) y c) del art. 30, no al inciso b): el cónyuge a cargo resta ${formatARS(DEDUCCIONES.conyuge, 0)} por año y cada hijo ${formatARS(DEDUCCIONES.hijo, 0)}, además de la específica. Para que te las descuenten tenés que informarlas en el formulario 572 web (SiRADIG) y elegir a tu caja como agente de retención.`,
        },
        {
          q: "¿El aguinaldo y el bono pagan?",
          a: "El aguinaldo sí: es parte de la ganancia del año y también paga el aporte de obra social, porque el art. 8 de la Ley 19.032 dice «incluido el haber complementario». El bono extraordinario no: los decretos que lo fijan lo declaran no remunerativo y no sujeto a descuentos. En la planilla el bono tiene su propia columna, a la vista, y queda fuera de la cuenta.",
        },
        {
          q: "¿Y si la diferencia me da que me retuvieron de más?",
          a: "La planilla te lo dice y te deja el número. El reclamo se hace ante tu agente de retención, que es el que liquida, o se recupera en la declaración jurada del período. La planilla no hace el trámite: te da la cuenta, con la escala, las deducciones y los artículos citados, para que llegues con el número hecho.",
        },
        {
          q: "¿Por qué la diferencia de un mes no siempre es cero aunque todo esté bien?",
          a: "Porque la RG 4003 le manda al agente de retención sumar cada mes una doceava parte del aguinaldo, y esta planilla lo pone en junio y en diciembre, como se cobra. Eso puede correr pesos de un mes a otro sin que nadie se haya equivocado. En diciembre las dos formas llegan al mismo total del año, y es el total el renglón que hay que mirar.",
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: `Sí: la misma escala, las mismas deducciones, el mismo aporte de obra social y la misma serie de ANSES. Antes de publicar cada versión, una verificación automática abre el archivo, evalúa sus fórmulas y compara más de 12.000 valores en 88 casos (los dos regímenes, haberes planos y haberes que suben por movilidad, con y sin cargas, con y sin la deducción específica, y la ganancia clavada en el borde de cada tramo) exigiendo que dé lo mismo que el motor del sitio. Con un haber fijo el total del año puede diferir en unos pesos de la estimación de la calculadora, porque la planilla usa el haber mínimo de cada mes y liquida el aguinaldo como medio haber.`,
        },
        {
          q: "¿Es asesoramiento impositivo?",
          a: "No. Es una referencia de cálculo con los artículos citados y la fecha en que se verificaron, y no reemplaza a un contador. Tu agente de retención puede tener datos que vos no cargaste, y hay casos que la planilla no cubre: pluriempleo, un segundo agente de retención o ajustes retroactivos de haberes.",
        },
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Guardá ese mail: el enlace es permanente y siempre te baja la última versión, así que también es por ahí que te llegan las actualizaciones.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedir la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
      ]}
      relacionadas={[
        { href: "/ganancias-jubilados", texto: "Calculadora de Ganancias para jubilados" },
        { href: "/descuento-pami", texto: "Descuento de PAMI sobre el haber" },
        { href: "/jubilacion", texto: "Calculadora de jubilación" },
        { href: "/ganancias", texto: "Ganancias de 4.ª categoría" },
        { href: "/82-por-ciento-movil", texto: "El 82% móvil" },
      ]}
    />
  );
}
