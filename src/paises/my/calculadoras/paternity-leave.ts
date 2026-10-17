import { definirCalculadora } from "@/motor/calculo";
import { CAMPO_SUELDO, sueldoValido } from "../lib/empleo";

export default definirCalculadora({
  id: "my.paternity-leave",
  mercado: "my",
  concepto: "propio",
  slug: "paternity-leave",
  estado: "publicado",
  requiere: {
    "my.paternity-leave-days": "numero",
    "my.ordinary-rate-divisor": "numero",
  },
  campos: [
    CAMPO_SUELDO,
    { id: "doce", tipo: "si-no", etiqueta: "You have worked for this employer for at least 12 months", porDefecto: true },
    { id: "previos", tipo: "entero", etiqueta: "Paternity leaves you have already taken", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    sueldoValido(entrada.sueldo);
    const dias = v["my.paternity-leave-days"];
    const diario = redondear(entrada.sueldo / v["my.ordinary-rate-divisor"]);
    const elegible = entrada.doce && entrada.previos < 5;
    const observaciones: string[] = [];
    if (!entrada.doce) observaciones.push("Paid paternity leave needs at least 12 months with the same employer before it starts.");
    if (entrada.previos >= 5) observaciones.push("Paid paternity leave covers up to five confinements, whatever the number of spouses.");
    return {
      pago: elegible ? redondear(dias * diario) : 0,
      dias: elegible ? dias : 0,
      diario,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Paternity leave pay", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "Paid paternity leave", formato: "dias" },
    { clave: "diario", etiqueta: "Pay a day", formato: "moneda" },
  ],
});
