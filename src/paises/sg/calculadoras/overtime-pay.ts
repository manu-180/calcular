import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { dolares } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.overtime-pay",
  mercado: "sg",
  concepto: "horas-extra",
  slug: "overtime-pay",
  estado: "publicado",
  requiere: {
    "sg.horas-extra-factor": "numero",
    "sg.horas-extra-topes": "mapa",
    "sg.horas-extra-tope-hora": "numero",
    "sg.horas-extra-max-mes": "numero",
    "sg.horas-semanales": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 2400 },
    {
      id: "categoria",
      tipo: "opcion",
      etiqueta: "Your type of work",
      opciones: [
        { valor: "no-manual", etiqueta: "Non-workman (office, retail, services)" },
        { valor: "manual", etiqueta: "Workman (mainly manual labour)" },
      ],
      porDefecto: "no-manual",
    },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours worked this month", min: 0, porDefecto: 10 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your monthly basic salary.", "basico");
    if (entrada.horas < 0) throw new ErrorEntrada("Enter zero or more hours.", "horas");
    const limite = enMapa(v["sg.horas-extra-topes"], entrada.categoria);
    const semanales = v["sg.horas-semanales"];
    const factor = v["sg.horas-extra-factor"];
    const observaciones: string[] = [];
    if (entrada.basico > limite) {
      observaciones.push(
        `Overtime pay under the Employment Act covers ${entrada.categoria === "manual" ? "workmen" : "non-workmen"} earning up to ${dolares(limite)} a month in basic salary. Check your contract for your overtime terms.`,
      );
      return { pago: null, porHora: null, tarifa: null, observaciones };
    }
    let porHora = redondear((12 * entrada.basico) / (52 * semanales));
    if (entrada.categoria === "no-manual" && porHora > v["sg.horas-extra-tope-hora"]) {
      porHora = v["sg.horas-extra-tope-hora"];
      observaciones.push(`For non-workmen, the hourly rate used for overtime is capped at ${dolares(porHora)}.`);
    }
    const tarifa = redondear(porHora * factor);
    if (entrada.horas > v["sg.horas-extra-max-mes"]) {
      observaciones.push(`An employee can work at most ${v["sg.horas-extra-max-mes"]} overtime hours in a month, unless the employer has an exemption.`);
    }
    observaciones.push("Your employer must pay overtime within 14 days after the end of the salary period.");
    return { pago: redondear(porHora * factor * entrada.horas), porHora, tarifa, observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Overtime pay for the month", formato: "moneda", destacada: true },
    { clave: "porHora", etiqueta: "Hourly basic rate of pay", formato: "moneda" },
    { clave: "tarifa", etiqueta: "Overtime rate per hour", formato: "moneda" },
  ],
});
