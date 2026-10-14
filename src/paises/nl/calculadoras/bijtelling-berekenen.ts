import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { marginaalTarief } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.bijtelling-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "bijtelling-berekenen",
  estado: "publicado",
  requiere: {
    "nl.bijtelling": "mapa",
    "nl.bijtelling-korting-emissievrij": "mapa",
    "nl.bijtelling-cap": "mapa",
    "nl.box1-schijven": "escala",
  },
  campos: [
    { id: "waarde", tipo: "moneda", etiqueta: "Cataloguswaarde van de auto (inclusief btw en bpm)", min: 0, porDefecto: 45000 },
    {
      id: "soort",
      tipo: "opcion",
      etiqueta: "Soort auto",
      opciones: [
        { valor: "brandstof", etiqueta: "Benzine, diesel of hybride" },
        { valor: "elektrisch", etiqueta: "Volledig elektrisch (geen CO2-uitstoot)" },
        { valor: "waterstof", etiqueta: "Waterstof of zonnecellen" },
      ],
      porDefecto: "elektrisch",
    },
    {
      id: "jaar",
      tipo: "opcion",
      etiqueta: "Jaar van eerste toelating",
      opciones: [
        { valor: "2026", etiqueta: "2026" },
        { valor: "2025", etiqueta: "2025" },
        { valor: "2023-2024", etiqueta: "2023 of 2024" },
        { valor: "2022", etiqueta: "2022" },
        { valor: "2021-binnen-60", etiqueta: "2021, nog binnen 60 maanden" },
        { valor: "2021-na-60", etiqueta: "2021, na 60 maanden" },
        { valor: "2017-2020", etiqueta: "2017 tot en met 2020" },
        { valor: "voor-2017", etiqueta: "Voor 2017" },
      ],
      porDefecto: "2026",
    },
    { id: "youngtimer", tipo: "si-no", etiqueta: "De auto is meer dan 16 jaar geleden voor het eerst in gebruik genomen (vul dan de dagwaarde in)", porDefecto: false },
    { id: "eigenBijdrage", tipo: "moneda", etiqueta: "Eigen bijdrage die je per jaar aan je werkgever betaalt", min: 0, porDefecto: 0 },
    { id: "inkomen", tipo: "moneda", etiqueta: "Je bruto jaarinkomen (voor de netto kosten)", min: 0, porDefecto: 60000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.waarde <= 0) throw new ErrorEntrada("Vul de waarde van de auto in.", "waarde");
    const b = v["nl.bijtelling"];
    let percentage: number;
    let korting = 0;
    if (entrada.youngtimer) {
      percentage = enMapa(b, "youngtimer");
    } else if (entrada.jaar === "voor-2017") {
      if (entrada.soort !== "brandstof") throw new ErrorEntrada("Voor een emissievrije auto van voor 2017 hangt de korting af van de eerste tenaamstelling. Kies het jaar waarin de auto voor het eerst op naam is gezet.", "jaar");
      percentage = enMapa(b, "voor-2017");
    } else {
      percentage = enMapa(b, "algemeen");
      if (entrada.soort !== "brandstof") {
        const kortingPct = enMapa(v["nl.bijtelling-korting-emissievrij"], entrada.jaar);
        const grondslag = entrada.soort === "waterstof" ? entrada.waarde : Math.min(entrada.waarde, enMapa(v["nl.bijtelling-cap"], entrada.jaar));
        korting = porcentaje(grondslag, kortingPct);
      }
    }
    const bruto = porcentaje(entrada.waarde, percentage) - korting;
    const bijtelling = Math.max(0, bruto - entrada.eigenBijdrage);
    const tarief = marginaalTarief(entrada.inkomen + bijtelling, v["nl.box1-schijven"]);
    const netto = porcentaje(bijtelling, tarief);
    return {
      bijtelling: redondear(bijtelling),
      perMaand: redondear(bijtelling / 12),
      effectief: (bruto / entrada.waarde) * 100,
      korting: redondear(korting),
      tarief,
      nettoPerMaand: redondear(netto / 12),
      nettoPerJaar: redondear(netto),
    };
  },
  resultado: [
    { clave: "bijtelling", etiqueta: "Bijtelling per jaar", formato: "moneda", destacada: true },
    { clave: "perMaand", etiqueta: "Bijtelling per maand", formato: "moneda" },
    { clave: "effectief", etiqueta: "Bijtellingspercentage na korting", formato: "porcentaje", decimales: 2 },
    { clave: "korting", etiqueta: "Korting voor een emissievrije auto", formato: "moneda", ocultarSiCero: true },
    { clave: "tarief", etiqueta: "Belastingtarief over de bijtelling", formato: "porcentaje" },
    { clave: "nettoPerMaand", etiqueta: "Wat de auto je netto kost per maand (ongeveer)", formato: "moneda" },
    { clave: "nettoPerJaar", etiqueta: "Netto per jaar (ongeveer)", formato: "moneda" },
  ],
});
