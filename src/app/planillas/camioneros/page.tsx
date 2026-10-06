import type { Metadata } from "next";
import { PlanillaLanding } from "../_producto";
import { hojaCamioneros } from "@/components/camioneros/hoja";
import { VIATICOS_CAMIONEROS, ZONAS_CAMIONEROS } from "@/components/camioneros/viaticos";
import { datosOferta } from "@/lib/oferta";
import { AvisoCamioneros, PreviaCamioneros } from "@/components/camioneros/PreviaCamioneros";
import {
  CAMIONEROS_FUENTES,
  CAMIONEROS_HOMOLOGACION,
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
} from "@/data/convenios/camioneros";
import { formatARS } from "@/lib/formato";
import { PRODUCTOS } from "@/lib/mp";

const PRODUCTO = PRODUCTOS["planilla-camioneros"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");
const PRIMERO = MESES_CAMIONEROS[0];
const ULTIMO = MESES_CAMIONEROS.at(-1)!;
const RANGO = `${PRIMERO.etiqueta.toLowerCase()} a ${ULTIMO.etiqueta.toLowerCase()}`;
const VERIFICADO = CAMIONEROS_FUENTES.verificacion.consultadoEl.split("-").reverse().join("/");
const V = VIATICOS_CAMIONEROS;
const VIATICOS_MES = V.etiquetaMes.toLowerCase();
const ESCALA_HASTA_AGOSTO = ULTIMO.id === "agosto-2026";

export const metadata: Metadata = {
  title: "Planilla de sueldos Camioneros 2026 en Excel (CCT 40/89) con viáticos",
  description: `Planilla de Excel y Google Sheets para liquidar el CCT 40/89: básicos firmados de FADEEAC por categoría, antigüedad, kilómetros, comida, pernoctada, nómina de la flota, recibo y aguinaldo. Da los mismos números que la calculadora gratis. $${PRECIO} pago único.`,
  alternates: { canonical: "/planillas/camioneros" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Planilla de sueldos Camioneros 2026")}&s=${encodeURIComponent("CCT 40/89 · básicos, kilómetros y viáticos")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Caso de la vista previa: Chofer de Primera (la categoría más buscada) con 5 años de antigüedad en el
// último mes con planilla firmada. Sale del motor de /convenios/camioneros, igual que la oferta de la
// calculadora: la previa no puede mostrar un número que la planilla no dé
// (scripts/check_planilla_camioneros.ts lo verifica contra el archivo).
const ARCHIVO = datosOferta("planilla-camioneros").archivo;
const EJEMPLO = hojaCamioneros(ARCHIVO, {
  mesId: ULTIMO.id,
  categoriaId: "chofer-primera",
  anios: 5,
})!;

const proxima = ESCALA_HASTA_AGOSTO
  ? "La escala de septiembre de 2026 a febrero de 2027 ya está acordada y FADEEAC publicó la homologación, pero las planillas firmadas de cada mes todavía no salieron. Apenas se publiquen, cargamos los básicos (y los viáticos nuevos), regeneramos la planilla y te llega la versión nueva por mail, sin costo."
  : `La escala llega hasta ${ULTIMO.etiqueta.toLowerCase()}, la última planilla firmada publicada. Cuando FADEEAC publique la siguiente, la cargamos, regeneramos la planilla y te llega la versión nueva por mail, sin costo.`;

export default function PlanillaCamionerosPage() {
  return (
    <PlanillaLanding
      producto={PRODUCTO}
      personal={{
        previa: (ejemplo) => <PreviaCamioneros archivo={ARCHIVO}>{ejemplo}</PreviaCamioneros>,
        aviso: <AvisoCamioneros archivo={ARCHIVO} />,
      }}
      etiquetaConvenio="CCT 40/89 — Camioneros (FADEEAC)"
      h1={
        <>
          Liquidá Camioneros con la escala firmada
          <br />
          <span className="text-emerald-600">y los kilómetros, comidas y pernoctadas ya cargados</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para transportistas y estudios: elegís categoría, mes y antigüedad, sumás los viajes del mes y te da el bruto, los aportes, los viáticos aparte y lo que cobra el chofer. Con nómina de la flota, recibo para imprimir y aguinaldo."
      respuestaPrimero={
        <p>
          La planilla de sueldos de Camioneros (CCT 40/89) es una hoja de <strong>Excel y Google Sheets</strong> con
          los básicos de las <strong>{CATEGORIAS_CAMIONEROS.length} categorías</strong> de {RANGO}, transcriptos de
          las planillas salariales firmadas que publica FADEEAC. Calcula la antigüedad (1% por año), las horas
          extra por kilómetro, la comida, el viático especial, la pernoctada y el viático por km con los
          coeficientes del sur, separando lo que lleva aportes de lo que no. Trae una <strong>nómina</strong> para
          toda la flota, un <strong>recibo</strong> para imprimir y el <strong>aguinaldo</strong>. Básicos verificados
          el {VERIFICADO}. Pago único de <strong>${PRECIO}</strong>, con las actualizaciones del año incluidas y
          devolución dentro de los 7 días.
        </p>
      }
      previewTitulo={`Chofer de Primera · 5 años · ${ULTIMO.etiqueta} · sin viajes`}
      previewSubtitulo="Cargás los kilómetros, comidas y pernoctadas y se recalcula todo, recibo incluido."
      hoja={EJEMPLO.hoja}
      textoPreview="No es una captura de pantalla: son los números que la planilla devuelve hoy con la escala firmada vigente, calculados con la misma cuenta que la calculadora gratis. Cuando FADEEAC publica un mes nuevo, cambia esto y cambia el archivo."
      textoComprobar="Con los viajes en cero es la misma escala y la misma cuenta que la calculadora del sitio. Meté el mismo caso y compará: si alguna vez no coinciden, escribinos y lo corregimos."
      beneficioDatos="Básicos firmados y viáticos ya cargados"
      calculadoraGratis={{ href: "/convenios/camioneros", texto: "Probar la calculadora gratis de Camioneros" }}
      hojas={[
        {
          titulo: "Liquidador",
          descripcion: `Categoría, mes, antigüedad y zona; después los kilómetros, comidas, viáticos especiales y pernoctadas. Te da básico, horas extra por km, antigüedad, jubilación, PAMI, obra social, neto, viáticos aparte y total a cobrar.`,
        },
        {
          titulo: "Nómina",
          descripcion: "Hasta 30 trabajadores en una hoja, cada uno con su categoría, antigüedad, zona y viajes. Abajo, los totales del mes: masa remunerativa, aportes, viáticos y lo que sale de caja.",
        },
        {
          titulo: "Recibo",
          descripcion: "Haberes, no remunerativos y descuentos en columnas, listo para imprimir en A4 y firmar por duplicado. Los datos de la empresa y del chofer se escriben en tu computadora y no salen de ahí.",
        },
        {
          titulo: "SAC (Aguinaldo)",
          descripcion: "El medio aguinaldo con el mejor mes del semestre, proporcional si trabajó menos tiempo, con sus aportes. Los viáticos no remunerativos quedan afuera, como corresponde.",
        },
        {
          titulo: "Escala 2026",
          descripcion: `Los básicos de las ${CATEGORIAS_CAMIONEROS.length} categorías, mes por mes de ${RANGO}, con lo que cambió en cada tramo (incluida la revisión de julio, +4,22%).`,
        },
        {
          titulo: "Fuentes",
          descripcion: `El PDF firmado de cada mes, el acuerdo paritario, la ${CAMIONEROS_HOMOLOGACION}, la revisión de julio y la Ley 23.041, con la fecha en que se verificó cada uno.`,
        },
      ]}
      fuente={{
        nombre: CAMIONEROS_FUENTES.verificacion.nombre,
        url: CAMIONEROS_FUENTES.verificacion.url,
        verificadoEl: VERIFICADO,
      }}
      actualizacion={`En Camioneros la escala cambia casi todos los meses y la publica FADEEAC como un PDF escaneado. ${proxima}`}
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Es inmediato. Guardá ese mail: el enlace no vence y siempre te baja la última versión, así que también es por ahí que te llegan las actualizaciones.",
        },
        {
          q: "¿Qué tiene la planilla que no tenga la calculadora gratis?",
          a: "La calculadora da el básico, la antigüedad y el neto de un caso por vez. La planilla suma lo que se liquida de verdad en el transporte: kilómetros, comida, viático especial y pernoctada, con los coeficientes del sur; liquida a toda la flota en la hoja Nómina; arma el recibo y calcula el aguinaldo. Y queda en tu computadora.",
        },
        {
          q: "¿De dónde salen los valores de viáticos?",
          a: `De la hoja 2 de la planilla firmada de ${VIATICOS_MES}: comida ${formatARS(V.comida, 2)}, viático especial ${formatARS(V.viaticoEspecial, 2)}, pernoctada ${formatARS(V.pernoctada, 2)} y ${formatARS(V.porKm, 5)} por km (ítems 4.2.3 y 4.2.4). Están en celdas amarillas: si liquidás otro mes, los reemplazás por los de esa planilla y la hoja te avisa cuando el mes no coincide.`,
        },
        {
          q: "¿Los viáticos llevan aportes?",
          a: "Según el ítem 4.2.11 del CCT 40/89 y el art. 106 de la Ley de Contrato de Trabajo, la comida, el viático especial, la pernoctada y el viático por km no son remunerativos: no llevan aportes ni entran en el aguinaldo. Las horas extra por kilometraje (ítem 4.2.3) sí son remunerativas. La planilla los separa así.",
        },
        {
          q: "¿Cómo funciona la zona del sur?",
          a: `El básico es el mismo en todo el país. Quien reside al sur del Río Colorado cobra los viáticos y el ítem 4.2.3 con coeficiente ${ZONAS_CAMIONEROS[1].coeficiente.toLocaleString("es-AR")}, y al sur del Río Santa Cruz con ${ZONAS_CAMIONEROS[2].coeficiente.toLocaleString("es-AR")}. Elegís la zona de cada trabajador y la planilla lo aplica.`,
        },
        {
          q: "¿Viene con mis datos o la tengo que completar?",
          a: "Si hiciste la cuenta en la calculadora del sitio en los últimos 7 días, desde este mismo navegador, la planilla te llega con esa categoría, mes y antigüedad ya cargados en el Liquidador y en la primera fila de la Nómina. Si no, viene con un ejemplo y la completás en un minuto: son desplegables.",
        },
        {
          q: "¿Por qué no está septiembre de 2026?",
          a: "Porque cargamos cada mes de la planilla firmada que publica FADEEAC, no de un porcentaje que circula en los medios. Así evitamos el error de julio, cuando la revisión del acuerdo subió el básico 4,22% y no el 1,5% que se anunciaba. Cuando sale la planilla del mes, la cargamos y te llega actualizada.",
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: `Sí. La planilla se genera desde los mismos datos que la calculadora de calcular.ar/convenios/camioneros, y antes de publicar una verificación automática la abre y compara las dos en las ${CATEGORIAS_CAMIONEROS.length} categorías, los ${MESES_CAMIONEROS.length} meses y distintas antigüedades. Si alguna vez no coinciden, escribinos: es un error nuestro.`,
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedirnos la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
        {
          q: "¿Reemplaza al contador o al sistema de sueldos?",
          a: "No. Es una herramienta de cálculo y de control con las fuentes a la vista. No calcula contribuciones patronales, ART, cuota sindical, aportes solidarios del convenio ni Ganancias: eso sigue siendo trabajo del contador o del estudio.",
        },
      ]}
      relacionadas={[
        { href: "/convenios/camioneros", texto: "Calculadora de sueldo Camioneros" },
        { href: "/sueldo-neto/camioneros", texto: "Sueldo neto de camioneros" },
        { href: "/aguinaldo", texto: "Calculadora de aguinaldo" },
        { href: "/horas-extras", texto: "Calculadora de horas extras" },
      ]}
    />
  );
}
