import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ch.saron-hypothek-rechner",
  mercado: "ch",
  concepto: "propio",
  slug: "saron-hypothek-rechner",
  estado: "publicado",
  requiere: { "ch.saron": "serie", "ch.leitzins": "serie" },
  campos: [
    { id: "betrag", tipo: "moneda", etiqueta: "Hypothekarbetrag", min: 0, porDefecto: 600000 },
    { id: "marge", tipo: "porcentaje", etiqueta: "Marge der Bank", min: 0, max: 5, porDefecto: 0.8, ayuda: "Steht in Ihrer Offerte oder im Hypothekarvertrag." },
    {
      id: "negativ",
      tipo: "opcion",
      etiqueta: "Negativer SARON",
      opciones: [
        { valor: "null", etiqueta: "Als 0 % rechnen (Untergrenze im Vertrag)" },
        { valor: "voll", etiqueta: "Wie publiziert rechnen" },
      ],
      porDefecto: "null",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.marge < 0) throw new ErrorEntrada("Die Marge kann nicht negativ sein.", "marge");
    const saron = valores["ch.saron"].valor;
    const basis = entrada.negativ === "null" ? Math.max(saron, 0) : saron;
    const satz = Math.max(basis + entrada.marge, 0);
    const jahr = redondear((entrada.betrag * satz) / 100);
    return {
      monat: redondear(jahr / 12),
      jahr,
      quartal: redondear(jahr / 4),
      satz,
      saron,
      saronDatum: valores["ch.saron"].fecha,
      leitzins: valores["ch.leitzins"].valor,
      observaciones: ["Der SARON wird täglich neu festgelegt. Wie die Bank ihn über die Zinsperiode abrechnet, steht in Ihrem Vertrag. Der Betrag hier gilt für den letzten publizierten Wert."],
    };
  },
  resultado: [
    { clave: "monat", etiqueta: "Hypothekarzins pro Monat", formato: "moneda", destacada: true },
    { clave: "jahr", etiqueta: "Hypothekarzins pro Jahr", formato: "moneda" },
    { clave: "quartal", etiqueta: "Pro Quartal", formato: "moneda" },
    { clave: "satz", etiqueta: "Zinssatz (SARON plus Marge)", formato: "porcentaje", decimales: 2 },
    { clave: "saron", etiqueta: "SARON", formato: "porcentaje", decimales: 2 },
    { clave: "saronDatum", etiqueta: "SARON vom", formato: "fecha" },
    { clave: "leitzins", etiqueta: "SNB-Leitzins", formato: "porcentaje", decimales: 2 },
  ],
});
