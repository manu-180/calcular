import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { retencionPorTabla } from "../lib/renta";

export default definirCalculadora({
  id: "sv.salario-liquido",
  mercado: "sv",
  concepto: "sueldo-neto",
  slug: "salario-liquido",
  estado: "borrador",
  requiere: {
    "sv.renta-mensual": "escala",
    "sv.afp-trabajador": "numero",
    "sv.isss-trabajador": "numero",
    "sv.isss-salario-maximo": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Lo que gana en el mes antes de descuentos.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const afp = redondear(porcentaje(entrada.salario, valores["sv.afp-trabajador"]));
    const isss = redondear(porcentaje(Math.min(entrada.salario, valores["sv.isss-salario-maximo"]), valores["sv.isss-trabajador"]));
    const gravado = redondear(Math.max(0, entrada.salario - afp - isss));
    const renta = redondear(retencionPorTabla(valores["sv.renta-mensual"], gravado).retencion);
    return {
      afp,
      isss,
      renta,
      liquido: redondear(entrada.salario - afp - isss - renta),
    };
  },
  resultado: [
    { clave: "afp", etiqueta: "Cotización AFP", formato: "moneda" },
    { clave: "isss", etiqueta: "Cotización ISSS", formato: "moneda" },
    { clave: "renta", etiqueta: "Retención de renta", formato: "moneda" },
    { clave: "liquido", etiqueta: "Salario líquido", formato: "moneda", destacada: true },
  ],
});
