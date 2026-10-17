import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.immoest-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "immoest-rechner",
  estado: "publicado",
  requiere: { "at.immoest": "numero" },
  campos: [
    { id: "verkaufspreis", tipo: "moneda", etiqueta: "Verkaufspreis", min: 0, porDefecto: 400000 },
    { id: "anschaffung", tipo: "moneda", etiqueta: "Anschaffungskosten (Kaufpreis samt Nebenkosten)", min: 0, porDefecto: 250000 },
    { id: "aufwendungen", tipo: "moneda", etiqueta: "Herstellungs- und Instandsetzungskosten seit dem Kauf", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const gewinn = Math.max(0, redondear(entrada.verkaufspreis - entrada.anschaffung - (entrada.aufwendungen ?? 0)));
    const steuer = redondear(porcentaje(gewinn, valores["at.immoest"]));
    return {
      steuer,
      gewinn,
      nachSteuer: redondear(entrada.verkaufspreis - steuer),
      observaciones: [
        "Der Rechner gilt für Neu-Grundstücke. Für Alt-Grundstücke, die vor dem 1. April 2002 angeschafft wurden, gelten pauschale Regeln, die er nicht abbildet.",
        "Ob eine Steuerbefreiung zusteht, prüft der Rechner nicht.",
      ],
    };
  },
  resultado: [
    { clave: "steuer", etiqueta: "Immobilienertragsteuer", formato: "moneda", destacada: true },
    { clave: "gewinn", etiqueta: "Veräußerungsgewinn", formato: "moneda" },
    { clave: "nachSteuer", etiqueta: "Verkaufserlös nach Steuer", formato: "moneda" },
  ],
});
