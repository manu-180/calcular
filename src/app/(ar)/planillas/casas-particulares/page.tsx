import type { Metadata } from "next";
import { PlanillaLanding } from "../_producto";
import { hojaCasas } from "@/components/oferta/hojas";
import { datosOferta } from "@/lib/oferta";
import {
  CASAS_PARTICULARES_FUENTES,
  ESCALA_VIGENTE,
  VIGENCIA,
} from "@/data/casas-particulares";
import { PRODUCTOS } from "@/lib/mp";
import { openGraphDe } from "@/lib/seo";

const PRODUCTO = PRODUCTOS["planilla-casas-particulares"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");

export const metadata: Metadata = {
  title: "Planilla de sueldo de empleada doméstica 2026 (Excel)",
  description:
    "Excel y Google Sheets para liquidar casas particulares: escala de la CNTCP, horas extras, zona, aguinaldo, lo que se paga a ARCA y recibo. Pago único.",
  alternates: { canonical: "/planillas/casas-particulares" },
  openGraph: openGraphDe({
    ruta: "/planillas/casas-particulares",
    titulo: "Planilla de sueldo de Casas Particulares 2026",
    bajada: "Sueldo, aguinaldo, ARCA y recibo · Ley 26.844",
  }),
};

const fechaLarga = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  return `${d} de ${meses[m - 1]} de ${a}`;
};

// Caso de la vista previa: el más común en las consultas — tareas generales, con retiro, unas
// horas por semana. Sale del mismo armado que la oferta de /empleada-domestica (motores de esa
// calculadora y de /aportes-empleada-domestica): la previa no puede mostrar un número que la
// planilla no dé. Quien viene de la calculadora ve su propio caso en lugar de éste.
const CATEGORIA = ESCALA_VIGENTE.find((c) => c.id === "tareas-generales")!;
const HORAS = 20;
const EJEMPLO = hojaCasas(datosOferta("planilla-casas-particulares").archivo, {
  mesId: VIGENCIA.mesId,
  categoriaId: CATEGORIA.id,
  modalidad: "con-retiro",
  horasSemanales: HORAS,
  zonaDesfavorable: false,
  extrasComunes: 0,
  extrasFinDeSemana: 0,
})!;

