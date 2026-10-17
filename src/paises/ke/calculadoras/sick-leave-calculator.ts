import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIVISORES, NOTA_DIVISOR } from "../lib/salario-diario";

export default definirCalculadora({
  id: "ke.sick-leave-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "ke.sick-full-pay-days": "numero",
    "ke.sick-half-pay-days": "numero",
    "ke.sick-qualifying-months": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months you have worked for this employer", min: 0, porDefecto: 12 },
    { id: "dias", tipo: "entero", etiqueta: "Sick days in this 12-month period, with a medical certificate", min: 0, porDefecto: 10 },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic pay (optional)", min: 0, requerido: false },
    { id: "divisor", tipo: "opcion", etiqueta: "How to work out a day's pay", opciones: DIVISORES, porDefecto: "30" },
  ],
  calcular(e, v, { redondear }) {
    if (e.dias < 0) throw new ErrorEntrada("Days cannot be negative.", "dias");
    const califica = e.meses >= v["ke.sick-qualifying-months"];
    const completos = califica ? Math.min(e.dias, v["ke.sick-full-pay-days"]) : 0;
    const medios = califica ? Math.min(Math.max(0, e.dias - completos), v["ke.sick-half-pay-days"]) : 0;
    const sinPaga = e.dias - completos - medios;
    const observaciones: string[] = [];
    if (!califica) observaciones.push("Paid sick leave starts after two consecutive months of service.");
    if (sinPaga > 0 && califica) observaciones.push("Days beyond the legal minimum are unpaid unless your contract gives more.");
    let paga: number | null = null;
    if (e.sueldo !== null && e.sueldo > 0) {
      const diario = e.sueldo / Number(e.divisor);
      paga = redondear(diario * completos + (diario * medios) / 2);
      observaciones.push(NOTA_DIVISOR);
    }
    return { completos, medios, sinPaga, paga, observaciones };
  },
  resultado: [
    { clave: "completos", etiqueta: "Days with full pay", formato: "dias", destacada: true },
    { clave: "medios", etiqueta: "Days with half pay", formato: "dias" },
    { clave: "sinPaga", etiqueta: "Days without legal sick pay", formato: "dias" },
    { clave: "paga", etiqueta: "Sick pay for these days", formato: "moneda" },
  ],
});
