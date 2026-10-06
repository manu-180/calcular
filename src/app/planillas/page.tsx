import type { Metadata } from "next";
import { PlanillaLanding } from "./_producto";
import { CATEGORIAS_COMERCIO, COMERCIO_FUENTES, MESES_COMERCIO } from "@/data/convenios/comercio";
import { hojaComercio } from "@/components/oferta/hojas";
import { datosOferta } from "@/lib/oferta";
import { PRODUCTOS } from "@/lib/mp";

// URL histórica del producto de Comercio. NO se convierte en hub ni se redirige: está en el
// sitemap, tiene tráfico orgánico y es la landing de la campaña de Google Ads (la conversión
// de compra apunta a este embudo). La planilla de UOCRA vive en /planillas/uocra.
export const metadata: Metadata = {
  title: "Planilla de sueldos de Empleados de Comercio 2026 (Excel)",
  description:
    "Planilla de liquidación de sueldos en Excel y Google Sheets para el CCT 130/75: escala oficial de FAECYS embebida, antigüedad, presentismo y jornada parcial. Da los mismos números que la calculadora gratis. $14.900 pago único, actualizaciones del año incluidas.",
  alternates: { canonical: "/planillas" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Planilla de sueldos Comercio 2026")}&s=${encodeURIComponent("CCT 130/75 · los mismos números que la calculadora")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Caso de la vista previa: Vendedor B (la categoría más frecuente), 5 años, jornada completa,
// con presentismo, en el último mes publicado. Sale del mismo armado que la oferta de la
// calculadora (motor de /convenios/comercio): la previa no puede mostrar un número que la planilla
// no dé. Quien viene de la calculadora ve su propio caso en lugar de éste.
const MES = MESES_COMERCIO.at(-1)!;
const CATEGORIA = CATEGORIAS_COMERCIO.find((c) => c.id === "vendedor-b")!;
const EJEMPLO = hojaComercio(datosOferta("planilla-comercio").archivo, {
  mesId: MES.id,
  categoriaId: CATEGORIA.id,
  anios: 5,
  jornadaId: "8",
  presentismo: true,
})!;

export default function PlanillasPage() {
  return (
    <PlanillaLanding
      producto={PRODUCTOS["planilla-comercio"]}
      etiquetaConvenio="CCT 130/75 — Empleados de Comercio"
      h1={
        <>
          Liquidá sueldos de Comercio sin volver a buscar la circular
          <br />
          <span className="text-emerald-600">y sin quedarte con la escala vieja</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets con la escala oficial de FAECYS ya cargada: elegís categoría, mes, antigüedad y jornada, y te da el bruto desglosado y el neto. Cuando sale una paritaria nueva, la actualizamos y te llega sin costo."
      respuestaPrimero={
        <p>
          La planilla de sueldos de Empleados de Comercio (CCT 130/75) es una hoja de{" "}
          <strong>Excel y Google Sheets</strong> con la escala oficial de FAECYS embebida: elegís
          categoría, mes, antigüedad y jornada, y te da el <strong>bruto desglosado y el neto</strong>.
          A diferencia de las planillas gratis de internet, refleja la circular oficial vigente
          (verificada el {COMERCIO_FUENTES.consultadoEl}) y se{" "}
          <strong>actualiza sin costo con cada paritaria</strong>. Pago único de{" "}
          <strong>$14.900</strong>, con todas las actualizaciones del 2026 incluidas y devolución
          dentro de los 7 días si no te sirve.
        </p>
      }
      previewTitulo={`${CATEGORIA.nombre} · ${MES.etiqueta} · 5 años de antigüedad`}
      previewSubtitulo="Cambiás cualquiera de los datos amarillos y todo lo demás se recalcula solo."
      hoja={EJEMPLO.hoja}
      calculadoraGratis={{
        href: "/convenios/comercio",
        texto: "Probar la calculadora gratis de Comercio",
      }}
      hojas={[
        {
          titulo: "Liquidación",
          descripcion:
            "El liquidador: elegís categoría, mes, antigüedad y jornada, y te desglosa básico, sumas no remunerativas, antigüedad, presentismo, aportes y neto.",
        },
        {
          titulo: `Escala ${MESES_COMERCIO.length} meses`,
          descripcion: `Las ${CATEGORIAS_COMERCIO.length} categorías del CCT 130/75 con el básico de cada mes publicado, las sumas no remunerativas y la asignación extraordinaria. Es la tabla que el liquidador consulta.`,
        },
        {
          titulo: "SAC (aguinaldo)",
          descripcion:
            "Aguinaldo bruto y neto proporcional a los días trabajados del semestre. Sirve para quien ingresó o egresó en el medio.",
        },
        {
          titulo: "Changelog",
          descripcion:
            "Qué cambió en cada actualización, cuándo y con qué circular oficial. Podés auditar la planilla vos mismo.",
        },
      ]}
      fuente={{
        nombre: COMERCIO_FUENTES.escalas.nombre,
        url: COMERCIO_FUENTES.escalas.url,
        verificadoEl: COMERCIO_FUENTES.consultadoEl,
      }}
      actualizacion="FAECYS publica una circular nueva cada dos o tres meses. Cada vez que sale, cargamos la escala, regeneramos la planilla y te avisamos por mail. Todas las actualizaciones de 2026 están incluidas en lo que pagás hoy: no hay suscripción ni cobro adicional."
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Es inmediato: no hay que esperar a que nadie te la mande a mano. Guardá ese mail, porque el enlace es permanente y siempre te baja la última versión.",
        },
        {
          q: "¿Qué tiene la planilla que no tenga la calculadora gratis?",
          a: "La calculadora resuelve un caso por vez y no guarda nada. La planilla queda en tu computadora: la abrís cada mes, cambiás el mes o la categoría y tenés la liquidación desglosada, con la hoja de aguinaldo y sin depender de internet. Y cuando FAECYS publica una escala nueva, te llega actualizada sin pagar de nuevo.",
        },
        {
          q: "¿Viene con mis datos o la tengo que completar?",
          a: "Si hiciste tu cuenta en la calculadora del sitio en los últimos 7 días, desde este mismo navegador, la planilla te llega con esos datos ya cargados en las celdas amarillas. Si no, viene con un ejemplo y la completás en un minuto: son desplegables.",
        },
        {
          q: "¿Funciona en Google Sheets o necesito Excel?",
          a: "En los dos. Es un .xlsx común, sin macros: lo abrís en Excel, en Google Sheets (Archivo → Importar) o en LibreOffice, y las fórmulas y los desplegables andan igual. Una vez descargada funciona sin internet.",
        },
        {
          q: "¿Sirve para empleados a tiempo parcial?",
          a: "Sí. Tiene un selector de jornada: completa (8 hs), 6 hs (¾) o media jornada (4 hs). Los básicos, las sumas no remunerativas, la antigüedad y el presentismo se ajustan solos.",
        },
        {
          q: "¿Qué pasa si sale una paritaria nueva la semana que viene?",
          a: "La cargamos y te llega la versión actualizada sin costo, al mismo enlace. Es exactamente el motivo por el que la planilla se paga una vez y no todos los meses: el trabajo de seguir las circulares lo hacemos nosotros.",
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis del sitio?",
          a: "Sí, y es a propósito: la planilla se genera desde los mismos datos que alimentan la calculadora de calcular.ar/convenios/comercio, y tenemos una verificación automática que compara las dos en más de mil casos antes de cada publicación. Si alguna vez no coinciden, escribinos: es un error nuestro y lo corregimos.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: "Tenés 7 días para pedirnos la devolución. Respondés el mail de la entrega y te devolvemos los $14.900 por MercadoPago. No hace falta que expliques nada.",
        },
        {
          q: "¿Reemplaza a un contador?",
          a: "No. Es una herramienta de cálculo y de control: te dice qué debería dar la liquidación. Si liquidás para una empresa o necesitás recibos oficiales, el trabajo del contador matriculado sigue siendo necesario.",
        },
      ]}
      relacionadas={[
        { href: "/convenios/comercio", texto: "Calculadora de sueldo Comercio" },
        { href: "/aguinaldo", texto: "Calculadora de aguinaldo" },
        { href: "/indemnizacion", texto: "Calculadora de indemnización" },
        { href: "/vacaciones", texto: "Calculadora de vacaciones" },
      ]}
    />
  );
}
