import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { CAMPOS_PROMEDIO, salarioDiarioPromedio } from "../lib/salarios";

export default definirCalculadora({
  id: "hk.maternity-leave-pay",
  mercado: "hk",
  concepto: "propio",
  slug: "maternity-leave-pay",
  estado: "publicado",
  requiere: {
    "hk.leave-pay-fraction": "numero",
    "hk.maternity-leave-weeks": "numero",
    "hk.maternity-pay-cap": "numero",
  },
  campos: [
    ...CAMPOS_PROMEDIO,
    { id: "cuarentaSemanas", tipo: "si-no", etiqueta: "You've been on a continuous contract for at least 40 weeks before the leave starts", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    const diario = salarioDiarioPromedio(entrada);
    const porDia = porcentaje(diario, v["hk.leave-pay-fraction"]);
    const semanas = v["hk.maternity-leave-weeks"];
    const observaciones: string[] = [];
    if (!entrada.cuarentaSemanas) {
      observaciones.push("You still get the maternity leave, but it is paid only after 40 weeks on a continuous contract.");
      return { total: 0, primeras: 0, ultimas: 0, porDia: redondear(porDia), semanas, observaciones };
    }
    const primeras = redondear(porDia * 7 * (semanas - 4));
    const sinTope = porDia * 7 * 4;
    const ultimas = redondear(Math.min(sinTope, v["hk.maternity-pay-cap"]));
    if (sinTope > v["hk.maternity-pay-cap"]) observaciones.push("The pay for the 11th to 14th weeks reaches the cap.");
    observaciones.push("The employer can claim back the pay for the 11th to 14th weeks from the Government.");
    return { total: redondear(primeras + ultimas), primeras, ultimas, porDia: redondear(porDia), semanas, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Maternity leave pay", formato: "moneda", destacada: true },
    { clave: "primeras", etiqueta: "First 10 weeks", formato: "moneda" },
    { clave: "ultimas", etiqueta: "11th to 14th weeks", formato: "moneda" },
    { clave: "porDia", etiqueta: "Pay per day", formato: "moneda" },
    { clave: "semanas", etiqueta: "Paid maternity leave", formato: "semanas" },
  ],
});
