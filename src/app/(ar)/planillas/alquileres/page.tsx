import type { Metadata } from "next";
import { PlanillaLanding, type FilaPreview } from "../_producto";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "@/data/inflacion";
import { IPC_DESCARGADO_EL } from "@/data/ipc-serie";
import { ajustesAlquiler, MESES_LARGOS, nombrePeriodo, sumarMeses, ULTIMO_PERIODO } from "@/lib/inflacion";
import { PLANILLA_ALQ } from "@/lib/prefill/alquileres";
import { PRODUCTOS } from "@/lib/mp";
import { openGraphDe } from "@/lib/seo";

const PRODUCTO = PRODUCTOS["planilla-alquileres"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");

export const metadata: Metadata = {
  title: "Planilla de alquileres 2026 en Excel: ajuste por IPC",
  description: `Excel y Google Sheets para propietarios: hasta ${PLANILLA_ALQ.contratos} contratos con el IPC del INDEC cargado, cuándo y cuánto aumentar, recibo y aviso al inquilino.`,
  alternates: { canonical: "/planillas/alquileres" },
  openGraph: openGraphDe({
    ruta: "/planillas/alquileres",
    titulo: "Planilla de alquileres 2026",
    bajada: "Ajuste por IPC, recibo y aviso de aumento",
  }),
};

const fechaLarga = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES_LARGOS[m - 1]} de ${a}`;
};

// Caso de la vista previa: el mismo ejemplo que trae la hoja «Contrato 1» del archivo (inicio
// once meses antes del último IPC, ajuste trimestral). Se calcula EN EL SERVER con
// ajustesAlquiler, el motor de la calculadora gratis: la previa no puede mostrar un número que
// la planilla no dé, y scripts/check_planilla_alquileres.ts verifica que el archivo da esto.
const INICIO = sumarMeses(ULTIMO_PERIODO, -11);
const INICIAL = 500000;
const CADA = 3;
const DEMO = ajustesAlquiler({ alquilerInicial: INICIAL, periodoInicio: INICIO, cadaMeses: CADA })!;
const ULTIMO_AJUSTE = DEMO.ajustes.at(-1);
const MES_RECIBO = sumarMeses(ULTIMO_PERIODO, 1);

const preview: FilaPreview[] = [
  { etiqueta: "Propiedad", valor: "Av. Corrientes 1234, 3° B", tono: "input" },
  { etiqueta: "Inquilina", valor: "Laura Gómez", tono: "input" },
  { etiqueta: "Inicio del contrato", valor: nombrePeriodo(INICIO), tono: "input" },
  { etiqueta: "Alquiler inicial", valor: INICIAL, tono: "input" },
  { etiqueta: "Índice y periodicidad", valor: `IPC del INDEC, cada ${CADA} meses`, tono: "input" },
  {
    etiqueta: "Alquiler que se cobra hoy",
    valor: DEMO.alquilerVigente,
    tono: "total",
    nota: `desde ${nombrePeriodo(DEMO.vigenteDesde)}`,
  },
  ...(ULTIMO_AJUSTE
    ? [
        {
          etiqueta: "Último ajuste",
          valor: `+${ULTIMO_AJUSTE.variacionPct.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`,
          nota: `${DEMO.ajustes.length}° del contrato`,
        },
      ]
    : []),
  ...(DEMO.proximo
    ? [
        { etiqueta: "Próximo ajuste", valor: nombrePeriodo(DEMO.proximo.periodoEfecto) },
        ...(DEMO.proximo.estimado
          ? [{ etiqueta: "Próximo alquiler estimado", valor: DEMO.proximo.estimado.alquilerNuevo, nota: "si la inflación sigue como el último mes" }]
          : []),
      ]
    : []),
  { etiqueta: "Aviso para la inquilina", valor: "Listo para copiar", nota: "con la cuenta y la fuente" },
  { etiqueta: `Recibo de ${nombrePeriodo(MES_RECIBO)}`, valor: "Listo para imprimir", nota: "original y duplicado" },
];

export default function PlanillaAlquileresPage() {
  return (
    <PlanillaLanding
      producto={PRODUCTO}
      etiquetaConvenio="Alquileres · ajuste por IPC del INDEC"
      h1={
        <>
          Sabé cuándo y cuánto aumentar cada alquiler
          <br />
          <span className="text-emerald-600">con el IPC oficial ya cargado</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para el que alquila una o varias propiedades. Cargás cada contrato una vez y te dice cuánto cobrar este mes y cuándo toca el próximo aumento. Además, te arma el recibo y el mensaje para tu inquilino con la cuenta."
      respuestaPrimero={
        <p>
          La planilla de alquileres es un archivo de <strong>Excel y Google Sheets</strong> para
          propietarios. Cargás hasta <strong>{PLANILLA_ALQ.contratos} contratos</strong> (inicio,
          monto, índice y cada cuántos meses ajusta) y te calcula el{" "}
          <strong>alquiler de hoy, el cronograma completo de aumentos y el próximo ajuste</strong>{" "}
          con el IPC oficial del INDEC ya cargado, hasta {nombrePeriodo(ULTIMO_PERIODO)}. También
          arma el <strong>recibo del mes</strong> y el <strong>aviso de aumento</strong> para tu
          inquilino, con la cuenta y la fuente. Da los mismos números que la calculadora gratis de
          calcular.ar. Pago único de <strong>${PRECIO}</strong>, con el IPC actualizado todos los
          meses y 7 días para pedir la devolución.
        </p>
      }
      previewTitulo={`Contrato 1 · desde ${nombrePeriodo(INICIO)} · ajuste trimestral por IPC`}
      previewSubtitulo="Cambiás el monto, el inicio o la periodicidad y el cronograma, el recibo y el aviso se recalculan solos."
      previewHoja="Contrato 1"
      preview={preview}
      textoPreview="No es una captura de pantalla: son los números que la planilla devuelve hoy con el IPC oficial del INDEC. Cuando sale un mes nuevo, cambia esto y cambia el archivo."
      textoComprobar="Es el mismo IPC y la misma cuenta. Cargá tu contrato en la calculadora del sitio y compará: si alguna vez no coinciden, escribinos y lo corregimos."
      beneficioDatos="El IPC oficial ya cargado, no lo buscás más"
      calculadoraGratis={{ href: "/inflacion/alquiler", texto: "Probar la calculadora gratis de ajuste de alquiler" }}
      hojas={[
        {
          titulo: "Mis contratos",
          descripcion: `Todos tus contratos en una pantalla: qué cobrás hoy en cada uno, cuándo toca el próximo aumento, el monto estimado y qué tenés que hacer. Hasta ${PLANILLA_ALQ.contratos} propiedades.`,
        },
        {
          titulo: `Contrato 1 a ${PLANILLA_ALQ.contratos}`,
          descripcion:
            "Una hoja por contrato con el cronograma completo de ajustes: qué meses del IPC toma cada uno, la variación y el alquiler nuevo. Avisa cuando falta un dato y cuándo termina el contrato.",
        },
        {
          titulo: "Aviso de aumento",
          descripcion:
            "El mensaje para tu inquilino, listo para copiar: el monto anterior y el nuevo, el porcentaje, la cuenta con los índices del INDEC y una versión corta para WhatsApp.",
        },
        {
          titulo: "Recibo",
          descripcion:
            "Elegís el contrato y el mes, y el importe sale solo. Suma expensas u otros conceptos y se imprime en una hoja con original y duplicado.",
        },
        {
          titulo: "IPC y Fuentes",
          descripcion:
            "La serie oficial del IPC del INDEC desde 2017, con el link a la fuente y la fecha de descarga. Si sale un mes nuevo antes de que bajes la versión al día, lo cargás vos en una celda.",
        },
        {
          titulo: "Cómo usarla",
          descripcion:
            "Los pasos para arrancar en cinco minutos y lo que conviene saber: por qué los porcentajes se componen, qué cambió con el DNU 70/2023 y qué hacer si tu contrato usa el ICL.",
        },
      ]}
      fuente={{
        nombre: INFLACION_FUENTES.ipc.nombre,
        url: INFLACION_FUENTES.ipc.url,
        verificadoEl: fechaLarga(IPC_DESCARGADO_EL),
      }}
      tituloActualizacion="Qué pasa cuando sale un IPC nuevo"
      actualizacion={`El INDEC publica el IPC de cada mes ${IPC_DIA_PUBLICACION} del mes siguiente. Cada vez que sale, regeneramos la planilla con el dato nuevo y el mismo enlace de descarga te baja la versión al día, sin costo. Para pasar tus contratos copiás las celdas amarillas y las pegás en el mismo lugar. Si preferís no cambiar de archivo, cargás el porcentaje del mes en la hoja «IPC» y todo se recalcula.`}
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Es inmediato. Guardá ese mail: el enlace no vence y siempre te baja la última versión, con el IPC al día.",
        },
        {
          q: "Mi contrato ajusta por ICL o por Casa Propia. ¿Me sirve?",
          a: "Sí. En el contrato elegís «Otro índice» y cargás el porcentaje de cada ajuste cuando lo tengas: el cronograma, el tablero, el recibo y el aviso funcionan igual. El IPC del INDEC es el único índice que viene cargado y se actualiza solo.",
        },
        {
          q: "¿Cuántos contratos puedo llevar?",
          a: `Hasta ${PLANILLA_ALQ.contratos} en el mismo archivo, cada uno en su hoja y todos juntos en «Mis contratos». Si tenés más propiedades, hacés una copia del archivo y seguís.`,
        },
        {
          q: "Mi inmobiliaria toma el IPC con un mes de atraso. ¿La planilla contempla eso?",
          a: `Sí. Como el INDEC publica cada dato ${IPC_DIA_PUBLICACION} del mes siguiente, algunos contratos usan los meses completos antes del ajuste y otros los últimos publicados, que corren un mes atrás. En cada contrato elegís cuál de las dos usa el tuyo.`,
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: "Sí. La planilla se genera desde la misma serie oficial del IPC que usa la calculadora de calcular.ar/inflacion/alquiler, y antes de publicar cada versión una verificación automática compara las dos en cientos de contratos distintos. Si alguna vez no coinciden, escribinos: es un error nuestro.",
        },
        {
          q: "¿Qué pasa si el IPC que necesito todavía no salió?",
          a: "La planilla te dice qué mes falta y cuándo se publica, y te muestra una estimación del próximo alquiler marcada como estimación. Cuando sale el dato, bajás la versión nueva o lo cargás vos, y queda el número final.",
        },
        {
          q: "¿Es legal ajustar el alquiler por IPC?",
          a: "Sí. Desde el DNU 70/2023 el artículo 1199 del Código Civil y Comercial permite pactar el ajuste con cualquier índice, público o privado, y la periodicidad también es libre. Lo que manda es lo que dice tu contrato.",
        },
        {
          q: "¿Funciona en el celular?",
          a: "Sí, abriéndola con Google Sheets o con Excel en el celular. Para cargar varios contratos o imprimir el recibo es más cómodo hacerlo desde la computadora.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedirnos la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
        {
          q: "¿Reemplaza a una inmobiliaria o a un abogado?",
          a: "No. Es una herramienta para llevar tus contratos y hacer bien la cuenta del ajuste. Si hay un conflicto con el inquilino o dudas sobre lo que dice el contrato, consultá con un profesional.",
        },
      ]}
      relacionadas={[
        { href: "/inflacion/alquiler", texto: "Calculadora de ajuste de alquiler" },
        { href: "/inflacion", texto: "Calculadora de inflación" },
        { href: "/deduccion-alquiler", texto: "Deducción de alquiler en Ganancias" },
        { href: "/plazo-fijo", texto: "Calculadora de plazo fijo" },
      ]}
    />
  );
}
