import { definirCalculadora, enMapa } from "@/motor/calculo";
import { irSalarial } from "../prestaciones";

export default definirCalculadora({
  id: "ni.salario-neto",
  mercado: "ni",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "publicado",
  requiere: {
    "ni.inss-laboral": "mapa",
    "ni.ir-rentas-trabajo": "escala",
    "ni.ir-renta-exenta": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    { id: "regimen", tipo: "opcion-dato", dato: "ni.inss-laboral", etiqueta: "Régimen del INSS", porDefecto: "integral" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["ni.inss-laboral"], entrada.regimen);
    const r = irSalarial(entrada.salario, tasa, valores["ni.ir-rentas-trabajo"], redondear);
    const observaciones: string[] = [];
    if (r.irMensual === 0) observaciones.push("Con este salario no pagás IR: tu renta neta del año queda en el tramo exento.");
    observaciones.push("El IR se retiene cada mes sobre el salario que cobrarías en todo el año. Si tu salario cambia, el empleador ajusta la retención.");
    observaciones.push("No incluye otros descuentos, como préstamos, cuota sindical o pensión de alimentos.");
    return { tasa, inss: r.inss, ir: r.irMensual, neto: redondear(entrada.salario - r.inss - r.irMensual), observaciones };
  },
  resultado: [
    { clave: "inss", etiqueta: "INSS laboral", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tasa del INSS", formato: "porcentaje", decimales: 2 },
    { clave: "ir", etiqueta: "Retención de IR", formato: "moneda" },
    { clave: "neto", etiqueta: "Salario neto", formato: "moneda", destacada: true },
  ],
});
