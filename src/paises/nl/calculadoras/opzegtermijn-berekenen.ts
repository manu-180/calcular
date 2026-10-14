import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dagenInMaand, duurTotEnMet, plusMaanden } from "../lib/datum";

export default definirCalculadora({
  id: "nl.opzegtermijn-berekenen",
  mercado: "nl",
  concepto: "preaviso",
  slug: "opzegtermijn-berekenen",
  estado: "publicado",
  requiere: {
    "nl.opzegtermijn-werkgever": "mapa",
    "nl.opzegtermijn-werknemer": "numero",
  },
  campos: [
    {
      id: "wie",
      tipo: "opcion",
      etiqueta: "Wie zegt op?",
      opciones: [
        { valor: "werknemer", etiqueta: "Ik zeg zelf op" },
        { valor: "werkgever", etiqueta: "Mijn werkgever zegt op" },
      ],
      porDefecto: "werknemer",
    },
    { id: "begin", tipo: "fecha", etiqueta: "Begindatum van je contract", min: "1960-01-01" },
    { id: "opzegdatum", tipo: "fecha", etiqueta: "Datum van de opzegging", porDefecto: "hoy" },
    { id: "aow", tipo: "si-no", etiqueta: "Je hebt de AOW-leeftijd bereikt", porDefecto: false },
    { id: "contract", tipo: "numero", etiqueta: "Opzegtermijn voor jou in je contract, in maanden (optioneel)", min: 0, max: 6, requerido: false },
  ],
  calcular(entrada, v) {
    if (entrada.opzegdatum < entrada.begin) throw new ErrorEntrada("De opzegging moet na de begindatum van je contract liggen.", "opzegdatum");
    const jaren = duurTotEnMet(entrada.begin, entrada.opzegdatum).jaren;
    const tabel = v["nl.opzegtermijn-werkgever"];
    let wettelijk = 0;
    for (const [vanaf, maanden] of Object.entries(tabel)) if (jaren >= Number(vanaf)) wettelijk = Math.max(wettelijk, maanden);
    const observaciones: string[] = [];
    let termijn: number;
    if (entrada.wie === "werknemer") {
      termijn = entrada.contract ?? v["nl.opzegtermijn-werknemer"];
      if (entrada.contract !== null) observaciones.push("Je gebruikt de termijn uit je contract. Die mag voor jou niet langer zijn dan zes maanden.");
    } else if (entrada.aow) {
      termijn = v["nl.opzegtermijn-werknemer"];
      observaciones.push("Heb je de AOW-leeftijd bereikt, dan is de wettelijke opzegtermijn voor je werkgever één maand.");
    } else {
      termijn = wettelijk;
      if (entrada.contract !== null && entrada.contract > v["nl.opzegtermijn-werknemer"]) {
        termijn = Math.max(wettelijk, entrada.contract * 2);
        observaciones.push("Is je eigen opzegtermijn in je contract verlengd, dan moet die van je werkgever minstens twee keer zo lang zijn.");
      }
    }
    const naTermijn = plusMaanden(entrada.opzegdatum, termijn);
    const j = Number(naTermijn.slice(0, 4));
    const m = Number(naTermijn.slice(5, 7));
    const einddatum = `${naTermijn.slice(0, 8)}${String(dagenInMaand(j, m)).padStart(2, "0")}`;
    observaciones.push("Opzeggen gebeurt tegen het einde van de maand, tenzij in je contract of cao een andere dag staat.");
    return { termijn, jaren, einddatum, observaciones };
  },
  resultado: [
    { clave: "termijn", etiqueta: "Opzegtermijn", formato: "meses", destacada: true },
    { clave: "einddatum", etiqueta: "Laatste dag van je contract", formato: "fecha" },
    { clave: "jaren", etiqueta: "Jaren in dienst op de dag van opzegging", formato: "anios" },
  ],
});
