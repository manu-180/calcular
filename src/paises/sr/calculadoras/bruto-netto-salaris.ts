import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { loonbelastingPerJaar } from "../lib/belasting";

export default definirCalculadora({
  id: "sr.bruto-netto-salaris",
  mercado: "sr",
  concepto: "sueldo-neto",
  slug: "bruto-netto-salaris",
  estado: "publicado",
  requiere: {
    "sr.belastingvrije-som": "numero",
    "sr.forfaitaire-aftrek": "numero",
    "sr.forfaitaire-aftrek-max": "numero",
    "sr.loonbelasting-tarief": "escala",
    "sr.aov-premie": "numero",
  },
  campos: [
    { id: "brutoloon", tipo: "moneda", etiqueta: "Brutoloon per maand", min: 0, porDefecto: 15000 },
    {
      id: "pensioenpremie",
      tipo: "moneda",
      etiqueta: "Jouw pensioenpremie per maand",
      min: 0,
      porDefecto: 0,
      ayuda: "Het deel van de pensioenpremie dat je werkgever op je loon inhoudt. Weet je het niet, laat dan 0 staan.",
    },
    { id: "zestigPlus", tipo: "si-no", etiqueta: "Je bent 60 jaar of ouder", porDefecto: false, ayuda: "Vanaf 60 jaar betaal je geen AOV-premie meer." },
  ],
  mundo: { bruto: "brutoloon", periodoBruto: "mes", neto: "netto", periodoNeto: "mes", entrada: { pensioenpremie: 0, zestigPlus: false } },
  calcular(entrada, valores, { redondear }) {
    if (entrada.pensioenpremie > entrada.brutoloon) throw new ErrorEntrada("De pensioenpremie kan niet hoger zijn dan je brutoloon.", "pensioenpremie");
    const loon = entrada.brutoloon - entrada.pensioenpremie;
    const lb = loonbelastingPerJaar(loon * 12, {
      vrijeSom: valores["sr.belastingvrije-som"],
      aftrekPercentage: valores["sr.forfaitaire-aftrek"],
      aftrekMax: valores["sr.forfaitaire-aftrek-max"],
      tarief: valores["sr.loonbelasting-tarief"],
    });
    const loonbelasting = redondear(lb.belasting / 12);
    const aovPremie = entrada.zestigPlus ? 0 : redondear(porcentaje(lb.zuiverLoon / 12, valores["sr.aov-premie"]));
    const pensioen = redondear(entrada.pensioenpremie);
    const netto = redondear(entrada.brutoloon - pensioen - loonbelasting - aovPremie);
    return {
      netto,
      loonbelasting,
      aovPremie,
      pensioen,
      zuiverLoon: redondear(lb.zuiverLoon / 12),
      belastbaarLoon: redondear(lb.belastbaarLoon / 12),
      nettoPerJaar: redondear(netto * 12),
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettoloon per maand", formato: "moneda", destacada: true },
    { clave: "loonbelasting", etiqueta: "Loonbelasting", formato: "moneda" },
    { clave: "aovPremie", etiqueta: "AOV-premie", formato: "moneda" },
    { clave: "pensioen", etiqueta: "Pensioenpremie", formato: "moneda", ocultarSiCero: true },
    { clave: "zuiverLoon", etiqueta: "Zuiver loon (na aftrek beroepskosten)", formato: "moneda" },
    { clave: "belastbaarLoon", etiqueta: "Belastbaar loon (boven de belastingvrije som)", formato: "moneda" },
    { clave: "nettoPerJaar", etiqueta: "Nettoloon per jaar (12 maanden)", formato: "moneda" },
  ],
});
