import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIARIO, salarioDiario } from "../lib/salarios";

export default definirCalculadora({
  id: "ae.notice-period",
  mercado: "ae",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "ae.notice-period": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Last monthly wage", min: 0, porDefecto: 12000 },
    { id: "plazo", tipo: "entero", etiqueta: "Notice period in your contract (days)", min: 1, max: 365, porDefecto: 30 },
    { id: "trabajados", tipo: "entero", etiqueta: "Days of the notice period already worked", min: 0, max: 365, porDefecto: 0 },
    CAMPO_DIARIO,
  ],
  calcular(entrada, v, { redondear }) {
    const t = v["ae.notice-period"];
    if (entrada.trabajados > entrada.plazo) throw new ErrorEntrada("The days worked can't be more than the notice period.", "trabajados");
    const diario = salarioDiario(entrada.salario, entrada.metodoDiario, "salario");
    const minimo = enMapa(t, "minimum");
    const maximo = enMapa(t, "maximum");
    const observaciones: string[] = [];
    if (entrada.plazo < minimo) observaciones.push(`The law requires at least ${minimo} days of notice, so the calculation uses ${minimo}.`);
    if (entrada.plazo > maximo) observaciones.push(`The law caps notice at ${maximo} days, so the calculation uses ${maximo}.`);
    const plazo = Math.min(maximo, Math.max(minimo, entrada.plazo));
    const restantes = Math.max(0, plazo - entrada.trabajados);
    observaciones.push("If the employer ends the contract, you can take one unpaid working day a week during the notice period to look for a job.");
    return { compensacion: redondear(restantes * diario), restantes, plazo, diario: redondear(diario), observaciones };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "Payment in lieu of notice", formato: "moneda", destacada: true },
    { clave: "restantes", etiqueta: "Notice days not worked", formato: "dias" },
    { clave: "plazo", etiqueta: "Notice period used", formato: "dias" },
    { clave: "diario", etiqueta: "Daily wage", formato: "moneda" },
  ],
});
