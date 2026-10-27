import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIARIO, salarioDiario } from "../lib/salarios";

export default definirCalculadora({
  id: "qa.maternity-leave-pay",
  mercado: "qa",
  concepto: "propio",
  slug: "maternity-leave-pay",
  estado: "publicado",
  requiere: {
    "qa.maternity": "mapa",
    "qa.maternity-qualifying": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly wage", ayuda: "Basic salary plus your regular allowances.", min: 0, porDefecto: 9000 },
    { id: "anios", tipo: "numero", etiqueta: "Years with your employer", min: 0, max: 50, porDefecto: 2 },
    CAMPO_DIARIO,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly wage.", "salario");
    const t = v["qa.maternity"];
    const diario = salarioDiario(entrada.salario, entrada.metodoDiario);
    const observaciones: string[] = [];
    if (entrada.anios < v["qa.maternity-qualifying"]) {
      observaciones.push("Paid maternity leave needs a full year with the employer.");
      return { pago: 0, dias: 0, despues: 0, diario: redondear(diario), observaciones };
    }
    const dias = enMapa(t, "days");
    observaciones.push("If health problems after the birth keep you off work longer, you can take unpaid leave of up to 60 days with a medical certificate.");
    return { pago: redondear(dias * diario), dias, despues: enMapa(t, "after-birth"), diario: redondear(diario), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Pay during maternity leave", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "Days of leave on full pay", formato: "dias" },
    { clave: "despues", etiqueta: "Minimum days after the birth", formato: "dias" },
    { clave: "diario", etiqueta: "Daily wage", formato: "moneda" },
  ],
});
