import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.notice-period-calculator",
  mercado: "ke",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "ke.notice-days-monthly": "numero",
  },
  campos: [
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "How often you are paid",
      opciones: [
        { valor: "monthly", etiqueta: "Monthly or less often" },
        { valor: "weekly", etiqueta: "Weekly" },
        { valor: "fortnightly", etiqueta: "Every two weeks" },
        { valor: "daily", etiqueta: "Daily" },
      ],
      porDefecto: "monthly",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Pay for one pay period", min: 0, porDefecto: 50000, ayuda: "Your monthly, weekly, fortnightly or daily pay." },
    { id: "contrato", tipo: "entero", etiqueta: "Notice in your contract, in days (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario < 0) throw new ErrorEntrada("Pay cannot be negative.", "salario");
    const legal = e.pago === "monthly" ? v["ke.notice-days-monthly"] : e.pago === "weekly" ? 7 : e.pago === "fortnightly" ? 14 : 0;
    const dias = Math.max(legal, e.contrato ?? 0);
    const diasPeriodo = e.pago === "monthly" ? v["ke.notice-days-monthly"] : e.pago === "weekly" ? 7 : e.pago === "fortnightly" ? 14 : 1;
    const enLugar = e.pago === "daily" && dias === 0 ? 0 : redondear((e.salario / diasPeriodo) * dias);
    const observaciones: string[] = [];
    if (e.pago === "daily") observaciones.push("A contract paid by the day can end at the close of any day without notice.");
    if (e.pago === "weekly" || e.pago === "fortnightly") observaciones.push("The contract ends at the end of the next pay period after written notice. The days shown assume notice is given on a payday.");
    if ((e.contrato ?? 0) > legal) observaciones.push("Your contract gives more notice than the law, so the longer period applies.");
    return { dias, enLugar, legal, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Notice you must give or receive", formato: "dias", destacada: true },
    { clave: "enLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
    { clave: "legal", etiqueta: "Minimum notice under the Employment Act", formato: "dias" },
  ],
});
