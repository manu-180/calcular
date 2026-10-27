import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.epf-withdrawal-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "epf-withdrawal-calculator",
  estado: "publicado",
  requiere: {
    "lk.epf-withdrawal-share": "numero",
    "lk.epf-withdrawal-max": "numero",
    "lk.epf-withdrawal-min-balance": "numero",
    "lk.epf-withdrawal-min-years": "numero",
  },
  campos: [
    { id: "saldo", tipo: "moneda", etiqueta: "Your EPF balance", min: 0, porDefecto: 3000000, ayuda: "As shown in your latest EPF member statement." },
    { id: "anios", tipo: "numero", etiqueta: "Years of service", min: 0, max: 60, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.saldo <= 0) throw new ErrorEntrada("Enter your EPF balance.", "saldo");
    const observaciones: string[] = [];
    const porAnios = e.anios > v["lk.epf-withdrawal-min-years"];
    const porSaldo = e.saldo > v["lk.epf-withdrawal-min-balance"];
    if (!porAnios) observaciones.push(`You need more than ${v["lk.epf-withdrawal-min-years"]} years of service.`);
    if (!porSaldo) observaciones.push("Your balance has to be above the minimum.");
    const parte = redondear(porcentaje(e.saldo, v["lk.epf-withdrawal-share"]));
    const retiro = porAnios && porSaldo ? Math.min(parte, v["lk.epf-withdrawal-max"]) : 0;
    if (retiro > 0 && parte > v["lk.epf-withdrawal-max"]) observaciones.push("The amount is limited by the maximum withdrawal.");
    return { retiro, parte, queda: redondear(e.saldo - retiro), observaciones };
  },
  resultado: [
    { clave: "retiro", etiqueta: "Most you can withdraw", formato: "moneda", destacada: true },
    { clave: "parte", etiqueta: "Share of your balance allowed", formato: "moneda" },
    { clave: "queda", etiqueta: "Balance left in the fund", formato: "moneda" },
  ],
});
