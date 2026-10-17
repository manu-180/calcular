import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.elterngeld-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "elterngeld-rechner",
  estado: "publicado",
  requiere: {
    "de.elterngeld-saetze": "mapa",
    "de.elterngeld-betraege": "mapa",
    "de.elterngeld-einkommensgrenze": "numero",
  },
  campos: [
    { id: "nettoVorher", tipo: "moneda", etiqueta: "Durchschnittliches Nettoeinkommen vor der Geburt im Monat", min: 0, porDefecto: 2000, ayuda: "Das Elterngeld-Netto der zwölf Monate vor der Geburt. Ihr Nettogehalt ist ein guter Näherungswert." },
    { id: "nettoNachher", tipo: "moneda", etiqueta: "Nettoeinkommen im Bezugsmonat (Teilzeit)", min: 0, porDefecto: 0 },
    { id: "ueberGrenze", tipo: "si-no", etiqueta: "Zu versteuerndes Einkommen im Vorjahr über der Einkommensgrenze", porDefecto: false, ayuda: "Bei Paaren zählt die Summe beider." },
  ],
  calcular(entrada, valores, { redondear }) {
    const s = valores["de.elterngeld-saetze"];
    const b = valores["de.elterngeld-betraege"];
    if (entrada.ueberGrenze) throw new ErrorEntrada(`Über einem zu versteuernden Einkommen von ${valores["de.elterngeld-einkommensgrenze"].toLocaleString("de-DE")} Euro besteht kein Anspruch auf Elterngeld.`, "ueberGrenze");
    if (entrada.nettoNachher > entrada.nettoVorher) throw new ErrorEntrada("Das Einkommen nach der Geburt ist höher als vorher. Dann gibt es nur den Mindestbetrag.", "nettoNachher");
    const e = entrada.nettoVorher;
    // § 2 Absatz 2 BEEG: 0,1 Prozentpunkte "für je 2 Euro"; gezählt werden volle 2-Euro-Schritte.
    let rate = s.regel;
    if (e < b["schwelle-niedrig"]) rate = Math.min(s.hoechst, s.regel + Math.floor((b["schwelle-niedrig"] - e) / 2) * 0.1);
    if (e > b["schwelle-hoch"]) rate = Math.max(s.mindest, s.regel - Math.floor((e - b["schwelle-hoch"]) / 2) * 0.1);
    rate = Math.round(rate * 10) / 10;
    const begrenzen = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);
    const basisOhne = redondear(begrenzen((e * rate) / 100, b.mindest, b.hoechst));
    const differenz = entrada.nettoNachher > 0 ? Math.min(e, b.deckel) - entrada.nettoNachher : e;
    const basis = redondear(begrenzen((Math.max(differenz, 0) * rate) / 100, b.mindest, b.hoechst));
    const plus = redondear(Math.min(Math.max((Math.max(differenz, 0) * rate) / 100, b.mindest / 2), basisOhne / 2));
    return {
      rate,
      basis,
      plus,
      basisGesamt12: redondear(basis * 12),
      observaciones: [
        "Geschwisterbonus, Mehrlingszuschlag und der Partnerschaftsbonus sind nicht eingerechnet. Den genauen Betrag legt die Elterngeldstelle Ihres Landes fest.",
      ],
    };
  },
  resultado: [
    { clave: "basis", etiqueta: "Basiselterngeld im Monat", formato: "moneda", destacada: true },
    { clave: "plus", etiqueta: "ElterngeldPlus im Monat", formato: "moneda" },
    { clave: "rate", etiqueta: "Ersatzrate", formato: "porcentaje", decimales: 1 },
    { clave: "basisGesamt12", etiqueta: "Basiselterngeld für 12 Monate", formato: "moneda" },
  ],
});
