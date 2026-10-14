import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Höchstzahl der Taggelder nach Art. 27 Abs. 2 und 5bis AVIG.
function hoechstzahl(beitragsmonate: number, alter: number, unterhalt: boolean, ivRente: boolean): number {
  if (beitragsmonate < 12) return 0;
  if (alter < 25 && !unterhalt) return 200;
  if (beitragsmonate >= 22 && (alter >= 55 || ivRente)) return 520;
  if (beitragsmonate >= 18) return 400;
  return 260;
}

export default definirCalculadora({
  id: "ch.arbeitslosengeld-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "arbeitslosengeld-rechner",
  estado: "publicado",
  requiere: {
    "ch.alv-taggeld-voll": "numero",
    "ch.alv-taggeld-reduziert": "numero",
    "ch.alv-schwelle-volles-taggeld": "numero",
    "ch.alv-mindestverdienst": "numero",
    "ch.alv-tage-pro-monat": "numero",
    "ch.hoechster-versicherter-verdienst": "numero",
  },
  campos: [
    { id: "verdienst", tipo: "moneda", etiqueta: "Durchschnittlicher Monatslohn der letzten 6 oder 12 Monate", min: 0, porDefecto: 6000, ayuda: "Massgebend ist der höhere der beiden Durchschnitte." },
    { id: "unterhalt", tipo: "si-no", etiqueta: "Unterhaltspflicht gegenüber Kindern unter 25 Jahren", porDefecto: false },
    { id: "ivRente", tipo: "si-no", etiqueta: "IV-Rente ab einem Invaliditätsgrad von 40 %", porDefecto: false },
    { id: "alter", tipo: "entero", etiqueta: "Alter", min: 15, max: 70, porDefecto: 35 },
    { id: "beitragsmonate", tipo: "entero", etiqueta: "Beitragsmonate in den letzten zwei Jahren", min: 0, max: 24, porDefecto: 24 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (!Number.isInteger(entrada.beitragsmonate) || entrada.beitragsmonate < 0 || entrada.beitragsmonate > 24) throw new ErrorEntrada("Bitte eine Zahl von 0 bis 24 eingeben.", "beitragsmonate");
    if (entrada.verdienst < valores["ch.alv-mindestverdienst"])
      throw new ErrorEntrada(`Ein Verdienst unter ${valores["ch.alv-mindestverdienst"]} Franken im Monat ist nicht versichert.`, "verdienst");
    const tage = valores["ch.alv-tage-pro-monat"];
    const versichert = Math.min(entrada.verdienst, valores["ch.hoechster-versicherter-verdienst"] / 12);
    const tagesverdienst = versichert / tage;
    const volles = (tagesverdienst * valores["ch.alv-taggeld-voll"]) / 100;
    const voll = entrada.unterhalt || entrada.ivRente || volles <= valores["ch.alv-schwelle-volles-taggeld"];
    const satz = voll ? valores["ch.alv-taggeld-voll"] : valores["ch.alv-taggeld-reduziert"];
    const taggeld = redondear((tagesverdienst * satz) / 100);
    const anzahl = hoechstzahl(entrada.beitragsmonate, entrada.alter, entrada.unterhalt, entrada.ivRente);
    const hinweise: string[] = ["Vom Taggeld gehen AHV/IV/EO-Beiträge, ein BVG-Risikobeitrag und ein Teil der NBU-Prämie ab. Für Kinder kommt ein Zuschlag in der Höhe der Familienzulagen dazu, wenn diese nicht anderweitig ausbezahlt werden."];
    if (anzahl === 0) hinweise.unshift("Mit weniger als 12 Beitragsmonaten in den letzten zwei Jahren besteht in der Regel kein Anspruch.");
    if (entrada.verdienst > versichert) hinweise.unshift(`Versichert ist der Lohn nur bis ${valores["ch.hoechster-versicherter-verdienst"]} Franken im Jahr.`);
    return {
      taggeld,
      satz,
      monat: redondear((versichert * satz) / 100),
      versichert: redondear(versichert),
      anzahl,
      gesamt: redondear(taggeld * anzahl),
      observaciones: hinweise,
    };
  },
  resultado: [
    { clave: "taggeld", etiqueta: "Taggeld brutto", formato: "moneda", destacada: true },
    { clave: "satz", etiqueta: "Anteil am versicherten Verdienst", formato: "porcentaje", decimales: 0 },
    { clave: "monat", etiqueta: "Pro Monat brutto (21.7 Taggelder)", formato: "moneda" },
    { clave: "versichert", etiqueta: "Versicherter Verdienst pro Monat", formato: "moneda" },
    { clave: "anzahl", etiqueta: "Höchstzahl der Taggelder", formato: "numero", decimales: 0 },
    { clave: "gesamt", etiqueta: "Taggelder zusammen, wenn alle bezogen werden", formato: "moneda" },
  ],
});
