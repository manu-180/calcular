import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.expatriate-payroll-tax",
  mercado: "gm",
  concepto: "propio",
  slug: "expatriate-payroll-tax",
  estado: "publicado",
  requiere: {
    "gm.expatriate-payroll-tax": "mapa",
  },
  campos: [
    { id: "ecowas", tipo: "entero", etiqueta: "Expatriates who are ECOWAS citizens or have special status", min: 0, porDefecto: 1 },
    { id: "otros", tipo: "entero", etiqueta: "Expatriates who are not ECOWAS citizens", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ecowas + entrada.otros <= 0) throw new ErrorEntrada("Enter at least one expatriate.", "ecowas");
    const tasas = v["gm.expatriate-payroll-tax"];
    const ecowas = entrada.ecowas * tasas.ecowas;
    const otros = entrada.otros * tasas.other;
    const total = ecowas + otros;
    return {
      total: redondear(total),
      ecowas: redondear(ecowas),
      otros: redondear(otros),
      mensual: redondear(total / 12),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Payroll tax a year", formato: "moneda", destacada: true },
    { clave: "ecowas", etiqueta: "For ECOWAS citizens", formato: "moneda", ocultarSiCero: true },
    { clave: "otros", etiqueta: "For other expatriates", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Spread over 12 months", formato: "moneda" },
  ],
});
