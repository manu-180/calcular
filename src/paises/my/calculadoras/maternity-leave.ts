import { definirCalculadora } from "@/motor/calculo";
import { CAMPO_SUELDO, sueldoValido } from "../lib/empleo";

export default definirCalculadora({
  id: "my.maternity-leave",
  mercado: "my",
  concepto: "propio",
  slug: "maternity-leave",
  estado: "publicado",
  requiere: {
    "my.maternity-leave-days": "numero",
    "my.ordinary-rate-divisor": "numero",
  },
  campos: [
    CAMPO_SUELDO,
    { id: "noventa", tipo: "si-no", etiqueta: "You worked for this employer at least 90 days in the 9 months before the birth", porDefecto: true },
    { id: "cuatro", tipo: "si-no", etiqueta: "You worked for this employer at some time in the 4 months before the birth", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    sueldoValido(entrada.sueldo);
    const dias = v["my.maternity-leave-days"];
    const diario = redondear(entrada.sueldo / v["my.ordinary-rate-divisor"]);
    const elegible = entrada.noventa && entrada.cuatro;
    return {
      dias,
      diario,
      subsidio: elegible ? redondear(dias * diario) : 0,
      elegible: elegible ? "Yes" : "No, but you still get the leave",
      observaciones: elegible ? ([] as string[]) : ["You are still entitled to the maternity leave, but your employer does not have to pay the maternity allowance."],
    };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Maternity allowance", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "Maternity leave", formato: "dias" },
    { clave: "diario", etiqueta: "Allowance a day", formato: "moneda" },
    { clave: "elegible", etiqueta: "Paid by your employer", formato: "texto" },
  ],
});
