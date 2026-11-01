import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mt.overtime-calculator",
  mercado: "mt",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: { "mt.overtime": "mapa" },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "Your pay is set",
      opciones: [
        { valor: "semanal", etiqueta: "As a basic weekly wage" },
        { valor: "hora", etiqueta: "As an hourly rate" },
      ],
      porDefecto: "semanal",
    },
    { id: "semanal", tipo: "moneda", etiqueta: "Basic weekly wage", min: 0, porDefecto: 500, visibleSi: { modo: ["semanal"] } },
    { id: "tarifa", tipo: "moneda", etiqueta: "Normal hourly rate", min: 0, porDefecto: 12.5, visibleSi: { modo: ["hora"] } },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours", min: 0, max: 200, porDefecto: 8 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the overtime hours.", "horas");
    const reglas = v["mt.overtime"];
    const horasSemana = enMapa(reglas, "weekly-hours");
    const normal = entrada.modo === "semanal" ? (entrada.semanal ?? 0) / horasSemana : entrada.tarifa ?? 0;
    if (normal <= 0) throw new ErrorEntrada("Enter your pay.", entrada.modo === "semanal" ? "semanal" : "tarifa");
    const tarifaNormal = redondear(normal);
    const tarifaExtra = redondear(normal * enMapa(reglas, "multiplier"));
    return {
      pago: redondear(tarifaExtra * entrada.horas),
      tarifaExtra,
      tarifaNormal,
      adicional: redondear((tarifaExtra - tarifaNormal) * entrada.horas),
      observaciones: ["If a Wage Regulation Order covers your sector, its overtime rates apply instead."],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "tarifaExtra", etiqueta: "Overtime rate per hour", formato: "moneda" },
    { clave: "tarifaNormal", etiqueta: "Normal rate per hour", formato: "moneda" },
    { clave: "adicional", etiqueta: "Extra over normal pay", formato: "moneda" },
  ],
});
