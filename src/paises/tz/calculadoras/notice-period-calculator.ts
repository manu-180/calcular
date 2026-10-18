import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.notice-period-calculator",
  mercado: "tz",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "tz.notice-first-month": "numero",
    "tz.notice-daily-weekly": "numero",
    "tz.notice-monthly": "numero",
  },
  campos: [
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "How you are employed",
      opciones: [
        { valor: "monthly", etiqueta: "On a monthly basis" },
        { valor: "daily-weekly", etiqueta: "On a daily or weekly basis" },
      ],
      porDefecto: "monthly",
    },
    { id: "primerMes", tipo: "si-no", etiqueta: "You are still in your first month of employment" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly wage (to work out pay in lieu)", min: 0, porDefecto: 1000000, visibleSi: { pago: ["monthly"] } },
    { id: "diario", tipo: "moneda", etiqueta: "Daily wage (to work out pay in lieu)", min: 0, porDefecto: 30000, visibleSi: { pago: ["daily-weekly"] } },
  ],
  calcular(e, v, { redondear }) {
    const dias = e.primerMes ? v["tz.notice-first-month"] : e.pago === "monthly" ? v["tz.notice-monthly"] : v["tz.notice-daily-weekly"];
    let enLugar: number;
    if (e.pago === "monthly") {
      if (e.sueldo === null || e.sueldo < 0) throw new ErrorEntrada("Enter your monthly wage.", "sueldo");
      enLugar = redondear((e.sueldo / v["tz.notice-monthly"]) * dias);
    } else {
      if (e.diario === null || e.diario < 0) throw new ErrorEntrada("Enter your daily wage.", "diario");
      enLugar = redondear(e.diario * dias);
    }
    return { dias, enLugar };
  },
  resultado: [
    { clave: "dias", etiqueta: "Minimum notice", formato: "dias", destacada: true },
    { clave: "enLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
