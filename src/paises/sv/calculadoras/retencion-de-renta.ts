import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { retencionPorTabla } from "../lib/renta";

const PERIODOS_POR_ANIO = { mensual: 12, quincenal: 24 } as const;

function dinero(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default definirCalculadora({
  id: "sv.retencion-de-renta",
  mercado: "sv",
  concepto: "impuesto-renta",
  slug: "retencion-de-renta",
  estado: "publicado",
  requiere: {
    "sv.renta-mensual": "escala",
    "sv.renta-quincenal": "escala",
    "sv.afp-trabajador": "numero",
    "sv.deduccion-fija-renta": "numero",
    "sv.limite-deduccion-fija-renta": "numero",
    "sv.renta-exento-mensual": "numero",
    "sv.renta-exento-quincenal": "numero",
  },
  campos: [
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
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario del período",
      ayuda: "Lo que gana en el mes o en la quincena, antes de descuentos.",
      min: 0,
    },
    {
      id: "isss",
      tipo: "moneda",
      etiqueta: "Descuento del ISSS del período",
      ayuda: "Aparece en su boleta de pago. Si no cotiza al ISSS, ponga 0.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.isss > entrada.salario) throw new ErrorEntrada("El descuento del ISSS no puede ser mayor que el salario.", "isss");
    const afp = redondear(porcentaje(entrada.salario, valores["sv.afp-trabajador"]));
    const gravado = redondear(Math.max(0, entrada.salario - afp - entrada.isss));
    const tabla = entrada.periodo === "mensual" ? valores["sv.renta-mensual"] : valores["sv.renta-quincenal"];
    const { retencion, tramo } = retencionPorTabla(tabla, gravado);
    const renta = redondear(retencion);
    const observaciones: string[] = [];
    const anual = entrada.salario * PERIODOS_POR_ANIO[entrada.periodo];
    if (renta > 0 && tramo === 2 && anual <= valores["sv.limite-deduccion-fija-renta"]) {
      observaciones.push(
        `Si en el año no gana más de ${dinero(valores["sv.limite-deduccion-fija-renta"])}, tiene una deducción fija de ${dinero(valores["sv.deduccion-fija-renta"])} que la tabla no incluye. Su patrono debe considerarla, y en junio y diciembre recalcula la renta del año.`,
      );
    }
    if (renta > 0) observaciones.push("En junio y diciembre el patrono recalcula con todo lo ganado en el año, así que ese mes la retención puede cambiar.");
    return {
      afp,
      isss: redondear(entrada.isss),
      gravado,
      tramo: renta > 0 ? `Tramo ${["I", "II", "III", "IV"][tramo - 1]}` : "Tramo I (sin retención)",
      renta,
      liquido: redondear(entrada.salario - afp - entrada.isss - renta),
      observaciones,
    };
  },
  resultado: [
    { clave: "afp", etiqueta: "Cotización AFP", formato: "moneda" },
    { clave: "isss", etiqueta: "Cotización ISSS", formato: "moneda" },
    { clave: "gravado", etiqueta: "Salario sujeto a renta", formato: "moneda" },
    { clave: "tramo", etiqueta: "Tramo de la tabla", formato: "texto" },
    { clave: "renta", etiqueta: "Retención de renta", formato: "moneda", destacada: true },
    { clave: "liquido", etiqueta: "Salario líquido del período", formato: "moneda" },
  ],
});
