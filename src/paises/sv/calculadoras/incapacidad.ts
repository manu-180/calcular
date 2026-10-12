import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { dinero } from "../lib/texto";

const DIAS_DEL_MES = 30;

// Con ISSS paga el Seguro desde el día que fija su tabla (cuarto por riesgo común, segundo por riesgo
// profesional). Sin ISSS rige el art. 307 del Código: el patrono paga 75 % por un máximo de días al año
// según la antigüedad. La AFP del trabajador se descuenta del subsidio (art. 16 de la ley de pensiones).
export default definirCalculadora({
  id: "sv.incapacidad",
  mercado: "sv",
  concepto: "propio",
  slug: "incapacidad",
  estado: "publicado",
  requiere: {
    "sv.isss-subsidio-porcentaje": "numero",
    "sv.isss-subsidio-dia-comun": "numero",
    "sv.isss-subsidio-dia-profesional": "numero",
    "sv.isss-salario-maximo": "numero",
    "sv.afp-trabajador": "numero",
    "sv.incapacidad-patrono-dias": "mapa",
    "sv.incapacidad-patrono-porcentaje": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "El promedio de lo que cotizó en los últimos meses.", min: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días de incapacidad", min: 1, max: 364, porDefecto: 7 },
    {
      id: "causa",
      tipo: "opcion",
      etiqueta: "Causa",
      opciones: [
        { valor: "comun", etiqueta: "Enfermedad o accidente común" },
        { valor: "profesional", etiqueta: "Accidente de trabajo o enfermedad profesional" },
      ],
      porDefecto: "comun",
    },
    { id: "cotizaIsss", tipo: "si-no", etiqueta: "Cotiza al ISSS", porDefecto: true },
    {
      id: "antiguedad",
      tipo: "opcion",
      etiqueta: "Tiempo con el patrono (solo si no cotiza al ISSS)",
      opciones: [
        { valor: "un-anio", etiqueta: "Un año o más" },
        { valor: "cinco-meses", etiqueta: "De cinco meses a menos de un año" },
        { valor: "un-mes", etiqueta: "De un mes a menos de cinco meses" },
        { valor: "menos-de-un-mes", etiqueta: "Menos de un mes" },
      ],
      porDefecto: "un-anio",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const observaciones: string[] = [];
    if (entrada.cotizaIsss) {
      const desde = entrada.causa === "comun" ? valores["sv.isss-subsidio-dia-comun"] : valores["sv.isss-subsidio-dia-profesional"];
      const diasPagados = Math.max(0, entrada.dias - (desde - 1));
      const diario = redondear(porcentaje(Math.min(entrada.salario, valores["sv.isss-salario-maximo"]) / DIAS_DEL_MES, valores["sv.isss-subsidio-porcentaje"]));
      const subsidio = redondear(diario * diasPagados);
      const afp = redondear(porcentaje(subsidio, valores["sv.afp-trabajador"]));
      if (diasPagados < entrada.dias) observaciones.push(`El ISSS paga desde el día ${desde} de la incapacidad.`);
      if (entrada.salario > valores["sv.isss-salario-maximo"]) observaciones.push(`El subsidio se calcula sobre ${dinero(valores["sv.isss-salario-maximo"])} como máximo, el techo de cotización.`);
      return { quienPaga: "El ISSS", diasPagados, diario, subsidio, afp, neto: redondear(subsidio - afp), observaciones };
    }
    const maximo = entrada.antiguedad === "menos-de-un-mes" ? 0 : enMapa(valores["sv.incapacidad-patrono-dias"], entrada.antiguedad);
    const diasPagados = Math.min(entrada.dias, maximo);
    const diario = redondear(porcentaje(entrada.salario / DIAS_DEL_MES, valores["sv.incapacidad-patrono-porcentaje"]));
    const subsidio = redondear(diario * diasPagados);
    if (maximo === 0) observaciones.push("Con menos de un mes de trabajo el Código no obliga al patrono a pagar la incapacidad.");
    else if (entrada.dias > maximo) observaciones.push(`Con su antigüedad el patrono paga como máximo ${maximo} días por año.`);
    return { quienPaga: "Su patrono", diasPagados, diario, subsidio, afp: 0, neto: subsidio, observaciones };
  },
  resultado: [
    { clave: "quienPaga", etiqueta: "Quién paga", formato: "texto" },
    { clave: "diasPagados", etiqueta: "Días pagados", formato: "dias" },
    { clave: "diario", etiqueta: "Pago por día", formato: "moneda" },
    { clave: "subsidio", etiqueta: "Subsidio de la incapacidad", formato: "moneda" },
    { clave: "afp", etiqueta: "Descuento de AFP", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Lo que recibe", formato: "moneda", destacada: true },
  ],
});
