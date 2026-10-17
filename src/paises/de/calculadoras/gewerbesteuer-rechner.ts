import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.gewerbesteuer-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "gewerbesteuer-rechner",
  estado: "publicado",
  requiere: {
    "de.gewst-freibetrag": "numero",
    "de.gewst-messzahl": "numero",
    "de.gewst-mindesthebesatz": "numero",
  },
  campos: [
    { id: "ertrag", tipo: "moneda", etiqueta: "Gewerbeertrag im Jahr", min: 0, porDefecto: 80000, ayuda: "Gewinn plus gewerbesteuerliche Hinzurechnungen, minus Kürzungen." },
    {
      id: "rechtsform",
      tipo: "opcion",
      etiqueta: "Rechtsform",
      opciones: [
        { valor: "personen", etiqueta: "Einzelunternehmen oder Personengesellschaft" },
        { valor: "kapital", etiqueta: "Kapitalgesellschaft (GmbH, UG, AG)" },
      ],
      porDefecto: "personen",
    },
    { id: "hebesatz", tipo: "porcentaje", etiqueta: "Hebesatz Ihrer Gemeinde", min: 0, max: 1000, porDefecto: 400 },
  ],
  calcular(entrada, valores, { redondear }) {
    const mindest = valores["de.gewst-mindesthebesatz"];
    if (entrada.hebesatz < mindest) throw new ErrorEntrada(`Der Hebesatz beträgt mindestens ${mindest} %.`, "hebesatz");
    const abgerundet = Math.floor(entrada.ertrag / 100) * 100;
    const freibetrag = entrada.rechtsform === "personen" ? Math.min(valores["de.gewst-freibetrag"], abgerundet) : 0;
    const messbetrag = redondear(porcentaje(abgerundet - freibetrag, valores["de.gewst-messzahl"]));
    const steuer = redondear(porcentaje(messbetrag, entrada.hebesatz));
    return { abgerundet, freibetrag, messbetrag, steuer, belastung: entrada.ertrag > 0 ? (steuer / entrada.ertrag) * 100 : 0 };
  },
  resultado: [
    { clave: "steuer", etiqueta: "Gewerbesteuer im Jahr", formato: "moneda", destacada: true },
    { clave: "messbetrag", etiqueta: "Steuermessbetrag", formato: "moneda" },
    { clave: "freibetrag", etiqueta: "Freibetrag", formato: "moneda" },
    { clave: "abgerundet", etiqueta: "Gewerbeertrag, auf volle 100 Euro abgerundet", formato: "moneda" },
    { clave: "belastung", etiqueta: "Belastung des Gewerbeertrags", formato: "porcentaje", decimales: 2 },
  ],
});
