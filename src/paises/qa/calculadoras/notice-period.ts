import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.notice-period",
  mercado: "qa",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "qa.notice": "mapa",
    "qa.notice-threshold": "numero",
  },
  campos: [
    { id: "anios", tipo: "numero", etiqueta: "Years of service", min: 0, max: 60, porDefecto: 3 },
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 9000 },
    { id: "trabajados", tipo: "entero", etiqueta: "Days of notice already worked", ayuda: "Leave it at 0 if the contract ended without any notice.", min: 0, max: 62, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter the monthly basic salary.", "basico");
    const largo = entrada.anios > v["qa.notice-threshold"];
    const meses = enMapa(v["qa.notice"], largo ? "later-years" : "first-years");
    const dias = meses * 30;
    const faltan = Math.max(0, dias - entrada.trabajados);
    const compensacion = redondear((entrada.basico / 30) * faltan);
    const observaciones = [
      "The same notice applies whether the employee or the employer ends the contract.",
      "Whoever ends the contract without the full notice pays the other side the basic salary for the missing part.",
    ];
    return { meses, faltan, compensacion, observaciones };
  },
  resultado: [
    { clave: "meses", etiqueta: "Notice period", formato: "meses", destacada: true },
    { clave: "faltan", etiqueta: "Days of notice not worked", formato: "dias" },
    { clave: "compensacion", etiqueta: "Pay in lieu of the missing notice", formato: "moneda" },
  ],
});
