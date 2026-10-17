import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ch.ahv-beitraege-selbststaendige",
  mercado: "ch",
  concepto: "aportes-seguridad-social",
  slug: "ahv-beitraege-selbststaendige",
  estado: "publicado",
  requiere: {
    "ch.ahv-skala-selbststaendige": "escala",
    "ch.ahv-mindestbeitrag-selbststaendige": "numero",
  },
  campos: [{ id: "einkommen", tipo: "moneda", etiqueta: "Jährliches Erwerbseinkommen aus selbstständiger Tätigkeit", min: 0, porDefecto: 50000 }],
  calcular(entrada, valores, { redondear }) {
    const skala = valores["ch.ahv-skala-selbststaendige"];
    const mindest = valores["ch.ahv-mindestbeitrag-selbststaendige"];
    const untersteGrenze = skala[0].desde;
    if (entrada.einkommen < untersteGrenze) {
      return {
        beitrag: mindest,
        satz: null,
        monat: redondear(mindest / 12),
        observaciones: [`Unter ${untersteGrenze} Franken Einkommen gilt der Mindestbeitrag.`],
      };
    }
    let satz = skala[0].tasa;
    for (const f of skala) if (entrada.einkommen >= f.desde) satz = f.tasa;
    const beitrag = redondear((entrada.einkommen * satz) / 100);
    return {
      beitrag,
      satz,
      monat: redondear(beitrag / 12),
      observaciones: ["Die Ausgleichskasse zieht vorher einen Zins auf dem im Betrieb investierten Eigenkapital ab und erhebt zusätzlich Verwaltungskosten. Beides ist hier nicht enthalten."],
    };
  },
  resultado: [
    { clave: "beitrag", etiqueta: "AHV/IV/EO-Beitrag pro Jahr", formato: "moneda", destacada: true },
    { clave: "satz", etiqueta: "Beitragssatz", formato: "porcentaje", decimales: 3 },
    { clave: "monat", etiqueta: "Pro Monat", formato: "moneda" },
  ],
});
