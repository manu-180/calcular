import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.familienbeihilfe-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "familienbeihilfe-rechner",
  estado: "publicado",
  requiere: {
    "at.familienbeihilfe": "mapa",
    "at.geschwisterstaffel": "mapa",
    "at.familienbeihilfe-zuschlaege": "mapa",
    "at.kinderabsetzbetrag": "numero",
  },
  campos: [
    { id: "unter3", tipo: "entero", etiqueta: "Kinder unter 3 Jahren", min: 0, max: 15, porDefecto: 0 },
    { id: "ab3", tipo: "entero", etiqueta: "Kinder von 3 bis 9 Jahren", min: 0, max: 15, porDefecto: 1 },
    { id: "ab10", tipo: "entero", etiqueta: "Kinder von 10 bis 18 Jahren", min: 0, max: 15, porDefecto: 0 },
    { id: "ab19", tipo: "entero", etiqueta: "Kinder ab 19 Jahren mit Anspruch", min: 0, max: 15, porDefecto: 0 },
    { id: "behinderung", tipo: "entero", etiqueta: "Davon Kinder mit erheblicher Behinderung", min: 0, max: 15, porDefecto: 0 },
    { id: "schulkinder", tipo: "entero", etiqueta: "Davon Kinder mit Schulstartgeld", min: 0, max: 15, porDefecto: 0, ayuda: "Für Kinder zwischen 6 und 15 Jahren, 2026 für die Geburtsjahrgänge 2011 bis 2020." },
  ],
  calcular(entrada, valores, { redondear }) {
    const fbh = valores["at.familienbeihilfe"];
    const anzahl = entrada.unter3 + entrada.ab3 + entrada.ab10 + entrada.ab19;
    if (anzahl === 0) throw new ErrorEntrada("Geben Sie mindestens ein Kind an.", "ab3");
    if (entrada.behinderung > anzahl) throw new ErrorEntrada("Es können nicht mehr Kinder mit Behinderung als Kinder insgesamt sein.", "behinderung");
    if (entrada.schulkinder > anzahl) throw new ErrorEntrada("Es können nicht mehr Schulkinder als Kinder insgesamt sein.", "schulkinder");
    const grund = entrada.unter3 * fbh["ab-0"] + entrada.ab3 * fbh["ab-3"] + entrada.ab10 * fbh["ab-10"] + entrada.ab19 * fbh["ab-19"];
    const stufe = String(Math.min(anzahl, 7));
    const geschwister = anzahl >= 2 ? anzahl * valores["at.geschwisterstaffel"][stufe] : 0;
    const zuschlag = entrada.behinderung * valores["at.familienbeihilfe-zuschlaege"].behinderung;
    const familienbeihilfe = redondear(grund + geschwister + zuschlag);
    const kinderabsetzbetrag = redondear(anzahl * valores["at.kinderabsetzbetrag"]);
    const monatlich = redondear(familienbeihilfe + kinderabsetzbetrag);
    const schulstartgeld = redondear(entrada.schulkinder * valores["at.familienbeihilfe-zuschlaege"].schulstartgeld);
    return {
      monatlich,
      familienbeihilfe,
      geschwister: redondear(geschwister),
      kinderabsetzbetrag,
      schulstartgeld,
      jaehrlich: redondear(12 * monatlich + schulstartgeld),
    };
  },
  resultado: [
    { clave: "monatlich", etiqueta: "Auszahlung im Monat mit Kinderabsetzbetrag", formato: "moneda", destacada: true },
    { clave: "familienbeihilfe", etiqueta: "Familienbeihilfe im Monat", formato: "moneda" },
    { clave: "geschwister", etiqueta: "davon Geschwisterstaffelung", formato: "moneda", ocultarSiCero: true },
    { clave: "kinderabsetzbetrag", etiqueta: "Kinderabsetzbetrag im Monat", formato: "moneda" },
    { clave: "schulstartgeld", etiqueta: "Schulstartgeld im August", formato: "moneda", ocultarSiCero: true },
    { clave: "jaehrlich", etiqueta: "Im Jahr zusammen", formato: "moneda" },
  ],
});
