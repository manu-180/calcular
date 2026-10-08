import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { isrAnual } from "../prestaciones";

export default definirCalculadora({
  id: "gt.sueldo-liquido",
  mercado: "gt",
  concepto: "sueldo-neto",
  slug: "sueldo-liquido",
  estado: "borrador",
  requiere: {
    "gt.igss-laboral-ivs": "numero",
    "gt.igss-laboral-ema": "numero",
    "gt.isr-escala": "escala",
    "gt.isr-deduccion-gastos-personales": "numero",
    "gt.isr-deduccion-extraordinaria": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Salario mensual", min: 0, ayuda: "Sin la bonificación incentivo." },
    {
      id: "bonificaciones",
      tipo: "moneda",
      etiqueta: "Bonificaciones mensuales",
      min: 0,
      porDefecto: 0,
      ayuda: "La bonificación incentivo y otras que no pagan IGSS.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaIgss = valores["gt.igss-laboral-ivs"] + valores["gt.igss-laboral-ema"];
    const igss = redondear(porcentaje(entrada.sueldo, tasaIgss));
    const deducciones = valores["gt.isr-deduccion-gastos-personales"] + valores["gt.isr-deduccion-extraordinaria"] + igss * 12;
    const isr = isrAnual((entrada.sueldo + entrada.bonificaciones) * 12, deducciones, valores["gt.isr-escala"], redondear);
    const isrMensual = redondear(isr.anual / 12);
    return {
      bruto: redondear(entrada.sueldo + entrada.bonificaciones),
      igss,
      isr: isrMensual,
      liquido: redondear(entrada.sueldo + entrada.bonificaciones - igss - isrMensual),
      observaciones: ["El ISR es una proyección de 12 meses sin la planilla del IVA. Si la presenta, la retención baja."],
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Total devengado", formato: "moneda" },
    { clave: "igss", etiqueta: "Cuota laboral del IGSS", formato: "moneda" },
    { clave: "isr", etiqueta: "Retención de ISR", formato: "moneda", ocultarSiCero: true },
    { clave: "liquido", etiqueta: "Sueldo líquido", formato: "moneda", destacada: true },
  ],
});
