import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPOS_PROMEDIO, salarioDiarioPromedio } from "../lib/salarios";

export default definirCalculadora({
  id: "hk.paternity-leave-pay",
  mercado: "hk",
  concepto: "propio",
  slug: "paternity-leave-pay",
  estado: "publicado",
  requiere: {
    "hk.leave-pay-fraction": "numero",
    "hk.paternity-leave-days": "numero",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Days of paternity leave you take", min: 1, max: 5, porDefecto: 5 },
    ...CAMPOS_PROMEDIO,
    { id: "cuarentaSemanas", tipo: "si-no", etiqueta: "You've been on a continuous contract for at least 40 weeks before the leave", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dias > v["hk.paternity-leave-days"]) throw new ErrorEntrada(`Paternity leave is up to ${v["hk.paternity-leave-days"]} days for each confinement.`, "dias");
    const diario = salarioDiarioPromedio(entrada);
    const porDia = porcentaje(diario, v["hk.leave-pay-fraction"]);
    const observaciones: string[] = [];
    if (!entrada.cuarentaSemanas) observaciones.push("You still get the leave, but it is paid only after 40 weeks on a continuous contract.");
    else observaciones.push("To be paid, give your employer the child's birth certificate naming you as the father.");
    return {
      total: entrada.cuarentaSemanas ? redondear(porDia * entrada.dias) : 0,
      porDia: redondear(porDia),
      maximo: v["hk.paternity-leave-days"],
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Paternity leave pay", formato: "moneda", destacada: true },
    { clave: "porDia", etiqueta: "Pay per day", formato: "moneda" },
    { clave: "maximo", etiqueta: "Paternity leave for each confinement", formato: "dias" },
  ],
});
