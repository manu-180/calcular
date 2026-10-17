import type { Metadata } from "next";
import { PlanillaLanding } from "../_producto";
import { previaPlazoFijo } from "@/components/plazo-fijo/hojas";
import { GARANTIA_DEPOSITOS, INFLACION_DEFAULT, TNA_FALLBACK, UVA } from "@/data/plazofijo";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "@/data/inflacion";
import { IPC_DESCARGADO_EL } from "@/data/ipc-serie";
import { nombrePeriodo, ULTIMO_PERIODO } from "@/lib/inflacion";
import { fechaLarga, hoyAR } from "@/lib/hoy";
import { formatARS } from "@/lib/formato";
import { PLANILLA_PF } from "@/lib/prefill/plazo-fijo";
import { PRODUCTOS } from "@/lib/mp";
import { openGraphDe } from "@/lib/seo";
import { AvisoDatosPlazoFijo, PreviaPersonalPlazoFijo } from "@/components/plazo-fijo/PreviaPersonalPlazoFijo";

const PRODUCTO = PRODUCTOS["planilla-plazo-fijo"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");
const TNA = TNA_FALLBACK.valor.toLocaleString("es-AR");

export const metadata: Metadata = {
  title: "Planilla de plazos fijos 2026 en Excel vs. inflación",
  description:
    "Seguí tus plazos fijos de todos los bancos: vencimientos, interés, TEA y tasa real contra el IPC del INDEC. Simulá renovar y compará con un UVA.",
  alternates: { canonical: "/planillas/plazo-fijo" },
  openGraph: openGraphDe({
    ruta: "/planillas/plazo-fijo",
    titulo: "Planilla de plazos fijos 2026",
    bajada: "Vencimientos y tasa real contra el IPC del INDEC",
  }),
};

function datosDelMes() {
  // Caso de la vista previa: $1.000.000 a 30 días con la TNA promedio del BCRA, renovado un año, con
  // la última inflación oficial como estimación. Sale de previaPlazoFijo(), el mismo armado que la
  // oferta de /plazo-fijo (motor de la calculadora): scripts/check_planilla_plazo_fijo.ts comprueba
  // que el archivo da exactamente esto.
  const EJEMPLO = previaPlazoFijo(PRODUCTO.archivo!, {
    capital: 1_000_000,
    dias: 30,
    tnaPct: TNA_FALLBACK.valor,
    renovaciones: 0,
    inflacionMensualPct: INFLACION_DEFAULT.mensualPct,
    uvaTnaAdicionalPct: UVA.tnaAdicionalDefaultPct,
    fecha: hoyAR(),
  })!;
  return { EJEMPLO };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

export default function PlanillaPlazoFijoPage() {
  const { EJEMPLO } = datosDelMes();
  return (
    <PlanillaLanding
      personal={{
        previa: (ejemplo) => <PreviaPersonalPlazoFijo archivo={PRODUCTOS["planilla-plazo-fijo"].archivo!}>{ejemplo}</PreviaPersonalPlazoFijo>,
        aviso: <AvisoDatosPlazoFijo archivo={PRODUCTOS["planilla-plazo-fijo"].archivo!} />,
      }}
      producto={PRODUCTO}
      etiquetaConvenio="Plazo fijo · IPC del INDEC y tasas del BCRA"
      h1={
        <>
          ¿Tus plazos fijos le ganan a la inflación?{" "}
          <span className="text-emerald-600">Sabelo con el dato oficial</span>
        </>
      }
      bajada="La planilla de Excel y Google Sheets para el que tiene plata en plazos fijos, en uno o en varios bancos. Cargás cada uno una vez y te dice cuándo vence, cuánto cobrás y si le ganó al IPC del INDEC. Además, simula renovar un año, compararlo con un UVA y escalonar vencimientos."
      respuestaPrimero={
        <p>
          La planilla de plazos fijos es un archivo de <strong>Excel y Google Sheets</strong> para
          llevar hasta <strong>{PLANILLA_PF.registro.filas} plazos fijos</strong> de cualquier banco.
          Cargás la fecha, el capital, la TNA y los días, y te calcula el{" "}
          <strong>vencimiento, el interés, la TEA y la tasa real</strong> contra el IPC oficial del
          INDEC (cargado hasta {nombrePeriodo(ULTIMO_PERIODO)}). Trae un calendario de
          vencimientos, un simulador de renovación, la comparación con el plazo fijo UVA según la
          regla del BCRA, una escalera de plazos y el resumen del año. Da los mismos números que la
          calculadora gratis de calcular.ar. Pago único de <strong>${PRECIO}</strong>, con el IPC
          actualizado todos los meses y 7 días para pedir la devolución. Es una herramienta de
          cálculo, no asesoramiento financiero.
        </p>
      }
      previewTitulo={`${formatARS(1_000_000, 0)} a 30 días al ${TNA}% TNA, renovado ${EJEMPLO.renovaciones} veces`}
      previewSubtitulo="Cambiás el capital, la tasa, los días o la inflación estimada y todo se recalcula solo."
      hoja={EJEMPLO.renovacion}
      textoPreview={`No es una captura de pantalla: son los números que devuelve hoy la hoja «${PLANILLA_PF.hojas.renovacion}» con la TNA promedio del BCRA y la última inflación del INDEC. Cuando cambian, cambia esto y cambia el archivo.`}
      textoComprobar="Es la misma cuenta que la calculadora de plazo fijo del sitio. Cargá tu plazo fijo ahí y compará: si alguna vez no coinciden, escribinos y lo corregimos."
      beneficioDatos="El IPC del INDEC y la tasa del BCRA ya cargados"
      calculadoraGratis={{ href: "/plazo-fijo", texto: "Probar la calculadora gratis de plazo fijo" }}
      hojas={[
        {
          titulo: PLANILLA_PF.hojas.registro,
          descripcion: `Hasta ${PLANILLA_PF.registro.filas} plazos fijos de todos tus bancos. Cada fila te dice cuándo vence, cuánto cobrás, la TEA, la tasa real y si le ganó a la inflación. Arriba, cuánto tenés invertido y cuánto se acredita en los próximos 30 días.`,
        },
        {
          titulo: PLANILLA_PF.hojas.calendario,
          descripcion: "Tus plazos fijos vigentes ordenados por fecha de vencimiento, con lo que se acredita en cada uno y un resumen mes por mes de los próximos doce.",
        },
        {
          titulo: PLANILLA_PF.hojas.renovacion,
          descripcion: "Qué pasa si renovás capital + intereses: el detalle de cada renovación, con cuánto terminás y cuánto vale eso en plata de hoy.",
        },
        {
          titulo: PLANILLA_PF.hojas.uva,
          descripcion: `El tradicional renovado contra un UVA al mismo plazo (mínimo ${UVA.plazoMinimoDias} días, como fija el BCRA), y la inflación mensual que los empata.`,
        },
        {
          titulo: PLANILLA_PF.hojas.escalera,
          descripcion: "Partí el capital en varios plazos fijos que vencen uno detrás de otro, para tener plata disponible seguido sin cortar ninguno antes de tiempo.",
        },
        {
          titulo: `${PLANILLA_PF.hojas.resumen}, IPC y Fuentes`,
          descripcion: "Los intereses y la ganancia real del año, la inflación oficial del año, la serie completa del IPC del INDEC desde 2017 y de dónde sale cada dato.",
        },
      ]}
      fuente={{
        nombre: INFLACION_FUENTES.ipc.nombre,
        url: INFLACION_FUENTES.ipc.url,
        verificadoEl: fechaLarga(IPC_DESCARGADO_EL),
      }}
      tituloActualizacion="Qué pasa cuando sale un IPC nuevo"
      actualizacion={`El INDEC publica el IPC de cada mes ${IPC_DIA_PUBLICACION} del mes siguiente. Cada vez que sale, regeneramos la planilla con el dato nuevo y la TNA de referencia del BCRA al día, y el mismo enlace de descarga te baja la versión nueva sin costo. Los plazos fijos que estaban estimados pasan solos al dato oficial. Si preferís no cambiar de archivo, cargás el porcentaje del mes en la hoja «IPC».`}
      faqs={[
        {
          q: "¿Cómo sabe la planilla si mi plazo fijo le ganó a la inflación?",
          a: "Compara lo que cobrás al vencimiento con la inflación de esos mismos días. Si el INDEC ya publicó el IPC de todos los meses que duró el plazo fijo, usa el dato oficial, repartido día por día dentro de cada mes. Si falta algún mes, usa la inflación mensual que vos estimás (de entrada, el último dato oficial) y lo marca como «Estimada».",
        },
        {
          q: "¿Me dice en qué banco conviene poner la plata?",
          a: "No. Es una herramienta de cálculo y de control: hace las cuentas con la tasa que vos cargás y te muestra el resultado. No recomienda bancos ni productos, ni es asesoramiento financiero.",
        },
        {
          q: "¿Cuántos plazos fijos puedo cargar?",
          a: `Hasta ${PLANILLA_PF.registro.filas} en el mismo archivo, de los bancos que quieras. Los vencidos quedan en la lista y siguen contando en el resumen del año.`,
        },
        {
          q: "¿Qué tasa tengo que cargar?",
          a: `La TNA que te ofrece tu banco el día que armás el plazo fijo. Como referencia, el promedio que pagaban los bancos por depósitos a 30 días era ${TNA}% al ${fechaLarga(TNA_FALLBACK.fechaISO)}, según el BCRA.`,
        },
        {
          q: "¿Sirve para el plazo fijo UVA?",
          a: `Tiene una hoja que compara un UVA contra el tradicional renovado al mismo plazo, con la regla del BCRA (mínimo ${UVA.plazoMinimoDias} días) y la inflación que los empata. El registro está pensado para plazos fijos tradicionales, que son los que pagan una TNA fija.`,
        },
        {
          q: "¿Me avisa si me paso del tope de la garantía de los depósitos?",
          a: `Sí. La garantía cubre hasta ${formatARS(GARANTIA_DEPOSITOS.monto, 0)} por persona, capital e intereses incluidos, desde el ${GARANTIA_DEPOSITOS.vigenciaDesde} (Com. «A» 8407 del BCRA). En cada plazo fijo vigente la planilla suma lo que tenés en ese banco y te dice si pasás el tope.`,
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: "Sí. Interés, TEA, renovación y UVA salen de la misma cuenta que la calculadora de calcular.ar/plazo-fijo, y antes de publicar cada versión una verificación automática compara las dos en cientos de casos. Si alguna vez no coinciden, escribinos: es un error nuestro.",
        },
        {
          q: "¿Funciona en el celular?",
          a: "Sí, abriéndola con Google Sheets o con Excel en el celular. Para cargar varios plazos fijos es más cómodo hacerlo desde la computadora.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedirnos la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
      ]}
      relacionadas={[
        { href: "/plazo-fijo", texto: "Calculadora de plazo fijo" },
        { href: "/inflacion", texto: "Calculadora de inflación" },
        { href: "/inflacion/alquiler", texto: "Ajuste de alquiler por IPC" },
      ]}
    />
  );
}

