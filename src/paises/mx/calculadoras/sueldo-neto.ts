import { definirCalculadora, porRegion } from "@/motor/calculo";
import { calcularNeto, REQUIERE_NETO, valoresNeto } from "../neto";
import { OPCIONES_PERIODO_NOMINA } from "../nomina";

export default definirCalculadora({
  id: "mx.sueldo-neto",
  mercado: "mx",
  concepto: "sueldo-neto",
  slug: "sueldo-neto",
  estado: "publicado",
  requiere: REQUIERE_NETO,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto del periodo", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Cada cuánto te pagan", opciones: OPCIONES_PERIODO_NOMINA, porDefecto: "quincenal" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
    { id: "antiguedad", tipo: "entero", etiqueta: "Años que llevas en la empresa", min: 0, max: 60, porDefecto: 1, ayuda: "Sirve para estimar tu salario base de cotización del IMSS." },
    { id: "sbc", tipo: "moneda", etiqueta: "Salario base de cotización diario", min: 0, requerido: false, ayuda: "Viene en tu recibo de nómina como SBC. Si lo dejas vacío, lo estimamos con las prestaciones mínimas de ley." },
  ],
  calcular(entrada, valores, { redondear }) {
    const n = calcularNeto(entrada.sueldo, entrada.periodo, entrada.antiguedad, entrada.sbc, valoresNeto(valores, porRegion(valores["mx.salario-minimo"], entrada.region)), redondear);
    const observaciones: string[] = [];
    if (n.ganaMinimo) observaciones.push("Ganas el salario mínimo: no te retienen ISR y tu empresa paga tus cuotas del IMSS.");
    if (n.subsidio > 0) observaciones.push("Te toca el subsidio para el empleo, que baja el ISR que te retienen.");
    if (n.sbcTopado) observaciones.push("Tu salario base de cotización pasa el tope del IMSS, así que las cuotas se calculan con el tope.");
    return { diario: n.diario, sbc: n.sbc, isr: n.isr, subsidio: n.subsidio, isrRetenido: n.isrRetenido, imss: n.imss, neto: n.neto, observaciones };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "sbc", etiqueta: "Salario base de cotización (IMSS)", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR según la tarifa", formato: "moneda" },
    { clave: "subsidio", etiqueta: "Subsidio para el empleo", formato: "moneda", ocultarSiCero: true },
    { clave: "isrRetenido", etiqueta: "ISR que te retienen", formato: "moneda" },
    { clave: "imss", etiqueta: "Cuotas del IMSS", formato: "moneda" },
    { clave: "neto", etiqueta: "Sueldo neto", formato: "moneda", destacada: true },
  ],
});
