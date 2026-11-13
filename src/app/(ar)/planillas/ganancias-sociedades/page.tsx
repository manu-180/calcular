// Landing de la Planilla de Ganancias de sociedades 2026.
//
// QUIÉN LLEGA ACÁ: un contador o el administrador de una SA, SAS o SRL que está armando el balance
// impositivo. No necesita que le expliquen el impuesto: necesita no equivocarse. Las dos cosas que
// de verdad le cuestan plata son elegir la tabla por el año de cierre en vez del de inicio, y
// computar los quebrantos nominales cuando desde la Ley 27.802 se actualizan por IPC. La página
// responde en ese orden: qué me llevo (la previa con números reales), cuál es el error que evita
// (con el monto), qué trae cada hoja, de dónde salen los datos y qué no hace.

import type { Metadata } from "next";
import { PlanillaLanding } from "../_producto";
import { PRODUCTOS } from "@/lib/mp";
import { openGraphDe } from "@/lib/seo";
import { datosOferta } from "@/lib/oferta";
import {
  ALICUOTA_DIVIDENDOS,
  ANIOS_SOLO_ARCA,
  GANANCIAS_SOCIEDADES_FUENTES,
  ULTIMO_ANIO_ESCALA,
  escalasDisponibles,
} from "@/data/ganancias-sociedades";
import { ANIOS_DE_VIDA, PRIMER_INICIO_ACTUALIZABLE } from "@/data/quebrantos";
import { CASO_LANDING, previaSociedades } from "@/components/ganancias-sociedades/previa";
import { formatARS } from "@/lib/formato";

