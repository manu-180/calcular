import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.notice-period-calculator",
  mercado: "bb",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "bb.notice-weekly-paid": "mapa",
    "bb.notice-fortnightly-paid": "mapa",
    "bb.notice-monthly-paid": "mapa",
    "bb.employee-notice-weeks": "mapa",
    "bb.employee-notice-months": "numero",
  },
  campos: [
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "How you are paid",
      opciones: [
        { valor: "weekly", etiqueta: "Hourly, daily or weekly" },
        { valor: "fortnightly", etiqueta: "Fortnightly" },
        { valor: "monthly", etiqueta: "Monthly" },
      ],
      porDefecto: "monthly",
    },
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Who gives the notice?",
      opciones: [
        { valor: "empleador", etiqueta: "The employer" },
        { valor: "empleado", etiqueta: "The employee" },
      ],
      porDefecto: "empleador",
    },
    { id: "anios", tipo: "numero", etiqueta: "Years of continuous employment", min: 0, max: 60, porDefecto: 6 },
    { id: "sueldo", tipo: "moneda", etiqueta: "Pay for one pay period (optional)", min: 0, porDefecto: 0, ayuda: "Used only to value the notice if you are paid in lieu." },
  ],
  calcular(e, v, { redondear }) {
    if (e.anios < 1) throw new ErrorEntrada("The statutory minimum notice applies after one year of continuous employment.", "anios");
    let semanas = 0;
    let meses = 0;
    if (e.quien === "empleado") {
      if (e.pago === "monthly") meses = v["bb.employee-notice-months"];
      else semanas = enMapa(v["bb.employee-notice-weeks"], e.pago);
    } else if (e.pago === "weekly") {
      semanas = enMapa(v["bb.notice-weekly-paid"], e.anios < 2 ? "under-2" : e.anios < 5 ? "2-5" : e.anios < 10 ? "5-10" : e.anios < 15 ? "10-15" : "15-plus");
    } else if (e.pago === "fortnightly") {
      semanas = enMapa(v["bb.notice-fortnightly-paid"], e.anios < 5 ? "under-5" : e.anios < 10 ? "5-10" : e.anios < 15 ? "10-15" : "15-plus");
    } else {
      meses = enMapa(v["bb.notice-monthly-paid"], e.anios < 10 ? "under-10" : e.anios < 15 ? "10-15" : "15-plus");
    }
    const periodos = e.pago === "weekly" ? semanas : e.pago === "fortnightly" ? semanas / 2 : meses;
    const enLugar = e.sueldo > 0 ? redondear(periodos * e.sueldo) : null;
    const texto = meses > 0 ? `${meses} month${meses === 1 ? "" : "s"}` : `${semanas} week${semanas === 1 ? "" : "s"}`;
    return {
      aviso: texto,
      enLugar,
      observaciones: [
        "These are minimums. A contract can give longer notice, and either side can accept payment in lieu of notice.",
        "Pay in lieu is your pay for one period multiplied by the notice counted in pay periods: weeks for weekly pay, two week blocks for fortnightly pay and months for monthly pay.",
      ],
    };
  },
  resultado: [
    { clave: "aviso", etiqueta: "Minimum notice", formato: "texto", destacada: true },
    { clave: "enLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
