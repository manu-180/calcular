import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { loonbelastingPerJaar, marginaalTarief } from "../lib/belasting";

export default definirCalculadora({
  id: "sr.loonbelasting-berekenen",
  mercado: "sr",
  concepto: "impuesto-renta",
  slug: "loonbelasting-berekenen",
  estado: "publicado",
  requiere: {
    "sr.belastingvrije-som": "numero",
    "sr.forfaitaire-aftrek": "numero",
    "sr.forfaitaire-aftrek-max": "numero",
    "sr.loonbelasting-tarief": "escala",
  },
  campos: [
    { id: "loon", tipo: "moneda", etiqueta: "Brutoloon", min: 0, porDefecto: 20000 },
    {
      id: "periode",
      tipo: "opcion",
      etiqueta: "Het bedrag is per",
      opciones: [
        { valor: "maand", etiqueta: "Maand" },
        { valor: "jaar", etiqueta: "Jaar" },
      ],
      porDefecto: "maand",
    },
    { id: "pensioenpremie", tipo: "moneda", etiqueta: "Jouw pensioenpremie in dezelfde periode", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.pensioenpremie > entrada.loon) throw new ErrorEntrada("De pensioenpremie kan niet hoger zijn dan je loon.", "pensioenpremie");
    const factor = entrada.periode === "maand" ? 12 : 1;
    const lb = loonbelastingPerJaar((entrada.loon - entrada.pensioenpremie) * factor, {
      vrijeSom: valores["sr.belastingvrije-som"],
      aftrekPercentage: valores["sr.forfaitaire-aftrek"],
      aftrekMax: valores["sr.forfaitaire-aftrek-max"],
      tarief: valores["sr.loonbelasting-tarief"],
    });
    const belasting = redondear(lb.belasting / factor);
    return {
      belasting,
      belastingPerJaar: redondear(lb.belasting),
      aftrek: redondear(lb.aftrek / factor),
      zuiverLoon: redondear(lb.zuiverLoon / factor),
      vrijeSom: redondear(valores["sr.belastingvrije-som"] / factor),
      belastbaarLoon: redondear(lb.belastbaarLoon / factor),
      gemiddeld: entrada.loon > 0 ? redondear((belasting / entrada.loon) * 100) : 0,
      marginaal: marginaalTarief(valores["sr.loonbelasting-tarief"], lb.belastbaarLoon),
    };
  },
  resultado: [
    { clave: "belasting", etiqueta: "Loonbelasting in de gekozen periode", formato: "moneda", destacada: true },
    { clave: "belastingPerJaar", etiqueta: "Loonbelasting per jaar", formato: "moneda" },
    { clave: "aftrek", etiqueta: "Vaste aftrek beroepskosten", formato: "moneda" },
    { clave: "zuiverLoon", etiqueta: "Zuiver loon", formato: "moneda" },
    { clave: "vrijeSom", etiqueta: "Belastingvrije som", formato: "moneda" },
    { clave: "belastbaarLoon", etiqueta: "Belastbaar loon", formato: "moneda" },
    { clave: "gemiddeld", etiqueta: "Gemiddeld tarief over je brutoloon", formato: "porcentaje", decimales: 2 },
    { clave: "marginaal", etiqueta: "Tarief over je laatste dollar", formato: "porcentaje" },
  ],
});
