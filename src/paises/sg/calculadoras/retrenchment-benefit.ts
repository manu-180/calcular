import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sg.retrenchment-benefit",
  mercado: "sg",
  concepto: "indemnizacion-despido",
  slug: "retrenchment-benefit",
  estado: "publicado",
  requiere: {
    "sg.retrenchment-norma": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 5000 },
    { id: "anios", tipo: "numero", etiqueta: "Years of service with the company", min: 0, porDefecto: 6 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    if (entrada.anios < 0) throw new ErrorEntrada("Enter your years of service.", "anios");
    const norma = v["sg.retrenchment-norma"];
    const minimoAnios = enMapa(norma, "anios-minimos");
    const semanas = enMapa(norma, "semanas-minimas");
    const meses = enMapa(norma, "meses-maximos");
    const observaciones = [
      "No law sets the amount. It depends on your contract or collective agreement, or is negotiated with your employer. These figures follow the prevailing norm described by MOM.",
    ];
    if (entrada.anios < minimoAnios) {
      observaciones.unshift(`Retrenchment benefit is for employees with at least ${minimoAnios} years of service. With less, your employer may still pay an ex-gratia amount out of goodwill.`);
      return { bajo: 0, alto: 0, semanal: redondear((entrada.salario * 12) / 52), observaciones };
    }
    const semanal = redondear((entrada.salario * 12) / 52);
    observaciones.push("Unionised companies usually follow the collective agreement, where the norm is 1 month of salary per year of service. No CPF is payable on retrenchment benefit.");
    return {
      bajo: redondear(semanal * semanas * entrada.anios),
      alto: redondear(entrada.salario * meses * entrada.anios),
      semanal,
      observaciones,
    };
  },
  resultado: [
    { clave: "alto", etiqueta: "At 1 month of salary per year", formato: "moneda", destacada: true },
    { clave: "bajo", etiqueta: "At 2 weeks of salary per year", formato: "moneda" },
    { clave: "semanal", etiqueta: "Weekly salary used", formato: "moneda" },
  ],
});
