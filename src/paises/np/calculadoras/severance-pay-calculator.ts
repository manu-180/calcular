import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.severance-pay-calculator",
  mercado: "np",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: { "np.retrenchment-months-per-year": "numero" },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 40000 },
    { id: "meses", tipo: "entero", etiqueta: "Months of service", min: 0, max: 600, porDefecto: 60 },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "basico");
    const porAnio = v["np.retrenchment-months-per-year"];
    const completos = Math.floor(e.meses / 12);
    const anios = e.meses >= 12 ? completos : e.meses / 12;
    const observaciones = ["This is the compensation owed when the employer cuts the number of workers. It does not include notice pay, gratuity or leave."];
    if (e.meses >= 12 && e.meses % 12 !== 0) observaciones.push("Months after the last full year are not counted here, because the Act refers to each year of service.");
    return { compensacion: redondear(e.basico * porAnio * anios), anios: redondear(anios), mensual: redondear(e.basico * porAnio), observaciones };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "Retrenchment compensation", formato: "moneda", destacada: true },
    { clave: "anios", etiqueta: "Years of service counted", formato: "numero", decimales: 2 },
    { clave: "mensual", etiqueta: "Compensation for each year of service", formato: "moneda" },
  ],
});
