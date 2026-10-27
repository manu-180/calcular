import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "et.maternity-leave-calculator",
  mercado: "et",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "et.maternity-prenatal": "numero",
    "et.maternity-postnatal": "numero",
    "et.paternity-leave": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Expected date of birth", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 9000 },
  ],
  calcular(e, v, { redondear }) {
    const prenatal = v["et.maternity-prenatal"];
    const postnatal = v["et.maternity-postnatal"];
    const dias = prenatal + postnatal;
    return {
      inicio: sumarDias(e.parto, -prenatal),
      fin: sumarDias(e.parto, postnatal),
      dias,
      pago: redondear((e.salario / 30) * dias),
      paternidad: v["et.paternity-leave"],
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Prenatal leave starts", formato: "fecha", destacada: true },
    { clave: "fin", etiqueta: "Postnatal leave ends, if the baby is born on the expected date", formato: "fecha" },
    { clave: "dias", etiqueta: "Paid maternity leave", formato: "dias" },
    { clave: "pago", etiqueta: "Salary for those days", formato: "moneda" },
    { clave: "paternidad", etiqueta: "Paid paternity leave for the father", formato: "dias" },
  ],
});
