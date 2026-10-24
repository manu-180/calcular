import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "li.ferienrechner",
  mercado: "li",
  concepto: "vacaciones",
  slug: "ferienrechner",
  estado: "publicado",
  requiere: {
    "li.ferien-wochen": "numero",
    "li.ferien-wochen-jugendliche": "numero",
  },
  campos: [
    { id: "alter", tipo: "entero", etiqueta: "Alter", min: 14, max: 80, porDefecto: 30 },
    { id: "tageProWoche", tipo: "numero", etiqueta: "Arbeitstage pro Woche", min: 0.5, max: 7, porDefecto: 5 },
    { id: "monate", tipo: "numero", etiqueta: "Monate im Dienstjahr", min: 0, max: 12, porDefecto: 12, ayuda: "Für ein unvollständiges Dienstjahr, zum Beispiel bei Eintritt oder Austritt." },
    { id: "vertragWochen", tipo: "numero", etiqueta: "Ferienwochen laut Vertrag (falls mehr als das Gesetz)", min: 0, max: 10, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.monate < 0 || entrada.monate > 12) throw new ErrorEntrada("Ein Dienstjahr hat höchstens 12 Monate.", "monate");
    const gesetz = entrada.alter < 20 ? valores["li.ferien-wochen-jugendliche"] : valores["li.ferien-wochen"];
    const wochen = Math.max(gesetz, entrada.vertragWochen ?? 0);
    const tageJahr = wochen * entrada.tageProWoche;
    const hinweise: string[] = [];
    if (entrada.vertragWochen !== null && entrada.vertragWochen < gesetz) hinweise.push("Der Vertrag darf nicht weniger Ferien vorsehen als das Gesetz. Gerechnet wird mit dem gesetzlichen Minimum.");
    return {
      tage: redondear((tageJahr * entrada.monate) / 12),
      wochen,
      tageJahr: redondear(tageJahr),
      zuschlag: (wochen / (52 - wochen)) * 100,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "tage", etiqueta: "Ferientage für diese Zeit", formato: "dias", decimales: 2, destacada: true },
    { clave: "wochen", etiqueta: "Ferienwochen pro Dienstjahr", formato: "numero", decimales: 0 },
    { clave: "tageJahr", etiqueta: "Ferientage für ein ganzes Dienstjahr", formato: "dias", decimales: 2 },
    { clave: "zuschlag", etiqueta: "Rechnerischer Ferienzuschlag bei Stundenlohn", formato: "porcentaje", decimales: 2 },
  ],
});