export default function PlanillaCasasPage() {
  return (
    <PlanillaLanding
      producto={PRODUCTO}
      etiquetaConvenio="Ley 26.844 · Casas Particulares"
      h1={
        <>
          Sueldo, recibo y ARCA de quien trabaja en tu casa,{" "}
          <span className="text-emerald-600">en una sola planilla</span>
        </>
      }
      bajada="Cargás la categoría y las horas una vez. Cada mes te dice cuánto pagarle, cuánto va a ARCA y te arma el recibo para firmar, con la escala oficial ya cargada."
      respuestaPrimero={
        <p>
          La planilla de sueldo de casas particulares es una hoja de <strong>Excel y Google Sheets</strong> con la
          escala oficial de la <strong>Resolución CNTCP 6/2026</strong> ya cargada, mes por mes. Elegís la categoría,
          si es con o sin retiro y cuántas horas trabaja por semana. Te calcula el{" "}
          <strong>sueldo del mes con horas extras y zona desfavorable</strong>, el aguinaldo, las vacaciones y{" "}
          <strong>lo que tenés que pagarle a ARCA</strong>. Si trabaja menos de 16 horas, también te dice cuánto
          falta para que tenga obra social. Pago único de <strong>${PRECIO}</strong>, con las actualizaciones del
          año incluidas y 7 días para pedir la devolución si no te sirve.
        </p>
      }
      previewTitulo={`${CATEGORIA.nombre} · con retiro · ${HORAS} h por semana · ${VIGENCIA.vigenteEn}`}
      previewSubtitulo="Cambiás la categoría, las horas, el mes o sumás horas extras y todo se recalcula solo."
      hoja={EJEMPLO.hoja}
      calculadoraGratis={{ href: "/empleada-domestica", texto: "Probar la calculadora gratis de sueldo de empleada doméstica" }}
      hojas={[
        {
          titulo: "Liquidador",
          descripcion:
            "Categoría, modalidad, horas, zona y horas extras. Te da el valor de la hora, el básico (con la regla de los dos pisos: por hora o mínimo mensual), el total del mes, el aguinaldo que genera y lo que le pagás a ARCA.",
        },
        {
          titulo: "Pagos del año",
          descripcion:
            "Anotás lo que pagaste cada mes y te calcula el aguinaldo de junio y de diciembre con la regla de la ley (50% del mejor sueldo del semestre) y los días de vacaciones según la antigüedad.",
        },
        {
          titulo: "Recibo",
          descripcion:
            "Se completa solo con el mes liquidado. Cargás los nombres una vez, lo imprimís por duplicado y cada parte se queda con una copia firmada.",
        },
        {
          titulo: "Escala, aportes y fuentes",
          descripcion: `Las ${ESCALA_VIGENTE.length} categorías con y sin retiro, por hora y por mes, de agosto a ${VIGENCIA.ultimoMesPublicado}; la tabla de ARCA de aportes, contribuciones y ART; y el link a cada documento oficial.`,
        },
      ]}
      fuente={{
        nombre: CASAS_PARTICULARES_FUENTES.lista[0].nombre,
        url: CASAS_PARTICULARES_FUENTES.lista[0].url,
        verificadoEl: fechaLarga(CASAS_PARTICULARES_FUENTES.consultadoEl),
      }}
      tituloActualizacion="Qué pasa cuando cambia la escala"
      actualizacion={`La escala de casas particulares la fija la Comisión Nacional de Trabajo en Casas Particulares, y la vigente llega hasta ${VIGENCIA.ultimoMesPublicado}. Cuando sale la resolución siguiente (y cada mes, cuando ARCA publica la tabla de aportes), la cargamos, regeneramos la planilla y te llega la versión nueva por mail, sin costo.`}
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Es inmediato. Guardá ese mail: el enlace es permanente y siempre te baja la última versión, así que también es por ahí que te llegan las actualizaciones.",
        },
        {
          q: "¿Qué tiene la planilla que no tenga la calculadora gratis?",
          a: "La calculadora te dice el sueldo del mes. La planilla, además, te dice cuánto pagarle a ARCA y el costo total, te arma el recibo para imprimir y firmar, y lleva los pagos del año para calcular el aguinaldo de junio y diciembre y las vacaciones. Queda en tu computadora: el mes que viene cambiás el mes y listo.",
        },
        {
          q: "¿Viene con mis datos o la tengo que completar?",
          a: "Si hiciste la cuenta en la calculadora del sitio en los últimos 7 días, desde este mismo navegador, la planilla te llega con esos datos ya cargados: categoría, modalidad, horas, zona y horas extras. Si no, viene con un ejemplo y la completás en un minuto: son desplegables.",
        },
        {
          q: "¿Sirve si trabaja por horas y no todo el mes?",
          a: "Sí, es el caso más común. Con menos de 48 horas semanales se paga por hora, y la planilla pasa las horas semanales a horas del mes. Con jornada completa aplica el mínimo mensual de la categoría si es más alto. Esos son los dos pisos de la escala, y la planilla usa el que corresponde.",
        },
        {
          q: "¿Incluye lo que le tengo que pagar a ARCA?",
          a: "Sí. Según las horas semanales y la situación de la trabajadora, te dice el pago mensual a ARCA (obra social, jubilación y ART). Si trabaja menos de 16 horas, te dice cuánto falta para que tenga obra social y le cuente para la jubilación. Aunque esté registrada, sin esa diferencia se queda sin cobertura.",
        },
        {
          q: "¿Calcula el aguinaldo y las vacaciones?",
          a: "Sí. En la hoja «Pagos del año» anotás lo que pagaste cada mes y te calcula el aguinaldo de junio y de diciembre (50% del mejor sueldo del semestre, art. 26 de la Ley 26.844) y los días de vacaciones según la antigüedad.",
        },
        {
          q: "¿Sirve para calcular un despido o una renuncia?",
          a: "No. La liquidación final tiene reglas propias (preaviso, integración del mes, antigüedad, proporcionales) y cambió con la reforma de 2026. Para eso está la calculadora gratis de despido de empleada doméstica del sitio.",
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: "Sí. La planilla sale de los mismos datos que las calculadoras de calcular.ar. Antes de publicar cada versión, una verificación automática recalcula el archivo en más de 2.000 casos (todas las categorías, modalidades, horas y meses) y lo compara con la calculadora. Si alguna vez no coinciden, escribinos.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedir la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
        {
          q: "¿Reemplaza el registro en ARCA?",
          a: "No. El alta de la trabajadora y el pago mensual se siguen haciendo en ARCA. La planilla te dice cuánto pagar y te arma el recibo, para que no tengas que buscar la escala ni hacer la cuenta a mano.",
        },
      ]}
      relacionadas={[
        { href: "/empleada-domestica", texto: "Sueldo de empleada doméstica" },
        { href: "/aportes-empleada-domestica", texto: "Aportes a ARCA" },
        { href: "/despido-empleada-domestica", texto: "Despido de empleada doméstica" },
        { href: "/art-empleada-domestica", texto: "ART de casas particulares" },
        { href: "/deduccion-empleada-domestica", texto: "Deducción en Ganancias" },
      ]}
    />
  );
}
