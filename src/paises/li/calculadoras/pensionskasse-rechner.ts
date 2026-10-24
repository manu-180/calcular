import { definirCalculadora } from "@/motor/calculo";
import { ALTER_HILFE, bpvPflichtig, parameter, REQ_LOHN, verifiziereAlter, verifiziereLohn } from "../lib/lohn";

export default definirCalculadora({
  id: "li.pensionskasse-rechner",
  mercado: "li",
  concepto: "propio",
  slug: "pensionskasse-rechner",
  estado: "publicado",
  requiere: { ...REQ_LOHN, "li.ahv-hoechstrente": "numero" },
  campos: [
    { id: "jahreslohn", tipo: "moneda", etiqueta: "AHV-pflichtiger Jahreslohn", min: 0, porDefecto: 78000 },
    { id: "alter", tipo: "entero", etiqueta: "Alter", min: 15, max: 70, porDefecto: 35, ayuda: ALTER_HILFE },
  ],
  calcular(entrada, valores, { redondear }) {
    verifiziereLohn(entrada.jahreslohn, "jahreslohn");
    verifiziereAlter(entrada.alter);
    const p = parameter(valores);
    const schwelle = p.mindestrente * 12;
    const pflichtig = bpvPflichtig(entrada.jahreslohn, entrada.alter, p);
    const total = pflichtig ? redondear((entrada.jahreslohn * p.bpvSatz) / 100) : 0;
    const hinweise: string[] = [];
    if (entrada.jahreslohn < schwelle) hinweise.push("Der Jahreslohn erreicht die minimale jährliche AHV-Altersrente nicht. Es besteht keine Versicherungspflicht.");
    else if (entrada.alter < 20) hinweise.push("Die Altersvorsorge beginnt am 1. Januar nach dem vollendeten 19. Altersjahr. Vorher sind nur Tod und Invalidität versichert.");
    hinweise.push("Gerechnet ist der gesetzliche Mindestbeitrag für das Alter, ohne Risikoprämie für Tod und Invalidität. Das Reglement Ihrer Pensionskasse kann mehr vorsehen.");
    return {
      total,
      arbeitnehmer: redondear(total / 2),
      arbeitgeber: redondear(total / 2),
      monat: redondear(total / 12),
      schwelle,
      obergrenze: valores["li.ahv-hoechstrente"] * 12 * 3,
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Mindestbeitrag Altersvorsorge pro Jahr", formato: "moneda", destacada: true },
    { clave: "arbeitnehmer", etiqueta: "Höchstanteil des Arbeitnehmers", formato: "moneda" },
    { clave: "arbeitgeber", etiqueta: "Mindestanteil des Arbeitgebers", formato: "moneda" },
    { clave: "monat", etiqueta: "Mindestbeitrag pro Monat (bei 12 Löhnen)", formato: "moneda" },
    { clave: "schwelle", etiqueta: "Eintrittsschwelle (Jahreslohn)", formato: "moneda", decimales: 0 },
    { clave: "obergrenze", etiqueta: "Tiefste zulässige Obergrenze des versicherten Lohns", formato: "moneda", decimales: 0 },
  ],
});
