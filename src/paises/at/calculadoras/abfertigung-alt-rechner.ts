import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.abfertigung-alt-rechner",
  mercado: "at",
  concepto: "indemnizacion-despido",
  slug: "abfertigung-alt-rechner",
  estado: "publicado",
  requiere: {
    "at.abfertigung-alt": "mapa",
    "at.abfertigung-steuer": "numero",
  },
  campos: [
    { id: "entgelt", tipo: "moneda", etiqueta: "Bruttoentgelt im letzten Monat", min: 0, porDefecto: 3000 },
    { id: "sonderzahlungen", tipo: "si-no", etiqueta: "Urlaubsgeld und Weihnachtsgeld anteilig dazurechnen", porDefecto: true, ayuda: "Rechnet das Monatsentgelt mal 14 durch 12." },
    { id: "dienstjahre", tipo: "entero", etiqueta: "Vollendete Dienstjahre", min: 0, max: 60, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tabelle = valores["at.abfertigung-alt"];
    let monate = 0;
    for (const [jahre, anzahl] of Object.entries(tabelle)) if (entrada.dienstjahre >= Number(jahre) && anzahl > monate) monate = anzahl;
    const monatsentgelt = redondear(entrada.sonderzahlungen ? (entrada.entgelt * 14) / 12 : entrada.entgelt);
    const abfertigung = redondear(monate * monatsentgelt);
    const steuer = redondear(porcentaje(abfertigung, valores["at.abfertigung-steuer"]));
    const observaciones = ["Die Abfertigung alt gilt für Arbeitsverhältnisse, die vor dem 1. Jänner 2003 begonnen haben, und nur bei einer Beendigung, die den Anspruch wahrt."];
    if (monate === 0) observaciones.push("Ein Anspruch entsteht erst nach drei Dienstjahren.");
    return {
      abfertigung,
      monate,
      monatsentgelt,
      steuer,
      netto: redondear(abfertigung - steuer),
      observaciones,
    };
  },
  resultado: [
    { clave: "abfertigung", etiqueta: "Abfertigung brutto", formato: "moneda", destacada: true },
    { clave: "monate", etiqueta: "Anzahl der Monatsentgelte", formato: "numero" },
    { clave: "monatsentgelt", etiqueta: "Zugrunde gelegtes Monatsentgelt", formato: "moneda" },
    { clave: "steuer", etiqueta: "Lohnsteuer (fester Satz)", formato: "moneda" },
    { clave: "netto", etiqueta: "Abfertigung nach Lohnsteuer", formato: "moneda" },
  ],
});
