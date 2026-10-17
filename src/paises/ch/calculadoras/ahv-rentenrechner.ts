import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Rentenformel nach Art. 34 AHVG (Bruchteile und Vielfache stehen im Gesetz, nicht in datos.json),
// Plafonierung nach Art. 35 AHVG. Die Tabelle der Vollrenten (Skala 44) steigt in Schritten von
// 1,2 Mindestrenten ab dem Zwölffachen; das Einkommen wird auf den nächsten Tabellenwert aufgerundet
// (Merkblatt 3.01, Beispiel und Tabelle).
function tabellenwert(einkommen: number, min: number): number {
  const start = 12 * min;
  const schritt = 1.2 * min;
  if (einkommen <= start) return start;
  return Math.min(start + Math.ceil((einkommen - start) / schritt - 1e-9) * schritt, 72 * min);
}

function vollrente(einkommen: number, min: number): number {
  const e = tabellenwert(einkommen, min);
  const roh = e <= 36 * min ? (74 / 100) * min + (13 / 600) * e : (104 / 100) * min + (8 / 600) * e;
  return Math.min(Math.max(Math.round(roh), min), 2 * min);
}

export default definirCalculadora({
  id: "ch.ahv-rentenrechner",
  mercado: "ch",
  concepto: "jubilacion",
  slug: "ahv-rentenrechner",
  estado: "publicado",
  requiere: { "ch.ahv-minimalrente": "numero" },
  campos: [
    { id: "einkommen", tipo: "moneda", etiqueta: "Massgebendes durchschnittliches Jahreseinkommen", min: 0, porDefecto: 60000, ayuda: "Durchschnitt der aufgewerteten Einkommen plus Erziehungs- und Betreuungsgutschriften. Ihre Ausgleichskasse berechnet ihn in einer Rentenvorausberechnung." },
    { id: "verheiratet", tipo: "si-no", etiqueta: "Verheiratet, beide Ehegatten beziehen eine Altersrente", porDefecto: false },
    { id: "einkommenPartner", tipo: "moneda", etiqueta: "Massgebendes Jahreseinkommen des Ehegatten", min: 0, requerido: false },
  ],
  calcular(entrada, valores) {
    const min = valores["ch.ahv-minimalrente"];
    const max = 2 * min;
    const eigene = vollrente(entrada.einkommen, min);
    let rente = eigene;
    let partner: number | null = null;
    let summe: number | null = null;
    const hinweise = ["Gerechnet ist die Vollrente bei vollständiger Beitragsdauer (Skala 44). Fehlen Beitragsjahre, wird die Rente gekürzt."];
    if (entrada.verheiratet) {
      if (entrada.einkommenPartner === null) throw new ErrorEntrada("Bitte das Einkommen des Ehegatten eingeben.", "einkommenPartner");
      const andere = vollrente(entrada.einkommenPartner, min);
      const plafond = 1.5 * max;
      if (eigene + andere > plafond) {
        rente = Math.round((eigene * plafond) / (eigene + andere));
        partner = Math.round((andere * plafond) / (eigene + andere));
        hinweise.push(`Die beiden Renten zusammen dürfen höchstens ${plafond} Franken im Monat betragen. Sie werden im Verhältnis gekürzt.`);
      } else partner = andere;
      summe = rente + partner;
    }
    const dreizehnte = rente;
    return {
      rente,
      ungekuerzt: eigene,
      partner,
      summe,
      dreizehnte,
      jahr: rente * 12 + dreizehnte,
      tabellenwert: tabellenwert(entrada.einkommen, min),
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "rente", etiqueta: "AHV-Altersrente pro Monat", formato: "moneda", decimales: 0, destacada: true },
    { clave: "ungekuerzt", etiqueta: "Rente vor der Plafonierung", formato: "moneda", decimales: 0 },
    { clave: "partner", etiqueta: "Rente des Ehegatten pro Monat", formato: "moneda", decimales: 0 },
    { clave: "summe", etiqueta: "Renten des Ehepaars zusammen", formato: "moneda", decimales: 0 },
    { clave: "dreizehnte", etiqueta: "13. Altersrente im Dezember", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "jahr", etiqueta: "Altersrente pro Jahr", formato: "moneda", decimales: 0 },
    { clave: "tabellenwert", etiqueta: "Massgebendes Einkommen (auf Tabellenwert aufgerundet)", formato: "moneda", decimales: 0 },
  ],
});
