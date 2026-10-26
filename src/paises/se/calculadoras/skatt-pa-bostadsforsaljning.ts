import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { reduktionUnderskott } from "../lib/kapital";

export default definirCalculadora({
  id: "se.skatt-pa-bostadsforsaljning",
  mercado: "se",
  concepto: "propio",
  slug: "skatt-pa-bostadsforsaljning",
  estado: "publicado",
  requiere: {
    "se.skatt-bostadsvinst": "numero",
    "se.bostadsforlust-avdrag": "numero",
    "se.ranteavdrag": "mapa",
  },
  campos: [
    { id: "forsaljningspris", tipo: "moneda", etiqueta: "Försäljningspris", min: 0, porDefecto: 3500000 },
    { id: "forsaljningsutgifter", tipo: "moneda", etiqueta: "Utgifter för försäljningen (till exempel mäklararvode)", min: 0, porDefecto: 70000 },
    { id: "inkopspris", tipo: "moneda", etiqueta: "Inköpspris, med lagfart och andra utgifter för köpet", min: 0, porDefecto: 2800000 },
    { id: "forbattringar", tipo: "moneda", etiqueta: "Förbättringsutgifter som får dras av", min: 0, porDefecto: 0, ayuda: "Ny-, till- och ombyggnad och vissa förbättrande reparationer. Spara kvitton." },
  ],
  calcular(e, v) {
    if (e.forsaljningspris <= 0) throw new ErrorEntrada("Skriv försäljningspriset.", "forsaljningspris");
    const resultat = e.forsaljningspris - e.forsaljningsutgifter - e.inkopspris - e.forbattringar;
    if (resultat >= 0) {
      return {
        skatt: Math.floor((resultat * v["se.skatt-bostadsvinst"]) / 100),
        vinst: resultat,
        forlust: 0,
        avdrag: 0,
        reduktion: 0,
        observaciones: ["Vinsten tas upp i deklarationen året efter försäljningen. Köper du en ny bostad kan du ha rätt att begära uppskov."],
      };
    }
    const forlust = -resultat;
    const avdrag = Math.floor((forlust * v["se.bostadsforlust-avdrag"]) / 100);
    return {
      skatt: 0,
      vinst: 0,
      forlust,
      avdrag,
      reduktion: reduktionUnderskott(avdrag, v["se.ranteavdrag"]),
      observaciones: ["Skattereduktionen gäller om du inte har andra kapitalinkomster som förlusten först dras mot."],
    };
  },
  resultado: [
    { clave: "skatt", etiqueta: "Skatt på vinsten", formato: "moneda", decimales: 0, destacada: true },
    { clave: "vinst", etiqueta: "Vinst", formato: "moneda", decimales: 0 },
    { clave: "forlust", etiqueta: "Förlust", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "avdrag", etiqueta: "Avdragsgill del av förlusten", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "reduktion", etiqueta: "Skattereduktion för förlusten", formato: "moneda", decimales: 0, ocultarSiCero: true },
  ],
});
