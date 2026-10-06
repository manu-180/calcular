import type { Metadata } from "next";
import { PlanillaLanding } from "../_producto";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "@/data/inflacion";
import { IPC_DESCARGADO_EL } from "@/data/ipc-serie";
import { TOPE_SIPA } from "@/data/sueldo";
import { MESES_LARGOS, nombrePeriodo, ULTIMO_PERIODO } from "@/lib/inflacion";
import { PLANILLA_MS } from "@/lib/prefill/mi-sueldo";
import { datosEjemplo, hojaMiSueldo, pct } from "@/components/mi-sueldo/modelo";
import { formatARS } from "@/lib/formato";
import { PRODUCTOS } from "@/lib/mp";

const PRODUCTO = PRODUCTOS["planilla-mi-sueldo"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");

export const metadata: Metadata = {
  title: "Planilla Mi Sueldo 2026: controlá tu recibo y tu sueldo contra la inflación",
  description: `Planilla de Excel y Google Sheets para empleados: controlá que cada recibo tenga bien descontados los aportes de ley, mirá cuánto poder de compra perdiste con el IPC oficial del INDEC y llevate una hoja lista para pedir aumento. $${PRECIO} pago único.`,
  alternates: { canonical: PRODUCTO.rutaLanding },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Planilla Mi Sueldo 2026")}&s=${encodeURIComponent("Tu recibo controlado y tu sueldo contra la inflación")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const fechaLarga = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES_LARGOS[m - 1]} de ${a}`;
};

// La previa es la hoja «Para pedir aumento» del archivo genérico, calculada en el server con los
// motores del sitio; scripts/check_planilla_mi_sueldo.ts verifica que el archivo da esto.
const EJEMPLO = datosEjemplo();
const { hoja, resumen } = hojaMiSueldo(PRODUCTO.archivo ?? PLANILLA_MS.archivo, EJEMPLO);
const INF = resumen.inflacion;

export default function PlanillaMiSueldoPage() {
  return (
    <PlanillaLanding
      producto={PRODUCTO}
      etiquetaConvenio="Para empleados de cualquier convenio"
      h1={
        <>
          Controlá tu recibo y sabé si tu sueldo
          <br />
          <span className="text-emerald-600">le gana a la inflación</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para el que cobra en relación de dependencia. Cargás tus recibos y te marca si los descuentos están bien. Te muestra cuánto vale tu sueldo con el IPC oficial y te arma una hoja con el aumento que necesitás para recuperarlo."
      respuestaPrimero={
        <p>
          La Planilla Mi Sueldo es un archivo de <strong>Excel y Google Sheets</strong> para empleados en relación
          de dependencia. Cargás hasta <strong>{PLANILLA_MS.meses} recibos</strong> y controla que la{" "}
          <strong>jubilación (11%), la Ley 19.032 (3%), la obra social (3%) y la cuota sindical</strong> estén bien
          descontadas, con el tope de aportes de {TOPE_SIPA.vigencia}. Compara tu sueldo con el{" "}
          <strong>IPC oficial del INDEC</strong> (hasta {nombrePeriodo(ULTIMO_PERIODO)}) y te dice cuánto poder de
          compra perdiste desde tu último aumento y <strong>qué aumento lo recupera</strong>, en una hoja lista para
          imprimir. También proyecta tu aguinaldo y te avisa si te acercás al piso de Ganancias. Pago único de{" "}
          <strong>${PRECIO}</strong>, con el IPC actualizado todos los meses y devolución dentro de los 7 días.
        </p>
      }
      previewTitulo={
        INF
          ? `${formatARS(EJEMPLO.bruto, 0)} brutos desde ${nombrePeriodo(INF.desde)}: ${pct(INF.poder, true)} de poder de compra`
          : `${formatARS(EJEMPLO.bruto, 0)} brutos`
      }
      previewSubtitulo="Cargás un recibo nuevo y el resumen, el control y el aguinaldo se recalculan solos."
      hoja={hoja}
      textoPreview="No es una captura de pantalla: es la hoja «Para pedir aumento» con los números que la planilla devuelve hoy, con el IPC oficial del INDEC. Cuando sale un mes nuevo, cambia esto y cambia el archivo."
      textoComprobar="Son los mismos aportes, el mismo tope y la misma serie del IPC que usa la calculadora de sueldo neto del sitio. Hacé la cuenta ahí y compará: si alguna vez no coinciden, escribinos y lo corregimos."
      beneficioDatos="El IPC del INDEC ya cargado, se actualiza solo"
      calculadoraGratis={{ href: "/sueldo-neto", texto: "Probar la calculadora gratis de sueldo neto" }}
      hojas={[
        {
          titulo: "Mis recibos",
          descripcion: `Un renglón por mes, hasta ${PLANILLA_MS.meses} meses. Cargás lo que dice tu recibo y al lado te dice «Cuadra» o qué línea revisar, con la diferencia en pesos. Contempla el tope de aportes y lo no remunerativo de tu convenio.`,
        },
        {
          titulo: "Para pedir aumento",
          descripcion:
            "Una hoja A4 con tu sueldo, la inflación desde tu último aumento, cuánto poder de compra perdiste y qué aumento lo recupera. Trae la frase lista para decirlo, con la fuente del INDEC.",
        },
        {
          titulo: "Sueldo vs inflación",
          descripcion:
            "Cada sueldo llevado a pesos de hoy, mes por mes. Ves de un vistazo si tu sueldo compra más o menos que antes, y la comparación de los últimos 12 meses.",
        },
        {
          titulo: "Aguinaldo",
          descripcion:
            "El aguinaldo de cada semestre con tu mejor sueldo, bruto y en mano, con la fecha en que te lo tienen que pagar.",
        },
        {
          titulo: "Aviso de Ganancias",
          descripcion:
            "Con tus cargas de familia, te dice dónde está el piso de Ganancias y cuánto te falta. Si un aumento te acerca, lo sabés antes de ver la retención en el recibo.",
        },
        {
          titulo: "IPC, valores de ley y fuentes",
          descripcion:
            "La serie oficial del IPC desde 2017, los aportes y el tope vigentes a la vista, y cada norma con su link y la fecha en que la verificamos.",
        },
      ]}
      fuente={{
        nombre: INFLACION_FUENTES.ipc.nombre,
        url: INFLACION_FUENTES.ipc.url,
        verificadoEl: fechaLarga(IPC_DESCARGADO_EL),
      }}
      tituloActualizacion="Qué pasa cuando sale un IPC nuevo"
      actualizacion={`El INDEC publica el IPC de cada mes ${IPC_DIA_PUBLICACION} del mes siguiente, y el tope de aportes cambia todos los meses. Cada vez que cambia uno de los dos, regeneramos la planilla y el mismo enlace de descarga te baja la versión al día, sin costo. Para pasar tus recibos copiás las celdas amarillas y las pegás en el mismo lugar. Si preferís no cambiar de archivo, cargás el porcentaje del mes en la hoja «IPC» y todo se recalcula.`}
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Es inmediato. Guardá ese mail: el enlace no vence y siempre te baja la última versión, con el IPC al día.",
        },
        {
          q: "¿Sirve para mi convenio?",
          a: "Sí. Los descuentos de ley (jubilación, Ley 19.032 y obra social) son los mismos para todos los empleados en relación de dependencia. La cuota sindical la cargás con el porcentaje de tu recibo, y si tu convenio descuenta obra social o cuota sindical sobre las sumas no remunerativas, lo indicás con un Sí.",
        },
        {
          q: "¿Qué hago si la planilla me marca «Revisar»?",
          a: "Mirá la columna verde de ese concepto: es lo que marca la ley para tu sueldo, y al lado tenés la diferencia. A veces hay una explicación (un concepto que no es remunerativo, el tope de aportes de ese mes). Si sigue sin cuadrar, consultalo con tu empleador o con Recursos Humanos con el recibo en la mano.",
        },
        {
          q: "¿Cómo calcula cuánto perdí con la inflación?",
          a: "Toma tu sueldo del mes de tu último aumento y lo actualiza con el IPC nivel general del INDEC hasta el último mes publicado. Si hoy cobrás menos que ese número, la diferencia es el poder de compra que perdiste, y el aumento que lo recupera es el que te devuelve a ese sueldo actualizado. Es la misma cuenta que la calculadora de inflación del sitio.",
        },
        {
          q: "¿Me sirve para pedir aumento?",
          a: "Te da el dato con fuente oficial: cuánto subieron los precios desde tu último aumento y qué sueldo los compensa. La hoja «Para pedir aumento» se imprime o se guarda en PDF. Lo que se negocia es tuyo: la planilla no dice cuánto te corresponde por convenio ni garantiza el resultado.",
        },
        {
          q: "¿Calcula Ganancias?",
          a: "No calcula la retención: depende de deducciones que la planilla no conoce y del método acumulado de tu empleador. Lo que hace es avisarte dónde está el piso a partir del cual empezarías a pagar, con tus cargas de familia y las deducciones oficiales de ARCA, para que un aumento no te sorprenda. Para estimar la retención tenés la calculadora de Ganancias del sitio.",
        },
        {
          q: "¿Mis datos viajan a algún lado?",
          a: "No. La planilla se usa en tu computadora o en tu Google Drive. Si la comprás desde la calculadora, viajan con el pago sólo el sueldo, la cuota sindical, el mes de tu último aumento y las cargas de familia, para que te llegue con eso cargado. Tu nombre y tu puesto los escribís vos en el archivo.",
        },
        {
          q: "¿Funciona en el celular?",
          a: "Sí, abriéndola con Google Sheets o con Excel en el celular. Para cargar varios recibos o imprimir el resumen es más cómodo hacerlo desde la computadora.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedirnos la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
      ]}
      relacionadas={[
        { href: "/sueldo-neto", texto: "Calculadora de sueldo neto" },
        { href: "/inflacion", texto: "Calculadora de inflación" },
        { href: "/aguinaldo/neto", texto: "Aguinaldo en mano" },
        { href: "/ganancias", texto: "Calculadora de Ganancias" },
      ]}
    />
  );
}
