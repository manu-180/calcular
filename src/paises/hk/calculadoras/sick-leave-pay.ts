import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPOS_PROMEDIO, salarioDiarioPromedio } from "../lib/salarios";

export default definirCalculadora({
  id: "hk.sick-leave-pay",
  mercado: "hk",
  concepto: "propio",
  slug: "sick-leave-pay",
  estado: "publicado",
  requiere: {
    "hk.leave-pay-fraction": "numero",
    "hk.sick-days-accrual": "mapa",
  },
  campos: [
    { id: "diasEnfermo", tipo: "entero", etiqueta: "Consecutive sick days", min: 1, max: 120, porDefecto: 4 },
    {
      id: "embarazo",
      tipo: "si-no",
      etiqueta: "Days off for a pregnancy check-up, post-confinement treatment or miscarriage",
      ayuda: "These days count even if they're fewer than 4 in a row.",
      porDefecto: false,
    },
    { id: "meses", tipo: "entero", etiqueta: "Completed months of service", min: 0, max: 600, porDefecto: 24 },
    { id: "usados", tipo: "entero", etiqueta: "Paid sickness days you've already used", min: 0, max: 5000, porDefecto: 0 },
    ...CAMPOS_PROMEDIO,
  ],
  calcular(entrada, v, { redondear }) {
    const diario = salarioDiarioPromedio(entrada);
    const tabla = v["hk.sick-days-accrual"];
    const primerAnio = Math.min(entrada.meses, 12) * enMapa(tabla, "first-12-months");
    const despues = Math.max(0, entrada.meses - 12) * enMapa(tabla, "after-12-months");
    const disponibles = Math.max(0, Math.min(enMapa(tabla, "maximum"), primerAnio + despues - entrada.usados));
    if (entrada.diasEnfermo < 1) throw new ErrorEntrada("Enter at least one sick day.", "diasEnfermo");
    const califica = entrada.diasEnfermo >= 4 || entrada.embarazo;
    const pagados = califica ? Math.min(entrada.diasEnfermo, disponibles) : 0;
    const porDia = redondear(porcentaje(diario, v["hk.leave-pay-fraction"]));
    const observaciones: string[] = [];
    if (!califica) observaciones.push("Sickness allowance is only paid for sick leave of at least 4 consecutive days, so these days are unpaid by law.");
    if (califica && pagados < entrada.diasEnfermo) observaciones.push("You don't have enough paid sickness days for all of them. The rest are unpaid by law.");
    observaciones.push("The sick leave has to be supported by a medical certificate.");
    return {
      total: redondear(porcentaje(diario, v["hk.leave-pay-fraction"]) * pagados),
      pagados,
      porDia,
      disponibles,
      diario: redondear(diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Sickness allowance", formato: "moneda", destacada: true },
    { clave: "pagados", etiqueta: "Paid sickness days used", formato: "dias" },
    { clave: "porDia", etiqueta: "Sickness allowance per day", formato: "moneda" },
    { clave: "disponibles", etiqueta: "Paid sickness days available before this leave", formato: "dias" },
    { clave: "diario", etiqueta: "Average daily wages", formato: "moneda" },
  ],
});
