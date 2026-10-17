import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.maaltijdcheques-berekenen",
  mercado: "be",
  concepto: "propio",
  slug: "maaltijdcheques-berekenen",
  estado: "publicado",
  requiere: {
    "be.maaltijdcheque": "mapa",
  },
  campos: [
    { id: "dagen", tipo: "entero", etiqueta: "Gewerkte dagen deze maand", min: 0, max: 31, porDefecto: 20 },
    { id: "werkgever", tipo: "moneda", etiqueta: "Bijdrage van je werkgever per cheque", min: 0, porDefecto: 8.91 },
    { id: "werknemer", tipo: "moneda", etiqueta: "Jouw bijdrage per cheque", min: 0, porDefecto: 1.09 },
  ],
  calcular(entrada, v, { redondear }) {
    const m = v["be.maaltijdcheque"];
    if (entrada.werkgever > m["werkgever-max"]) throw new ErrorEntrada("De bijdrage van de werkgever ligt boven het wettelijke maximum.", "werkgever");
    if (entrada.werknemer < m["werknemer-min"]) throw new ErrorEntrada("Jouw bijdrage ligt onder het wettelijke minimum.", "werknemer");
    const waarde = redondear(entrada.werkgever + entrada.werknemer);
    return {
      voordeel: redondear(entrada.werkgever * entrada.dagen),
      waarde,
      totaal: redondear(waarde * entrada.dagen),
      inhouding: redondear(entrada.werknemer * entrada.dagen),
      observaciones: ["Je krijgt één maaltijdcheque per dag dat je effectief gewerkt hebt. Het deel van je werkgever is vrij van sociale bijdragen en belastingen als aan alle voorwaarden voldaan is."],
    };
  },
  resultado: [
    { clave: "voordeel", etiqueta: "Jouw voordeel deze maand (deel van de werkgever)", formato: "moneda", destacada: true },
    { clave: "waarde", etiqueta: "Waarde van één maaltijdcheque", formato: "moneda" },
    { clave: "totaal", etiqueta: "Totaal op je maaltijdchequekaart", formato: "moneda" },
    { clave: "inhouding", etiqueta: "Jouw eigen bijdrage", formato: "moneda" },
  ],
});