const PRODUCTO = PRODUCTOS["planilla-ganancias-sociedades"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");
const ANIO = ULTIMO_ANIO_ESCALA;
const ESCALAS = escalasDisponibles();
const PCT_DIVIDENDOS = `${Math.round(ALICUOTA_DIVIDENDOS * 100)}%`;
const ANIO_CORTE = PRIMER_INICIO_ACTUALIZABLE.slice(0, 4);

export const metadata: Metadata = {
  title: `Planilla de Ganancias de sociedades ${ANIO} en Excel`,
  description:
    "Excel para liquidar Ganancias de una SA, SAS o SRL: la escala del año de inicio del ejercicio, el 7% de los dividendos y los quebrantos actualizados por IPC. Pago único.",
  alternates: { canonical: "/planillas/ganancias-sociedades" },
  openGraph: openGraphDe({
    ruta: "/planillas/ganancias-sociedades",
    titulo: `Planilla de Ganancias de sociedades ${ANIO}`,
    bajada: "La tabla que de verdad te toca · dividendos y quebrantos",
  }),
};

// El caso de la vista previa: una sociedad que cierra el 30 de junio, así que su ejercicio empezó
// el año anterior y liquida con la tabla de ese año. Los números salen del mismo motor que la
// calculadora gratis; check_planilla_ganancias_sociedades.ts exige que el archivo dé lo mismo.
function datosDelCaso() {
  const ARCHIVO = datosOferta("planilla-ganancias-sociedades").archivo;
  // Cierre en junio de ANIO: el ejercicio se inició en ANIO - 1, que es el que elige la escala.
  const EJEMPLO = previaSociedades(ARCHIVO, CASO_LANDING(ANIO - 1))!;
  return { ARCHIVO, EJEMPLO };
}

export default function PlanillaGananciasSociedadesPage() {
  const { EJEMPLO } = datosDelCaso();
  const DIFERENCIA = EJEMPLO.diferencia ?? 0;

  return (
    <PlanillaLanding
      producto={PRODUCTO}
      etiquetaConvenio="Art. 73 LIG · Ley 27.630"
      h1={
        <>
          El impuesto de tu sociedad,
          <br />
          <span className="text-emerald-600">con la tabla que de verdad le toca</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para liquidar Ganancias de una SA, SAS o SRL. Cargás el cierre del ejercicio y la ganancia neta imponible: sale el tramo, el impuesto determinado, la alícuota efectiva, el 7% de los dividendos y los quebrantos de años anteriores ya actualizados por IPC."
      respuestaPrimero={
        <p>
          Es un archivo de <strong>Excel y Google Sheets</strong> con la{" "}
          <strong>escala del art. 73 de todos los años</strong>, desde la Ley 27.630 hasta la de los ejercicios
          iniciados en {ANIO}. Cargás el <strong>mes y el año de cierre</strong> del ejercicio y la planilla deduce
          el año de <strong>inicio</strong>, que es el que elige la tabla: una sociedad que cierra el 30 de junio de{" "}
          {ANIO} empezó en julio de {ANIO - 1} y liquida con la escala de {ANIO - 1}. Con{" "}
          {formatARS(EJEMPLO.resultado.impuesto > 0 ? 500_000_000 : 0, 0)} de ganancia, equivocarse de tabla son{" "}
          <strong>{formatARS(DIFERENCIA, 0)}</strong> declarados de menos. Trae además la retención del{" "}
          <strong>{PCT_DIVIDENDOS}</strong> sobre los dividendos y una hoja que actualiza hasta seis{" "}
          <strong>quebrantos</strong> por IPC con las dos condiciones del art. 25. Pago único de{" "}
          <strong>${PRECIO}</strong>, con las actualizaciones del año y 7 días para pedir la devolución.
        </p>
      }
      previewTitulo={`Cierre en junio de ${ANIO} · ${formatARS(500_000_000, 0)} de ganancia · liquida con la tabla de ${ANIO - 1}`}
      previewSubtitulo="Cambiás el mes de cierre y la tabla, el tramo y el impuesto se recalculan solos."
      textoPreview="Es la hoja «Mi sociedad» del archivo, con los números que da hoy para este caso. La escala sale de la serie oficial del IPC y coincide al centavo con la que publica ARCA."
      textoComprobar={`Hacé la misma cuenta gratis en la calculadora de /ganancias-sociedades: si el impuesto no te da ${formatARS(EJEMPLO.resultado.impuesto, 2)}, no la compres.`}
      beneficioDatos="La escala de cada año ya cargada, con su origen"
      hoja={EJEMPLO.hoja}
      calculadoraGratis={{ href: "/ganancias-sociedades", texto: "Probar la calculadora gratis de Ganancias de sociedades" }}
      hojas={[
        {
          titulo: "Mi sociedad",
          descripcion:
            "El liquidador. Cargás el cierre del ejercicio, la ganancia neta imponible, los quebrantos y qué parte se reparte: te da el año de inicio, la escala que aplica, el tramo, el impuesto determinado, la alícuota efectiva y la del último peso, la retención del " +
            PCT_DIVIDENDOS +
            " sobre dividendos y la carga total entre sociedad y socios. La última sección te muestra cuánto declararías de menos usando la tabla del año de cierre.",
        },
        {
          titulo: "Escalas",
          descripcion: `Las ${ESCALAS.length} escalas publicadas, una por año de inicio de ejercicio, con los dos límites, los importes fijos, el coeficiente de IPC con el que se derivó cada una y de dónde sale (la ley, la cuenta del IPC o el PDF de ARCA). No la buscás más.`,
        },
        {
          titulo: "Quebrantos",
          descripcion: `Hasta seis quebrantos de ejercicios anteriores. Por cada uno te dice en qué mes se inició ese ejercicio, si se actualiza por IPC o se computa nominal (el corte del art. 190 es el INICIO, no el cierre), cuántos ejercicios pasaron de los ${ANIOS_DE_VIDA} que le da el art. 25, el coeficiente y el monto computable. El total vuelve solo al liquidador.`,
        },
        {
          titulo: "IPC",
          descripcion:
            "La serie oficial del INDEC embebida, mes por mes, que es la que da el coeficiente de los quebrantos. Si el INDEC publica un mes que todavía no está, cargás su variación en la celda amarilla y todo se recalcula.",
        },
        {
          titulo: "Instrucciones y Fuentes",
          descripcion:
            "Cómo usarla en cinco pasos, lo que dice la ley en lenguaje claro, y los links a la Ley de Ganancias, la Ley 27.630, la Ley 27.802 y la escala de ARCA con la fecha en que se verificaron.",
        },
      ]}
      fuente={{
        nombre: GANANCIAS_SOCIEDADES_FUENTES.lista[0].nombre,
        url: GANANCIAS_SOCIEDADES_FUENTES.lista[0].url,
        verificadoEl: GANANCIAS_SOCIEDADES_FUENTES.consultadoEl,
      }}
      tituloActualizacion="Qué pasa cuando sale la escala del año que viene"
      actualizacion={`La escala se ajusta sola, sin decreto: cada año son los montos de la Ley 27.630 multiplicados por el IPC de octubre del año anterior sobre el de octubre de 2020. Cuando el INDEC publica el IPC de octubre de ${ANIO}, queda definida la escala de los ejercicios que se inician en ${ANIO + 1}: regeneramos la planilla y te llega al mismo enlace, sin pagar de nuevo. Lo mismo si cambia la ley.`}
      faqs={[
        {
          q: "¿Por qué manda el año de inicio del ejercicio y no el de cierre?",
          a: `Porque lo dice el art. 73: los montos ajustados «resultarán de aplicación para los ejercicios fiscales que se inicien con posterioridad a cada actualización». Una sociedad que cierra el 30 de junio de ${ANIO} inició su ejercicio en julio de ${ANIO - 1}, así que liquida con la escala de ${ANIO - 1}, que tiene tramos más chicos. Con ${formatARS(500_000_000, 0)} de ganancia la diferencia son ${formatARS(DIFERENCIA, 0)}. Es el error más caro de esta liquidación y es el que la planilla evita: vos cargás el cierre y ella elige la tabla.`,
        },
        {
          q: "¿Qué tiene que no tenga la calculadora gratis?",
          a: `La calculadora resuelve un caso: ganancia, año de inicio y dividendos. La planilla además deduce el año de inicio del mes de cierre, te muestra lado a lado el impuesto con la tabla correcta y con la equivocada, actualiza hasta seis quebrantos por IPC con las dos condiciones del art. 25, trae la serie del INDEC embebida y las ${ESCALAS.length} escalas con su origen. Y queda en tu máquina, para guardarla con el balance.`,
        },
        {
          q: "¿Las SRL y las SAS pagan la misma escala que las SA?",
          a: "Sí. El art. 73 alcanza a las sociedades anónimas (también las unipersonales), las SAS, las SRL y las sociedades en comandita, y también a asociaciones, fundaciones, cooperativas y mutuales sin otro tratamiento, a los fideicomisos del país y a algunos fondos comunes de inversión. Las rentas de casinos, máquinas de apuestas y juegos de azar por plataformas digitales no usan la escala: pagan el 41,5%.",
        },
        {
          q: "¿Cómo actualiza los quebrantos?",
          a: `Con la regla del undécimo párrafo del art. 25, en el texto que le dio el art. 190 de la Ley 27.802: el coeficiente es el IPC del mes de cierre del ejercicio que se liquida sobre el del mes de cierre del ejercicio en que se originó el quebranto. Pero sólo se actualizan los quebrantos de ejercicios que SE INICIARON desde el 1/1/${ANIO_CORTE}: un quebranto de un ejercicio que cerró en junio de ${ANIO_CORTE} empezó en ${Number(ANIO_CORTE) - 1} y se computa nominal. La hoja aplica esa condición sola y te dice en cada fila por qué. También te avisa cuando un quebranto está en su último ejercicio computable o ya venció.`,
        },
        {
          q: "¿Calcula los anticipos y la declaración jurada?",
          a: "No, y no lo promete. La planilla da el IMPUESTO DETERMINADO del art. 73. Lo que se ingresa con la declaración jurada es eso menos los anticipos, las retenciones y las percepciones del período, como aclara ARCA: esa resta la hacés con tus papeles. Preferimos no traer un número que no podemos verificar contra una fuente oficial.",
        },
        {
          q: "¿De dónde salen los montos de la escala?",
          a: `De la serie oficial del IPC del INDEC aplicada a la escala de la Ley 27.630, y están cotejados contra los PDF «Ganancias-Escala-PJ» que publica ARCA: dan los mismos montos, al centavo, de 2023 a ${ANIO}. Para ${ANIOS_SOLO_ARCA.join(" y ")} publicamos el número de ARCA tal cual, porque con la serie actual del INDEC la cuenta da unos $634 más en el primer tramo, y la hoja «Escalas» lo dice en la columna «Origen». Nada sale de un blog ni de un resumen de terceros.`,
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: "Sí. Antes de publicar cada versión, una verificación automática abre el archivo, evalúa sus fórmulas y carga más de 2.500 casos (la ganancia exacta en el límite de cada tramo y un peso más, cada año de escala, cierres en diciembre y en otros meses, quebrantos vencidos y no alcanzados) exigiendo que el impuesto dé exactamente lo mismo que la calculadora del sitio.",
        },
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Guardá ese mail: el enlace es permanente y siempre te baja la última versión, así que también es por ahí que te llegan las actualizaciones.",
        },
        {
          q: "¿Es asesoramiento impositivo?",
          a: "No. Es una referencia de cálculo con los artículos citados y la fecha en que se verificaron, y no reemplaza a un contador. La compensación de quebrantos de naturaleza específica (rentas financieras, enajenación de acciones y monedas digitales, derivados que no sean de cobertura, fuente extranjera) tiene reglas propias sobre contra qué se pueden usar: la planilla los actualiza, no decide la compensación.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedir la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
      ]}
      relacionadas={[
        { href: "/ganancias-sociedades", texto: "Calculadora de Ganancias de sociedades" },
        { href: "/actualizacion-de-quebrantos", texto: "Actualización de quebrantos por IPC" },
        { href: "/ganancias", texto: "Ganancias de 4.ª categoría" },
        { href: "/ganancias-autonomos", texto: "Ganancias para autónomos" },
        { href: "/rimi-inversiones", texto: "RIMI: incentivo a las inversiones" },
      ]}
    />
  );
}
