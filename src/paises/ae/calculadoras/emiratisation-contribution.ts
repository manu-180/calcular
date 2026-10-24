import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ae.emiratisation-contribution",
  mercado: "ae",
  concepto: "propio",
  slug: "emiratisation-contribution",
  estado: "publicado",
  requiere: {
    "ae.emiratisation-contribution": "numero",
  },
  campos: [
    { id: "objetivo", tipo: "entero", etiqueta: "Emiratis you were required to employ", min: 0, max: 10000, porDefecto: 2 },
    { id: "empleados", tipo: "entero", etiqueta: "Emiratis you actually employ", min: 0, max: 10000, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.objetivo <= 0) throw new ErrorEntrada("Enter your Emiratisation target.", "objetivo");
    const faltan = Math.max(0, entrada.objetivo - entrada.empleados);
    const porPersona = v["ae.emiratisation-contribution"];
    return {
      total: redondear(faltan * porPersona),
      faltan,
      porPersona,
      mensual: redondear(porPersona / 12),
      observaciones: faltan === 0 ? ["You meet the target, so no contribution is due."] : ["The contribution is charged for each Emirati not hired against the target."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Yearly Emiratisation contribution", formato: "moneda", destacada: true },
    { clave: "faltan", etiqueta: "Emiratis missing", formato: "numero", decimales: 0 },
    { clave: "porPersona", etiqueta: "Contribution for each missing Emirati", formato: "moneda" },
    { clave: "mensual", etiqueta: "Per missing Emirati, per month", formato: "moneda" },
  ],
});
