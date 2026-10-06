import type { Metadata } from "next";
import { PlanillaLanding } from "../_producto";
import { PRODUCTOS } from "@/lib/mp";
import { datosOferta } from "@/lib/oferta";
import { ANIO_VACACIONES, VACACIONES_FUENTES } from "@/data/vacaciones";
import { hojaVacaciones } from "@/components/vacaciones/previa";
import { fechaConDia, inicioSugerido } from "@/components/vacaciones/cronograma";
import { hoyAR } from "@/lib/hoy";

const PRODUCTO = PRODUCTOS["planilla-vacaciones"];
const PRECIO = PRODUCTO.precio.toLocaleString("es-AR");

export const metadata: Metadata = {
  title: `Planilla de vacaciones ${ANIO_VACACIONES} en Excel: días, aviso, pago y nota para firmar`,
  description: `Planilla de Excel y Google Sheets para organizar las vacaciones de tu equipo: días por antigüedad, fecha de inicio válida, plazo del aviso de 30 días, pago a sueldo ÷ 25 y la notificación lista para imprimir. Con la Ley 27.802. $${PRECIO} pago único.`,
  alternates: { canonical: "/planillas/vacaciones" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Planilla de vacaciones ${ANIO_VACACIONES}`)}&s=${encodeURIComponent("Días, aviso, pago y nota para firmar · LCT y Ley 27.802")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Caso de la vista previa: una empleada con unos siete años de antigüedad y la primera fecha de
// inicio que todavía se puede avisar a tiempo desde el día del deploy (así el ejemplo nunca muestra
// un plazo vencido). Sale del motor de la calculadora (calcularVacaciones) y del cronograma, igual
// que la oferta de /vacaciones; check_planilla_vacaciones.ts exige que el archivo dé lo mismo.
const HOY = hoyAR();
const CASO = { ingresoISO: `${ANIO_VACACIONES - 7}-03-11`, sueldo: 1450000, diasTramo: 0, inicioISO: inicioSugerido(HOY) };
const EJEMPLO = hojaVacaciones(datosOferta("planilla-vacaciones").archivo, CASO, HOY)!;

export default function PlanillaVacacionesPage() {
  return (
    <PlanillaLanding
      producto={PRODUCTO}
      etiquetaConvenio="LCT arts. 150 a 157 · Ley 27.802"
      h1={
        <>
          Las vacaciones de tu equipo,{" "}
          <span className="text-emerald-600">con el aviso y la nota listos</span>
        </>
      }
      bajada="Cargás a cada persona una vez. La planilla te dice cuántos días le tocan, qué fecha de inicio vale, hasta cuándo tenés para avisarle, cuánto pagarle al empezar, y te arma la nota para firmar."
      respuestaPrimero={
        <p>
          La planilla de vacaciones {ANIO_VACACIONES} es un archivo de <strong>Excel y Google Sheets</strong> para quien
          tiene empleados: cargás la fecha de ingreso y el sueldo de cada persona (hasta 40) y te calcula los{" "}
          <strong>días que le corresponden</strong> por antigüedad al 31 de diciembre, el{" "}
          <strong>pago a sueldo ÷ 25</strong> con el plus vacacional y, con la fecha de inicio, el{" "}
          <strong>último día para entregar el aviso por escrito</strong> (30 días antes, art. 154 según la Ley 27.802).
          Te avisa si la fecha no cae en lunes o se pasa del 30 de abril, suma cuánto pagás en cada mes de la temporada
          y arma la <strong>notificación de vacaciones</strong> por duplicado, lista para firmar. Pago único de{" "}
          <strong>${PRECIO}</strong>, con las actualizaciones del año y devolución dentro de los 7 días.
        </p>
      }
      previewTitulo={`7 años de antigüedad · $1.450.000 · desde el ${fechaConDia(EJEMPLO.resumen.cronograma.inicio)}`}
      previewSubtitulo="Cambiás la fecha de inicio o sumás a otra persona y todo se recalcula solo."
      textoPreview="Es la hoja «Liquidación» del archivo, con los números que da hoy para este caso. Las fechas salen del calendario de feriados nacionales y la cuenta es la misma de la calculadora gratis."
      hoja={EJEMPLO.hoja}
      calculadoraGratis={{ href: "/vacaciones", texto: "Probar la calculadora gratis de vacaciones" }}
      hojas={[
        {
          titulo: "Equipo",
          descripcion:
            "Hasta 40 personas. Por cada una: días que le tocan (escala o proporcional), días del tramo y saldo si las parten, último día, regreso, hasta cuándo avisar, pago al inicio, plus vacacional y una columna «Estado» que te dice qué revisar.",
        },
        {
          titulo: "Notificación",
          descripcion:
            "Elegís el número de empleado y sale la nota con días, fechas y día de regreso, por duplicado en una hoja A4: una para la persona y otra firmada para el legajo.",
        },
        {
          titulo: "Temporada",
          descripcion:
            "Cuánta gente sale, cuántos días y cuánto pagás en cada mes de octubre a abril, para tener la plata lista. Y cuántas personas tienen algo para revisar.",
        },
        {
          titulo: "Liquidación y Egresos",
          descripcion:
            "El detalle del pago de una persona. Y si alguien se va, las vacaciones no gozadas con su aguinaldo, para la liquidación final.",
        },
        {
          titulo: "Feriados y fuentes",
          descripcion: `Los feriados nacionales de ${ANIO_VACACIONES} y ${ANIO_VACACIONES + 1} que usa la regla del lunes, y el link a la ley con la fecha en que se verificó.`,
        },
        {
          titulo: "Instrucciones",
          descripcion:
            "Cómo usarla en cinco pasos y lo que dice la ley en lenguaje claro: anticipación, fraccionamiento, verano cada tres años, enfermedad durante las vacaciones.",
        },
      ]}
      fuente={{
        nombre: VACACIONES_FUENTES.lct.nombre,
        url: VACACIONES_FUENTES.lct.url,
        verificadoEl: "6 de octubre de 2026",
      }}
      beneficioDatos="Ley 27.802 y feriados ya cargados"
      tituloActualizacion="Qué pasa si cambia la ley o el calendario"
      actualizacion={`Las reglas de vacaciones son de la Ley de Contrato de Trabajo y la última reforma (Ley 27.802) cambió el aviso, el fraccionamiento y el verano cada tres años. Si sale otra norma que las toque, o cambia el calendario de feriados de ${ANIO_VACACIONES + 1}, actualizamos la planilla y te llega la versión nueva por mail, sin costo.`}
      faqs={[
        {
          q: "¿Cómo la recibo?",
          a: "Apenas MercadoPago confirma el pago te llega un mail con el enlace de descarga. Guardá ese mail: el enlace es permanente y siempre te baja la última versión, así que también es por ahí que te llegan las actualizaciones.",
        },
        {
          q: "¿Qué tiene que no tenga la calculadora gratis?",
          a: "La calculadora resuelve a una persona. La planilla lleva a todo el equipo a la vez, controla que cada fecha de inicio sea válida, te dice hasta cuándo tenés para avisar, suma lo que pagás en cada mes de la temporada, calcula las no gozadas si alguien se va y arma la nota de vacaciones para firmar.",
        },
        {
          q: "¿Viene con mis datos?",
          a: "Si hiciste la cuenta en la calculadora de vacaciones del sitio en los últimos 7 días, desde este navegador, la planilla te llega con ese caso como empleado 1: fecha de ingreso, sueldo, días del tramo y fecha de inicio. El nombre no viaja: lo escribís vos en el archivo. Si no, viene con tres ejemplos que borrás.",
        },
        {
          q: "¿Con cuánta anticipación tengo que avisar?",
          a: "Con al menos 30 días, por escrito (art. 154 de la LCT, texto de la Ley 27.802; antes eran 45). Tu convenio colectivo puede fijar otro sistema: en ese caso cambiás los días de aviso en una celda y la planilla recalcula todos los plazos.",
        },
        {
          q: "¿Sirve si las vacaciones se parten en tramos?",
          a: "Sí. Cargás los días de este tramo y la planilla te muestra el saldo que queda. Si algún tramo tiene menos de 7 días te avisa, porque la ley no lo permite. El fraccionamiento tiene que ser de común acuerdo.",
        },
        {
          q: "¿Y si alguien entró este año?",
          a: "La planilla lo detecta sola: si al 31 de diciembre no llega a la mitad de los días hábiles del año, le corresponde 1 día de descanso cada 20 trabajados (art. 153) y lo marca como proporcional.",
        },
        {
          q: "¿Sirve para sueldos variables o por hora?",
          a: "La cuenta es la del sueldo mensual (÷ 25). Con comisiones o destajo, cargá el promedio del año o, si la persona lo elige, el de los últimos seis meses, como dice el art. 155. Para quien cobra por día u hora, cada día vale el jornal de la jornada anterior: la planilla te explica cómo cargarlo para que la cuenta dé eso.",
        },
        {
          q: "¿Los números son los mismos que los de la calculadora gratis?",
          a: "Sí. Antes de publicar cada versión, una verificación automática carga más de 2.000 casos en el archivo —antigüedades límite, ingresos durante el año, tramos, fechas con feriados— y exige que den exactamente lo mismo que la calculadora del sitio.",
        },
        {
          q: "¿Es asesoramiento legal?",
          a: "No. Es una referencia de cálculo con las normas citadas y la fecha en que se verificaron. Si tu convenio tiene reglas propias de vacaciones, o hay un caso particular, consultalo con quien te liquida los sueldos.",
        },
        {
          q: "¿Y si la compro y no me sirve?",
          a: `Tenés 7 días para pedir la devolución. Respondés el mail de la entrega y te devolvemos los $${PRECIO} por MercadoPago. No hace falta que expliques nada.`,
        },
      ]}
      relacionadas={[
        { href: "/vacaciones", texto: "Calculadora de vacaciones" },
        { href: "/aguinaldo", texto: "Aguinaldo" },
        { href: "/licencias-especiales", texto: "Licencias especiales" },
        { href: "/indemnizacion", texto: "Indemnización por despido" },
        { href: "/renuncia", texto: "Liquidación por renuncia" },
      ]}
    />
  );
}
