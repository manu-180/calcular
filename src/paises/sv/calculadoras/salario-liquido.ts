import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { retencionPorTabla } from "../lib/renta";
import { dinero } from "../lib/texto";

export default definirCalculadora({
  id: "sv.salario-liquido",
  mercado: "sv",
  concepto: "sueldo-neto",
  slug: "salario-liquido",
  estado: "publicado",
  requiere: {
    "sv.renta-mensual": "escala",
    "sv.renta-quincenal": "escala",
    "sv.afp-trabajador": "numero",
    "sv.isss-trabajador": "numero",
    "sv.isss-salario-maximo": "numero",
    "sv.deduccion-fija-renta": "numero",
    "sv.limite-deduccion-fija-renta": "numero",
    "sv.renta-exento-mensual": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Lo que gana en el mes antes de descuentos, sin aguinaldo ni bonos ocasionales.",
      min: 0,
    },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Cada cuánto le pagan",
      opciones: [
        { valor: "mensual", etiqueta: "Cada mes" },
        { valor: "quincenal", etiqueta: "Cada quincena" },
      ],
      porDefecto: "mensual",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const partes = entrada.periodo === "mensual" ? 1 : 2;
    const salario = entrada.salario / partes;
    const afp = redondear(porcentaje(salario, valores["sv.afp-trabajador"]));
    // El techo del ISSS es mensual: por quincena se cotiza sobre la mitad del techo.
    const techo = valores["sv.isss-salario-maximo"] / partes;
    const isss = redondear(porcentaje(Math.min(salario, techo), valores["sv.isss-trabajador"]));
    const gravado = redondear(Math.max(0, salario - afp - isss));
    const tabla = entrada.periodo === "mensual" ? valores["sv.renta-mensual"] : valores["sv.renta-quincenal"];
    const { retencion, tramo } = retencionPorTabla(tabla, gravado);
    const renta = redondear(retencion);
    const liquido = redondear(salario - afp - isss - renta);
    const observaciones: string[] = [];
    if (entrada.salario > valores["sv.isss-salario-maximo"]) {
      observaciones.push(`El ISSS se calcula hasta un salario de ${dinero(valores["sv.isss-salario-maximo"])} al mes, así que su descuento no sube más.`);
    }
    if (renta > 0 && tramo === 2 && entrada.salario * 12 <= valores["sv.limite-deduccion-fija-renta"]) {
      observaciones.push(
        `Si en el año no gana más de ${dinero(valores["sv.limite-deduccion-fija-renta"])}, tiene una deducción de ${dinero(valores["sv.deduccion-fija-renta"])} que baja su renta. Su patrono la ajusta en junio y en diciembre.`,
      );
    }
    return {
      salarioPeriodo: redondear(salario),
      afp,
      isss,
      renta,
      descuentos: redondear(afp + isss + renta),
      liquido,
      observaciones,
    };
  },
  resultado: [
    { clave: "salarioPeriodo", etiqueta: "Salario del período", formato: "moneda" },
    { clave: "afp", etiqueta: "Cotización AFP", formato: "moneda" },
    { clave: "isss", etiqueta: "Cotización ISSS", formato: "moneda" },
    { clave: "renta", etiqueta: "Retención de renta", formato: "moneda" },
    { clave: "descuentos", etiqueta: "Total de descuentos", formato: "moneda" },
    { clave: "liquido", etiqueta: "Salario líquido", formato: "moneda", destacada: true },
  ],
});
