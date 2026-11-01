import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.severance-pay-calculator",
  mercado: "ag",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: {
    "ag.severance-days-per-month": "numero",
    "ag.severance-min-years": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Latest basic pay for the month", min: 0, porDefecto: 3300 },
    { id: "diasLaborales", tipo: "entero", etiqueta: "Working days in your pay month", min: 1, max: 31, porDefecto: 22, ayuda: "Used to turn your monthly pay into a day's pay." },
    { id: "anios", tipo: "entero", etiqueta: "Years of service", min: 0, max: 60, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Extra complete months", min: 0, max: 11, porDefecto: 0 },
    { id: "fraccion", tipo: "si-no", etiqueta: "A further part of a month that is more than half", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your latest basic pay for the month.", "salario");
    const completos = e.anios * 12 + e.meses;
    const mesesPago = completos + (e.fraccion ? 1 : 0);
    const minimo = v["ag.severance-min-years"] * 12;
    const pagoDiario = redondear(e.salario / e.diasLaborales);
    const califica = completos > minimo || (completos === minimo && e.fraccion);
    const observaciones: string[] = [];
    if (!califica) observaciones.push("Severance pay is due only when your service has gone beyond one year.");
    return {
      mesesPago: califica ? mesesPago : 0,
      pagoDiario,
      indemnizacion: califica ? redondear(mesesPago * v["ag.severance-days-per-month"] * pagoDiario) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnizacion", etiqueta: "Severance pay (minimum)", formato: "moneda", destacada: true },
    { clave: "mesesPago", etiqueta: "Months counted", formato: "numero", decimales: 0 },
    { clave: "pagoDiario", etiqueta: "A day's pay", formato: "moneda" },
  ],
});
